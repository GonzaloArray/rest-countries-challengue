import { useEffect, useState } from 'react'

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkModeEnabled = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkModeEnabled);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  return [darkMode, setDarkMode];
}

