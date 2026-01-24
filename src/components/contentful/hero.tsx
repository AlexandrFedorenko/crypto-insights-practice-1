import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Hero } from '@/lib/contentful/types';

interface HeroSectionProps {
    data: Hero;
}

export function HeroSection({ data }: HeroSectionProps) {
    return (
        <section className="container mx-auto px-4 md:px-0 py-20 md:py-32 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter loading-tight">
                    {data.headline}
                </h1>
                <p className="text-xl text-muted-foreground">
                    {data.subheadline}
                </p>
                {data.ctaUrl && (
                    <Button size="lg" asChild>
                        <Link href={data.ctaUrl}>{data.ctaText || "Get Started"}</Link>
                    </Button>
                )}
            </div>
            {data.image && (
                <div className="flex-1 relative h-[300px] md:h-[500px] w-full">
                    <Image
                        src={data.image.url}
                        alt={data.image.description || data.headline}
                        fill
                        className="object-cover rounded-2xl shadow-2xl"
                        priority
                    />
                </div>
            )}
        </section>
    );
}
