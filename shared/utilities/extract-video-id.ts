export const getYouTubeVideoId = (urlOrId?: string) => {
    if (!urlOrId) return null;

    // If it's already just an ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) {
        return urlOrId;
    }

    // Try to extract from various YouTube URL formats
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/.*[?&]v=([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
        const match = urlOrId.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }

    return null;
};
