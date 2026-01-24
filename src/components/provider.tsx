'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
    // Создаем queryClient один раз при инициализации
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                // Данные считаются "несвежими" через 1 минуту (оптимизация)
                staleTime: 60 * 1000,
            },
        },
    }));

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                {children}
            </ThemeProvider>
            {/* Инструменты разработчика для React Query (видны только в dev режиме) */}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}