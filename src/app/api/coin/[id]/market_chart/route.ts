import { proxyRequest } from '@/lib/crypto/proxy';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const days = searchParams.get('days') || '7';
    const vs_currency = searchParams.get('vs_currency') || 'usd';

    // Fetch market chart data
    const endpoint = `/coins/${id}/market_chart?vs_currency=${vs_currency}&days=${days}`;

    return proxyRequest(endpoint);
}
