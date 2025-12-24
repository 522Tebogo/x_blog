import Link from "next/link";
import { Tool } from "@/lib/types";

interface ToolCardProps {
    tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
    return (
        <Link href={`/tools/${tool.id}`}>
            <div className="glass rounded-2xl p-6 card-hover group h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 smooth-transition">
                        {tool.icon || '🔧'}
                    </div>
                    {tool.featured && (
                        <span className="px-3 py-1 bg-accent-500/20 text-accent-500 rounded-full text-xs font-semibold">
                            推荐
                        </span>
                    )}
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-primary-500 smooth-transition">
                    {tool.name}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 flex-1 line-clamp-3">
                    {tool.description}
                </p>

                {tool.tags && tool.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {tool.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 bg-primary-500/10 text-primary-500 rounded-lg text-xs"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </Link>
    );
}
