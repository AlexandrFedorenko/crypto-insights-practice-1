export function createLinksMap(links: any) {
    const entriesMap = new Map();
    const assetsMap = new Map();

    // Map block entries
    links?.entries?.block?.forEach((entry: any) => {
        if (entry?.sys?.id) {
            entriesMap.set(entry.sys.id, entry);
        }
    });

    // Map inline entries
    links?.entries?.inline?.forEach((entry: any) => {
        if (entry?.sys?.id) {
            entriesMap.set(entry.sys.id, entry);
        }
    });

    // Map assets
    links?.assets?.block?.forEach((asset: any) => {
        if (asset?.sys?.id) {
            assetsMap.set(asset.sys.id, asset);
        }
    });

    return { entriesMap, assetsMap };
}

// Helper to resolve entry/asset data from node
export function resolveNodeData(node: any, linksMap: { entriesMap: Map<string, any>, assetsMap: Map<string, any> }) {
    const targetId = node.data?.target?.sys?.id;
    if (!targetId) return null;

    const linkType = node.data?.target?.sys?.linkType;

    if (linkType === 'Asset') {
        return linksMap.assetsMap.get(targetId);
    }

    if (linkType === 'Entry') {
        return linksMap.entriesMap.get(targetId);
    }

    return null;
}
