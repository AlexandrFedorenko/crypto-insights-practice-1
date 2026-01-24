import type { ComponentType } from 'react';
import { HeroSection } from './hero';
import { RichTextSection } from './rich-text';
import { BlogPostPreview } from './blog-post-preview';
import { ContentBlock } from '@/lib/contentful/types';

const COMPONENT_MAP: Record<string, ComponentType<any>> = {
    'Hero': HeroSection,
    'ContentTypeRichText': RichTextSection,
    'BlogPost': BlogPostPreview,
};

interface BlockRendererProps {
    block: ContentBlock;
}

export function BlockRenderer({ block }: BlockRendererProps) {
    const Component = COMPONENT_MAP[block.__typename as string];

    if (!Component) {
        console.warn(`No component found for block type: ${block.__typename}`);
        return null;
    }

    return <Component data={block} />;
}
