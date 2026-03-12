import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function MissionSection({ theme }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isDark = theme === 'dark';

  return (
    <motion.section
      ref={ref}
      className="py-16 sm:py-24 bg-transparent relative"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8"

        style={{ color: isDark ? '#ffffff' : '#0f172a' }}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.2, duration: 0.6 }}>The Goal


        </motion.h2>
        
        <motion.p className="text-base sm:text-lg md:text-xl leading-relaxed"

        style={{ color: isDark ? '#cbd5e1' : '#475569' }}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.4, duration: 0.6 }}>At OrphaNova, we are making rare disease discovery possible with AI. We automate slow, fragmented research work so scientists can focus on ideas, not paperwork. Our goal is to push neglected rare disease biology forward and help teams move from scattered evidence to testable paths toward new treatments much faster.






        </motion.p>
      </div>
    </motion.section>);

}