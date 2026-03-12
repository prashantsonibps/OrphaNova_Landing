import { useEffect } from 'react';
import { useTheme } from './ThemeContext';

export default function FaviconUpdater() {
  const { theme } = useTheme();

  useEffect(() => {
    const darkIcon =
      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690a1389568b31dc5bffd62d/ee6ddf117_ChatGPTImageNov12202509_01_55PM.png';
    const lightIcon =
      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690a1389568b31dc5bffd62d/af115b481_OrphaNovaHealthcareStartupLogo4.png';

    const href = theme === 'dark' ? darkIcon : lightIcon;

    let link = document.querySelector("link[rel='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/png';
      document.head.appendChild(link);
    }

    if (link.href !== href) {
      link.href = href;
    }
  }, [theme]);

  return null;
}

