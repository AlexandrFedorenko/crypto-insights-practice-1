import { proxyRequest } from '@/lib/crypto/proxy';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const currency = searchParams.get('currency') || 'usd';
    const limit = searchParams.get('limit') || '50';
    const ids = searchParams.get('ids');

    let endpoint = `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`;

    if (ids) {
        endpoint += `&ids=${ids}`;
    }

    return proxyRequest(endpoint);
}