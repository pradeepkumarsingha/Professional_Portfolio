import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaCode, FaHeart, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/pradeepkumarsingha', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/pradeep-kumar-singha', label: 'LinkedIn' },
    { icon: FaCode, href: 'https://leetcode.com/u/pkpradeep/', label: 'LeetCode' },
  ];

  return (
    <footer className="relative z-10 w-full bg-[#0a0f1e] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
            >
              Pradeep.
            </motion.div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Building digital experiences with precision and passion. Focused on creating
              performant applications that solve real-world problems.
            </p>
            <div className="flex gap-3 mt-2">
              {socialLinks.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.1)" }}
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-blue-400 transition-all border border-white/5"
                  aria-label={s.label}
                >
                  <s.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Navigation</h4>
              <nav className="flex flex-col gap-2">
                {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
                  <a key={item} href={`#${item.toLowerCase()}`} className="text-slate-400 hover:text-white text-sm transition-colors w-fit">
                    {item}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Contact Me</h4>
              <a
                href="mailto:your.email@example.com"
                className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
              >
                <FaEnvelope className="text-blue-400" />
                Let's get in touch
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs tracking-wide">
            &copy; {new Date().getFullYear()} PRADEEP KUMAR SINGHA. ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center gap-2 text-slate-500 text-xs">
            <span>Built with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <FaHeart className="text-red-500/80" />
            </motion.div>
            <span>By Pradeep</span>
          </div>
        </div>
      </div>
    </footer>
  );
}