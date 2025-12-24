'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type Font = 'inter' | 'outfit' | 'poppins';

interface ThemeContextType {
    theme: Theme;
    font: Font;
    toggleTheme: () => void;
    setFont: (font: Font) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('light');
    const [font, setFontState] = useState<Font>('inter');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Load theme from localStorage
        const savedTheme = localStorage.getItem('theme') as Theme;
        const savedFont = localStorage.getItem('font') as Font;

        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.toggle('dark', savedTheme === 'dark');
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(prefersDark ? 'dark' : 'light');
            document.documentElement.classList.toggle('dark', prefersDark);
        }

        if (savedFont) {
            setFontState(savedFont);
            document.documentElement.style.fontFamily = `var(--font-${savedFont})`;
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    const setFont = (newFont: Font) => {
        setFontState(newFont);
        localStorage.setItem('font', newFont);
        document.documentElement.style.fontFamily = `var(--font-${newFont})`;
    };

    return (
        <ThemeContext.Provider value={{ theme, font, toggleTheme, setFont }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
