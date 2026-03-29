import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaGithub, FaLinkedin, FaCode, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

export default function Contact() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formRef.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then(() => {
        setLoading(false);
        setStatus({ type: 'success', message: '✅ Message sent successfully!' });
        formRef.current.reset();
      })
      .catch((error) => {
        setLoading(false);
        setStatus({ type: 'error', message: '❌ Failed to send message.' });
        console.error(error);
      });
  };

  const socials = [
    { icon: FaGithub, href: 'https://github.com/pradeepkumarsingha', label: 'GitHub', hoverColor: 'hover:bg-gray-700' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/pradeep-kumar-singha', label: 'LinkedIn', hoverColor: 'hover:bg-blue-700' },
    { icon: FaCode, href: 'https://leetcode.com/u/pkpradeep/', label: 'LeetCode', hoverColor: 'hover:bg-amber-600' },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px]" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Get In <span className="text-blue-400">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3"
          >
            <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md h-full">
              <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>

              <p className="text-slate-400 mb-8 leading-relaxed">
                Feel free to reach out for collaboration or opportunities. I'm always open to discussing exciting projects!
              </p>

              <div className="flex items-center gap-4 text-slate-300 mb-8 p-3 rounded-lg bg-white/5">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0">
                  <FaEnvelope />
                </div>
                <span className="text-sm break-all">mr.pradeepkumarsingha@gmail.com</span>
              </div>

              <div className="flex gap-3">
                {socials.map((s, i) => (
                  <motion.a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className={`w-11 h-11 rounded-full bg-white/5 flex items-center justify-center text-white transition-colors ${s.hoverColor}`}
                    title={s.label}
                  >
                    <s.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/3"
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md space-y-6"
            >

              {/* NAME + EMAIL */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                  <input
                    type="text"
                    name="user_name"
                    placeholder="Your Name"
                    required
                    className="w-full p-3 rounded-lg bg-[#0f172a]/50 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-500"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="user_email"
                    placeholder="you@example.com"
                    required
                    className="w-full p-3 rounded-lg bg-[#0f172a]/50 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-500"
                  />
                </div>
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Hello Pradeep, I'd like to talk about..."
                  required
                  className="w-full p-3 rounded-lg bg-[#0f172a]/50 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none placeholder-slate-500"
                ></textarea>
              </div>

              {/* STATUS */}
              {status && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg font-medium ${status.type === 'success'
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}
                >
                  {status.message}
                </motion.div>
              )}

              {/* BUTTON */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
              </motion.button>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}