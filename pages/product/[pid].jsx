import React, {
    useRef,
    useState,
    useMemo,
    useEffect,
    useCallback,
} from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import { baseUrl } from '~/repositories/Repository';
import Meta from '~/shared/ui/meta';
// import * as cookie from 'cookie';
// import { getOrCreateDeviceId } from '~/shared/utilities/device-id';
import dynamic from 'next/dynamic';
import { useTimeManager } from '~/shared/hooks/useTimeManager';
import { safeLocalStorage } from '~/shared/utilities/safe-local-storage';

const video_url = 'https://www.youtube.com/watch?v=oJre9mbRE2U';

// Lazy load ProductVideoBanner
const ProductVideoBanner = dynamic(
    () => import('~/shared/components/product-video-banner'),
    {
        ssr: false,
        loading: () => <div style={{ height: '80px', background: '#f0f0f0', marginBottom: '20px', borderRadius: '8px' }} className="container" />
    }
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

const PurchaseRecommendations = dynamic(
    () => import('~/features/product-details/ui/purchase-recommendations'),
    { ssr: false }
);

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

const steps = [
    {
        target: '.product-short-view',
        content: 'Bu yerda mahsulotning bir qismi joylashgan.',
        disableBeacon: false,
    },
    {
        target: '.product-price-section',
        content:
            'Bu yerda narxi va sotib olish tugmasi bor. Bosib sotib olasiz.',
    },
];

const joyrideLocales = {
    back: 'Oldingisi',
    last: 'Tushundim',
    close: 'Yopish',
    next: 'Keyingisi',
    open: 'Ochish',
    skip: 'Bilaman',
};

const productsContentDetails = (contentType) => {
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
            return () => <div>Mahsulot topilmadi</div>;
    }
};

export default function ProductDefaultPage({ defaultProducts }) {
    const [isPlay, setIsPlay] = useState(null);
    const { startTimeout, stopTimeout } = useTimeManager();
    const [showJoyride, setShowJoyride] = useState(false);
    const similarRef = useRef();
    const lastProductsRef = useRef();
    const contentType = useMemo(
        () => defaultProducts?.document?.content_type,
        [defaultProducts?.document?.content_type]
    );

    const DetailComponent = useMemo(
        () => productsContentDetails(contentType),
        [contentType]
    );

    const shouldShowAISoffia = useMemo(
        () => contentType === 'file',
        [contentType]
    );

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const hasSeenProductTour = safeLocalStorage.getItem(
            'product-tour-completed'
        );
        if (!hasSeenProductTour) {
            const timer = startTimeout(() => {
                setShowJoyride(true);
            }, 2000);
            return () => stopTimeout(timer);
        }
    }, []);

    const metaProps = useMemo(() => {
        const removeHTMLTags = (html) => html.replace(/<[^>]+>/g, '');

        const title =
            defaultProducts?.title || 'Soff.uz - Intellektual mulk marketi';
        const description = defaultProducts?.description
            ? removeHTMLTags(defaultProducts.description)
            : `${defaultProducts?.title || ''} + ${defaultProducts?.tag?.map((e) => e?.name)?.join(', ') ||
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
            safeLocalStorage.setItem('product-tour-completed', 'true');
            setShowJoyride(false);
        }
    }, []);

    return (
        <PageContainer>
            <Meta {...metaProps} />
            <div>
                <ProductVideoBanner
                    videoUrl={video_url}
                    title={`SOFF'da xarid qilishni bilmayapsizmi?`}
                    subtitle={`Taxminan 1 daqiqalik video: mahsulotni qanday sotib olishni ko'rsatadi.`}
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
                            <PurchaseRecommendations />

                            <div ref={similarRef} className="my-5">
                                <h3
                                    style={{
                                        fontSize: '25px',
                                        fontWeight: 400,
                                    }}
                                    className="py-4 similar_title">
                                    O'xshash mahsulotlar
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
                                    So'ngi yuklangan mahsulotlar
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

export async function getServerSideProps({ params }) {
    const { pid } = params;

    if (!pid) {
        return { notFound: true };
    }

    const headers = {
        'Accept': 'application/json',
    };

    let defaultProducts = null;

    try {
        const response = await fetch(`${baseUrl}customer/documents/${pid}/`, {
            headers,
        });

        if (!response.ok) {
            if (response.status === 404) return { notFound: true };
            throw new Error('API request failed');
        }

        defaultProducts = await response.json();
    } catch (error) {
        console.error('Error fetching product for SSR:', error);
        return {
            notFound: true,
        };
    }

    if (!defaultProducts) {
        return { notFound: true };
    }
    return {
        props: {
            defaultProducts,
        },
    };
}
