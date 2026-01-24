import { z } from 'zod';

export const CoinSchema = z.object({
    id: z.string(),
    symbol: z.string(),
    name: z.string(),
    image: z.string().optional(),
    current_price: z.number().nullable(),
    market_cap: z.number().nullable(),
    market_cap_rank: z.number().nullable(),
    price_change_percentage_24h: z.number().nullable(),
    high_24h: z.number().nullable(),
    low_24h: z.number().nullable(),
});

export const CoinDetailSchema = z.object({
    id: z.string(),
    symbol: z.string(),
    name: z.string(),
    description: z.object({
        en: z.string().optional(),
    }),
    image: z.object({
        large: z.string().optional(),
        small: z.string().optional(),
    }),
    links: z.object({
        homepage: z.array(z.string()).optional(),
        blockchain_site: z.array(z.string()).optional(),
    }),
    market_data: z.object({
        current_price: z.record(z.string(), z.number()).optional(),
        market_cap: z.record(z.string(), z.number()).optional(),
        price_change_percentage_24h: z.number().optional(),
        high_24h: z.record(z.string(), z.number()).optional(),
        low_24h: z.record(z.string(), z.number()).optional(),
        ath: z.record(z.string(), z.number()).optional(),
        atl: z.record(z.string(), z.number()).optional(),
        circulating_supply: z.number().optional(),
        total_supply: z.number().optional(),
    }),
    market_cap_rank: z.number().nullable().optional(),
});
export type CoinDetail = z.infer<typeof CoinDetailSchema>;

export const MarketResponseSchema = z.array(CoinSchema);

export type Coin = z.infer<typeof CoinSchema>;