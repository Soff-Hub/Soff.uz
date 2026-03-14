import React, { useMemo } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
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

/**
 * Parses HH:MM:SS or MM:SS to ISO 8601 duration format (e.g., PT2H2M21S)
 */
const formatISO8601Duration = (duration: string) => {
    if (!duration) return 'PT0S';
    const parts = duration.split(':').map(Number);
    let h = 0, m = 0, s = 0;
    if (parts.length === 3) { [h, m, s] = parts; }
    else if (parts.length === 2) { [m, s] = parts; }
    else { s = parts[0] || 0; }

    let iso = 'PT';
    if (h > 0) iso += `${h}H`;
    if (m > 0) iso += `${m}M`;
    if (s > 0 || iso === 'PT') iso += `${s}S`;
    return iso;
};

/**
 * Removes HTML tags and cleans up whitespace for meta descriptions
 */
const cleanDescription = (html: string) => {
    if (!html) return '';
    return html.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim();
};

const VideoDetailPage: React.FC<Props> = ({ video }) => {
    const descriptionPlain = useMemo(() => cleanDescription(video.description), [video.description]);
    const durationISO = useMemo(() => formatISO8601Duration(video.document.content_duration), [video.document.content_duration]);
    const pageUrl = `https://soff.uz/video-lessons/${video.slug}`;

    // VideoObject Schema
    const videoJsonLd = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": video.title,
        "description": descriptionPlain.slice(0, 250),
        "thumbnailUrl": [video.poster_url],
        "uploadDate": new Date().toISOString(), // Fallback to current date if missing from API
        "duration": durationISO,
        "contentUrl": video.document.file_url || undefined,
        "embedUrl": video.demo_link || undefined,
        "interactionStatistic": {
            "@type": "InteractionCounter",
            "interactionType": { "@type": "http://schema.org/WatchAction" },
            "userInteractionCount": video.view_count
        },
        "publisher": {
            "@type": "Organization",
            "name": "Soff.uz",
            "logo": {
                "@type": "ImageObject",
                "url": "https://soff.uz/static/img/soff/logo-dark.png"
            }
        }
    };

    // Breadcrumb Schema
    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Asosiy",
                "item": "https://soff.uz"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Video darslar",
                "item": "https://soff.uz/video-lessons"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": video.title,
                "item": pageUrl
            }
        ]
    };

    return (
        <>
            <Head>
                {/* Structured Data for SEO */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
                />
            </Head>

            <Meta
                title={`${video.title} | Soff.uz`}
                description={descriptionPlain.slice(0, 160)}
                image={video.poster_url}
                url={pageUrl}
                type="video.other"
                keywords={video.tag}
            >
                {/* Additional SEO meta tags */}
                <meta property="og:video:duration" content={String(video.document.content_duration || '')} />
                <meta name="twitter:label1" content="Davomiyligi" />
                <meta name="twitter:data1" content={video.document.content_duration} />
                <meta name="twitter:label2" content="Ko'rishlar soni" />
                <meta name="twitter:data2" content={String(video.view_count)} />
            </Meta>

            <PageContainer withFooter={true}>
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
        </>
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

        if (error.response?.status === 404) {
            return { notFound: true };
        }

        return {
            notFound: true,
        };
    }
};

export default React.memo(VideoDetailPage);

