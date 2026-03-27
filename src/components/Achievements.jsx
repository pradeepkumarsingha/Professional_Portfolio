import React, { useRef, useEffect, useState } from 'react';
import { certificates } from '../data/certificates';

export default function Achievements() {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Manual scroll
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  // 🔥 Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered && scrollRef.current) {
        scrollRef.current.scrollBy({
          left: 300,
          behavior: 'smooth',
        });
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section id="achievements" className="py-24">
      <div className="max-w-7xl mx-auto px-4">

        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Certifications & <span className="text-blue-400">Achievements</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Slider */}
        <div className="relative">

          {/* LEFT BUTTON */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 text-white p-3 rounded-full"
          >
            ◀
          </button>

          {/* CARDS */}
          <div
            ref={scrollRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex gap-6 overflow-x-auto scroll-smooth px-10 no-scrollbar"
          >
            {certificates.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-[280px] bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-4 hover:scale-105 transition"
              >
                {/* Image */}
                <div className="w-full h-40 overflow-hidden rounded-lg mb-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>

                {/* Content */}
                <h3 className="text-white font-bold text-lg">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-400">
                  {item.issuer}
                </p>

                <p className="text-purple-400 text-sm mt-2">
                  {item.date}
                </p>
              </div>
            ))}
          </div>

          {/* RIGHT BUTTON */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 text-white p-3 rounded-full"
          >
            ▶
          </button>

        </div>
      </div>
    </section>
  );
}