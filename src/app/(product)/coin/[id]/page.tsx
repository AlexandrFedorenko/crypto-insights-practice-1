"use client"

import { use, useMemo } from "react";
import { useCoinDetails } from "@/lib/crypto/queries";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Globe, Star } from "lucide-react";
import Link from "next/link";
import { useSettingsStore } from "@/lib/store/settings.store";
import { useWatchlistStore } from "@/lib/store/watchlist.store";
import { cn } from "@/lib/utils";
import { CoinChart } from "@/components/market/coin-chart";
import { CoinSkeleton } from "@/components/market/coin-skeleton";

export default function CoinPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { data: coin, isLoading, isError } = useCoinDetails(id);
    const currency = useSettingsStore(s => s.currency);
    const { toggleWatchlist, isInWatchlist } = useWatchlistStore();

    const formatCurrency = (val: number | undefined | null) => {
        if (val === undefined || val === null) return "N/A";
        return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(val);
    };

    const formatCompact = (val: number | undefined | null) => {
        if (val === undefined || val === null) return "N/A";
        return new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(val);
    }

    // Calculate price percentage for range bar
    const pricePosition = useMemo(() => {
        if (!coin?.market_data) return 0;
        const current = coin.market_data.current_price?.[currency] || 0;
        const low = coin.market_data.low_24h?.[currency] || 0;
        const high = coin.market_data.high_24h?.[currency] || 0;

        if (high === low) return 50;
        const range = high - low;
        const pos = ((current - low) / range) * 100;
        return Math.min(Math.max(pos, 0), 100);
    }, [coin, currency]);

    if (isLoading) return <CoinSkeleton />;
    if (isError || !coin) return <div className="container py-10 text-red-500">Failed to load coin details</div>;

    const inWatchlist = isInWatchlist(coin.id);

    return (
        <main className="container mx-auto py-10 px-4 md:px-0 space-y-8">
            
            <Button variant="ghost" asChild className="pl-0 hover:pl-2 transition-all">
                <Link href="/market" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="w-4 h-4" /> Back to Market
                </Link>
            </Button>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                    {coin.image.large && <img src={coin.image.large} alt={coin.name} className="w-16 h-16 rounded-full" />}
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl font-bold">{coin.name}</h1>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleWatchlist(coin.id)}
                            >
                                <Star className={cn("w-6 h-6", inWatchlist ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground")} />
                            </Button>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-base uppercase">{coin.symbol}</Badge>
                            <Badge variant="secondary">Rank #{coin.market_cap_rank ?? 'N/A'}</Badge>
                        </div>
                    </div>
                </div>

                <div className="text-left md:text-right">
                    <div className="text-3xl font-mono font-bold">
                        {formatCurrency(coin.market_data.current_price?.[currency])}
                    </div>
                    <div className={`text-lg font-medium ${coin.market_data.price_change_percentage_24h && coin.market_data.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {coin.market_data.price_change_percentage_24h?.toFixed(2)}% (24h)
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-8">
                    <CoinChart coinId={coin.id} />

                    <div className="prose dark:prose-invert max-w-none">
                        <h3 className="text-xl font-semibold mb-2">About {coin.name}</h3>
                        <div dangerouslySetInnerHTML={{ __html: coin.description.en || 'No description available.' }} />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm space-y-6">
                        <h3 className="font-semibold text-lg border-b pb-2">Market Stats</h3>

                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Market Cap</span>
                            <span className="font-mono">{new Intl.NumberFormat('en-US', { style: 'currency', currency, notation: "compact" }).format(coin.market_data.market_cap?.[currency] || 0)}</span>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>24h Low</span>
                                <span>24h High</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden relative">
                                <div
                                    className="absolute top-0 bottom-0 left-0 bg-primary transition-all duration-500"
                                    style={{ width: `${pricePosition}%` }}
                                />
                            </div>
                            <div className="flex justify-between font-mono text-xs">
                                <span>{formatCurrency(coin.market_data.low_24h?.[currency])}</span>
                                <span>{formatCurrency(coin.market_data.high_24h?.[currency])}</span>
                            </div>
                        </div>

                        <div className="space-y-3 pt-4 border-t">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">All-Time High</span>
                                <div className="text-right">
                                    <div className="font-mono">{formatCurrency(coin.market_data.ath?.[currency])}</div>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">All-Time Low</span>
                                <div className="text-right">
                                    <div className="font-mono">{formatCurrency(coin.market_data.atl?.[currency])}</div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 pt-4 border-t">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Circulating Supply</span>
                                <span className="font-mono">{formatCompact(coin.market_data.circulating_supply)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Total Supply</span>
                                <span className="font-mono">{formatCompact(coin.market_data.total_supply)}</span>
                            </div>
                        </div>

                        {coin.links.homepage && coin.links.homepage[0] && (
                            <Button variant="outline" className="w-full mt-4" asChild>
                                <a href={coin.links.homepage[0]} target="_blank" rel="noopener noreferrer">
                                    <Globe className="w-4 h-4 mr-2" /> Official Website
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}