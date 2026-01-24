"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { LineChart, Star, Menu } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
    const pathname = usePathname();

    const routes = [
        {
            href: "/market",
            label: "Market",
            icon: LineChart,
            active: pathname === "/market" || pathname.startsWith("/coin"),
        },
        {
            href: "/watchlist",
            label: "Watchlist",
            icon: Star,
            active: pathname === "/watchlist",
        },
    ];

    return (
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-0">
                <div className="flex items-center gap-6">
                    
                    <div className="md:hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="w-5 h-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                {routes.map((route) => (
                                    <DropdownMenuItem key={route.href} asChild>
                                        <Link
                                            href={route.href}
                                            className={cn(
                                                "flex items-center gap-2 w-full",
                                                route.active ? "text-primary" : "text-muted-foreground"
                                            )}
                                        >
                                            <route.icon className="w-4 h-4" />
                                            {route.label}
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                        <span className="bg-gradient-to-tr from-primary to-primary/50 text-transparent bg-clip-text">
                            Crypto Insights
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-4">
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary flex items-center gap-2",
                                    route.active ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                <route.icon className="w-4 h-4" />
                                {route.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
