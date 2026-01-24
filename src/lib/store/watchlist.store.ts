import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WatchlistState {
    watchlistIds: string[];
    addToWatchlist: (id: string) => void;
    removeFromWatchlist: (id: string) => void;
    toggleWatchlist: (id: string) => void;
    isInWatchlist: (id: string) => boolean;
}

export const useWatchlistStore = create<WatchlistState>()(
    persist(
        (set, get) => ({
            watchlistIds: [],

            addToWatchlist: (id) =>
                set((state) => ({ watchlistIds: [...state.watchlistIds, id] })),

            removeFromWatchlist: (id) =>
                set((state) => ({
                    watchlistIds: state.watchlistIds.filter((item) => item !== id)
                })),

            toggleWatchlist: (id) => {
                const { watchlistIds } = get();
                const exists = watchlistIds.includes(id);
                if (exists) {
                    set({ watchlistIds: watchlistIds.filter((item) => item !== id) });
                } else {
                    set({ watchlistIds: [...watchlistIds, id] });
                }
            },

            isInWatchlist: (id) => get().watchlistIds.includes(id),
        }),
        {
            name: 'crypto-watchlist',
        }
    )
);