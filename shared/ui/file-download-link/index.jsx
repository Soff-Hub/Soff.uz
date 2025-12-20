// FileDownloadLink.jsx
import React, { forwardRef } from 'react';
import { downloadFile } from '~/shared/utilities/utils';

// File extensions that browsers will open instead of download
const BROWSER_VIEWABLE_FILES = [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'webp',
    'svg',
    'bmp',
    'ico',
    'pdf',
    'txt',
    'json',
    'xml',
    'csv',
    'mp4',
    'webm',
    'ogg',
    'mp3',
    'wav',
    'html',
    'htm',
];

/**
 * Checks if a file should use API download based on its extension
 * @param {string} url - The file URL
 * @returns {boolean} - True if file needs API download
 */
function shouldUseAPIDownload(url) {
    if (!url) return false;
    const ext = url.split('.').pop().split('?')[0].toLowerCase();
    return BROWSER_VIEWABLE_FILES.includes(ext);
}

/**
 * FileDownloadLink Component
 * Intelligently handles file downloads - uses API for browser-viewable files,
 * direct links for others
 *
 * @param {Object} props
 * @param {string} props.url - The file URL to download
 * @param {string} props.filename - The filename to save as
 * @param {string} props.className - CSS classes for styling
 * @param {React.ReactNode} props.children - Link content
 */
const FileDownloadLink = forwardRef(
    (
        {
            url,
            filename,
            className = '',
            onClick,
            children = 'Download',
            ...props
        },
        ref
    ) => {
        if (!url) {
            return null;
        }

        const useAPI = shouldUseAPIDownload(url);
        const downloadAttr = !useAPI ? filename || true : undefined;

        const extendedOnClick = (e) => {
            if (useAPI) {
                e.preventDefault();
                downloadFile(url);
            }
            if (onClick) {
                onClick(e);
            }
        };

        return (
            <a
                ref={ref}
                href={url}
                download={downloadAttr}
                className={className}
                onClick={extendedOnClick}
                {...props}>
                {children}
            </a>
        );
    }
);

export default FileDownloadLink;
