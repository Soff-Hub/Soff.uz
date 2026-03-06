import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import { fetchCategories, fetchVideos, Category, Video, VideoSlider, VideoGrid } from '~/features/videos';

interface CategoryWithVideos {
    category: Category;
    videos: Video[];
}

interface Props {
    popularVideos: Video[];
    allVideos: Video[];
    categoriesWithVideos: CategoryWithVideos[];
}

const VideoLessonsPage: React.FC<Props> = ({ popularVideos, allVideos, categoriesWithVideos }) => {
    const router = useRouter();
    const handleVideoClick = (slug: string) => {
        router.push(`/product/${slug}`);
    };

    const handleSeeAll = (categorySlug: string) => {
        router.push(`/video-lessons/category/${categorySlug}`);
    };

    return (
        // @ts-ignore
        <PageContainer withFooter={true}>
            <Meta
                title="Video Darsliklar | Soff.uz"
                description="Bu sahifa har qanday sohada bilim olishni istaganlar uchun. Bu yerda zamonaviy kasblar, an’anaviy fanlar, shaxsiy rivojlanish va ta’limga oid turli video darsliklarni topish mumkin."
                image="https://soff.uz/static/img/video-darsliklar-2.png"
            />

            <div className="container py-3">
                {/* Popular Videos Section */}
                <VideoSlider
                    title="Eng ommabop"
                    videos={popularVideos}
                    onVideoClick={handleVideoClick}
                    variant="horizontal"
                />

                {/* Categories Sections */}
                {categoriesWithVideos.map(({ category, videos }) => (
                    <VideoSlider
                        key={category.id}
                        title={category.name.split('|').pop()?.trim() || category.name}
                        videos={videos}
                        onSeeAll={() => handleSeeAll(category.slug)}
                        onVideoClick={handleVideoClick}
                    />
                ))}

                {/* All Videos Grid Section */}
                <VideoGrid
                    title="Barchasi"
                    videos={allVideos}
                    onVideoClick={handleVideoClick}
                />
            </div>
        </PageContainer>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        // 1. Fetch categories
        const categories = await fetchCategories();

        // 2. Fetch popular videos
        const popularResponse = await fetchVideos({ order_by_views: '-view_count', page_size: 15 });
        const popularVideos = popularResponse?.results || [];

        // 3. Fetch all videos for the grid (latest)
        const allResponse = await fetchVideos({ page_size: 100 });
        const allVideos = allResponse?.results || [];

        // 4. Fetch videos for top categories
        const topCategories = categories.slice(0, 10);

        const categoriesWithVideos: CategoryWithVideos[] = await Promise.all(
            topCategories.map(async (category) => {
                const response = await fetchVideos({ category: category.slug, page_size: 10 });
                return {
                    category,
                    videos: response?.results || [],
                };
            })
        );

        // Filter out categories with no videos
        const filteredCategoriesWithVideos = categoriesWithVideos.filter(item => item.videos.length > 0);

        return {
            props: {
                popularVideos,
                allVideos,
                categoriesWithVideos: filteredCategoriesWithVideos,
            },
        };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        return {
            props: {
                popularVideos: [],
                allVideos: [],
                categoriesWithVideos: [],
            },
        };
    }
};

export default VideoLessonsPage;
