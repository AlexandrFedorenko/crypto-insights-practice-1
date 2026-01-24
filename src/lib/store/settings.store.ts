import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
    currency: 'usd' | 'eur' | 'uah';
    limit: 50 | 100 | 250;
    setCurrency: (currency: 'usd' | 'eur' | 'uah') => void;
    setLimit: (limit: 50 | 100 | 250) => void;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            currency: 'usd',
            limit: 50,
            setCurrency: (currency) => set({ currency }),
            setLimit: (limit) => set({ limit }),
        }),
        {
            name: 'crypto-settings',
        }
    )
);