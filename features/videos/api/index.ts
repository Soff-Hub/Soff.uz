import { $api } from '~/shared/api';
import { Category, VideoFilters, VideoResponse } from '~/features/videos/model/types';

export const fetchVideos = async (params: VideoFilters): Promise<VideoResponse> => {
    const { data } = await $api.get<VideoResponse>('/api/v1/customer/videos/', {
        params: {
            ...params,
            direction: 'video',
        },
    });
    return data;
};

export const fetchCategories = async (direction: string = 'video', parent_slug?: string): Promise<Category[]> => {
    const url = parent_slug
        ? `/api/v1/customer/four-child?direction=${direction}&parent__slug=${parent_slug}`
        : `/api/v1/customer/four-child?direction=${direction}`;

    const { data } = await $api.get(url);
    // If the structure is { results: Category[] }
    return data.results || data;
};
