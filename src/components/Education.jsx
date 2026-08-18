import React from 'react';
import { motion } from 'framer-motion';

const educationData = [
  {
    degree: "Bachelor of Technology (B.Tech)",
    branch: "Computer Science / Engineering", 
    institution: "GIFT Autonomous (Gandhi Institute for Technology)",
    location: "Bhubaneswar, Odisha",
    timeline: "4th Year (Continuing)",
    metricType: "CGPA",
    metricValue: "9.05"
  },
  {
    degree: "Higher Secondary Education (Class 12th - Science)",
    institution: "Rural Institute of Higher Studies (RIHS)",
    location: "Bhograi, Odisha",
    timeline: "Completed in 2023",
    metricType: "Percentage",
    metricValue: "78%"
  },
  {
    degree: "Secondary Education (Class 10th)",
    institution: "Prasad Chandra Govt. High School",
    location: "Kachuadi, Odisha",
    timeline: "Completed in 2021",
    metricType: "Percentage",
    metricValue: "86.5%"
  }
];

export default function Education() {
  return (
    // Crucial Fixes: Explicit id mapping combined with scroll padding offset
    <section 
      id="education" 
      className="relative overflow-hidden bg-slate-900 text-white py-24 px-6 md:px-12 scroll-mt-20"
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Animated Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-5xl tracking-wide">
            Academic <span className="text-blue-400">Background</span>
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative border-l border-slate-700 ml-4 md:ml-6">
          {educationData.map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="mb-10 ml-6 relative"
            >
              
              {/* Timeline Indicator Node */}
              <span className="absolute -left-10 top-1.5 bg-blue-500 w-4 h-4 rounded-full border-4 border-slate-900 ring-4 ring-blue-500/20"></span>
              
              {/* Card Content Card */}
              <div className="bg-slate-800/60 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 shadow-md hover:border-blue-500/50 transition-all duration-300 shadow-cyan-500/5">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">{item.degree}</h3>
                    {item.branch && <p className="text-sm text-blue-300 mt-0.5">{item.branch}</p>}
                    <p className="text-slate-300 font-medium mt-2">{item.institution}</p>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      <span>📍</span> {item.location}
                    </p>
                  </div>

                  {/* Highlighted Performance Badge */}
                  <div className="flex flex-col items-start md:items-end gap-1">
                    <span className="text-xs tracking-wider text-slate-400 uppercase">{item.timeline}</span>
                    <div className="bg-blue-600/20 border border-blue-500/40 text-blue-300 px-3 py-1 rounded-full text-sm font-semibold mt-1">
                      {item.metricType}: {item.metricValue}
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}