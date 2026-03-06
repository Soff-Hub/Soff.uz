import React from 'react';
import { GetServerSideProps } from 'next';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import { fetchVideoBySlug, VideoDetail } from '~/features/videos';

interface Props {
    video: VideoDetail;
}

const VideoDetailPage: React.FC<Props> = ({ video }) => {
    console.log('Video Detail:', video);

    return (
        <PageContainer withFooter={true}>
            <Meta
                title={`${video.title} | Soff.uz`}
                description={video.description.replace(/<[^>]*>?/gm, '').slice(0, 160)}
                image={video.poster_url}
            />

            <div className="container py-4">
                <div style={{ padding: '40px', textAlign: 'center', background: '#f5f5f5', borderRadius: '12px' }}>
                    <h1>{video.title}</h1>
                    <p>Bu sahifa hozirda ishlab chiqilmoqda (UI yasash bosqichi)...</p>
                    <div style={{ marginTop: '20px' }}>
                        <img
                            src={video.poster_url}
                            alt={video.title}
                            style={{ maxWidth: '100%', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
    const slug = params?.slug as string;

    if (!slug) {
        return { notFound: true };
    }

    try {
        const video = await fetchVideoBySlug(slug);

        if (!video) {
            return { notFound: true };
        }

        return {
            props: {
                video,
            },
        };
    } catch (error: any) {
        console.error('Error fetching video detail for SSR:', error);

        // Handle 404 specifically if axios error
        if (error.response?.status === 404) {
            return { notFound: true };
        }

        return {
            notFound: true,
        };
    }
};

export default React.memo(VideoDetailPage);
