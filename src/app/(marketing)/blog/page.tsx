import { BlogList } from "@/components/blog/blog-list";
import { fetchGraphQL } from "@/lib/contentful/client";
import { BLOG_POSTS_QUERY } from "@/lib/contentful/queries";

async function getBlogPosts() {
    const data = await fetchGraphQL(BLOG_POSTS_QUERY);
    return data?.blogPostCollection?.items || [];
}

export default async function BlogPage() {
    const posts = await getBlogPosts();

    return (
        <div className="container mx-auto py-20 px-4 md:px-0 space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter">Latest Updates</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    News and insights from the Crypto world.
                </p>
            </div>

            <BlogList posts={posts} />
        </div>
    );
}
