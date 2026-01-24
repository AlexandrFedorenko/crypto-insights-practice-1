const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}`;

export async function fetchGraphQL(query: string, variables?: Record<string, unknown>, preview = false) {
    try {
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${preview ? process.env.CONTENTFUL_PREVIEW_TOKEN : ACCESS_TOKEN}`,
            },
            body: JSON.stringify({ query, variables }),
            next: {
                tags: ['contentful'],
                revalidate: 60
            },
        });

        const json = await res.json();

        if (json.errors) {
            console.error('GraphQL Errors:', json.errors);
            return null;
        }

        return json.data;
    } catch (error) {
        console.error('GraphQL Error:', error);
        return null;
    }
}