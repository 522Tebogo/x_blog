'use client';

import { useTheme } from "./ThemeProvider";
import { useState } from "react";

const fonts = [
    { value: 'inter', label: 'Inter' },
    { value: 'outfit', label: 'Outfit' },
    { value: 'poppins', label: 'Poppins' },
] as const;

export default function FontSelector() {
    const { font, setFont } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 rounded-xl glass flex items-center justify-center smooth-transition hover:scale-110 btn-animate"
                aria-label="Select font"
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 glass rounded-xl shadow-2xl overflow-hidden z-50 animate-scale-in">
                        {fonts.map((f) => (
                            <button
                                key={f.value}
                                onClick={() => {
                                    setFont(f.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full px-4 py-3 text-left smooth-transition hover:bg-primary-500/20 ${font === f.value ? 'bg-primary-500/30 font-semibold' : ''
                                    }`}
                                style={{ fontFamily: `var(--font-${f.value})` }}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
