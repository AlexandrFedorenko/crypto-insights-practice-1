"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/lib/contentful/types";

interface BlogListProps {
    posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
    const [view, setView] = useState<"grid" | "list">("grid");

    if (posts.length === 0) {
        return (
            <div className="text-center py-20 text-muted-foreground">
                No posts found.
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-end">
                <div className="bg-muted p-1 rounded-lg flex gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setView("grid")}
                        className={cn(
                            "h-8 w-8 p-0",
                            view === "grid" && "bg-background shadow-sm text-foreground"
                        )}
                    >
                        <LayoutGrid className="h-4 w-4" />
                        <span className="sr-only">Grid View</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setView("list")}
                        className={cn(
                            "h-8 w-8 p-0",
                            view === "list" && "bg-background shadow-sm text-foreground"
                        )}
                    >
                        <List className="h-4 w-4" />
                        <span className="sr-only">List View</span>
                    </Button>
                </div>
            </div>

            <div className={cn(
                "grid gap-8",
                view === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 max-w-3xl mx-auto"
            )}>
                {posts.map((post) => (
                    <Link key={post.sys.id} href={`/blog/${post.slug}`} className="group h-full block">
                        <Card className={cn(
                            "h-full overflow-hidden border bg-card transition-colors hover:border-primary/50",
                            view === "list" && "flex flex-col md:flex-row h-auto"
                        )}>
                            {post.coverImage && (
                                <div className={cn(
                                    "relative overflow-hidden flex-shrink-0",
                                    view === "grid" ? "h-48 w-full" : "h-48 w-full md:w-64 md:h-auto"
                                )}>
                                    <Image
                                        src={post.coverImage.url}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            )}
                            <div className="flex flex-col flex-1">
                                <CardHeader>
                                    <div className="text-sm text-muted-foreground mb-2">
                                        {post.publishedDate && new Date(post.publishedDate).toLocaleDateString("en-US", {
                                            year: 'numeric', month: 'long', day: 'numeric'
                                        })}
                                    </div>
                                    <CardTitle className="line-clamp-2 text-xl group-hover:text-primary transition-colors">
                                        {post.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <p className="text-muted-foreground line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                </CardContent>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
