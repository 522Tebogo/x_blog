'use client';

import { useState } from "react";

export default function SearchBar() {
    const [search, setSearch] = useState('');

    return (
        <div className="max-w-2xl mx-auto">
            <div className="relative">
                <input
                    type="text"
                    placeholder="搜索工具..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-6 py-4 pl-14 rounded-2xl glass border-2 border-border/40 focus:border-primary-500 focus:outline-none smooth-transition text-lg"
                />
                <svg
                    className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
        </div>
    );
}
