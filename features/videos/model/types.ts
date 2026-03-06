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
}

export interface Tag {
    id: number;
    name: string;
}

export interface Seller {
    id: number;
    first_name: string;
    last_name: string;
    image_url: string | null;
    last_login: string;
    total_approved_documents: number;
    total_sold_documents: number;
    is_blocked: boolean;
}

export interface DocumentInfo {
    page_count: number | null;
    file_size: string;
    file_type: string;
    images: string[];
    short_content_url: string;
    content_duration: string;
    content_type: string;
    file_url: string | null;
}

export interface VideoDetail {
    id: number;
    title: string;
    price: number;
    discount: number;
    category: Category;
    discount_price: number;
    description: string;
    tag: Tag[];
    seller: Seller;
    current_owner: any | null;
    document: DocumentInfo;
    poster_url: string;
    slug: string;
    demo_link: string | null;
    technologies_data: any | null;
    is_original: boolean;
    sold_count: number;
    view_count: number;
    three_d_features: any | null;
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
