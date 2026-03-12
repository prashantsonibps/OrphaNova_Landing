import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

export default function TestimonialsSection({ theme }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const isDark = theme === 'dark';

  const testimonials = [
    {
      name: "Dov Shamir, PhD",
      title: "Head, Elementa Labs, Mount Sinai",
      image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690a1389568b31dc5bffd62d/f563ec8d8_dovshamir.jpeg",
      quote: "I wasn't expecting much from an early build, but one thing did catch me, it actually pulled together the scattered rare-disease evidence in a way that felt usable. Most AI tools miss the context. This one didn't. That was my 'oh, interesting' moment."
    },
    {
      name: "DAVID B. BECK, MD PhD",
      title: "Clinical Geneticist, NYU Langone Health",
      image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690a1389568b31dc5bffd62d/58c6d62da_david-b-beck-square.jpg",
      quote: "When I tested a few rare-disease cases, it surfaced the right clinical and literature signals faster than I could manually. That surprised me a bit. If they keep tightening this, it could become something researchers rely on."
    },
    {
      name: "IDDO DRORI, PhD",
      title: "Associate Professor, Yeshiva University; Visiting Associate Professor, Stanford University",
      image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690a1389568b31dc5bffd62d/489cab2e3_iddo.jpeg",
      quote: "I reviewed the system, the underlying engineering is solid. The focus on reasoning from limited data, with humans-in-the-loop approach is the right way to build something like this."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

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
            Feedback From Early Researchers
          </h2>
        </motion.div>

        {/* Testimonial Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 sm:mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                boxShadow: isDark 
                  ? '0 20px 60px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.2)' 
                  : '0 20px 60px rgba(59, 130, 246, 0.15), 0 0 40px rgba(59, 130, 246, 0.1)',
                transition: { type: "spring", stiffness: 300, damping: 25 }
              }}
            >
              <Card 
                className={`relative backdrop-blur-md border-2 h-full flex flex-col transition-all duration-300 ${
                  isDark 
                    ? 'bg-slate-800/60 border-slate-600 hover:border-blue-500/50' 
                    : 'bg-white/80 border-slate-300 hover:border-blue-400/50'
                }`}
                style={{
                  boxShadow: isDark 
                    ? '0 0 20px rgba(59, 130, 246, 0.1)' 
                    : '0 0 20px rgba(59, 130, 246, 0.05)'
                }}
              >
                <CardContent className="p-4 sm:p-5 flex-1 flex flex-col">
                  <div className="flex items-start gap-3 mb-3">
                    <div 
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex-shrink-0 border-3 transition-all duration-300"
                      style={{
                        borderColor: isDark ? 'rgba(59, 130, 246, 0.4)' : 'rgba(59, 130, 246, 0.3)',
                        boxShadow: isDark 
                          ? '0 0 20px rgba(59, 130, 246, 0.3)' 
                          : '0 0 20px rgba(59, 130, 246, 0.2)'
                      }}
                    >
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 
                        className="font-bold text-base mb-0.5"
                        style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                      >
                        {testimonial.name}
                      </h3>
                      <p 
                        className="text-xs"
                        style={{ color: isDark ? '#94a3b8' : '#64748b' }}
                      >
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative flex-1">
                    <Quote 
                      className="absolute -top-1 -left-1 w-6 h-6 opacity-20" 
                      style={{ color: isDark ? '#60a5fa' : '#3b82f6' }}
                    />
                    <p 
                      className="text-xs sm:text-sm leading-relaxed pl-5 italic"
                      style={{ color: isDark ? '#cbd5e1' : '#475569' }}
                    >
                      {testimonial.quote}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>


      </div>
    </motion.section>
  );
}