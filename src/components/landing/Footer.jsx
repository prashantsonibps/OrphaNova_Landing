import React from 'react';
import { useTheme } from '../ThemeContext';
import { Youtube, Linkedin } from 'lucide-react';

export default function Footer() {
  const { theme, getLogo } = useTheme();

  return (
    <footer className={`border-t mt-auto ${
      theme === 'dark'
        ? 'bg-slate-900/50 border-slate-800'
        : 'bg-gray-100 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4">
          {/* Left: Logo + Tagline */}
          <div className="flex items-center gap-3">
            <img
              src={getLogo()}
              alt="OrphaNova"
              className="w-16 h-16 object-contain" />

            <div className="flex flex-col items-start gap-1">
              <span className="text-green-500 text-base font-medium">
                OrphaNova Inc.
              </span>
              <span className={`text-sm ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`
              }>
                Built by researchers for 400M+ patients
              </span>
            </div>
          </div>

          {/* Center: Social Icons + Copyright + Powered by */}
          <div className="text-center">
            {/* Social Media Icons */}
            <div className="flex items-center justify-center gap-4 mb-3">
              <a
                href="https://youtube.com/@orphanova"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${
                theme === 'dark' ?
                'text-slate-400 hover:text-red-500' :
                'text-slate-600 hover:text-red-600'}`
                }>

                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/orphanova"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${
                theme === 'dark' ?
                'text-slate-400 hover:text-blue-500' :
                'text-slate-600 hover:text-blue-600'}`
                }>

                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/orphanova"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${
                theme === 'dark' ?
                'text-slate-400 hover:text-slate-200' :
                'text-slate-600 hover:text-slate-900'}`
                }>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
            
            <p className={`text-sm ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`
            }>
              © 2026 OrphaNova Inc. All Rights Reserved
            </p>
            <p className={`text-xs mt-1 ${
            theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`
            }>
              Powered by <span className="text-blue-500 font-medium">NOVUS AI</span>
            </p>
          </div>

          {/* Right: Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-sm">
            <a
              href="#"
              className={`transition-colors ${
              theme === 'dark' ?
              'text-slate-400 hover:text-white' :
              'text-slate-600 hover:text-slate-900'}`
              }>

              FAQs
            </a>
            <span className={theme === 'dark' ? 'text-slate-700' : 'text-slate-300'}>|</span>
            <a
              href="#"
              className={`transition-colors ${
              theme === 'dark' ?
              'text-slate-400 hover:text-white' :
              'text-slate-600 hover:text-slate-900'}`
              }>

              Docs
            </a>
            <span className={theme === 'dark' ? 'text-slate-700' : 'text-slate-300'}>|</span>
            <a
              href="#"
              className={`transition-colors ${
              theme === 'dark' ?
              'text-slate-400 hover:text-white' :
              'text-slate-600 hover:text-slate-900'}`
              }>

              About Us
            </a>
            <span className={theme === 'dark' ? 'text-slate-700' : 'text-slate-300'}>|</span>
            <a
              href="mailto:founders@orphanova.com"
              className={`transition-colors ${
              theme === 'dark' ?
              'text-slate-400 hover:text-white' :
              'text-slate-600 hover:text-slate-900'}`
              }>

              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>);

}