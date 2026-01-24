import { Document } from '@contentful/rich-text-types';

export interface ContentfulSys {
    id: string;
}

export interface ContentfulImage {
    url: string;
    width: number;
    height: number;
    description?: string;
}

export interface Hero {
    __typename: 'Hero';
    sys: ContentfulSys;
    headline: string;
    subheadline: string;
    image?: ContentfulImage;
    ctaText?: string;
    ctaUrl?: string;
}

export interface BlogPost {
    __typename: 'BlogPost';
    sys: ContentfulSys;
    title: string;
    slug: string;
    excerpt: string;
    publishedDate: string;
    views?: number;
    coverImage?: ContentfulImage;
    content?: {
        json: Document;
    };
}

export interface RichText {
    __typename: 'ContentTypeRichText';
    sys: ContentfulSys;
    content: {
        json: Document;
        links?: {
            entries?: {
                block?: any[];
                inline?: any[];
            };
            assets?: {
                block?: any[];
            };
        };
    };
}

export type ContentBlock = Hero | BlogPost | RichText;

export interface PageData {
    landingCollection: {
        items: {
            title: string;
            slug: string;
            sectionsCollection: {
                items: ContentBlock[];
            };
        }[];
    };
    blogPostCollection?: {
        items: BlogPost[];
    };
}
