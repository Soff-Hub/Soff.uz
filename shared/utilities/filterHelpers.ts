import { NextRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

/**
 * Extract filter-only query params (excludes category params that are in URL path)
 * @param {Object} query - Router query object
 * @param {string[]} filterKeys - Array of filter keys to preserve (default: standard filters)
 * @returns {Object} Filter-only query params
 */
export function getFilterQueryParams<FilterQueries extends any>(
    query: ParsedUrlQuery,
    filterKeys: string[] = ['search', 'price_from', 'price_to', 'page']
) {
    const filters: any = {};

    filterKeys.forEach((key) => {
        if (query[key]) {
            filters[key] = query[key];
        }
    });

    if (query.content_extensions) {
        filters.content_extensions = query.content_extensions;
    }
    if (query.from_page) {
        filters.from_page = query.from_page;
    }
    if (query.to_page) {
        filters.to_page = query.to_page;
    }

    Object.keys(filters).forEach((key) => {
        const value = filters[key];
        if (value === null || value === undefined || value === '') {
            delete filters[key];
        }
        if (Array.isArray(value) && value.length === 0) {
            delete filters[key];
        }
    });

    return filters;
}

export function buildCategoryPath(
    basePath: string,
    parentCategory: string | null,
    childCategory: string | null = null
) {
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
export function getCategoryFromRouter(router: NextRouter) {
    const pathMatch = router.asPath.match(/^\/[^/]+\/[^/]+(?:\/([^/?]+))?/);

    if (pathMatch && router.pathname.includes('[parentCategory]')) {
        const segments = router.asPath.split('/').filter(Boolean);
        const baseSegmentIndex = segments.findIndex((s) => s.includes('-'));

        if (baseSegmentIndex >= 0 && segments.length > baseSegmentIndex + 1) {
            const parentCategory = segments[baseSegmentIndex + 1];
            const childCategory =
                segments.length > baseSegmentIndex + 2
                    ? segments[baseSegmentIndex + 2].split('?')[0]
                    : null;
            return { parentCategory, childCategory };
        }
    }

    return {
        parentCategory: router.query.parentCategory || null,
        childCategory: router.query.childCategory || null,
    };
}
