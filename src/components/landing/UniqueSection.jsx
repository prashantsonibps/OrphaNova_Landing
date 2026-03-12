import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';


export default function UniqueSection({ theme }) {
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}>

            What Makes OrphaNova Unique
          </h2>
        </motion.div>

        {/* Centered Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center mb-12 max-w-4xl mx-auto">

          <p className="text-base sm:text-lg md:text-xl leading-relaxed px-4"

          style={{ color: isDark ? '#cbd5e1' : '#475569' }}>We run the entire research workflow from query to paper end-to-end. OrphaNova ingests literature, builds an evidence graph, generates testable hypotheses, suggests experiments, and drafts and reviews manuscripts. Every step is fully traceable back to the underlying evidence. No other tool gives rare-disease teams a complete cycle from raw data to publication-ready output.


          </p>
        </motion.div>

        {/* Context Sentence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mb-8">

          <p
            className="text-lg sm:text-xl font-semibold px-4"
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}>

            Here's how OrphaNova runs an entire scientific workflow end-to-end.
          </p>
        </motion.div>

        {/* Full-width Workflow Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="backdrop-blur-md border-2 rounded-2xl p-6 sm:p-8 overflow-hidden workflow-container"
          style={{
            backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : 'rgba(255, 255, 255, 0.8)',
            borderColor: isDark ? 'rgba(71, 85, 105, 1)' : 'rgba(226, 232, 240, 1)',
            boxShadow: isDark ?
            '0 0 30px rgba(59, 130, 246, 0.15)' :
            '0 0 30px rgba(59, 130, 246, 0.1)'
          }}>

          <style>{`
            @keyframes fadeInWorkflow {
              from {
                opacity: 0;
                transform: scale(0.95) translateY(20px);
              }
              to {
                opacity: 1;
                transform: scale(1) translateY(0);
              }
            }

            .workflow-container img {
              animation: fadeInWorkflow 1.2s ease-out 0.5s forwards;
              opacity: 0;
            }
          `}</style>
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690a1389568b31dc5bffd62d/16ce02699_Gemini_Generated_Image_xs59fxs59fxs59fx.png"
            alt="OrphaNova Scientific Workflow"
            className="w-full h-auto rounded-lg"
            style={{
              boxShadow: isDark ?
              '0 4px 20px rgba(0, 0, 0, 0.3)' :
              '0 4px 20px rgba(0, 0, 0, 0.1)'
            }} />

        </motion.div>
      </div>
    </motion.section>);

}