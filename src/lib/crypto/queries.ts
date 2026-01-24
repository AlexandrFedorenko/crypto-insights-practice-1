import { useQuery } from '@tanstack/react-query';
import { cryptoClient } from './client';
import { useSettingsStore } from '@/lib/store/settings.store';

export const useMarketData = () => {
    const { currency, limit } = useSettingsStore();

    return useQuery({
        queryKey: ['market', currency, limit],
        queryFn: () => cryptoClient.getMarkets({ currency, limit }),
    });
}

export const useWatchlistData = (ids: string[]) => {
    const { currency } = useSettingsStore();

    return useQuery({
        queryKey: ['watchlist', currency, ids],
        queryFn: () => cryptoClient.getMarkets({ currency, limit: 50, ids }),
        enabled: ids.length > 0,
    });
}

export const useCoinDetails = (id: string) => {
    return useQuery({
        queryKey: ['coin', id],
        queryFn: () => cryptoClient.getCoinDetail(id),
        enabled: !!id,
    });
}

export const useCoinMarketChart = (id: string, days: string) => {
    const { currency } = useSettingsStore();
    return useQuery({
        queryKey: ['coin-chart', id, days, currency],
        queryFn: () => cryptoClient.getMarketChart(id, days, currency),
        enabled: !!id,
        staleTime: 1000 * 60 * 5, // 5 minutes cache
    });
}