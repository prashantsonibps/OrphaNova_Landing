import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function WhyNowSection({ theme }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isDark = theme === 'dark';

  return (
    <motion.section
      ref={ref}
      className="py-16 sm:py-24 bg-transparent relative"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
          >
            Why Now
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Left Side - Text (2 columns) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-2"
          >
            <motion.p 
              className="text-base sm:text-lg md:text-xl leading-relaxed mb-6"
              style={{ color: isDark ? '#cbd5e1' : '#475569' }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Rare-disease R&D funding has doubled, diagnosed patients have surged with widespread sequencing, and FDA orphan-drug approvals keep climbing.
            </motion.p>
            <motion.p 
              className="text-base sm:text-lg md:text-xl leading-relaxed mb-6"
              style={{ color: isDark ? '#cbd5e1' : '#475569' }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              The science is accelerating faster than researchers can manually synthesize evidence.
            </motion.p>
            <motion.p 
              className="text-base sm:text-lg md:text-xl leading-relaxed font-semibold"
              style={{ color: isDark ? '#60a5fa' : '#3b82f6' }}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              For the first time, AI can actually keep up and turn this momentum into real discovery.
            </motion.p>
          </motion.div>

          {/* Right Side - Graph (3 columns - larger) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-3"
          >
            <motion.div 
              className="backdrop-blur-md border-2 rounded-2xl p-6 sm:p-8 lg:p-10"
              style={{
                backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : 'rgba(255, 255, 255, 0.8)',
                borderColor: isDark ? 'rgba(71, 85, 105, 1)' : 'rgba(226, 232, 240, 1)',
                boxShadow: isDark 
                  ? '0 0 40px rgba(59, 130, 246, 0.2)' 
                  : '0 0 40px rgba(59, 130, 246, 0.15)'
              }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: isDark 
                  ? '0 0 50px rgba(59, 130, 246, 0.3)' 
                  : '0 0 50px rgba(59, 130, 246, 0.25)',
                transition: { duration: 0.3 }
              }}
            >
              <motion.h3 
                className="text-xl sm:text-2xl font-bold mb-6 text-center"
                style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                initial={{ opacity: 0, y: -10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                Rare Disease R&D Trends (2015-2025)
              </motion.h3>
              
              <div className="relative">
                <style>{`
                  @keyframes fadeInGraph {
                    0% {
                      opacity: 0;
                      transform: scale(0.95) translateY(30px);
                    }
                    100% {
                      opacity: 1;
                      transform: scale(1) translateY(0);
                    }
                  }

                  @keyframes pulseGlow {
                    0%, 100% {
                      box-shadow: 0 4px 20px rgba(59, 130, 246, 0.2);
                    }
                    50% {
                      box-shadow: 0 4px 30px rgba(59, 130, 246, 0.4);
                    }
                  }

                  .graph-container {
                    animation: fadeInGraph 1s ease-out 0.8s forwards;
                    opacity: 0;
                  }

                  .graph-container img {
                    animation: pulseGlow 3s ease-in-out infinite;
                  }
                `}</style>

                <div className="graph-container">
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690a1389568b31dc5bffd62d/a3b2dc28f_image.png"
                    alt="Rare Disease R&D Trends"
                    className="w-full h-auto rounded-lg"
                    style={{
                      boxShadow: isDark 
                        ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
                        : '0 4px 20px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}