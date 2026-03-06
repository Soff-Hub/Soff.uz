import React from 'react';
import { GetServerSideProps } from 'next';
import { ArrowLeftOutlined } from '@ant-design/icons';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import {
    fetchVideoBySlug,
    VideoDetail,
    VideoDetails
} from '~/features/videos';
import Link from 'next/link';

interface Props {
    video: VideoDetail;
}

const VideoDetailPage: React.FC<Props> = ({ video }) => {
    return (
        <PageContainer withFooter={true}>
            <Meta
                title={`${video.title} | Soff.uz`}
                description={video.description.replace(/<[^>]*>?/gm, '').slice(0, 160)}
                image={video.poster_url}
            />
            <VideoDetails video={video} />

            {/* Back Button for mobile */}
            <div className="container pb-5">
                <Link href="/video-lessons">
                    <a className="d-inline-flex align-items-center gap-2 text-muted">
                        <ArrowLeftOutlined /> Orqaga qaytish
                    </a>
                </Link>
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
