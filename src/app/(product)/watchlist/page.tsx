"use client";

import { MarketTable } from "@/components/market/market-table";
import { useWatchlistData } from "@/lib/crypto/queries";
import { useWatchlistStore } from "@/lib/store/watchlist.store";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function WatchlistPage() {
    const { watchlistIds } = useWatchlistStore();
    const { data: coins, isLoading, isError } = useWatchlistData(watchlistIds);

    return (
        <main className="container mx-auto py-10 space-y-8 px-4 md:px-0">
            <div className="flex flex-col space-y-4">
                <Button variant="ghost" asChild className="self-start pl-0 hover:pl-2 transition-all">
                    <Link href="/market" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="w-4 h-4" /> Back to Market
                    </Link>
                </Button>

                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Your Watchlist</h1>
                    <p className="text-muted-foreground">
                        Track your favorite coins in one place.
                    </p>
                </div>
            </div>

            {watchlistIds.length === 0 ? (
                <div className="text-center py-20 border rounded-lg bg-card text-muted-foreground">
                    <p>Your watchlist is empty.</p>
                    <Button variant="link" asChild className="mt-2">
                        <Link href="/market">Browse Market</Link>
                    </Button>
                </div>
            ) : (
                <MarketTable
                    data={coins}
                    isLoading={isLoading}
                    isError={isError}
                />
            )}
        </main>
    );
}
