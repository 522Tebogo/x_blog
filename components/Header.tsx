'use client';

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import FontSelector from "./FontSelector";

export default function Header({ isAdmin }: { isAdmin: boolean }) {
    return (
        <header className="sticky top-0 z-50 glass border-b border-border/40">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center smooth-transition group-hover:scale-110 group-hover:rotate-3">
                            <span className="text-2xl">🚀</span>
                        </div>
                        <span className="text-2xl font-bold gradient-text hidden sm:inline">
                            X_Blog
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            href="/"
                            className="smooth-transition hover:text-primary-500 font-medium"
                        >
                            首页
                        </Link>
                        <Link
                            href="/categories"
                            className="smooth-transition hover:text-primary-500 font-medium"
                        >
                            分类
                        </Link>
                        {isAdmin && (
                            <Link
                                href="/tools/add"
                                className="smooth-transition hover:text-primary-500 font-medium"
                            >
                                添加工具
                            </Link>
                        )}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <FontSelector />
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
}
