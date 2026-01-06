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

export const getYouTubeEmbed = (url: string) => {
    if (!url) return null;
    try {
        const videoId =
            url.split('v=')[1]?.split('&')[0] ||
            url.split('youtu.be/')[1]?.split('?')[0];
        return `https://www.youtube.com/embed/${videoId}`;
    } catch {
        return null;
    }
};

export const getYouTubeThumbnail = (url: string) => {
    const match = url?.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    const id = match ? match[1] : null;
    return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
};
