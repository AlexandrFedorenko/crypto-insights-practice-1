

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENV_ID = 'master';
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

const BASE_URL = `https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENV_ID}`;

export async function incrementViewCount(entryId: string) {
    if (!MANAGEMENT_TOKEN) {
        console.warn("Skipping view increment: CONTENTFUL_MANAGEMENT_TOKEN not found");
        return null;
    }

    try {
        const getRes = await fetch(`${BASE_URL}/entries/${entryId}`, {
            headers: { Authorization: `Bearer ${MANAGEMENT_TOKEN}` }
        });

        if (!getRes.ok) throw new Error("Failed to fetch entry");

        const entry = await getRes.json();
        const currentVersion = entry.sys.version;
        const currentViews = entry.fields.views?.['en-US'] || 0;
        const newViews = currentViews + 1;

        const updateRes = await fetch(`${BASE_URL}/entries/${entryId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${MANAGEMENT_TOKEN}`,
                'Content-Type': 'application/vnd.contentful.management.v1+json',
                'X-Contentful-Version': currentVersion.toString()
            },
            body: JSON.stringify({
                fields: {
                    ...entry.fields,
                    views: { 'en-US': newViews }
                }
            })
        });

        if (!updateRes.ok) throw new Error("Failed to update entry");

        const updatedEntry = await updateRes.json();

        await fetch(`${BASE_URL}/entries/${entryId}/published`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${MANAGEMENT_TOKEN}`,
                'X-Contentful-Version': updatedEntry.sys.version.toString()
            }
        });

        return newViews;

    } catch (error) {
        console.error("Error incrementing views:", error);
        return null;
    }
}
