import { MarketResponseSchema, Coin, CoinDetailSchema, CoinDetail } from './schemas';

interface MarketParams {
    currency: string;
    limit: number;
    ids?: string[];
}

export const cryptoClient = {
    getMarkets: async ({ currency, limit, ids }: MarketParams): Promise<Coin[]> => {
        const params = new URLSearchParams({
            currency,
            limit: limit.toString(),
        });

        if (ids && ids.length > 0) {
            params.append('ids', ids.join(','));
        }

        try {
            const res = await fetch(`/api/market?${params}`); 

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                const errorMessage = errorData.error || `Error ${res.status}`;
                throw new Error(errorMessage);
            }

            const data = await res.json();
            return MarketResponseSchema.parse(data);
        } catch (error) {
            console.error('Crypto API Error:', error);
            throw error;
        }
    },
    getCoinDetail: async (id: string): Promise<CoinDetail> => {
        try {
            const res = await fetch(`/api/coin/${id}`);

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                const errorMessage = errorData.error || `Error ${res.status}`;
                throw new Error(errorMessage);
            }

            const data = await res.json();
            return CoinDetailSchema.parse(data);
        } catch (error) {
            console.error(`Error fetching coin ${id}:`, error);
            throw error;
        }
    },
    getMarketChart: async (id: string, days: string, currency: string) => {
        const params = new URLSearchParams({ days, vs_currency: currency });
        const res = await fetch(`/api/coin/${id}/market_chart?${params}`);
        if (!res.ok) throw new Error('Failed to fetch chart data');
        return res.json();
    }
};