import React, {
    useRef,
    useState,
    useMemo,
    useEffect,
    useCallback,
} from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PageContainer from '~/widgets/layouts/PageContainer';
import { baseUrl } from '~/repositories/Repository';
import * as cookie from 'cookie';
import Meta from '~/shared/ui/meta';
import { getOrCreateDeviceId } from '~/shared/utilities/device-id';
import dynamic from 'next/dynamic';

const video_url = 'https://www.youtube.com/watch?v=oJre9mbRE2U';

// Lazy load ProductVideoBanner
const ProductVideoBanner = dynamic(
    () => import('~/shared/components/product-video-banner'),
    { ssr: false }
);

// Lazy load heavy components
const LastAddedProducts = dynamic(
    () => import('~/features/product-details/ui/last-added-products'),
    { ssr: false }
);

const SimilarProducts = dynamic(
    () => import('~/features/product-details/ui/similar-products'),
    { ssr: false }
);

const AISoffiaPresentation = dynamic(() => import('~/widgets/home/ai-soffia'), {
    ssr: false,
});

// Conditionally load Joyride only when needed (first visit)
const Joyride = dynamic(() => import('react-joyride'), {
    ssr: false,
});

const FileProductDetatails = dynamic(
    () => import('~/features/product-details/ui/file-products/details-page'),
    { ssr: true }
);

const ThreeDesignProductDetails = dynamic(
    () => import('~/features/product-details/ui/templates/details-page'),
    { ssr: true }
);

const VideosProductDetails = dynamic(
    () => import('~/features/product-details/ui/video-tutorials/details-page'),
    { ssr: true }
);

const productsContentDetails = (contentType, t) => {
    switch (contentType) {
        case 'file':
            return FileProductDetatails;
        case '3d':
        case 'template':
        case 'website':
        case 'design':
            return ThreeDesignProductDetails;
        case 'video':
            return VideosProductDetails;
        default:
            return () => <div>{t('productDetail.notFound')}</div>;
    }
};

