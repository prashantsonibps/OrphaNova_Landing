import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FAQs({ theme }) {
  const [openIndex, setOpenIndex] = useState(null);
  const isDark = theme === 'dark';

  const faqs = [
    {
      question: 'What does OrphaNova actually do?',
      answer:
        'OrphaNova takes a rare-disease name and runs the research pipeline end to end. It scans literature, extracts disease-gene-drug relationships, validates them against sources like Open Targets, UniProt, AlphaFold, PubChem, and ClinicalTrials.gov, then turns the strongest signals into hypotheses, experiment plans, and paper-ready drafts.'
    },
    {
      question: 'How is this different from a general-purpose AI copilot?',
      answer:
        'This is not just a chat wrapper around papers. OrphaNova connects reasoning to a rare-disease workflow and live biomedical infrastructure: PubMed for literature, Open Targets for associations, UniProt for protein context, AlphaFold for structures, PubChem for compounds, and ClinicalTrials.gov for trial context. The goal is not generic summaries, but evidence-backed scientific direction.'
    },
    {
      question: 'Can OrphaNova work on ultra-rare or low-data diseases?',
      answer:
        'Yes. The whole point is to help in places where evidence is sparse and discovery is painfully slow. OrphaNova starts from whatever literature exists, then enriches that signal with protein data, structure, compounds, and trial context so a team can move from fragmented clues to a grounded research direction faster.'
    },
    {
      question: 'What happens after a relationship looks promising?',
      answer:
        'Once a relationship is validated, OrphaNova can pull the relevant protein structure, move into hypothesis generation, and help design experiments around the evidence. That includes compound context from PubChem, ADMET and docking workflows through Tamarind Bio, screening logic through Modal and RDKit, and existing study context from ClinicalTrials.gov.'
    },
    {
      question: 'What kinds of outputs can the platform generate?',
      answer:
        'The output is meant to be useful for real research work, not just reading. Teams can get evidence-backed relationship maps, validated target and compound context, experiment plans, and full drafts in formats like arXiv, Nature, Cell, NIH grant, or conference style, with export paths such as PDF or LaTeX.'
    },
    {
      question: 'How does OrphaNova keep the work grounded in real science?',
      answer:
        'The system is designed to keep moving back to evidence instead of floating into unsupported text. Literature findings are enriched with structured biomedical sources, hypotheses are generated from validated relationships, and downstream outputs are tied to the same pipeline data. That is why the product is built around validation, structures, compounds, and experiments, not just prose.'
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
