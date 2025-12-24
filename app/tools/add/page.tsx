'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@/lib/types";

export default function AddToolPage() {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        url: '',
        categoryId: '',
        icon: '🔧',
        tags: '',
        featured: false,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => setCategories(data));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const toolData = {
                ...formData,
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
            };

            const response = await fetch('/api/tools', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(toolData),
            });

            if (response.ok) {
                router.push('/');
                router.refresh();
            }
        } catch (error) {
            console.error('Failed to add tool:', error);
        } finally {
            setLoading(false);
        }
    };

    const commonIcons = ['🔧', '🎨', '💼', '🎯', '💡', '🚀', '📊', '🎮', '🎵', '📱', '💻', '🤖'];

    return (
        <div className="container mx-auto px-4 py-12 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                添加新工具
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
                分享一个有用的工具
            </p>

            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
                <div>
                    <label className="block text-sm font-semibold mb-2">
                        工具名称 *
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass border-2 border-border/40 focus:border-primary-500 focus:outline-none smooth-transition"
                        placeholder="例如：ChatGPT"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">
                        工具描述 *
                    </label>
                    <textarea
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass border-2 border-border/40 focus:border-primary-500 focus:outline-none smooth-transition resize-none"
                        rows={4}
                        placeholder="简要描述这个工具的功能..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">
                        工具链接 *
                    </label>
                    <input
                        type="url"
                        required
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass border-2 border-border/40 focus:border-primary-500 focus:outline-none smooth-transition"
                        placeholder="https://example.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">
                        分类 *
                    </label>
                    <select
                        required
                        value={formData.categoryId}
                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass border-2 border-border/40 focus:border-primary-500 focus:outline-none smooth-transition"
                    >
                        <option value="">选择分类</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.icon} {category.name}
                            </option>
                        ))}
                    </select>
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

                <div>
                    <label className="block text-sm font-semibold mb-2">
                        标签
                    </label>
                    <input
                        type="text"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass border-2 border-border/40 focus:border-primary-500 focus:outline-none smooth-transition"
                        placeholder="用逗号分隔，例如：AI, 聊天, 免费"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="featured"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-5 h-5 rounded"
                    />
                    <label htmlFor="featured" className="text-sm font-semibold cursor-pointer">
                        推荐工具
                    </label>
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
                        {loading ? '添加中...' : '添加工具'}
                    </button>
                </div>
            </form>
        </div>
    );
}
