import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import profileImg from '../utils/me.pk.jpg';
import profileImg from '../utils/prof.jpg'
import resume from '../utils/aiml.pdf';

export default function Hero() {

  const roles = ["AI/ML Enthusiast", "Data Science Engineer", "Full Stack Developer"];

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < roles[index].length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + roles[index][charIndex]);
        setCharIndex(charIndex + 1);
      }, 80);

      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => {
        setCharIndex(0);
        setText("");
        setIndex((prev) => (prev + 1) % roles.length);
      }, 1500);
    }
  }, [charIndex, index]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left"
          >

            <h2 className="mb-3">Hello, I'm</h2>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold mb-4 text-white"
            >
              Pradeep <span className="text-purple-500">Kumar</span> Singha
            </motion.h1>

            {/* ✅ Typing Effect */}
            <h3 className="text-2xl md:text-3xl font-semibold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                {text}
              </span>
              <span className="animate-pulse text-purple-400">|</span>
            </h3>

            <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto md:mx-0">
              Crafting scalable web applications while integrating AI & Machine Learning to deliver intelligent and impactful digital solutions.
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-full transition-all shadow-lg shadow-blue-500/30"
              >
                View Projects
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-full transition-all"
              >
                Contact Me
              </button>
              <a
                href={resume}
                download
                className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-full transition-all inline-block text-center"
              >
                Download CV
              </a>
            </div>


          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="flex-1 flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-full">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-2xl opacity-30 animate-pulse"></div>

              <img
                src={profileImg}
                alt="Pradeep Profile"
                className="relative w-full h-full object-cover object-[center_30%] scale-110 rounded-full border-4 border-white/10 shadow-2xl"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}