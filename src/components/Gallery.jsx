import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gallery } from '../data/gallery';

export default function Gallery() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="gallery" className="py-24 bg-white/5">
      <div className="max-w-7xl mx-auto px-4">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Life & <span className="text-blue-400">Gallery</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Categories */}
        <div className="space-y-16">
          {gallery.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.95, delay: idx * 0.18, ease: "easeOut" }}
            >

              {/* Section Title */}
              <h3 className="text-2xl font-bold text-white mb-6">
                {section.title}
              </h3>

              {/* Images */}
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {section.images.map((img, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    onClick={() => setSelected(img)}
                    className="relative group cursor-pointer rounded-xl overflow-hidden"
                  >
                    <img
                      src={img}
                      alt={`${section.title} ${i + 1}`}
                      loading="lazy"
                      className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <span className="text-white font-semibold bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm border border-white/20">
                        🔍 View
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', damping: 25 }}
                src={selected}
                alt="Gallery Preview"
                className="max-w-5xl max-h-[85vh] w-full object-contain rounded-xl"
              />

              {/* Close hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-6 text-slate-400 text-sm"
              >
                Click anywhere to close
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
