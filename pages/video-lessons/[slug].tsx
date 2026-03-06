// import { useRouter } from 'next/router';
// import React, { useState, useEffect } from 'react';
// import { useQuery, dehydrate, QueryClient, Hydrate } from '@tanstack/react-query';
// import { GetServerSideProps } from 'next';

// import PageContainer from '~/widgets/layouts/PageContainer';
// import Meta from '~/shared/ui/meta';
// import { fetchCategories, fetchVideos } from '~/features/videos/api';
// import VideoFiltersComp from '~/features/videos/ui/VideoFilters/VideoFilters';
// import VideoList from '~/features/videos/ui/VideoList/VideoList';
// import { VideoFilters } from '~/features/videos/model/types';

// interface Props {
//     initialFilters: VideoFilters;
//     dehydratedState: any;
// }

// const VideoLessonsPage: React.FC<Props> = ({ initialFilters, dehydratedState }) => {
//     const router = useRouter();
//     const [filters, setFilters] = useState<VideoFilters>(initialFilters);

//     // Update filters when URL query changes (e.g., on back/forward navigation)
//     useEffect(() => {
//         const { page, category, search, order_by_views } = router.query;
//         if (Object.keys(router.query).length > 0) {
//             setFilters({
//                 page: Number(page) || 1,
//                 category: (category as string) || '',
//                 search: (search as string) || '',
//                 order_by_views: (order_by_views as any) || '-view_count',
//                 page_size: 10,
//             });
//         }
//     }, [router.query]);

//     // Query for videos
//     const { data: videosData, isLoading: isVideosLoading } = useQuery({
//         queryKey: ['videos', filters],
//         queryFn: () => fetchVideos(filters),
//         keepPreviousData: true,
//     });

//     // Query for categories
//     const { data: categories } = useQuery({
//         queryKey: ['categories'],
//         queryFn: () => fetchCategories(),
//     });

//     const updateFilters = (newFilters: Partial<VideoFilters>) => {
//         const updated = { ...filters, ...newFilters };
//         if (newFilters.category !== undefined || newFilters.search !== undefined || newFilters.order_by_views !== undefined) {
//             updated.page = 1; // Reset to page 1 on filter change
//         }

//         setFilters(updated);

//         // Update URL to reflect filters (shallow routing to avoid full page reload)
//         router.push({
//             pathname: '/video-lessons/[slug]',
//             query: {
//                 slug: router.query.slug, // Keep the slug if it exists
//                 ...updated,
//             },
//         }, undefined, { shallow: true });
//     };

//     return (
//         <Hydrate state={dehydratedState}>
//             <PageContainer withFooter={true}>
//                 <Meta
//                     title="Video darsliklar | Soff.uz"
//                     description="Premium video darsliklar orqali o'z mahoratingizni oshiring. Dasturlash, dizayn, va boshqa yo'nalishlar."
//                 />

//                 <div className="container py-5">
//                     <div className="mb-5">
//                         <h1 className="fw-bold mb-3">Video darsliklar</h1>
//                         <p className="text-muted fs-5">O'zingizga kerakli bo'lgan barcha video darsliklarni shu yerdan topishingiz mumkin.</p>
//                     </div>

//                     <VideoFiltersComp
//                         categories={categories || []}
//                         selectedCategory={filters.category}
//                         onCategoryChange={(category) => updateFilters({ category })}
//                         search={filters.search || ''}
//                         onSearchChange={(search) => updateFilters({ search })}
//                         sortBy={filters.order_by_views || '-view_count'}
//                         onSortChange={(order_by_views) => updateFilters({ order_by_views: order_by_views as any })}
//                     />

//                     <VideoList
//                         videos={videosData?.results || []}
//                         total={videosData?.count || 0}
//                         currentPage={filters.page || 1}
//                         pageSize={filters.page_size || 10}
//                         onPageChange={(page) => updateFilters({ page })}
//                         isLoading={isVideosLoading}
//                         onVideoClick={(slug) => router.push(`/video-lessons/${slug}`)}
//                     />
//                 </div>
//             </PageContainer>
//         </Hydrate>
//     );
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const { page = 1, category = '', search = '', order_by_views = '-view_count' } = context.query;
//     const queryClient = new QueryClient();

//     const filters: VideoFilters = {
//         page: Number(page),
//         category: category as string,
//         search: search as string,
//         order_by_views: order_by_views as any,
//         page_size: 10,
//     };

//     // Prefetch data for SSR
//     try {
//         await Promise.all([
//             queryClient.prefetchQuery(['videos', filters], () => fetchVideos(filters)),
//             queryClient.prefetchQuery(['categories'], () => fetchCategories()),
//         ]);
//     } catch (error) {
//         console.error('SSR Prefetch Error:', error);
//     }

//     return {
//         props: {
//             dehydratedState: dehydrate(queryClient),
//             initialFilters: filters,
//         },
//     };
// };

// export default VideoLessonsPage;