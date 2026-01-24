import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
    try {
        const secret = request.headers.get('x-contentful-webhook-secret');

       

        const tag = request.nextUrl.searchParams.get('tag') || 'contentful';

        console.log(`[Revalidate] Revalidating tag: ${tag}`);
        revalidateTag(tag, { expire: 0 });

        return NextResponse.json({ revalidated: true, now: Date.now() });
    } catch {
        return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
    }
}
