import React from 'react';
import { useTheme } from '../ThemeContext';
import { Youtube, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

function createMailtoLink(email, subject, prompts) {
  const body = [
    'Hi OrphaNova team,',
    '',
    'Before we dive in, tell us a bit about you:',
    'Name:',
    'Role:',
    'Company / Institution:',
    '',
    ...prompts,
    '',
  ].join('\n');

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function Footer() {
  const { theme, getLogo } = useTheme();
  const contactLink = createMailtoLink('founders@orphanova.com', 'Contact OrphaNova', [
    'What are you reaching out about?',
    '',
    'Message:',
  ]);
  const careersLink = createMailtoLink('careers@orphanova.com', 'Careers at OrphaNova', [
    'What kind of role or background are you interested in?',
    '',
    'LinkedIn / Portfolio:',
    'Why OrphaNova:',
  ]);
  const supportLink = createMailtoLink('help@orphanova.com', 'OrphaNova Support', [
    'What do you need help with?',
    '',
    'Product area:',
    'Issue details:',
  ]);

  return (
    <footer className={`site-footer ${
      theme === 'dark'
        ? 'bg-slate-950'
        : 'bg-gray-100'
    }`}>
      <div className="mx-auto max-w-[1380px] px-5 py-10 sm:px-8 lg:px-10">
        <div className="footer-top">
          <div className="footer-brand">
            <img src={getLogo()} alt="OrphaNova" className="footer-logo" />
            <div>
              <p className="brand-name text-white">OrphaNova Inc.</p>
              <p className="footer-copy">
                Built by researchers for 400M+ patients
              </p>
            </div>
          </div>

          <div className="footer-actions">
            <Button asChild size="sm" variant="ghost" className="header-secondary-button">
              <a
                href="https://calendar.notion.so/meet/prashantsonibps/pkxx64o8n"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book demo
              </a>
            </Button>
            <Button asChild size="sm" className="header-primary-button">
              <a
                href="https://lab.orphanova.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Labs
              </a>
            </Button>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-links">
            <a href={contactLink}>Contact</a>
            <a href={careersLink}>Careers</a>
            <a href={supportLink}>Support</a>
          </div>

          <div className="footer-meta">
            <div className="footer-socials">
              <a
                href="https://youtube.com/@orphanova"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/orphanova"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/orphanova"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>

            <p className="footer-copy text-sm">
              © 2026 OrphaNova Inc. All Rights Reserved
            </p>
            <p className="footer-powered">
              Powered by <span>NOVUS AI</span>
            </p>
          </div>
        </div>
      </div>
    </footer>);

}
