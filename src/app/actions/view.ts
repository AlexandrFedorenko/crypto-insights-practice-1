"use server";

import { incrementViewCount } from "@/lib/contentful/management";

export async function incrementViews(entryId: string) {
    if (!entryId) return null;

    const newViews = await incrementViewCount(entryId);

    return newViews;
}
