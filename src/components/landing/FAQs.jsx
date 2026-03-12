import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FAQs({ theme }) {
  const [openIndex, setOpenIndex] = useState(null);
  const isDark = theme === 'dark';

  const faqs = [
    {
      question: "Why does NOVUS AI appear as a co-author in drafts?",
      answer: "By default, NOVUS appears as a co-author because it genuinely contributes to the scientific reasoning and text. As AI starts shaping real discoveries, IP around model-generated insight is becoming a real issue, we’re building for that future. In the Advanced Plan, you can fully customize or remove authorship and export a clean manuscript."
    },
    {
      question: "How does NOVUS AI \'Simulate\' experiments?",
      answer: "It doesn’t fabricate data. NOVUS runs mechanistic reasoning over your evidence graph to predict plausible outcomes, surface assumptions, and highlight uncertainty. Think of it as a high-precision hypothesis engine, not a virtual experiment."
    },
    {
      question: "Can OrphaNova handle ultra-rare diseases with only a few papers?",
      answer: "Yes. It's built for low-data environments and constructs mechanistic chains from whatever evidence exists, highlighting uncertainty instead of guessing."
    },
    {
      question: "Are my files used to train models?",
      answer: "No. Your data never trains any shared model. It stays inside your workspace, and in the Advanced Plan you can disable all external calls entirely."
    },
    {
      question: "How does the disease knowledge graph help my work?",
      answer: "It unifies genes, variants, pathways, phenotypes, interventions, and case details into one evidence map so you can ask targeted scientific questions and get grounded, citation-linked answers instantly."
    },
    {
      question: "What makes OrphaNova unique?",
      answer: "OrphaNova combines every type of rare-disease evidence into one reasoning system  literature, case reports, registries, and the structured disease maps we originally built in OrphanAtlas. OrphanAtlas acts as the curated backbone, and OrphaNova adds the AI layer that can actually reason over that data. This pairing gives researchers context and clarity no standalone LLM or database can provide."
    }
  ];

  return (
    <section 
      id="faqs-section"
      className="py-12 sm:py-16 bg-transparent relative overflow-hidden"
      style={{
        background: isDark 
          ? 'linear-gradient(to bottom, transparent 0%, rgba(15, 23, 42, 0.3) 50%, transparent 100%)'
          : 'linear-gradient(to bottom, transparent 0%, rgba(241, 245, 249, 0.5) 50%, transparent 100%)'
      }}
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
          >
            Frequently Asked Questions
          </h2>
          <p 
            className="text-base sm:text-lg"
            style={{ color: isDark ? '#cbd5e1' : '#64748b' }}
          >
            Everything you need to know about OrphaNova
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="backdrop-blur-md border rounded-lg overflow-hidden"
              style={{
                backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : 'rgba(255, 255, 255, 0.8)',
                borderColor: isDark ? 'rgba(71, 85, 105, 0.6)' : 'rgba(226, 232, 240, 1)'
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-opacity-80 transition-all"
                style={{
                  backgroundColor: openIndex === index 
                    ? (isDark ? 'rgba(51, 65, 85, 0.4)' : 'rgba(241, 245, 249, 0.6)')
                    : 'transparent'
                }}
              >
                <span 
                  className="font-semibold text-base sm:text-lg pr-4"
                  style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                >
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown 
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: isDark ? '#94a3b8' : '#64748b' }}
                  />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div 
                      className="px-5 pb-4 pt-2 text-sm sm:text-base leading-relaxed"
                      style={{ color: isDark ? '#cbd5e1' : '#475569' }}
                    >
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}