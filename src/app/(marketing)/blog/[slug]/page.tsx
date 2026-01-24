import { fetchGraphQL } from "@/lib/contentful/client";
import { BLOG_POST_BY_SLUG_QUERY } from "@/lib/contentful/queries";
import { RichTextSection } from "@/components/contentful/rich-text";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CommentForm } from "@/components/blog/comment-form";
import { ViewCounter } from "@/components/blog/view-counter";

async function getBlogPost(slug: string) {
    const data = await fetchGraphQL(BLOG_POST_BY_SLUG_QUERY, { slug });
    return data?.blogPostCollection?.items?.[0];
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        return (
            <div className="container mx-auto py-20 text-center">
                <h1 className="text-2xl font-bold">Post not found</h1>
                <Button asChild variant="link">
                    <Link href="/blog">Back to Blog</Link>
                </Button>
            </div>
        );
    }

    return (
        <article className="container mx-auto py-12 px-4 md:px-0 max-w-4xl">
            <Button variant="ghost" asChild className="mb-8 pl-0 hover:pl-2 transition-all">
                <Link href="/blog" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="w-4 h-4" /> Back to Blog
                </Link>
            </Button>

            <header className="space-y-6 mb-12 text-center">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    {post.publishedDate && (
                        <span>
                            {new Date(post.publishedDate).toLocaleDateString("en-US", {
                                year: 'numeric', month: 'long', day: 'numeric'
                            })}
                        </span>
                    )}
                    <ViewCounter entryId={post.sys.id} slug={post.slug} initialViews={post.views} />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                    {post.title}
                </h1>
            </header>

            {post.coverImage && (
                <div className="relative w-full h-[400px] md:h-[500px] mb-12 rounded-xl overflow-hidden shadow-lg">
                    <Image
                        src={post.coverImage.url}
                        alt={post.coverImage.description || post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            <div className="max-w-none mb-16">
                <RichTextSection data={{ content: post.content } as any} />
            </div>

            <CommentForm slug={slug} />
        </article>
    );
}
