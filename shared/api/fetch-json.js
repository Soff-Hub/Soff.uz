export default async function fetchJson(url) {
    try {
        const res = await fetch(url);
        // if (!res.ok) throw new Error(`Failed to fetch: ${url}`);
        return await res.json();
    } catch (e) {
        return { error: e.message };
    }
}
