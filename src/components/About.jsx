import React from 'react';
import { motion } from 'framer-motion';
import AboutScene from './AboutScene';

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            About <span className="text-blue-400">Me</span>
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
        </motion.div>

        <div className="flex flex-col items-center gap-12 md:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="flex w-full justify-center md:w-1/2"
          >
            <div className="relative h-96 w-full max-w-md overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/60 shadow-2xl shadow-cyan-500/10 md:h-[420px]">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/15 via-transparent to-purple-500/15"></div>
              <AboutScene />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.15, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="w-full space-y-6 text-center md:w-1/2 md:text-left"
          >
            <p className="text-lg leading-relaxed text-slate-300">
              Aspiring AI & Machine Learning Engineer with a strong foundation in Full Stack (MERN)
              Development, focused on building intelligent, data-driven solutions.
            </p>

            <p className="text-lg leading-relaxed text-slate-300">
              I actively explore areas such as predictive modeling, deep learning, and data analysis
              using Python. Alongside this, I develop scalable web applications to integrate AI
              solutions into practical and user-friendly systems.
            </p>

            <div className="rounded-r-lg border-l-4 border-purple-500 bg-white/5 p-4 pl-4">
              <p className="text-lg leading-relaxed italic text-slate-300">
                Passionate about leveraging <span className="font-semibold text-white">AI & Machine Learning</span> to
                build intelligent applications that make a real-world impact.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
