import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingHeader({ theme, onLogoClick }) {
  const [scrolled, setScrolled] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4">

      <div className="max-w-5xl mx-auto">
        <div
          className="backdrop-blur-[10px] transition-all duration-300 rounded-full shadow-lg"
          style={{
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            backgroundColor: isDark ?
            `rgba(15, 23, 42, ${scrolled ? 0.95 : 0.7})` :
            `rgba(255, 255, 255, ${scrolled ? 0.95 : 0.7})`,
            border: isDark ?
            `1px solid rgba(71, 85, 105, ${scrolled ? 0.5 : 0.2})` :
            `1px solid rgba(226, 232, 240, ${scrolled ? 0.8 : 0.3})`
          }}>

          <div className="flex items-center justify-between h-14 px-4 sm:px-6">
          {/* Left: Logo */}
          <motion.button
              onClick={onLogoClick}
              className="flex items-center gap-3 focus:outline-none group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}>

            <img
                src={isDark ?
                'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690a1389568b31dc5bffd62d/ee6ddf117_ChatGPTImageNov12202509_01_55PM.png' :
                'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690a1389568b31dc5bffd62d/af115b481_OrphaNovaHealthcareStartupLogo4.png'
                }
                alt="OrphaNova Logo"
                className="h-10 w-10 transition-transform group-hover:scale-110" />

            <span className="text-xl font-bold tracking-tight hidden sm:block transition-colors"

              style={{ color: isDark ? '#ffffff' : '#0f172a' }}>OrphaNova


              </span>
          </motion.button>

          {/* Right: Sign In */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              asChild
              variant={isDark ? "outline" : "default"}
              size="sm"
            >
              <a
                href="https://lab.orphanova.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sign in
              </a>
            </Button>
          </div>
        </div>
      </div>
      </div>
    </motion.header>);

}