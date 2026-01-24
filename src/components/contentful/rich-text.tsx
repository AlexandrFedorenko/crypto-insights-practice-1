import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES, Node } from '@contentful/rich-text-types';
import Link from 'next/link';
import Image from 'next/image';
import { RichText as RichTextType } from '@/lib/contentful/types';
import React, { ReactNode } from 'react';
import { createLinksMap, resolveNodeData } from '@/lib/contentful/rich-text-utils';

export const richTextOptions = {
    renderMark: {
        [MARKS.BOLD]: (text: ReactNode) => <span className="font-bold text-foreground">{text}</span>,
        [MARKS.ITALIC]: (text: ReactNode) => <span className="italic">{text}</span>,
        [MARKS.UNDERLINE]: (text: ReactNode) => <span className="underline decoration-primary decoration-2 underline-offset-4">{text}</span>,
        [MARKS.CODE]: (text: ReactNode) => <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary">{text}</code>,
    },
    renderNode: {
        [BLOCKS.HEADING_1]: (node: Node, children: ReactNode) => <h1 className="text-4xl font-bold tracking-tight mt-10 mb-6">{children}</h1>,
        [BLOCKS.HEADING_2]: (node: Node, children: ReactNode) => <h2 className="text-3xl font-bold tracking-tight mt-10 mb-6 border-b pb-2">{children}</h2>,
        [BLOCKS.HEADING_3]: (node: Node, children: ReactNode) => <h3 className="text-2xl font-semibold tracking-tight mt-8 mb-4">{children}</h3>,
        [BLOCKS.HEADING_4]: (node: Node, children: ReactNode) => <h4 className="text-xl font-semibold tracking-tight mt-6 mb-4">{children}</h4>,
        [BLOCKS.HEADING_5]: (node: Node, children: ReactNode) => <h5 className="text-lg font-semibold tracking-tight mt-6 mb-4">{children}</h5>,
        [BLOCKS.HEADING_6]: (node: Node, children: ReactNode) => <h6 className="text-base font-semibold tracking-tight mt-6 mb-4 uppercase text-muted-foreground">{children}</h6>,

        [BLOCKS.PARAGRAPH]: (node: Node, children: ReactNode) => <p className="leading-8 [&:not(:first-child)]:mt-8 text-muted-foreground">{children}</p>,

        [BLOCKS.UL_LIST]: (node: Node, children: ReactNode) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>,
        [BLOCKS.OL_LIST]: (node: Node, children: ReactNode) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>,
        [BLOCKS.LIST_ITEM]: (node: Node, children: ReactNode) => <li className="pl-2">{children}</li>,

        [BLOCKS.QUOTE]: (node: Node, children: ReactNode) => <blockquote className="mt-6 border-l-4 border-primary pl-6 italic text-muted-foreground bg-muted/20 py-2 rounded-r">{children}</blockquote>,
        [BLOCKS.HR]: () => <hr className="my-10 border-border" />,

        // Links
        [INLINES.HYPERLINK]: (node: Node, children: ReactNode) => {
            const url = node.data.uri;
            const isExternal = url.startsWith('http');
            return (
                <Link
                    href={url}
                    target={isExternal ? '_blank' : '_self'}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="font-medium text-primary underline underline-offset-4 hover:no-underline transition-colors"
                >
                    {children}
                </Link>
            );
        },

        // Tables
        [BLOCKS.TABLE]: (node: Node, children: ReactNode) => {
            const rows = (node as any).content || [];
            const hasHeaderRow = rows.length > 0 && rows[0].content?.some(
                (cell: any) => cell.nodeType === BLOCKS.TABLE_HEADER_CELL
            );

            return (
                <div className="my-6 w-full overflow-y-auto rounded-lg border">
                    <table className="w-full text-sm">
                        {hasHeaderRow && (
                            <thead>
                                {documentToReactComponents(rows[0], richTextOptions)}
                            </thead>
                        )}
                        <tbody>
                            {rows.slice(hasHeaderRow ? 1 : 0).map((row: any, idx: number) => (
                                <tr key={idx} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted last:border-0">
                                    {row.content.map((cell: any, cellIdx: number) => (
                                        <React.Fragment key={cellIdx}>
                                            {documentToReactComponents(cell, richTextOptions)}
                                        </React.Fragment>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        },
        [BLOCKS.TABLE_ROW]: (node: Node, children: ReactNode) => (
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted last:border-0">{children}</tr>
        ),
        [BLOCKS.TABLE_HEADER_CELL]: (node: Node, children: ReactNode) => (
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground bg-muted/50 [&:has([role=checkbox])]:pr-0">{children}</th>
        ),
        [BLOCKS.TABLE_CELL]: (node: Node, children: ReactNode) => (
            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{children}</td>
        ),

        // Embedded Assets (Images)
        [BLOCKS.EMBEDDED_ASSET]: (node: Node) => {
            const fields = node.data.target?.fields;
            if (!fields) return null;

            const { title, description, file } = fields;
            const mimeType = file?.contentType;
            const url = file?.url;

            if (mimeType && mimeType.includes('image') && url) {
                return (
                    <div className="my-8 relative w-full h-[400px] rounded-lg overflow-hidden">
                        <Image
                            src={`https:${url}`}
                            alt={description || title || 'Content Image'}
                            fill
                            className="object-contain"
                        />
                    </div>
                )
            }
            return null;
        },

        // Embedded Entries (References to other content)
        [BLOCKS.EMBEDDED_ENTRY]: (node: Node) => {
            const entry = (node as any).data?.target;
            if (!entry) return null;

            const contentType = entry.sys?.contentType?.sys?.id;

            if (contentType === 'blogPost') {
                return (
                    <div className="my-8 p-6 border rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                        <div className="flex items-start gap-4">
                            {entry.fields?.coverImage?.fields?.file?.url && (
                                <div className="relative w-24 h-24 rounded overflow-hidden flex-shrink-0">
                                    <Image
                                        src={`https:${entry.fields.coverImage.fields.file.url}`}
                                        alt={entry.fields?.title || 'Blog post'}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <div className="flex-1">
                                <h4 className="font-semibold text-lg mb-2">{entry.fields?.title || 'Untitled'}</h4>
                                {entry.fields?.excerpt && (
                                    <p className="text-sm text-muted-foreground line-clamp-2">{entry.fields.excerpt}</p>
                                )}
                                {entry.fields?.slug && (
                                    <Link
                                        href={`/blog/${entry.fields.slug}`}
                                        className="text-sm text-primary hover:underline mt-2 inline-block"
                                    >
                                        Read more →
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                );
            }

            return (
                <div className="my-6 p-4 border-l-4 border-primary bg-muted/20 rounded">
                    <p className="text-sm text-muted-foreground">
                        📄 Embedded: {entry.fields?.title || entry.fields?.name || contentType || 'Unknown entry'}
                    </p>
                </div>
            );
        },

        // Inline Embedded Entries
        [INLINES.EMBEDDED_ENTRY]: (node: Node, children: ReactNode) => {
            const entry = (node as any).data?.target;
            if (!entry) return null;

            const title = entry.fields?.title || entry.fields?.name || 'entry';
            const slug = entry.fields?.slug;

            if (slug) {
                return (
                    <Link
                        href={`/blog/${slug}`}
                        className="font-medium text-primary underline underline-offset-4 hover:no-underline transition-colors"
                    >
                        {title}
                    </Link>
                );
            }

            return <span className="font-medium text-primary">{title}</span>;
        },
    }
};

interface RichTextSectionProps {
    data: RichTextType;
}

export function RichTextSection({ data }: RichTextSectionProps) {
    if (!data?.content?.json) return null;

    let renderOptions = richTextOptions;

    if (data.content.links) {
        const linksMap = createLinksMap(data.content.links);

        renderOptions = {
            ...richTextOptions,
            renderNode: {
                ...richTextOptions.renderNode,
                [BLOCKS.EMBEDDED_ASSET]: (node: Node) => {
                    const asset = resolveNodeData(node, linksMap);
                    if (!asset) return null;

                    const mimeType = asset.contentType;
                    const url = asset.url;

                    if (mimeType && mimeType.includes('image') && url) {
                        return (
                            <div className="my-8 relative w-full h-[400px] rounded-lg overflow-hidden">
                                <Image
                                    src={url.startsWith('http') ? url : `https:${url}`}
                                    alt={asset.description || asset.title || 'Content Image'}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        );
                    }
                    return null;
                },
                [BLOCKS.EMBEDDED_ENTRY]: (node: Node) => {
                    const entry = resolveNodeData(node, linksMap);
                    if (!entry) {
                        console.warn('Entry not found in links:', node.data?.target?.sys?.id);
                        return null;
                    }

                    const contentType = entry.__typename;

                    // Handle Blog Post
                    if (contentType === 'BlogPost') {
                        return (
                            <div className="my-8 p-6 border rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                                <div className="flex items-start gap-4">
                                    {entry.coverImage?.url && (
                                        <div className="relative w-24 h-24 rounded overflow-hidden flex-shrink-0">
                                            <Image
                                                src={entry.coverImage.url.startsWith('http') ? entry.coverImage.url : `https:${entry.coverImage.url}`}
                                                alt={entry.title || 'Blog post'}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-lg mb-2">{entry.title || 'Untitled'}</h4>
                                        {entry.excerpt && (
                                            <p className="text-sm text-muted-foreground line-clamp-2">{entry.excerpt}</p>
                                        )}
                                        {entry.slug && (
                                            <Link
                                                href={`/blog/${entry.slug}`}
                                                className="text-sm text-primary hover:underline mt-2 inline-block"
                                            >
                                                Read more →
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    // Handle Landing Page
                    if (contentType === 'Landing') {
                        return (
                            <div className="my-6 p-4 border-l-4 border-primary bg-muted/20 rounded">
                                <p className="text-sm font-medium">
                                    Page: {entry.title || 'Untitled'}
                                </p>
                                {entry.slug && (
                                    <Link
                                        href={`/${entry.slug}`}
                                        className="text-sm text-primary hover:underline mt-1 inline-block"
                                    >
                                        View page →
                                    </Link>
                                )}
                            </div>
                        );
                    }

                    // Fallback
                    return (
                        <div className="my-6 p-4 border-l-4 border-muted-foreground bg-muted/20 rounded">
                            <p className="text-sm text-muted-foreground">
                                Embedded: {entry.title || entry.name || contentType || 'Unknown entry'}
                            </p>
                        </div>
                    );
                },
                [INLINES.EMBEDDED_ENTRY]: (node: Node) => {
                    const entry = resolveNodeData(node, linksMap);
                    if (!entry) return null;

                    const title = entry.title || entry.name || 'entry';
                    const slug = entry.slug;

                    if (slug) {
                        return (
                            <Link
                                href={`/blog/${slug}`}
                                className="font-medium text-primary underline underline-offset-4 hover:no-underline transition-colors"
                            >
                                {title}
                            </Link>
                        );
                    }

                    return <span className="font-medium text-primary">{title}</span>;
                },
            },
        };
    }

    return (
        <section className="container mx-auto px-4 md:px-0 py-12 max-w-4xl">
            {documentToReactComponents(data.content.json, renderOptions)}
        </section>
    );
}
