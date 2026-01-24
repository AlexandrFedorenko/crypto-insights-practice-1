"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSettingsStore } from "@/lib/store/settings.store"

import { useUiStore } from "@/lib/store/ui.store"

export function MarketToolbar() {
    const { limit, setLimit, currency, setCurrency } = useSettingsStore()
    const { searchQuery, setSearchQuery } = useUiStore()

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-72">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search coins..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-[80px] uppercase">
                            {currency}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setCurrency("usd")}>USD</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setCurrency("eur")}>EUR</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setCurrency("uah")}>UAH</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-[100px]">
                            Top {limit}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setLimit(50)}>Top 50</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setLimit(100)}>Top 100</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setLimit(250)}>Top 250</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
