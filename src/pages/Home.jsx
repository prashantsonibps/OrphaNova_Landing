import React, { useState, useRef } from 'react';
import HeroSection from '../components/landing/HeroSection';
import HeroAnimation from '../components/landing/HeroAnimation';
import MissionSection from '../components/landing/MissionSection';
import LabsSection from '../components/landing/LabsSection';
import PricingSection from '../components/landing/PricingSection';
import FAQs from '../components/landing/FAQs';
import FloatingHeader from '../components/landing/FloatingHeader';
import UniqueSection from '../components/landing/UniqueSection';
import WhyNowSection from '../components/landing/WhyNowSection';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ScrollAnimationWrapper from '../components/landing/ScrollAnimationWrapper';
import NovusChatbotLanding from '../components/landing/NovusChatbotLanding';
import DemoBookingModal from '../components/landing/DemoBookingModal';
import Footer from '../components/landing/Footer';
import { ThemeProvider } from '../components/ThemeContext';
import FaviconUpdater from '../components/FaviconUpdater';

const DNAStrand = ({ className }) => (
  <div className={`absolute w-full h-full ${className}`} style={{ perspective: '400px' }}>
    <div className="absolute w-full h-full animate-dna-rotate">
      {[...Array(20)].map((_, i) => (
        <div 
          key={`dot1-${i}`} 
          className="absolute w-2 h-2 dna-dot-1 rounded-full"
          style={{
            left: '50%',
            top: `${5 + i * 4.5}%`,
            transform: `translateX(-50%) rotateY(${i * 36}deg) translateZ(80px)`
          }}
        />
      ))}
      {[...Array(20)].map((_, i) => (
        <div 
          key={`dot2-${i}`} 
          className="absolute w-2 h-2 dna-dot-2 rounded-full"
          style={{
            left: '50%',
            top: `${5 + i * 4.5}%`,
            transform: `translateX(-50%) rotateY(${i * 36 + 180}deg) translateZ(80px)`
          }}
        />
      ))}
    </div>
  </div>
);

