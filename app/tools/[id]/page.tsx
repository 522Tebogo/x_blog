import { getToolById, getCategoryById, getTools } from "@/lib/dataService";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
    const tools = await getTools();

    return tools.map((tool) => ({
        id: tool.id,
    }));
}

export default async function ToolDetailPage({ params }: { params: { id: string } }) {
    const tool = await getToolById(params.id);

    if (!tool) {
        notFound();
    }

    const category = await getCategoryById(tool.categoryId);

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary-500 smooth-transition mb-8"
            >
                ← 返回首页
            </Link>

            <div className="glass rounded-3xl p-8 md:p-12">
                <div className="flex items-start gap-6 mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">
                        {tool.icon || '🔧'}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                                {tool.name}
                            </h1>
                            {tool.featured && (
                                <span className="px-4 py-2 bg-accent-500/20 text-accent-500 rounded-full text-sm font-semibold">
                                    推荐
                                </span>
                            )}
                        </div>
                        {category && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <span className="text-xl">{category.icon}</span>
                                <span>{category.name}</span>
                            </div>
                        )}
                    </div>
                </div>

                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {tool.description}
                </p>

                {tool.tags && tool.tags.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-8">
                        {tool.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-4 py-2 bg-primary-500/10 text-primary-500 rounded-xl font-medium"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-4 rounded-2xl font-semibold smooth-transition hover:scale-105 hover:shadow-2xl"
                >
                    访问工具
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>

                <div className="mt-8 pt-8 border-t border-border/40 text-sm text-muted-foreground">
                    添加时间: {new Date(tool.createdAt).toLocaleDateString('zh-CN')}
                </div>
            </div>
        </div>
    );
}