export default function ProductDefaultPage({ defaultProducts }) {
    const { t } = useTranslation('product-pages');
    const [isPlay, setIsPlay] = useState(null);
    const [showJoyride, setShowJoyride] = useState(false);
    const similarRef = useRef();
    const lastProductsRef = useRef();

    const contentType = useMemo(
        () => defaultProducts?.document?.content_type,
        [defaultProducts?.document?.content_type]
    );

    const DetailComponent = useMemo(
        () => productsContentDetails(contentType, t),
        [contentType, t]
    );

    const steps = useMemo(
        () => [
            {
                target: '.product-short-view',
                content: t('productDetail.joyride.step1'),
                disableBeacon: false,
            },
            {
                target: '.product-price-section',
                content: t('productDetail.joyride.step2'),
            },
        ],
        [t]
    );

    const joyrideLocales = useMemo(
        () => ({
            back: t('productDetail.joyride.back'),
            last: t('productDetail.joyride.last'),
            close: t('productDetail.joyride.close'),
            next: t('productDetail.joyride.next'),
            open: t('productDetail.joyride.open'),
            skip: t('productDetail.joyride.skip'),
        }),
        [t]
    );

    const shouldShowAISoffia = useMemo(
        () => contentType === 'file',
        [contentType]
    );

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const hasSeenProductTour = localStorage.getItem(
            'product-tour-completed'
        );
        if (!hasSeenProductTour) {
            const timer = setTimeout(() => {
                setShowJoyride(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const metaProps = useMemo(() => {
        const removeHTMLTags = (html) => html.replace(/<[^>]+>/g, '');

        const title =
            defaultProducts?.title || 'Soff.uz - Intellektual mulk marketi';
        const description = defaultProducts?.description
            ? removeHTMLTags(defaultProducts.description)
            : `${defaultProducts?.title || ''} + ${
                  defaultProducts?.tag?.map((e) => e?.name)?.join(', ') ||
                  'soff.uz - Intellektual mulk marketi'
              }`;

        const keywords = [
            { name: defaultProducts?.title },
            { name: defaultProducts?.slug },
            ...(defaultProducts?.tag || []),
            { name: defaultProducts?.seller?.first_name },
            { name: defaultProducts?.seller?.last_name },
        ].filter((kw) => kw.name);

        return {
            title,
            description,
            keywords,
            image:
                defaultProducts?.poster_url ||
                'https://soff.uz/static/img/soff/logo-dark.png',
            type: 'product',
            url:
                typeof window !== 'undefined'
                    ? window.location.href
                    : 'https://soff.uz',
            author: defaultProducts?.seller
                ? `${defaultProducts.seller.first_name} ${defaultProducts.seller.last_name}`
                : 'Soff.uz',
        };
    }, [defaultProducts]);

    const containerClassName = useMemo(
        () => `ps-page--product ${defaultProducts?.price === 0 ? '' : 'pt-2'}`,
        [defaultProducts?.price]
    );

    const handleJoyrideCallback = useCallback((data) => {
        if (data.status === 'finished' || data.status === 'skipped') {
            localStorage.setItem('product-tour-completed', 'true');
            setShowJoyride(false);
        }
    }, []);

    return (
        <PageContainer>
            <Meta {...metaProps} />
            <div>
                <ProductVideoBanner
                    videoUrl={video_url}
                    title={t('productDetail.videoBanner.title')}
                    subtitle={t('productDetail.videoBanner.subtitle')}
                />
                {/* Video helper banner */}
                <div
                    className="container mb-5"
                    style={{ position: 'relative' }}>
                    <div className={containerClassName}>
                        <div className="ps-container p-0">
                            <div className="ps-page__container">
                                <DetailComponent
                                    product={defaultProducts}
                                    isPlay={isPlay}
                                    setIsPlay={setIsPlay}
                                />
                            </div>
                            {shouldShowAISoffia && <AISoffiaPresentation />}
                            <div ref={similarRef} className="my-5">
                                <h3
                                    style={{
                                        fontSize: '25px',
                                        fontWeight: 400,
                                    }}
                                    className="py-4 similar_title">
                                    {t(
                                        'productDetail.headings.similarProducts'
                                    )}
                                </h3>
                                <SimilarProducts />
                            </div>
                            <div ref={lastProductsRef}>
                                <h3
                                    style={{
                                        fontSize: '25px',
                                        fontWeight: 400,
                                    }}
                                    className="py-4 similar_title">
                                    {t(
                                        'productDetail.headings.lastAddedProducts'
                                    )}
                                </h3>
                                <LastAddedProducts contentType={contentType} />
                            </div>
                        </div>
                    </div>
                </div>
                {showJoyride && (
                    <Joyride
                        steps={steps}
                        run={showJoyride}
                        continuous={true}
                        showProgress={false}
                        callback={handleJoyrideCallback}
                        styles={{
                            options: {
                                arrowColor: '#e3ffeb',
                                primaryColor: '#00A44F',
                                textColor: '#004a14',
                                width: 300,
                                zIndex: 100,
                            },
                        }}
                        locale={joyrideLocales}
                    />
                )}
            </div>
        </PageContainer>
    );
}

export async function getServerSideProps({ query, req, res, locale }) {
    const { pid } = query;

    if (!pid) {
        return { notFound: true };
    }

    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token;
    const deviceId = getOrCreateDeviceId({ req, res });

    const headers = {
        'X-Device-ID': deviceId,
        'Accept-Language': locale,
        ...(token && { Authorization: `Bearer ${token}` }),
    };

    let defaultProducts = null;

    try {
        const request = await fetch(`${baseUrl}customer/documents/${pid}/`, {
            headers,
        });

        if (request.status === 404) {
            return { notFound: true };
        }

        if (request.status === 403 || request.status === 401) {
            // Retry without auth token
            const retryHeaders = {
                'X-Device-ID': deviceId,
                'Accept-Language': locale,
            };

            const retryRequest = await fetch(
                `${baseUrl}customer/documents/${pid}/`,
                {
                    headers: retryHeaders,
                }
            );

            if (!retryRequest.ok) {
                return { notFound: true };
            }

            defaultProducts = await retryRequest.json();
        } else {
            if (!request.ok) {
                return { notFound: true };
            }
            defaultProducts = await request.json();
        }

        console.log({ request });
    } catch (error) {
        try {
            const fallbackRequest = await fetch(
                `${baseUrl}customer/documents/${pid}/`,
                {
                    headers: {
                        'X-Device-ID': deviceId,
                        'Accept-Language': locale,
                    },
                }
            );

            if (!fallbackRequest.ok) {
                return { notFound: true };
            }

            defaultProducts = await fallbackRequest.json();

            console.log({ fallbackRequest });
        } catch (fallbackError) {
            console.error('Error fetching product:', fallbackError);
            return { notFound: true };
        }
    }

    // Validate that we have product data
    if (!defaultProducts) {
        return { notFound: true };
    }

    return {
        props: {
            defaultProducts,
            ...(await serverSideTranslations(locale, [
                'product-pages',
                'common',
                'modals',
                'header',
                'footer',
            ])),
        },
    };
}
