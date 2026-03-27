import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Floating particle component
const Particle = ({ delay, x, y, size }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      left: `${x}%`,
      top: `${y}%`,
      background: `radial-gradient(circle, rgba(139,92,246,0.8) 0%, rgba(59,130,246,0.4) 50%, transparent 70%)`,
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0.5, 0],
      scale: [0, 1.5, 0.8, 0],
      y: [0, -80, -160],
      x: [0, (Math.random() - 0.5) * 60],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: 'easeOut',
    }}
  />
);

// Orbiting ring component
const OrbitRing = ({ size, duration, delay, color }) => (
  <motion.div
    className="absolute rounded-full border"
    style={{
      width: size,
      height: size,
      borderColor: color,
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    }}
    initial={{ opacity: 0, scale: 0, rotate: 0 }}
    animate={{
      opacity: [0, 0.6, 0.3, 0.6],
      scale: 1,
      rotate: 360,
    }}
    transition={{
      opacity: { duration: 2, delay, repeat: Infinity },
      scale: { duration: 1, delay },
      rotate: { duration, repeat: Infinity, ease: 'linear' },
    }}
  />
);

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); // 0 = loading, 1 = reveal, 2 = done

  // Generate particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: 50 + Math.random() * 40,
    size: 4 + Math.random() * 8,
    delay: Math.random() * 2,
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerating progress curve
        const increment = prev < 60 ? 2 : prev < 85 ? 3 : 5;
        return Math.min(prev + increment, 100);
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => setPhase(1), 400);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  useEffect(() => {
    if (phase === 1) {
      const timer = setTimeout(() => {
        setPhase(2);
        onComplete();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0a0f1e 0%, #0f172a 40%, #131b2e 100%)' }}
          exit={{
            clipPath: 'circle(0% at 50% 50%)',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Ambient glow effects */}
          <div className="absolute w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px] -top-40 -left-40" />
          <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[100px] -bottom-20 -right-20" />
          <div className="absolute w-[300px] h-[300px] rounded-full bg-pink-500/5 blur-[80px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Floating particles */}
          {particles.map((p) => (
            <Particle key={p.id} {...p} />
          ))}

          {/* Center content */}
          <div className="relative flex flex-col items-center">

            {/* Orbiting rings */}
            <div className="absolute w-0 h-0">
              <OrbitRing size={180} duration={8} delay={0} color="rgba(59,130,246,0.2)" />
              <OrbitRing size={240} duration={12} delay={0.3} color="rgba(139,92,246,0.15)" />
              <OrbitRing size={300} duration={16} delay={0.6} color="rgba(236,72,153,0.1)" />
            </div>

            {/* Logo / Name */}
            <motion.div
              className="relative mb-8"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {/* Glowing dot behind the P */}
              <motion.div
                className="absolute -inset-8 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* The stylized P initial */}
              <motion.div
                className="relative w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.3) 0%, rgba(139,92,246,0.3) 100%)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <span className="text-4xl font-bold bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  P
                </span>
              </motion.div>
            </motion.div>

            {/* Name with staggered letter animation */}
            <div className="flex gap-[2px] mb-2 overflow-hidden">
              {'Pradeep'.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-3xl md:text-4xl font-bold text-white"
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + i * 0.08,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
              <motion.span
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + 7 * 0.08 }}
              >
                .
              </motion.span>
            </div>

            {/* Tagline */}
            <motion.p
              className="text-slate-400 text-sm tracking-[0.3em] uppercase mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              AI / ML • Full Stack
            </motion.p>

            {/* Progress bar */}
            <motion.div
              className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)',
                  width: `${progress}%`,
                  transition: 'width 0.1s ease',
                }}
              />
            </motion.div>

            {/* Percentage */}
            <motion.span
              className="text-xs text-slate-500 mt-3 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {progress}%
            </motion.span>
          </div>

          {/* Bottom scan line effect */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)',
            }}
            animate={{ y: [0, -window.innerHeight, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
