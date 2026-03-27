import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/skills';

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-white/5">
      <div className="max-w-7xl mx-auto px-4">

        {/* 🔹 Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-purple-500">Skills</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Blending full-stack development with AI/ML to build intelligent and scalable solutions.
          </p>
        </div>

        {/* 🔥 Split Layout */}
        <div className="grid md:grid-cols-2 gap-12">

          {/* 🌐 WEB DEVELOPMENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white/5 p-6 rounded-2xl border border-white/10"
          >
            <h3 className="text-2xl font-semibold mb-6 text-blue-400">
              🌐 Web Development
            </h3>

            {skills.web.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <div key={i} className="mb-6">

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon style={{ color: skill.color }} />
                      <span className="text-slate-300">{skill.name}</span>
                    </div>
                    <span className="text-sm text-slate-400">{skill.level}%</span>
                  </div>

                  {/* 🔥 Progress Bar */}
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1 }}
                      className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
                    />
                  </div>

                </div>
              );
            })}
          </motion.div>

          {/* 🤖 AI / ML */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white/5 p-6 rounded-2xl border border-white/10"
          >
            <h3 className="text-2xl font-semibold mb-6 text-purple-400">
              🤖 AI & Machine Learning
            </h3>

            {skills.ai.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <div key={i} className="mb-6">

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon style={{ color: skill.color }} />
                      <span className="text-slate-300">{skill.name}</span>
                    </div>
                    <span className="text-sm text-slate-400">{skill.level}%</span>
                  </div>

                  {/* 🔥 Progress Bar */}
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    />
                  </div>

                </div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}