"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useWatchlistStore } from "@/lib/store/watchlist.store";
import { useUiStore } from "@/lib/store/ui.store";
import { useMemo, useCallback, memo } from "react";
import { useSettingsStore } from "@/lib/store/settings.store";
import { cn } from "@/lib/utils";
import { useMarketData } from "@/lib/crypto/queries";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Coin } from "@/lib/crypto/schemas";

interface MarketTableProps {
    data?: Coin[];
    isLoading?: boolean;
    isError?: boolean;
}

interface MarketRowProps {
    coin: Coin;
    currency: string;
    isWatched: boolean;
    onToggle: (id: string) => void;
    onRowClick: (id: string) => void;
}

const MarketRow = memo(({ coin, currency, isWatched, onToggle, onRowClick }: MarketRowProps) => {
    return (
        <TableRow
            className="cursor-pointer hover:bg-muted/50"
            onClick={() => onRowClick(coin.id)}
        >
            <TableCell className="text-center">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggle(coin.id);
                    }}
                >
                    <Star
                        className={cn(
                            "h-4 w-4",
                            isWatched ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                        )}
                    />
                </Button>
            </TableCell>
            <TableCell className="font-medium flex items-center gap-2">
                {coin.image && (
                    <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0">
                        <Image
                            src={coin.image}
                            alt={coin.name}
                            fill
                            className="object-cover"
                            sizes="24px"
                        />
                    </div>
                )}
                {coin.name}
                <span className="text-muted-foreground uppercase text-xs">{coin.symbol}</span>
            </TableCell>
            <TableCell className="text-right">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(coin.current_price || 0)}
            </TableCell>
            <TableCell className="text-right">
                <Badge variant={coin.price_change_percentage_24h && coin.price_change_percentage_24h > 0 ? "default" : "destructive"}>
                    {coin.price_change_percentage_24h?.toFixed(2)}%
                </Badge>
            </TableCell>
            <TableCell className="text-right hidden md:table-cell">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency, notation: "compact" }).format(coin.market_cap || 0)}
            </TableCell>
        </TableRow>
    );
});
MarketRow.displayName = "MarketRow";

export function MarketTable({
    data: externalData,
    isLoading: externalIsLoading,
    isError: externalIsError
}: MarketTableProps = {}) {
    const router = useRouter();
    const marketQuery = useMarketData();
    const coins = externalData ?? marketQuery.data;
    const isLoading = externalIsLoading ?? marketQuery.isLoading;
    const isError = externalIsError ?? marketQuery.isError;
    const { toggleWatchlist, isInWatchlist } = useWatchlistStore();
    const currency = useSettingsStore(s => s.currency);
    const searchQuery = useUiStore(s => s.searchQuery);

    const filteredCoins = useMemo(() => {
        if (!coins) return [];
        return coins.filter(coin =>
            coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [coins, searchQuery]);

    const handleRowClick = useCallback((id: string) => {
        router.push(`/coin/${id}`);
    }, [router]);

    const handleToggle = useCallback((id: string) => {
        toggleWatchlist(id);
    }, [toggleWatchlist]);

    if (isError) {
        return <div className="text-red-500 font-medium p-4">Error loading market data</div>;
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px] text-center">★</TableHead>
                        <TableHead>Coin</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">24h Change</TableHead>
                        <TableHead className="text-right hidden md:table-cell">Market Cap</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        Array.from({ length: 10 }).map((_, i) => (
                            <TableRow key={i}>
                                <TableCell className="text-center"><Skeleton className="h-8 w-8 rounded-full mx-auto" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-[50px]" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                            </TableRow>
                        ))
                    ) : (
                        filteredCoins.map((coin) => (
                            <MarketRow
                                key={coin.id}
                                coin={coin}
                                currency={currency}
                                isWatched={isInWatchlist(coin.id)}
                                onToggle={handleToggle}
                                onRowClick={handleRowClick}
                            />
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}