function HomeContent() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const theme = 'dark';
  const chatbotRef = useRef(null);

  const handleSeePlans = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBookDemo = () => {
    setShowDemoModal(true);
  };

  const handleTryFree = () => {
    setShowDemoModal(true);
  };

  const handleBookCall = () => {
    setShowDemoModal(true);
  };

  const handleOpenChatbot = () => {
    setShowChatbot(true);
  };

  return (
    <div className={`relative min-h-screen theme-${theme}`}>
      {/* Theme Styles */}
      <style>{`
        /* Theme Variables */
        .theme-dark {
          --color-bg-primary: #020617;
          --color-bg-gradient-from: #0f172a;
          --color-bg-gradient-via: #1e3a8a;
          --color-bg-gradient-to: #0f172a;
          --color-text-primary: #ffffff;
          --color-text-secondary: #e0f2fe;
          --color-text-tertiary: #cbd5e1;
          --color-orb-blue: rgba(59, 130, 246, 0.1);
          --color-orb-cyan: rgba(6, 182, 212, 0.1);
          --color-orb-indigo: rgba(99, 102, 241, 0.05);
          --color-dna-1: rgba(96, 165, 250, 0.5);
          --color-dna-2: rgba(103, 232, 249, 0.5);
          --color-card-bg: rgba(30, 41, 59, 0.6);
          --color-card-border: rgba(71, 85, 105, 1);
          --color-footer-bg: rgba(15, 23, 42, 0.95);
        }
        
        .theme-light {
          --color-bg-primary: #ffffff;
          --color-bg-gradient-from: #f8fafc;
          --color-bg-gradient-via: #dbeafe;
          --color-bg-gradient-to: #f1f5f9;
          --color-text-primary: #0f172a;
          --color-text-secondary: #1e293b;
          --color-text-tertiary: #475569;
          --color-orb-blue: rgba(59, 130, 246, 0.08);
          --color-orb-cyan: rgba(6, 182, 212, 0.08);
          --color-orb-indigo: rgba(99, 102, 241, 0.05);
          --color-dna-1: rgba(59, 130, 246, 0.3);
          --color-dna-2: rgba(6, 182, 212, 0.3);
          --color-card-bg: rgba(255, 255, 255, 0.8);
          --color-card-border: rgba(226, 232, 240, 1);
          --color-footer-bg: rgba(248, 250, 252, 0.95);
        }

        /* DNA Animation */
        @keyframes dna-rotate {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        .animate-dna-rotate {
          animation: dna-rotate 20s linear infinite;
          transform-style: preserve-3d;
        }

        /* DNA Dots */
        .dna-dot-1 {
          background-color: var(--color-dna-1);
        }
        .dna-dot-2 {
          background-color: var(--color-dna-2);
        }
      `}</style>

      {/* Floating Header */}
      <FloatingHeader 
        theme={theme} 
        onLogoClick={handleOpenChatbot}
      />

      {/* Hero Content Section with Fixed Background */}
      <div className="min-h-screen flex items-center justify-center relative">
        {/* Fixed Background - only in hero */}
        <div className="fixed inset-0 z-0">
          <HeroAnimation theme={theme} />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10">
          <HeroSection
            onSeePlans={handleSeePlans}
            onTryDemo={handleBookDemo}
            theme={theme}
          />
        </div>
      </div>

      {/* Spacer to keep Goal section lower, similar to original layout */}
      <div className="h-16 sm:h-24" />

      {/* Scrollable Content */}
      <div className="relative z-10">

        <ScrollAnimationWrapper>
          <MissionSection theme={theme} />
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper>
          <WhyNowSection theme={theme} />
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper>
          <UniqueSection theme={theme} />
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper>
          <LabsSection theme={theme} />
        </ScrollAnimationWrapper>

        <div id="pricing-section">
          <ScrollAnimationWrapper>
            <PricingSection 
              theme={theme}
              onTryFree={handleTryFree}
              onBookCall={handleBookCall}
            />
          </ScrollAnimationWrapper>
        </div>
        
        <ScrollAnimationWrapper>
          <FAQs theme={theme} />
        </ScrollAnimationWrapper>

        <footer className="py-12 sm:py-20 backdrop-blur-sm" style={{
          backgroundColor: 'var(--color-footer-bg)',
          color: 'var(--color-text-primary)'
        }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Ready to Accelerate Your Research?
            </h2>
            <p className="mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base px-2" style={{ color: 'var(--color-text-tertiary)' }}>
              Try OrphaNova Labs or schedule a personalized call to see how we can accelerate your research.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-stretch sm:items-center px-4">
              <Button
                onClick={() => window.open('https://lab.orphanova.com', '_blank')}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 sm:px-12 py-5 sm:py-6 text-lg sm:text-xl font-semibold rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                Try It Out
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3" />
              </Button>
              <Button
                onClick={handleBookCall}
                variant="outline"
                size="lg"
                className={`backdrop-blur-sm border-2 border-blue-400 px-8 sm:px-12 py-5 sm:py-6 text-lg sm:text-xl font-semibold rounded-xl w-full sm:w-auto ${
                  theme === 'dark' 
                    ? 'bg-white/10 text-white hover:bg-blue-900/50' 
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                }`}
              >
                Schedule a Call!
              </Button>
            </div>
            <p className="mt-8 text-sm sm:text-base px-2" style={{ color: 'var(--color-text-tertiary)' }}>
              If you are an investor interested in learning more about OrphaNova, please reach out via email at{' '}
              <a 
                href="mailto:founders@orphanova.com" 
                className="text-blue-400 hover:text-blue-300 underline"
              >
                founders@orphanova.com
              </a>
            </p>
          </div>
        </footer>

        <Footer />
      </div>


      <NovusChatbotLanding 
        ref={chatbotRef}
        theme={theme} 
        isOpen={showChatbot}
        onToggle={() => setShowChatbot(!showChatbot)}
      />

      <DemoBookingModal
        open={showDemoModal}
        onOpenChange={setShowDemoModal}
      />
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <FaviconUpdater />
      <HomeContent />
    </ThemeProvider>
  );
}