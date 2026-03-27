import React from 'react';
import { motion } from 'framer-motion';
import aboutImg from '../utils/about.png'; // 🔥 your generated image

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 🔹 Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            About <span className="text-blue-400">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* 🔹 Content */}
        <div className="flex flex-col md:flex-row gap-12 items-center">

          {/* 🔥 LEFT SIDE (IMAGE CARD) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <div className="relative w-72 h-96 md:w-80 md:h-[420px] rounded-xl overflow-hidden">

              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 blur-2xl opacity-30"></div>

              {/* Image */}
              <img
                src={aboutImg}
                alt="About Pradeep"
                className="relative w-full h-full object-cover rounded-xl border border-white/10 shadow-2xl hover:scale-105 transition-transform duration-500"
              />

            </div>
          </motion.div>

          {/* 🔥 RIGHT SIDE (TEXT) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 space-y-6 text-center md:text-left"
          >

            <p className="text-slate-300 text-lg leading-relaxed">
              Aspiring AI & Machine Learning Engineer with a strong foundation in Full Stack (MERN) Development, focused on building intelligent, data-driven solutions.
            </p>

            <p className="text-slate-300 text-lg leading-relaxed">
              I actively explore areas such as predictive modeling, deep learning, and data analysis using Python. Alongside this, I develop scalable web applications to integrate AI solutions into practical and user-friendly systems.
            </p>

            {/* Highlight Card */}
            <div className="border-l-4 border-purple-500 pl-4 bg-white/5 p-4 rounded-r-lg">
              <p className="text-slate-300 text-lg leading-relaxed italic">
                🤖 Passionate about leveraging <span className="text-white font-semibold">AI & Machine Learning</span> to build intelligent applications that make a real-world impact.
              </p>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}