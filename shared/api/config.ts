export const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const API_ENDPOINTS = {
    AUTH: {
        PROFILE: '/auth/profile/',
        NEW_PROFILE: '/auth/new-profile/',
        TELEGRAM_LINK: '/auth/get-telegram-link/',
    },
    CATEGORIES: {
        NAVBAR_MENU: 'categories/categories-with-directions',
    },
    CUSTOMER: {
        LAST_ADDED_PRODUCTS: 'customer/last-added/',
        LAST_ADDED_SERVICES: 'customer/last',
        SEARCH_PAGE: 'customer/search-page',
        BEST_SELLERS: 'customer/top-seller-statistics/',
        SERVICES: 'customer',
        PORTFOLIOS: 'customer/portfolios/',
        SELLER_SERVICES: 'customer/services/',
        SERVICE_COMMENTS: 'customer/service/feedbacks/',
        PRODUCT_COMMENTS: 'customer/reviews/',
        SELLER_DOCUMENTS: 'customer/seller-documents/',
    },
    SEARCH: {
        DOC: 'doc-search/',
        GOOGLE: 'customer/same-google-search/',
    },
    USERS: {
        SELLERS: 'users/sellers',
    },
    CHATS: {
        UNREAD_COUNT: 'chats/unread_count/',
    },
} as const;

export const QUERY_KEYS = {
    AUTH: {
        PROFILE: 'auth-profile',
        TELEGRAM_LINK: 'auth-telegram-link',
    },
    CATEGORIES: {
        NAVBAR_MENU: 'navbar-menu-categories',
    },
    CUSTOMER: {
        LAST_ADDED_PRODUCTS: 'last-added-products',
        LAST_ADDED_SERVICES: 'last-added-services',
        BESTS: 'best-sellers',
        PORTFOLIOS: 'seller-portfolios',
    },
    // Add more as per demand
} as const;
