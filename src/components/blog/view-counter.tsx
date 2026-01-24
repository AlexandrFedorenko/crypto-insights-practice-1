"use client";

import { useEffect, useState, useRef } from "react";
import { incrementViews } from "@/app/actions/view";
import { Eye } from "lucide-react";

interface ViewCounterProps {
    entryId: string;
    slug: string;
    initialViews?: number;
}

export function ViewCounter({ entryId, slug, initialViews = 0 }: ViewCounterProps) {
    const [views, setViews] = useState(initialViews);
    const hasIncremented = useRef(false);

    useEffect(() => {
        if (hasIncremented.current) return;
        hasIncremented.current = true;

        async function update() {
            try {
                const newCount = await incrementViews(entryId);
                if (newCount !== null) {
                    setViews(newCount);
                }
            } catch (error) {
                console.error("Failed to update views", error);
            }
        }

        // Delay slightly to not block hydration
        const timer = setTimeout(update, 2000);
        return () => clearTimeout(timer);
    }, [entryId, slug]);

    return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2" title="Total Views">
            <Eye className="w-4 h-4" />
            <span>{views} views</span>
        </div>
    );
}
