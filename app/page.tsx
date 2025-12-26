import SearchBar from "@/components/SearchBar";
import ToolCard from "@/components/ToolCard";
import { getTools, getCategories } from "@/lib/dataService";
import Link from "next/link";
import { cookies } from "next/headers";

export default async function Home() {
    const tools = await getTools();
    const categories = await getCategories();
    const cookieStore = cookies();
    const isAdmin = cookieStore.get('admin_session')?.value === 'true';

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Hero Section */}
            <section className="text-center mb-16 animate-fade-in">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
                    发现最好的工具
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                    精选AI工具、福利羊毛和各种实用网站资源，助力您的工作与生活
                </p>
                <SearchBar />
            </section>

            {/* Quick Actions */}
            <section className="mb-16 flex flex-wrap gap-4 justify-center">
                {isAdmin && (
                    <>
                        <Link
                            href="/tools/add"
                            className="glass px-8 py-4 rounded-2xl font-semibold smooth-transition hover:scale-105 hover:shadow-xl"
                        >
                            ➕ 添加工具
                        </Link>
                        <Link
                            href="/categories/add"
                            className="glass px-8 py-4 rounded-2xl font-semibold smooth-transition hover:scale-105 hover:shadow-xl"
                        >
                            📁 添加分类
                        </Link>
                    </>
                )}
                <Link
                    href="/categories"
                    className="glass px-8 py-4 rounded-2xl font-semibold smooth-transition hover:scale-105 hover:shadow-xl"
                >
                    🗂️ 浏览分类
                </Link>
            </section>

            {/* Categories and Tools */}
            {categories.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-2xl text-muted-foreground mb-6">还没有任何分类</p>
                    {isAdmin && (
                        <Link
                            href="/categories/add"
                            className="inline-block bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-4 rounded-2xl font-semibold smooth-transition hover:scale-105 hover:shadow-xl"
                        >
                            创建第一个分类
                        </Link>
                    )}
                </div>
            ) : (
                categories.map((category) => {
                    const categoryTools = tools.filter(tool => tool.categoryId === category.id);

                    if (categoryTools.length === 0) return null;

                    return (
                        <section key={category.id} className="mb-16 animate-slide-up">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                                    <span className="text-4xl">{category.icon}</span>
                                    {category.name}
                                </h2>
                                <span className="text-muted-foreground">
                                    {categoryTools.length} 个工具
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {categoryTools.map((tool) => (
                                    <ToolCard key={tool.id} tool={tool} />
                                ))}
                            </div>
                        </section>
                    );
                })
            )}

            {/* Empty State */}
            {tools.length === 0 && categories.length > 0 && isAdmin && (
                <div className="text-center py-20">
                    <p className="text-2xl text-muted-foreground mb-6">还没有任何工具</p>
                    <Link
                        href="/tools/add"
                        className="inline-block bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-4 rounded-2xl font-semibold smooth-transition hover:scale-105 hover:shadow-xl"
                    >
                        添加第一个工具
                    </Link>
                </div>
            )}
        </div>
    );
}
