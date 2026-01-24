import { MarketTable } from "@/components/market/market-table";
import { MarketToolbar } from "@/components/market/market-toolbar";

export default function MarketPage() {
    return (
        <main className="container mx-auto py-10 space-y-8 px-4 md:px-0">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Market Overview</h1>
                    <p className="text-muted-foreground">
                        Live prices from CoinGecko API.
                    </p>
                </div>
            </div>

            <MarketToolbar />

            <MarketTable />
        </main>
    )
}