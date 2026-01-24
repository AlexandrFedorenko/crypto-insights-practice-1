import { proxyRequest } from '@/lib/crypto/proxy';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const endpoint = `/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;

    return proxyRequest(endpoint);
}