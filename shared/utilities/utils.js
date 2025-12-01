export const truncateText = (title, maxLength = 7) => {
    if (!title) return '';
    return title.length > maxLength ? title.slice(0, maxLength) + '...' : title;
};

export function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B'; // bytes
    else if (bytes < 1024 * 1024)
        return (bytes / 1024).toFixed(1) + ' KB'; // kilobytes
    else if (bytes < 1024 * 1024 * 1024)
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB'; // megabytes
    else return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB'; // gigabytes
}

export function downloadFile(s3Link) {
    const downloadUrl = `/api/download?url=${encodeURIComponent(s3Link)}`;

    const win = window.open(downloadUrl, '_blank');

    setTimeout(() => {
        if (win) win.close();
    }, 2000);
}

export function highlightMatch(text, query) {
    if (!query || !text) return text;

    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const matchIndex = lowerText.indexOf(lowerQuery);

    if (matchIndex === -1) return text;

    const before = text.slice(0, matchIndex);
    const match = text.slice(matchIndex, matchIndex + query.length);
    const after = text.slice(matchIndex + query.length);

    return (
        <>
            {before}
            <strong className="text-black dark:text-white">{match}</strong>
            {after}
        </>
    );
}
