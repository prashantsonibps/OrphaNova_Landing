import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Lightbulb, FlaskConical, FileText } from 'lucide-react';

export default function UniqueWorkflowSection({ theme }) {
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
        <motion.h2 
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 text-center"
          style={{ color: isDark ? '#ffffff' : '#0f172a' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          What Makes OrphaNova Unique
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <p
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: isDark ? '#cbd5e1' : '#475569' }}
            >
              We run the entire research workflow end-to-end. OrphaNova ingests literature, builds an evidence graph, generates testable hypotheses, suggests experiments, and drafts and reviews manuscripts. Every step is fully traceable back to the underlying evidence. No other tool gives rare-disease teams a complete cycle from raw data to publication-ready output.
            </p>
          </motion.div>

          {/* Right Column - Workflow Diagram */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="relative"
          >
            <div className={`p-6 sm:p-8 rounded-2xl border-2 ${
              isDark 
                ? 'bg-slate-800/60 border-slate-600' 
                : 'bg-white/80 border-slate-300'
            }`}>
              {/* Main Workflow Container */}
              <div className="space-y-6">
                {/* Three Main Stages Headers */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div className="flex flex-col items-center gap-2">
                    <Lightbulb className="w-6 h-6" style={{ color: '#60a5fa' }} />
                    <span className="text-xs font-semibold text-center" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                      Hypothesis Generation
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <FlaskConical className="w-6 h-6" style={{ color: '#f59e0b' }} />
                    <span className="text-xs font-semibold text-center" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                      Mechanistic Reasoning
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <FileText className="w-6 h-6" style={{ color: '#10b981' }} />
                    <span className="text-xs font-semibold text-center" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                      Manuscript Draft
                    </span>
                  </div>
                </div>

                {/* Stage 1: Hypothesis Generation */}
                <div className="space-y-3 pb-6 border-b border-dashed" style={{ borderColor: isDark ? '#475569' : '#cbd5e1' }}>
                  <div className={`p-3 rounded-lg text-center text-xs font-medium ${
                    isDark ? 'bg-blue-900/40 text-blue-200' : 'bg-blue-100 text-blue-900'
                  }`}>
                    Evidence-Based Hypothesis Generation
                  </div>
                  <div className="flex justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20">
                      <path d="M10 5 L10 15 M5 10 L15 10" stroke={isDark ? '#60a5fa' : '#3b82f6'} strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                  <div className={`p-3 rounded-lg text-center text-xs font-medium ${
                    isDark ? 'bg-blue-900/40 text-blue-200' : 'bg-blue-100 text-blue-900'
                  }`}>
                    Novelty Check<br />(Case Reports + Literature)
                  </div>
                  <div className="flex justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20">
                      <path d="M10 5 L10 15 M5 10 L15 10" stroke={isDark ? '#60a5fa' : '#3b82f6'} strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                  <div className={`p-3 rounded-lg text-center text-xs font-medium ${
                    isDark ? 'bg-blue-900/40 text-blue-200' : 'bg-blue-100 text-blue-900'
                  }`}>
                    Hypothesis Scoring & Prioritization
                  </div>
                </div>

                {/* Stage 2: Mechanistic Reasoning */}
                <div className="space-y-3 pb-6 border-b border-dashed" style={{ borderColor: isDark ? '#475569' : '#cbd5e1' }}>
                  <div className={`p-3 rounded-lg text-center text-xs font-medium ${
                    isDark ? 'bg-orange-900/40 text-orange-200' : 'bg-orange-100 text-orange-900'
                  }`}>
                    Mechanism Mapping
                  </div>
                  <div className="flex justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20">
                      <path d="M10 5 L10 15 M5 10 L15 10" stroke={isDark ? '#f59e0b' : '#f97316'} strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                  <div className={`p-3 rounded-lg text-center text-xs font-medium ${
                    isDark ? 'bg-orange-900/40 text-orange-200' : 'bg-orange-100 text-orange-900'
                  }`}>
                    Mechanistic Reasoning
                  </div>
                  <div className="flex justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20">
                      <path d="M10 5 L10 15 M5 10 L15 10" stroke={isDark ? '#f59e0b' : '#f97316'} strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                  <div className={`p-3 rounded-lg text-center text-xs font-medium ${
                    isDark ? 'bg-orange-900/40 text-orange-200' : 'bg-orange-100 text-orange-900'
                  }`}>
                    Experiment Suggestions
                  </div>
                  
                  {/* Refinement Loop */}
                  <div className="relative py-4">
                    <div className={`border-2 border-dashed rounded-lg p-3 ${
                      isDark ? 'border-orange-500/50 bg-orange-900/20' : 'border-orange-400/50 bg-orange-50'
                    }`}>
                      <div className="flex items-center justify-center gap-2">
                        <svg width="30" height="30" viewBox="0 0 30 30">
                          <path 
                            d="M15 8 A7 7 0 1 1 15 22 A7 7 0 1 1 15 8" 
                            stroke={isDark ? '#f59e0b' : '#f97316'} 
                            strokeWidth="2" 
                            fill="none"
                            markerEnd="url(#arrowhead)"
                          />
                          <defs>
                            <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
                              <polygon points="0 0, 5 3, 0 6" fill={isDark ? '#f59e0b' : '#f97316'} />
                            </marker>
                          </defs>
                        </svg>
                        <span className="text-xs font-medium" style={{ color: isDark ? '#fb923c' : '#ea580c' }}>
                          Refinement Loop
                        </span>
                      </div>
                      <p className="text-[10px] text-center mt-1" style={{ color: isDark ? '#fdba74' : '#c2410c' }}>
                        Re-check evidence → Update hypothesis
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20">
                      <path d="M10 5 L10 15 M5 10 L15 10" stroke={isDark ? '#f59e0b' : '#f97316'} strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                  <div className={`p-3 rounded-lg text-center text-xs font-medium ${
                    isDark ? 'bg-orange-900/40 text-orange-200' : 'bg-orange-100 text-orange-900'
                  }`}>
                    Structured Evidence Summary
                  </div>
                </div>

                {/* Stage 3: Manuscript Draft */}
                <div className="space-y-3">
                  <div className={`p-3 rounded-lg text-center text-xs font-medium ${
                    isDark ? 'bg-green-900/40 text-green-200' : 'bg-green-100 text-green-900'
                  }`}>
                    Manuscript Outline
                  </div>
                  <div className="flex justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20">
                      <path d="M10 5 L10 15 M5 10 L15 10" stroke={isDark ? '#10b981' : '#059669'} strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                  <div className={`p-3 rounded-lg text-center text-xs font-medium ${
                    isDark ? 'bg-green-900/40 text-green-200' : 'bg-green-100 text-green-900'
                  }`}>
                    Evidence-Linked Drafting
                  </div>
                  <div className="flex justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20">
                      <path d="M10 5 L10 15 M5 10 L15 10" stroke={isDark ? '#10b981' : '#059669'} strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                  <div className={`p-3 rounded-lg text-center text-xs font-medium ${
                    isDark ? 'bg-green-900/40 text-green-200' : 'bg-green-100 text-green-900'
                  }`}>
                    Manuscript Draft
                  </div>
                  <div className="flex justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20">
                      <path d="M10 5 L10 15 M5 10 L15 10" stroke={isDark ? '#10b981' : '#059669'} strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                  <div className={`p-3 rounded-lg text-center text-xs font-medium ${
                    isDark ? 'bg-green-900/40 text-green-200' : 'bg-green-100 text-green-900'
                  }`}>
                    Evidence-Grounded Review
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}