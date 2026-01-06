/**
 * Filter helpers for product filtering and navigation
 */

/**
 * Extract filter-only query params (excludes category params that are in URL path)
 * @param {Object} query - Router query object
 * @param {string[]} filterKeys - Array of filter keys to preserve (default: standard filters)
 * @returns {Object} Filter-only query params
 */
export function getFilterQueryParams(
    query,
    filterKeys = ['search', 'price_from', 'price_to', 'page']
) {
    const filters = {};

    // Add specified filter keys
    filterKeys.forEach((key) => {
        if (query[key]) {
            filters[key] = query[key];
        }
    });

    // Always preserve scientific-resources specific filters if they exist
    if (query.content_extensions) {
        filters.content_extensions = query.content_extensions;
    }
    if (query.from_page) {
        filters.from_page = query.from_page;
    }
    if (query.to_page) {
        filters.to_page = query.to_page;
    }

    // Remove empty values
    Object.keys(filters).forEach((key) => {
        const value = filters[key];
        // Check if value is empty
        if (value === null || value === undefined || value === '') {
            delete filters[key];
        }
        // For arrays, check if empty
        if (Array.isArray(value) && value.length === 0) {
            delete filters[key];
        }
    });

    return filters;
}

export function buildCategoryPath(
    basePath,
    parentCategory,
    childCategory = null
) {
    // Remove trailing slash if exists
    const cleanBasePath = basePath.endsWith('/')
        ? basePath.slice(0, -1)
        : basePath;

    if (childCategory && parentCategory) {
        return `${cleanBasePath}/${parentCategory}/${childCategory}`;
    }
    if (parentCategory) {
        return `${cleanBasePath}/${parentCategory}`;
    }
    return cleanBasePath;
}

/**
 * Get current category from router (for SSG structure)
 * Extracts parentCategory and childCategory from pathname params
 * @param {Object} router - Next.js router object
 * @returns {Object} { parentCategory, childCategory }
 */
export function getCategoryFromRouter(router) {
    // In SSG structure, categories are in the path, not query params
    // router.pathname will be like '/3d-models-and-interior-designs/[parentCategory]'
    // router.asPath will be like '/3d-models-and-interior-designs/templates'

    // Try to extract from pathname pattern first (more reliable)
    const pathMatch = router.asPath.match(/^\/[^/]+\/[^/]+(?:\/([^/?]+))?/);

    if (pathMatch && router.pathname.includes('[parentCategory]')) {
        // New SSG structure: /base/[parentCategory]/[childCategory]
        const segments = router.asPath.split('/').filter(Boolean);
        const baseSegmentIndex = segments.findIndex((s) => s.includes('-'));

        if (baseSegmentIndex >= 0 && segments.length > baseSegmentIndex + 1) {
            const parentCategory = segments[baseSegmentIndex + 1];
            const childCategory =
                segments.length > baseSegmentIndex + 2
                    ? segments[baseSegmentIndex + 2].split('?')[0] // Remove query string
                    : null;
            return { parentCategory, childCategory };
        }
    }

    // Fallback to query params (for old structure compatibility)
    return {
        parentCategory: router.query.parentCategory || null,
        childCategory: router.query.childCategory || null,
    };
}


