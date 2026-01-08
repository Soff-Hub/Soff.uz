import { env } from 'process';

export default async function fetchJson(
    url: string,
    options: RequestInit = {}
) {
    try {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(`Failed to fetch: ${url}`);
        return await res.json();
    } catch (e: any) {
        return { error: e.message };
    }
}

export const fetchJsonSafely = async (
    url: string,
    options: RequestInit = {}
) => {
    try {
        const res = await fetch(url, options);
        if (!res.ok) {
            return null;
        }
        return res.json();
    } catch (error) {
        if (env.NODE_ENV === 'development')
            console.error('Fetch error:', error);
        return null;
    }
};
