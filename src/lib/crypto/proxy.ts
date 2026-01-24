import { NextResponse } from 'next/server';

const COINGECKO_API_URL = process.env.COINGECKO_API_URL || 'https://api.coingecko.com/api/v3';

export async function proxyRequest(endpoint: string) {
    try {
        const url = `${COINGECKO_API_URL}${endpoint}`;

        const res = await fetch(url, {
            headers: { 'Accept': 'application/json' },
            next: { revalidate: 60 }
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(JSON.stringify({ status: res.status, message: errorText }));
        }

        const data = await res.json();
        return NextResponse.json(data);

    } catch (error: unknown) {
        console.error(`[Proxy] Error fetching ${endpoint}:`, error);

        let status = 500;
        let message = 'Failed to fetch data';

        if (error instanceof Error) {
            try {
                const parsed = JSON.parse(error.message);
                if (parsed.status) status = parsed.status;
                if (parsed.message) message = parsed.message;
            } catch {
                message = error.message || message;
                if (message.includes('429')) status = 429;
            }
        }

        return NextResponse.json({ error: message }, { status });
    }
}
