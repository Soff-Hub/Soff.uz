export function extractName(url: string) {
    if (!url) return '';
    return url.split('/').pop()?.split('?')[0];
}
