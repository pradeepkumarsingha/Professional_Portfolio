import React from 'react';
import { motion } from 'framer-motion';
import { experiences } from '../data/experience';

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-white/5 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Work <span className="text-purple-500">Experience</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="relative border-l-2 border-white/10 space-y-12 ml-4 md:ml-0 md:pl-8">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-8 md:pl-0"
            >
              <div className="absolute w-4 h-4 bg-purple-500 rounded-full -left-[41px] md:-left-[41px] top-1.5 shadow-[0_0_10px_rgba(168,85,247,0.8)] border-2 border-[#1e293b]"></div>
              
              <div className="glassmorphism p-6 md:p-8 rounded-2xl hover:border-purple-500/30 transition-colors border border-white/5">
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-0">{exp.role}</h3>
                  <span className="inline-block text-blue-400 text-sm font-semibold whitespace-nowrap">{exp.duration}</span>
                </div>
                <h4 className="text-lg text-slate-300 font-medium mb-4">{exp.company}</h4>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
