import { baseUrlUseApi } from '~/repositories/useApi';

/**
 * Builds the URL for the ElasticSearch-backed search API.
 * @param {Object} params - The query parameters from Next.js context.
 * @param {string} type - The product type (e.g., 'file', '3d', 'design').
 * @param {number} defaultLimit - The default number of items to fetch.
 * @returns {string} The formatted API URL.
 */
export const buildSearchUrl = (params, type, defaultLimit = 50) => {
    const {
        page = 1,
        search = '',
        keyword = '',
        parentCategory = '',
        childCategory = '',
        category = '',
        content_extensions = [],
        file_type = '',
        price_from = '',
        price_to = '',
        from_page = '',
        to_page = '',
        page_from = '',
        page_to = '',
        order_by = '',
        similar_documents = '',
    } = params;

    const apiParams = new URLSearchParams({
        limit: defaultLimit,
        type: type || 'all',
    });

    if (Number(params.page) > 1) apiParams.append('page', params.page);

    // Search keyword handling (API requires mandatory search param)
    const finalSearch = search || keyword || '*';
    apiParams.append('search', finalSearch);

    // Category handling - API requires numeric IDs for the 'category' parameter
    const { 
        childCategoryId, 
        parentCategoryId 
    } = params;

    const finalCategoryId = childCategoryId || parentCategoryId || category;
    
    if (finalCategoryId) {
        if (Array.isArray(finalCategoryId)) {
            finalCategoryId.forEach(id => {
                if (id) apiParams.append('category', id);
            });
        } else {
            apiParams.append('category', finalCategoryId);
        }
    }

    // Additional ES features
    if (order_by) apiParams.append('order_by', order_by);
    
    // Price filtering
    if (price_from !== '') apiParams.append('price_from', price_from);
    if (price_to !== '') apiParams.append('price_to', price_to);

    // Page count filtering (Map UI from_page/to_page to API page_from/page_to)
    const finalPageFrom = page_from || from_page;
    const finalPageTo = page_to || to_page;
    
    // Senior fix: API requires page_from >= 1. 
    if (finalPageFrom !== '') {
        const pFrom = parseInt(finalPageFrom);
        apiParams.append('page_from', isNaN(pFrom) || pFrom < 1 ? '1' : pFrom.toString());
    }
    if (finalPageTo !== '') apiParams.append('page_to', finalPageTo);

    // File type filtering (Convert array ['.docx', '.pdf'] or string '.docx' to 'docx,pdf')
    const rawFileType = file_type || content_extensions;
    if (rawFileType) {
        const fileTypeList = Array.isArray(rawFileType) ? rawFileType : [rawFileType];
        const formattedFileType = fileTypeList
            .filter(ext => typeof ext === 'string')
            .join(',');
        
        if (formattedFileType) apiParams.append('file_type', formattedFileType);
    }

    // As per user requirement, similar_documents is always true
    apiParams.append('similar_documents', 'true');

    return `${baseUrlUseApi}customer/same-google-search/?${apiParams.toString()}`;
};

/**
 * Resolves a numeric category ID from a slug using fetched metadata.
 * @param {string} slug - The category slug from the URL.
 * @param {Object} metadata - The category tree response (fourChildData).
 * @returns {number|null} The numeric ID or null if not found.
 */
export const resolveCategoryId = (slug, metadata) => {
    if (!slug || slug === 'all' || !metadata || !Array.isArray(metadata.results)) {
        return null;
    }
    const found = metadata.results.find(item => item.slug === slug);
    return found ? found.id : null;
};

/**
 * Normalizes products from the ElasticSearch API to match the structure 
 * expected by existing UI components (ProductCard, etc.)
 * @param {Object} data - The API response object.
 * @returns {Object} Normalized data object.
 */
export const normalizeProducts = (data) => {
    if (!data || data.error || !Array.isArray(data.results)) {
        return data;
    }

    return {
        ...data,
        results: data.results.map((product) => ({
            ...product,
            // Structure expected by ProductCard
            price: product.price || parseFloat(product.discount_price) || 0,
            poster_url: product.poster_url || product.poster,
            document: product.document || {
                file_type: product.file_type,
                file_size: product.file_size,
                page_count: product.page_count,
            },
            // Ensure compatibility with other components
            category_parent_slug: product.category_data?.slug || product.category_parent_slug,
        })),
    };
};
