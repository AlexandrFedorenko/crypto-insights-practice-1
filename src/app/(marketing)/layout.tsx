import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col font-sans">
            <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-0">
                    <Link href="/" className="font-bold text-2xl tracking-tighter">
                        Crypto Insights
                    </Link>

                    <nav className="flex items-center gap-6">
                        <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            Home
                        </Link>
                        <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            Blog
                        </Link>
                        <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            Contact
                        </Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <Button asChild>
                            <Link href="/market">Launch App</Link>
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {children}
            </main>

            <footer className="border-t py-8 md:py-10">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-0 text-sm text-muted-foreground gap-4">
                    <p>&copy; {new Date().getFullYear()} Crypto Insights. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
                        <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
