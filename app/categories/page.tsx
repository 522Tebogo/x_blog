import Link from "next/link";
import { getCategories, getTools } from "@/lib/dataService";
import { cookies } from "next/headers";

export default async function CategoriesPage() {
    const categories = await getCategories();
    const tools = await getTools();
    const cookieStore = cookies();
    const isAdmin = cookieStore.get('admin_session')?.value === 'true';

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                        所有分类
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        浏览和管理工具分类
                    </p>
                </div>
            </div>
            {isAdmin && (
                <Link
                    href="/categories/add"
                    className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-3 rounded-xl font-semibold smooth-transition hover:scale-105 hover:shadow-xl"
                >
                    ➕ 添加分类
                </Link>
            )}


            {
                categories.length === 0 ? (
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category) => {
                            const categoryToolCount = tools.filter(t => t.categoryId === category.id).length;

                            return (
                                <div
                                    key={category.id}
                                    className="glass rounded-2xl p-6 card-hover group"
                                >
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 smooth-transition">
                                            {category.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-500 smooth-transition">
                                                {category.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {categoryToolCount} 个工具
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground mb-4">
                                        {category.description}
                                    </p>

                                    <Link
                                        href={`/?category=${category.id}`}
                                        className="inline-block text-primary-500 font-semibold smooth-transition hover:underline"
                                    >
                                        查看工具 →
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                )
            }
        </div >
    );
}
