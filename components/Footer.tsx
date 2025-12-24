export default function Footer() {
    return (
        <footer className="glass border-t border-border/40 mt-20">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                            <span className="text-xl">🚀</span>
                        </div>
                        <span className="font-semibold">X_Blog</span>
                    </div>

                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} X_Blog. 发现最好的工具资源.
                    </p>

                    <div className="flex gap-4 text-sm">
                        <a href="#" className="smooth-transition hover:text-primary-500">关于</a>
                        <a href="#" className="smooth-transition hover:text-primary-500">联系</a>
                        <a href="#" className="smooth-transition hover:text-primary-500">GitHub</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
