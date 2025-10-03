import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useGlobalState } from '../contexts/GlobalStateContext';

const ThemeToggle = () => {
  const { state, actions } = useGlobalState();
  const { theme } = state.ui;
  
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    actions.updateTheme(newTheme);
    
    // Update localStorage
    localStorage.setItem('theme', newTheme);
    
    // Update document class for Tailwind dark mode
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700" />
      )}
    </button>
  );
};

export default ThemeToggle;