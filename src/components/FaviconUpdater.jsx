import { useEffect } from 'react';
import { useTheme } from './ThemeContext';

export default function FaviconUpdater() {
  const { theme } = useTheme();

  useEffect(() => {
    const darkIcon = '/brands/orphanova-lens.png';
    const lightIcon = '/brands/orphanova-lens.png';

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
