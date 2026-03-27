import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * Floating particle background — subtle glowing dots
 * that drift slowly, giving the site a living feel.
 */
export default function ParticleField() {
  const dots = useMemo(() => {
    return Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 3,
      duration: 15 + Math.random() * 25,
      delay: Math.random() * 10,
      color: Math.random() > 0.5
        ? 'rgba(59,130,246,0.4)'
        : 'rgba(139,92,246,0.4)',
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            width: dot.size,
            height: dot.size,
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            backgroundColor: dot.color,
            boxShadow: `0 0 ${dot.size * 3}px ${dot.color}`,
          }}
          animate={{
            y: [0, -40, 10, -20, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [0.2, 0.6, 0.3, 0.5, 0.2],
          }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
