export default async function fetchJson(url, locale = 'uz') {
    try {
        const res = await fetch(url, {
            headers: {
                'Accept-Language': locale,
            },
        });
        return await res.json();
    } catch (e) {
        return { error: e.message };
    }
}
