import React, { useState, useRef, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL || 'https://my-personal-chatbot-q03j.onrender.com').replace(/\/$/, '');
const CHAT_ENDPOINT = `${BACKEND_URL}/api/chat`;
const WELCOME_BUBBLE_SEEN_KEY = 'portfolio_chat_welcome_seen';

const QUICK_SUGGESTIONS = [
  '🚀 Featured Projects',
  '💻 Technical Skills',
  '🎓 Education',
  '🏆 Certifications',
  '💼 Experience'
];

const FOLLOW_UPS = [
  '🚀 Featured Projects',
  '💻 Technical Skills',
  '📄 Resume',
  '🎓 Education',
  '🏆 Certifications',
  '💼 Internship Experience'
];

const getSessionId = () => {
  const key = 'portfolio_chat_session_id';
  const existing = localStorage.getItem(key);
  if (existing) return existing;
  const generated = `portfolio_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  localStorage.setItem(key, generated);
  return generated;
};

const normalizeStreamText = (rawText) => {
  if (!rawText) return '';

  // Handle SSE payloads by extracting each data: line and joining tokens.
  if (rawText.includes('data:')) {
    return rawText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.startsWith('data:'))
      .map((line) => line.replace(/^data:\s?/, ''))
      .join('')
      .trim();
  }

  return rawText.trim();
};

const formatBotMessage = (text) => {
  if (!text) return '';

  return text
    .replace(/include:\s*(\d+\.)/gi, 'include:\n$1')
    .replace(/(\d+\.\s+\*\*)/g, '\n$1')
    .replace(/^\n+/, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

const normalizeMarkdownLayout = (text) => {
  if (!text) return '';

  let normalized = text.replace(/\r\n/g, '\n');

  // Repair accidental line breaks inside words like "LL\nM" or "domain\ns".
  normalized = normalized.replace(/([A-Za-z])\n([A-Za-z])/g, '$1$2');

  // Drop empty hash-only heading artifacts.
  normalized = normalized.replace(/^\s*#+\s*$/gm, '');

  // Convert setext-like separators and compressed heading markers.
  normalized = normalized.replace(/\*\*([^*\n]+)\*\*={3,}/g, '## $1\n');
  normalized = normalized.replace(/={3,}/g, '\n---\n');
  normalized = normalized.replace(/-{6,}/g, '\n---\n');
  normalized = normalized.replace(/(?<!\n)(#{2,6}\s)/g, '\n$1');

  // Ensure heading/title blocks do not glue into paragraphs.
  normalized = normalized.replace(/(#{2,6}[^\n]*)([A-Z][^\n]*)/g, '$1\n$2');
  normalized = normalized.replace(/(\*\*[^*\n]+\*\*)([A-Z][a-z])/g, '$1\n$2');

  // Expand compact internship-style cards.
  normalized = normalized.replace(/(####\s+\*\*[^*\n]+\*\*)\s*\*\*([^*\n]+)\*\*/g, '$1\n- **Organization:** $2');
  normalized = normalized.replace(/\*\*Duration:\*\*\s*/gi, '\n- **Duration:** ');
  normalized = normalized.replace(/\*\*Impact:\*\*\s*/gi, '\n- **Impact:**\n');
  normalized = normalized.replace(/\*\*([^*\n]+):\*\*(\S)/g, '**$1:** $2');

  // Fix malformed what's-next style blocks.
  normalized = normalized.replace(/\*\*What's Next\?\*\*/gi, '### ❓ What\'s Next?');
  normalized = normalized.replace(/\*\*What's Next\?\*/gi, '### ❓ What\'s Next?');

  // Turn compressed star bullets into proper markdown list items.
  normalized = normalized.replace(/\s\*\s+(?=[A-Za-z0-9])/g, '\n- ');
  normalized = normalized.replace(/(?<!\n)\*\s+\*\*/g, '\n- **');
  normalized = normalized.replace(/^\s*[-*]\s*$/gm, '');

  // Add spacing between major blocks for readability.
  normalized = normalized.replace(/(#{2,6}[^\n]*)(?=\S)/g, '$1\n');
  normalized = normalized.replace(/\n(-\s\*\*Duration:\*\*[^\n]*)(?=\S)/g, '\n$1\n');
  normalized = normalized.replace(/\n{3,}/g, '\n\n');

  return normalized.trim();
};

const detectIntent = (message) => {
  const query = message.toLowerCase();
  if (query.includes('project')) return 'projects';
  if (query.includes('skill') || query.includes('tech stack')) return 'skills';
  if (query.includes('experience') || query.includes('intern')) return 'experience';
  return 'general';
};

const buildPromptInstructions = (intent) => {
  const common = [
    'Write as a professional AI assistant representing software engineer Pradeep Kumar Singh.',
    'Never output one long paragraph. Keep it scannable in 10 seconds.',
    'Use markdown with headings, bold keywords, short paragraphs, bullet points, and numbered lists when useful.',
    'Tone: friendly, professional, recruiter-focused, confident.',
    'Keep the answer concise (about 150-300 words unless asked for more detail).',
    'Do not repeat information unnecessarily.',
    'End with follow-up suggestions and one engaging question.'
  ];

  const intentSpecific = {
    projects:
      'If discussing projects, include for each: Project name, problem solved, tech stack, key features, and impact.',
    skills:
      'If discussing skills, categorize into: Programming Languages, Frameworks, AI/ML, Databases, Cloud & DevOps, Tools.',
    experience:
      'If discussing experience, present it as a timeline format with role, organization, duration, and impact bullets.',
    general:
      'Use clear sections and highlight recruiter-relevant strengths and measurable outcomes.'
  };

  return `${common.join('\n')}\n${intentSpecific[intent]}`;
};

const buildRecruiterPrompt = (userMessage) => {
  const intent = detectIntent(userMessage);
  return `User question:\n${userMessage}\n\nResponse instructions:\n${buildPromptInstructions(intent)}\n\nReturn only the final answer in markdown.`;
};

const ensureStructuredMarkdown = (rawText, intent) => {
  const text = normalizeMarkdownLayout(formatBotMessage(rawText || ''));
  if (!text) return '';

  const hasMarkdown = /(^|\n)#{2,3}\s|(^|\n)\s*[-*]\s|(^|\n)\s*\d+\.\s|\*\*/m.test(text);
  if (hasMarkdown) return text;

  const headingByIntent = {
    projects: '🚀 Project Highlights',
    skills: '💻 Technical Skills Overview',
    experience: '💼 Experience Snapshot',
    general: '🎯 Quick Recruiter Summary'
  };

  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);

  const intro = sentences[0] || text;
  const points = (sentences.length > 1 ? sentences.slice(1) : [text]).slice(0, 6);

  return `## ${headingByIntent[intent]}\n\n${intro}\n\n### ✅ Key Points\n${points
    .map((point) => `- ${point.replace(/\s+/g, ' ')}`)
    .join('\n')}`;
};

const appendFollowUps = (markdownText) => {
  const alreadyHasFollowUps = /You can also ask|Would you like|Interested|Want to|\n---\n\n💬/i.test(markdownText);
  if (alreadyHasFollowUps) return markdownText;

  return `${markdownText}\n\n---\n\n💬 You can also ask me about:\n\n${FOLLOW_UPS.map((item) => `- ${item}`).join(
    '\n'
  )}\n\nWould you like me to highlight the best-fit project for your target role?`;
};

const finalizeAssistantResponse = (rawText, userMessage) => {
  const intent = detectIntent(userMessage);
  const structured = ensureStructuredMarkdown(rawText, intent);
  return appendFollowUps(structured);
};

const nowTimestamp = () =>
  new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

const TypingDots = () => (
  <div className="inline-flex items-center gap-1" aria-label="Generating response">
    <span className="h-1.5 w-1.5 rounded-full bg-indigo-200 [animation:chatbotDot_1s_ease-in-out_infinite]" />
    <span className="h-1.5 w-1.5 rounded-full bg-indigo-200 [animation:chatbotDot_1s_ease-in-out_0.2s_infinite]" />
    <span className="h-1.5 w-1.5 rounded-full bg-indigo-200 [animation:chatbotDot_1s_ease-in-out_0.4s_infinite]" />
  </div>
);

const markdownComponents = {
  h2: ({ children }) => <h2 className="mb-2 text-base font-semibold text-white">{children}</h2>,
  h3: ({ children }) => <h3 className="mb-2 mt-3 text-sm font-semibold text-indigo-100">{children}</h3>,
  p: ({ children }) => <p className="mb-2 text-sm leading-relaxed text-slate-100">{children}</p>,
  ul: ({ children }) => <ul className="mb-2 list-disc space-y-1 pl-5 text-sm text-slate-100">{children}</ul>,
  ol: ({ children }) => <ol className="mb-2 list-decimal space-y-1 pl-5 text-sm text-slate-100">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  hr: () => <hr className="my-3 border-white/10" />,
  strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: `msg_${Date.now()}`,
      role: 'bot',
      text:
        "Welcome to Pradeep's AI Assistant.\n\nI can help you with:\n1. Featured AI/ML projects and outcomes\n2. Skills, tools, and tech stack\n3. Experience, internships, and certifications\n4. Education and career focus",
      timestamp: nowTimestamp()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasConnectionError, setHasConnectionError] = useState(false);
  const [showAskBubble, setShowAskBubble] = useState(() => {
    return localStorage.getItem(WELCOME_BUBBLE_SEEN_KEY) !== 'true';
  });
  const [isAskBubbleFading, setIsAskBubbleFading] = useState(false);
  const chatEndRef = useRef(null);

  const hasUserMessages = useMemo(() => messages.some((msg) => msg.role === 'user'), [messages]);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    if (!showAskBubble) return undefined;

    const fadeTimer = setTimeout(() => setIsAskBubbleFading(true), 7000);
    const hideTimer = setTimeout(() => setShowAskBubble(false), 8000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [showAskBubble]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const openChat = () => {
    setIsOpen(true);
    setShowAskBubble(false);
    localStorage.setItem(WELCOME_BUBBLE_SEEN_KEY, 'true');
  };

  const toggleChat = () => {
    if (!isOpen) {
      openChat();
      return;
    }
    setIsOpen(false);
  };

  const sendMessage = async (messageText) => {
    if (!messageText.trim() || isTyping) return;

    const userMessage = messageText.trim();
    const userMessageId = `user_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const botMessageId = `bot_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

    setInput('');
    setIsTyping(true);
    setHasConnectionError(false);

    setMessages((prev) => [
      ...prev,
      { id: userMessageId, role: 'user', text: userMessage, timestamp: nowTimestamp() },
      { id: botMessageId, role: 'bot', text: 'Thinking...', timestamp: nowTimestamp() }
    ]);

    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: buildRecruiterPrompt(userMessage), session_id: getSessionId() })
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const contentType = response.headers.get('content-type') || '';

      if (contentType.includes('application/json')) {
        const data = await response.json();
        const reply = data.reply || data.message || data.response || 'No response content was returned.';
        const finalReply = finalizeAssistantResponse(reply, userMessage);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId ? { ...msg, text: finalReply, timestamp: nowTimestamp() } : msg
          )
        );
        return;
      }

      if (!response.body) throw new Error('No readable stream response body.');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunkText = decoder.decode(value, { stream: true });
        accumulatedText += chunkText;
        const normalizedText = formatBotMessage(normalizeStreamText(accumulatedText));

        setMessages((prev) =>
          prev.map((msg) => (msg.id === botMessageId ? { ...msg, text: normalizedText || 'Thinking...' } : msg))
        );
      }

      const finalReply = finalizeAssistantResponse(normalizeStreamText(accumulatedText), userMessage);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? {
                ...msg,
                text: finalReply,
                timestamp: nowTimestamp()
              }
            : msg
        )
      );

      if (!accumulatedText.trim()) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId
              ? {
                  ...msg,
                  text: 'I did not receive a response from the assistant service. Please try again.'
                }
              : msg
          )
        );
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      setHasConnectionError(true);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? {
                ...msg,
                text: 'I am unable to connect to the assistant service right now. Please try again in a moment.'
              }
            : msg
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    await sendMessage(input);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <style>{`
        @keyframes chatbotPulse {
          0%, 92%, 100% { transform: scale(1); opacity: 0.55; }
          95% { transform: scale(1.08); opacity: 0.85; }
        }
        @keyframes chatbotDot {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-3px); opacity: 1; }
        }
      `}</style>

      <AnimatePresence>
        {showAskBubble && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isAskBubbleFading ? 0 : 1, y: isAskBubbleFading ? 4 : 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute bottom-[84px] right-0 w-[260px] rounded-2xl border border-indigo-300/25 bg-[#1a2545]/90 p-3 text-sm text-indigo-100 shadow-[0_12px_45px_rgba(79,70,229,0.24)] backdrop-blur-lg"
            role="status"
            aria-live="polite"
          >
            <p className="font-semibold">👋 Hi, I'm Pradeep's AI Assistant.</p>
            <p className="mt-1 text-xs text-indigo-100/85">
              Ask me about my projects, skills, experience, or resume.
            </p>
            <div className="absolute -bottom-2 right-7 h-4 w-4 rotate-45 border-b border-r border-indigo-300/25 bg-[#1a2545]/90" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 22, x: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, x: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-[90px] right-[10px] sm:right-[30px]"
          >
            <div className="w-[calc(100vw-20px)] sm:w-[340px] lg:w-[380px] h-[70vh] sm:h-[520px] max-h-[75vh] rounded-2xl bg-gradient-to-br from-indigo-400/45 via-violet-500/30 to-blue-500/45 p-[1px] shadow-[0_22px_65px_rgba(10,18,40,0.55)]">
              <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-[#0f1830]/95 text-slate-100 backdrop-blur-xl">
                <div className="border-b border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-white">
                        <span aria-hidden="true">🤖</span>
                        <span>AI Assistant</span>
                        <span className="ml-2 inline-flex items-center gap-1 text-xs font-medium text-emerald-300">
                          <span className={`h-2 w-2 rounded-full ${hasConnectionError ? 'bg-red-400' : 'bg-emerald-400'}`} />
                          Online
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-300">Ask anything about Pradeep.</p>
                    </div>

                    <button
                      onClick={() => setIsOpen(false)}
                      aria-label="Close chatbot"
                      className="rounded-lg border border-white/15 bg-white/5 p-1.5 text-slate-300 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div
                  className="flex-1 space-y-3 overflow-y-auto px-3 py-3 sm:px-4 [&::-webkit-scrollbar]:w-0"
                  style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
                >
                  {!hasUserMessages && (
                    <div className="mb-1 rounded-xl border border-indigo-300/20 bg-indigo-500/10 p-3">
                      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-indigo-200">Quick Suggestions</p>
                      <div className="grid grid-cols-2 gap-2">
                        {QUICK_SUGGESTIONS.map((suggestion) => (
                          <button
                            key={suggestion}
                            onClick={() => sendMessage(suggestion)}
                            disabled={isTyping}
                            className="rounded-lg border border-indigo-300/25 bg-[#172443] px-2.5 py-2 text-left text-xs text-slate-200 transition hover:border-indigo-300/50 hover:bg-[#1b2a52] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className="max-w-[80%]">
                          {msg.role === 'bot' && (
                            <div className="mb-1 flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-indigo-200">
                              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-[10px] font-bold text-white">
                                AI
                              </span>
                              Assistant
                            </div>
                          )}

                          <div
                            className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                              msg.role === 'user'
                                ? 'bg-gradient-to-br from-[#3f68ff] to-[#7c5dff] text-white shadow-[0_10px_30px_rgba(76,105,255,0.35)]'
                                : 'border border-white/10 bg-[#172443] text-slate-100'
                            }`}
                          >
                            {msg.role === 'bot' && msg.text === 'Thinking...' ? (
                              <div>
                                <div className="mb-1 text-xs text-indigo-200">Thinking...</div>
                                <TypingDots />
                              </div>
                            ) : msg.role === 'bot' ? (
                              <div className="chatbot-markdown prose prose-invert max-w-none prose-p:my-0 prose-headings:my-0 prose-hr:my-2">
                                <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                                  {msg.text}
                                </ReactMarkdown>
                              </div>
                            ) : (
                              <span className="whitespace-pre-wrap break-words">{msg.text}</span>
                            )}
                          </div>

                          {msg.timestamp && <p className="mt-1 px-1 text-[10px] text-slate-400">{msg.timestamp}</p>}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <div ref={chatEndRef} />
                </div>

                <form onSubmit={handleSendMessage} className="border-t border-white/10 bg-white/5 p-3 backdrop-blur-sm">
                  <div className="flex items-center gap-2 rounded-full border border-indigo-300/25 bg-[#131f3b] p-1.5">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about projects, skills, internships..."
                      disabled={isTyping}
                      aria-label="Chat input"
                      className="h-9 flex-1 bg-transparent px-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={isTyping || !input.trim()}
                      aria-label="Send message"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#3f68ff] to-[#7c5dff] text-white shadow-[0_8px_22px_rgba(76,105,255,0.45)] transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4 -rotate-45">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.12 3a.5.5 0 0 1 .5-.5L18.45 7.55a1.5 1.5 0 0 1 0 2.9L3.62 14.5a.5.5 0 0 1-.5-.5a.5.5 0 0 1 .5-.5L17.43 9L3.62 4.5a.5.5 0 0 1-.5-.5z" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggleChat}
        aria-label={isOpen ? 'Collapse chatbot' : 'Open chatbot'}
        className={`relative h-[60px] w-[60px] rounded-full border border-indigo-300/50 text-white transition-transform duration-200 hover:scale-[1.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
          isOpen 
            ? 'bg-[#1a233e] shadow-[0_8px_24px_rgba(55,65,140,0.35)]' 
            : 'bg-gradient-to-br from-[#3f68ff] via-[#5b6dff] to-[#7d5bff] shadow-[0_10px_30px_rgba(90,82,255,0.45)] hover:shadow-[0_12px_35px_rgba(111,89,255,0.62)]'
        }`}
      >
        {!isOpen && (
          <span
            className="pointer-events-none absolute inset-[-6px] rounded-full border border-indigo-300/45"
            style={{ animation: 'chatbotPulse 5s ease-in-out infinite' }}
          />
        )}

        <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#131b34] bg-emerald-400" />

        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <span className="text-xs font-semibold tracking-wide">AI</span>
        )}
      </button>
    </div>
  );
}