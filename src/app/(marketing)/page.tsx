import { fetchGraphQL } from "@/lib/contentful/client";
import { PAGE_QUERY } from "@/lib/contentful/queries";
import { BlockRenderer } from "@/components/contentful/block-renderer";
import { ContentBlock } from "@/lib/contentful/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from 'next';

async function getPageData(slug: string) {
    const data = await fetchGraphQL(PAGE_QUERY, { slug });
    return data?.landingCollection?.items?.[0];
}

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPageData("home");
    return {
        title: page?.title || "Crypto Insights - Market Analysis & Education",
        description: "Real-time cryptocurrency market data, educational resources, and expert insights.",
        openGraph: {
            title: page?.title || "Crypto Insights",
            description: "Real-time cryptocurrency market data, educational resources, and expert insights.",
            type: 'website',
        }
    };
}

export default async function MarketingPage() {
    const page = await getPageData("home");

    if (!page) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-4">
                <div className="max-w-2xl w-full text-center space-y-6">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                            Welcome to Crypto Insights
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Your gateway to understanding cryptocurrency markets
                        </p>
                    </div>

                    <div className="bg-muted/50 border rounded-lg p-6 space-y-4 text-left">
                        <h2 className="text-xl font-semibold">🚀 Getting Started</h2>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <p>
                                To enable the marketing content, configure Contentful CMS:
                            </p>
                            <ol className="list-decimal list-inside space-y-1 ml-2">
                                <li>Create a <code className="bg-background px-1.5 py-0.5 rounded text-xs">Page Landing</code> content type in Contentful</li>
                                <li>Add a page with slug <code className="bg-background px-1.5 py-0.5 rounded text-xs">home</code></li>
                                <li>Set up your environment variables with valid API tokens</li>
                            </ol>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Button asChild size="lg">
                            <Link href="/market">Explore Markets</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                            <Link href="/blog">Read Blog</Link>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            {page.sectionsCollection?.items?.map((section: ContentBlock, index: number) => (
                <div key={section.sys?.id || `section-${index}`}>
                    <BlockRenderer block={section} />
                </div>
            ))}
        </div>
    );
}
