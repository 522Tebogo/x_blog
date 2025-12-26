import type { Metadata } from "next";
import { Inter, Outfit, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";

const inter = Inter({
    subsets: ["latin"],
    variable: '--font-inter',
    display: 'swap',
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: '--font-outfit',
    display: 'swap',
});

const poppins = Poppins({
    subsets: ["latin"],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-poppins',
    display: 'swap',
});

export const metadata: Metadata = {
    title: "X_Blog - 工具收集网站",
    description: "发现最好的AI工具、福利羊毛和各种实用网站资源",
    keywords: ["工具", "AI工具", "福利", "羊毛", "资源导航"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-CN" suppressHydrationWarning>
            <body className={`${inter.variable} ${outfit.variable} ${poppins.variable} font-inter antialiased`}>
                <ThemeProvider>
                    <div className="min-h-screen flex flex-col">
                        <Header isAdmin={cookies().get('admin_session')?.value === 'true'} />
                        <main className="flex-1">
                            {children}
                        </main>
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
