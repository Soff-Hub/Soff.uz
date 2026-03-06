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

export const fetchCategories = async (direction: string = 'video'): Promise<Category[]> => {
    const { data } = await $api.get(`/api/v1/customer/four-child?direction=${direction}`);
    // If the structure is { results: Category[] }
    return data.results || data;
};
