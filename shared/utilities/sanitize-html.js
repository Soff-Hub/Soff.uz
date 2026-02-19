import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML content using DOMPurify to prevent XSS attacks.
 * Designed to be safe for both Client-Side and Server-Side Rendering.
 * 
 * @param {string} html - The raw HTML string to be sanitized.
 * @param {Object} options - Optional DOMPurify configuration.
 * @returns {string} - The sanitized HTML string.
 */
export const sanitizeHtml = (html, options = {}) => {
    if (!html || typeof html !== 'string') {
        return '';
    }

    // Return sanitized HTML if window is defined (client-side)
    if (typeof window !== 'undefined') {
        // Standard secure configuration
        const defaultOptions = {
            ALLOWED_TAGS: [
                'b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'span',
                'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre',
                'div', 'hr', 'table', 'thead', 'tbody', 'tr', 'th', 'td'
            ],
            ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'style', 'title'],
            ADD_ATTR: ['target', 'rel'],
            ...options
        };

        // Ensure links are safe
        DOMPurify.addHook('afterSanitizeAttributes', function (node) {
            if (node.tagName === 'A' && node.getAttribute('href')) {
                const href = node.getAttribute('href');
                if (href.startsWith('http') || href.startsWith('//')) {
                    node.setAttribute('target', '_blank');
                    node.setAttribute('rel', 'noopener noreferrer');
                }
            }
        });

        return DOMPurify.sanitize(html, defaultOptions);
    }

    // On the server, we return the original string. 
    // It will be re-run on the client during hydration or subsequent renders.
    return html;
};

export default sanitizeHtml;
