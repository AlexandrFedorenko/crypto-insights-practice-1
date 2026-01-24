import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center space-y-8">
                <div className="relative">
                    <h1 className="text-[150px] md:text-[200px] font-bold tracking-tighter leading-none bg-gradient-to-br from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent animate-pulse">
                        404
                    </h1>
                    <div className="absolute inset-0 blur-3xl opacity-20 bg-gradient-to-br from-primary to-primary/60 -z-10" />
                </div>

                <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Page Not Found
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-md mx-auto">
                        Oops! The page you&apos;re looking for seems to have wandered off into the crypto void.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                    <Button asChild size="lg" className="gap-2">
                        <Link href="/">
                            <Home className="w-4 h-4" />
                            Go Home
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="gap-2">
                        <Link href="/market">
                            <Search className="w-4 h-4" />
                            Explore Markets
                        </Link>
                    </Button>
                </div>

                <div className="pt-8 border-t">
                    <p className="text-sm text-muted-foreground mb-4">
                        Popular pages:
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <Link
                            href="/market"
                            className="text-sm hover:text-primary transition-colors underline-offset-4 hover:underline"
                        >
                            Market Overview
                        </Link>
                        <span className="text-muted-foreground">•</span>
                        <Link
                            href="/watchlist"
                            className="text-sm hover:text-primary transition-colors underline-offset-4 hover:underline"
                        >
                            Watchlist
                        </Link>
                        <span className="text-muted-foreground">•</span>
                        <Link
                            href="/blog"
                            className="text-sm hover:text-primary transition-colors underline-offset-4 hover:underline"
                        >
                            Blog
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
