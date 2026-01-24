import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/contentful/types';

interface BlogPostPreviewProps {
    data: BlogPost;
}

export function BlogPostPreview({ data }: BlogPostPreviewProps) {
    return (
        <section className="container mx-auto px-4 md:px-0 py-8">
            <Link href={`/blog/${data.slug}`} className="group block max-w-4xl mx-auto">
                <div className="border rounded-xl p-6 hover:border-primary/50 transition-colors flex flex-col md:flex-row gap-6 items-start">
                    {data.coverImage && (
                        <div className="relative w-full md:w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                            <Image
                                src={data.coverImage.url}
                                alt={data.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    )}
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                            {data.title}
                        </h3>
                        {data.publishedDate && (
                            <p className="text-sm text-muted-foreground">
                                {new Date(data.publishedDate).toLocaleDateString()}
                            </p>
                        )}
                        <p className="text-muted-foreground line-clamp-2">
                            {data.excerpt}
                        </p>
                    </div>
                </div>
            </Link>
        </section>
    );
}
