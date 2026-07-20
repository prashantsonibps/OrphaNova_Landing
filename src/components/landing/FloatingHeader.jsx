import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function FloatingHeader({ theme }) {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isVisible = scrollY > 24;
      const isScrolled = scrollY > 56;

      setVisible(isVisible);
      setScrolled(isScrolled);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <motion.header
      initial={false}
      animate={{
        y: visible ? 0 : -120,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 sm:px-6 lg:px-8"
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >

      <div className="mx-auto max-w-[1380px]">
        <div className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
          <motion.a
            href="/"
            className="brand-lockup"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src="/brands/orphanova-lens.png"
              alt="OrphaNova logo"
              className="site-logo"
            />
            <div className="hidden sm:block">
              <span className="brand-name" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>OrphaNova</span>
              <span className="brand-subtitle">Rare-disease research engine</span>
            </div>
          </motion.a>

          <div className="header-actions">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="header-secondary-button hidden sm:inline-flex"
            >
              <a
                href="https://calendar.notion.so/meet/prashantsonibps/q47pq4wf3"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book demo
              </a>
            </Button>
            <Button
              asChild
              size="sm"
              className="header-primary-button"
            >
              <a
                href="https://lab.orphanova.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Labs
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );

}
