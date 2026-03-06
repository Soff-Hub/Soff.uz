export interface Category {
    id: number;
    name: string;
    slug: string;
}

export interface Playlist {
    id: number;
    title: string;
}

export interface Video {
    title: string;
    seller_name: string;
    seller_image: string | null;
    price: number;
    discount_price: number;
    slug: string;
    view_count: number;
    poster: string | null;
    playlist: Playlist | null;
    category: Category;
    // UI related fields (computed or optional)
    duration?: string;
    stars?: number;
    reviews_count?: number;
    is_bestseller?: boolean;
}

export interface VideoResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Video[];
}

export interface VideoFilters {
    page?: number;
    page_size?: number;
    category?: string;
    search?: string;
    order_by_views?: '-view_count' | 'view_count';
    direction?: string;
}
