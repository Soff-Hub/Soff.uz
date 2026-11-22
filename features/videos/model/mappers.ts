import { Video } from './types';

export const mapToVideo = (item: any): Video => {
    return {
        ...item,
        id: Number(item.id || 0),
        slug: item.slug || '',
        title: item.title || 'Nomsiz dars',
        price: Number(item.price || 0),
        discount_price: Number(item.discount_price || 0),
        view_count: Number(item.views_count ?? item.view_count ?? item.views ?? 0),
        poster: item.poster_url ?? item.poster ?? item.thumbnail_url ?? item.image_url ?? null,
        seller_name: item.seller?.first_name
            ? `${item.seller.first_name} ${item.seller.last_name || ''}`.trim()
            : (item.seller_name || null),
        seller_image: item.seller?.image_url ?? item.seller_image ?? null,
        category: item.category || { id: 0, name: 'Video', slug: 'video' },
        playlist: item.playlist || null
    };
};
