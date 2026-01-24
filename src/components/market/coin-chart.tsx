"use client";

import { useCoinMarketChart } from "@/lib/crypto/queries";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import { Button } from "../ui/button";
import { useSettingsStore } from "@/lib/store/settings.store";

interface CoinChartProps {
    coinId: string;
}

export function CoinChart({ coinId }: CoinChartProps) {
    const [days, setDays] = useState("7");
    const { data, isLoading } = useCoinMarketChart(coinId, days);
    const currency = useSettingsStore(s => s.currency);

    const chartData = data?.prices?.map(([timestamp, price]: [number, number]) => ({
        date: new Date(timestamp).toLocaleDateString(),
        fullDate: new Date(timestamp).toLocaleString(),
        price,
    })) || [];

    const ranges = [
        { label: "24h", value: "1" },
        { label: "7d", value: "7" },
        { label: "30d", value: "30" },
        { label: "90d", value: "90" },
        { label: "1y", value: "365" },
    ];

    if (isLoading) {
        return <Skeleton className="w-full h-[400px] rounded-lg" />;
    }

    const firstPrice = chartData[0]?.price || 0;
    const lastPrice = chartData[chartData.length - 1]?.price || 0;
    const isPositive = lastPrice >= firstPrice;

    const prices = chartData.map((d: { price: number }) => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    const color = isPositive ? "#22c55e" : "#ef4444";

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Price Chart</h3>
                <div className="flex gap-2">
                    {ranges.map((range) => (
                        <Button
                            key={range.value}
                            variant={days === range.value ? "default" : "outline"}
                            size="sm"
                            onClick={() => setDays(range.value)}
                        >
                            {range.label}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="h-[250px] md:h-[400px] w-full border rounded-lg p-4 bg-card text-card-foreground">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="date"
                            hide={true}
                        />
                        <YAxis
                            domain={[minPrice, maxPrice]}
                            hide={true}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="flex flex-col">
                                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                        Date
                                                    </span>
                                                    <span className="font-bold text-muted-foreground">
                                                        {payload[0].payload.fullDate}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                        Price
                                                    </span>
                                                    <span className="font-bold" style={{ color }}>
                                                        {new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(payload[0].value as number)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                return null;
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke={color}
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorPrice)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
