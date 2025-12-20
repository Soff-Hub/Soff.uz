/**
 * Centralized API Configuration
 * All API environment variables and endpoints are defined here
 */

// Environment detection
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

// Base URLs
export const API_CONFIG = {
    // Main API Base URLs
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || '',
    LOCAL_BASE_URL: process.env.NEXT_PUBLIC_LOCAL_BASE_URL || '',

    // Freelance API Base URL
    FREELEANCE_URL: process.env.NEXT_PUBLIC_FREELEANCE_URL || '',

    // WebSocket URLs
    WS_BASE_URL: process.env.NEXT_PUBLIC_WS_BASE_URL || '',
    WS_FREELEANCE_URL: process.env.NEXT_PUBLIC_WS_FREELEANCE_URL || '',
} as const;

// Get the appropriate base URL based on environment
export const getBaseURL = (): string => {
    return isDevelopment ? API_CONFIG.LOCAL_BASE_URL : API_CONFIG.BASE_URL;
};

// API Endpoints
export const API_ENDPOINTS = {
    // Main API endpoints
    BASE_API: `${getBaseURL()}/api/v1/`,

    // Freelance API endpoints
    FREELEANCE_API: `${API_CONFIG.FREELEANCE_URL}/api/v1/`,

    // WebSocket endpoints
    WS_BASE: API_CONFIG.WS_BASE_URL,
    WS_FREELEANCE: API_CONFIG.WS_FREELEANCE_URL,
} as const;

// Specific API Routes
export const API_ROUTES = {
    // Categories
    NAVBAR_MENU_CATEGORIES: 'categories/categories-with-directions',
    CATEGORIES: 'categories',
    CATEGORIES_WITH_DIRECTIONS: 'categories/categories-with-directions',

    // Products
    LAST_ADDED_PRODUCTS: 'customer/last-added/',
    PRODUCT_SEARCH: 'customer/same-google-search/',
    SELLER_PRODUCTS: 'customer/seller-documents/',

    // Services
    CUSTOMER_SERVICES: 'customer',
    LAST_ADDED_SERVICES: 'customer/last',
    SELLER_SERVICES: 'customer/services/',

    // Search
    D_SEARCH_OPTIONS: 'doc-search/?search=',
    F_SEARCH_OPTIONS: 'customer/search-page?search=',
    SEARCH_SPECIALISTS: 'users/sellers',

    // Seller
    SELLER_PORTFOLIOS: 'customer/portfolios/',
    TOP_CATEGORIES: (sellerId: number | string) =>
        `customer/top-categories/${sellerId}`,

    // Statistics
    BESTS: 'customer/top-seller-statistics/',

    // Auth
    TELEGRAM_LINK: '/auth/get-telegram-link/',
    AUTH_PROFILE: '/auth/profile/',
    NEW_PROFILE: '/auth/new-profile/',

    // Comments & Reviews
    PRODUCT_COMMENTS: 'customer/reviews/',
    SERVICE_COMMENTS: 'customer/service/feedbacks/',

    // Chat
    CHAT_UNSEENS: 'chats/unread_count/',
    CHAT: (chatId: number | string, token: string, reconnectKey?: string) => {
        const reconnect = reconnectKey ? `&_reconnect=${reconnectKey}` : '';
        return `chat/${chatId}/?token=${token}${reconnect}`;
    },
    CHAT_LIST: (token: string) => `chat/?token=${token}`,
} as const;

// Full URL builders
export const buildApiUrl = (endpoint: string, useFreelance = false): string => {
    const baseUrl = useFreelance
        ? API_ENDPOINTS.FREELEANCE_API
        : API_ENDPOINTS.BASE_API;
    return `${baseUrl}${endpoint}`;
};

export const buildWebSocketUrl = (
    endpoint: string,
    useFreelance = false
): string => {
    const baseUrl = useFreelance
        ? API_CONFIG.WS_FREELEANCE_URL
        : API_CONFIG.WS_BASE_URL;
    return `${baseUrl}${endpoint}`;
};

// Export default config object
export default {
    ...API_CONFIG,
    ...API_ENDPOINTS,
    getBaseURL,
    buildApiUrl,
    buildWebSocketUrl,
};
