import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Play } from 'lucide-react';

export default function LabsSection({ theme }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isDark = theme === 'dark';
  const [isPlaying, setIsPlaying] = useState(false);

  const videoId = 'CHCDsLmxxHQ';

  return (
    <>
      <motion.section
        ref={ref}
        className="py-16 sm:py-24 bg-transparent relative"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ delay: 0.2, duration: 0.6 }}>

              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
                style={{ color: isDark ? '#ffffff' : '#0f172a' }}>

                Introducing OrphaNova Labs
              </h2>
              
              <p className="text-base sm:text-lg leading-relaxed"

              style={{ color: isDark ? '#cbd5e1' : '#475569' }}>OrphaNova Labs is our research engine, an AI Scientist built for rare-disease biology. It reads literature, reconstructs mechanisms, generates hypotheses, designs experiments, and drafts scientific sections. Every step is grounded in traceable evidence and improved through human-in-the-loop feedback. If we can solve this for rare diseases, we can solve it anywhere in biology.






              </p>
            </motion.div>

            {/* Right Column - Video Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col">

              <div
                className="relative rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  boxShadow: isDark ?
                  '0 0 30px rgba(59, 130, 246, 0.2)' :
                  '0 0 30px rgba(59, 130, 246, 0.15)',
                  border: isDark ?
                  '2px solid rgba(59, 130, 246, 0.3)' :
                  '2px solid rgba(59, 130, 246, 0.2)'
                }}>

                {!isPlaying ?
                <button
                  onClick={() => setIsPlaying(true)}
                  className="relative w-full group cursor-pointer">

                    <img
                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                    alt="OrphaNova Labs Demo"
                    className="w-full h-auto" />

                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" fill="white" />
                      </div>
                    </div>
                  </button> :

                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen />

                  </div>
                }
              </div>
              
              <p
                className="text-sm text-center mt-4"
                style={{
                  color: isDark ? '#94a3b8' : '#64748b',
                  textShadow: isDark ? '0 0 10px rgba(148, 163, 184, 0.2)' : 'none'
                }}>

                OrphaNova Labs Demo
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>


    </>);

}