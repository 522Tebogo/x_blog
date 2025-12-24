'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCategoryPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        icon: '📁',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                router.push('/categories');
                router.refresh();
            }
        } catch (error) {
            console.error('Failed to add category:', error);
        } finally {
            setLoading(false);
        }
    };

    const commonIcons = ['📁', '🎨', '💼', '🔧', '🎯', '💡', '🚀', '📊', '🎮', '🎵', '📱', '💻'];

    return (
        <div className="container mx-auto px-4 py-12 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                添加新分类
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
                创建一个新的工具分类
            </p>

            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
                <div>
                    <label className="block text-sm font-semibold mb-2">
                        分类名称 *
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass border-2 border-border/40 focus:border-primary-500 focus:outline-none smooth-transition"
                        placeholder="例如：AI工具"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">
                        分类描述 *
                    </label>
                    <textarea
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass border-2 border-border/40 focus:border-primary-500 focus:outline-none smooth-transition resize-none"
                        rows={4}
                        placeholder="简要描述这个分类..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">
                        图标 *
                    </label>
                    <div className="grid grid-cols-6 gap-3 mb-3">
                        {commonIcons.map((icon) => (
                            <button
                                key={icon}
                                type="button"
                                onClick={() => setFormData({ ...formData, icon })}
                                className={`w-full aspect-square rounded-xl flex items-center justify-center text-2xl smooth-transition hover:scale-110 ${formData.icon === icon
                                        ? 'bg-primary-500 shadow-lg'
                                        : 'glass'
                                    }`}
                            >
                                {icon}
                            </button>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={formData.icon}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass border-2 border-border/40 focus:border-primary-500 focus:outline-none smooth-transition"
                        placeholder="或输入自定义emoji"
                    />
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex-1 px-6 py-3 rounded-xl glass font-semibold smooth-transition hover:scale-105"
                    >
                        取消
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold smooth-transition hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? '添加中...' : '添加分类'}
                    </button>
                </div>
            </form>
        </div>
    );
}
