import React, { useRef } from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import { baseUrl } from '~/repositories/Repository';
import { useState } from 'react';
import Joyride from 'react-joyride';
import * as cookie from 'cookie';
import Meta from '~/components/shared/headers/Meta';
import { getOrCreateDeviceId } from '~/shared/utilities/device-id';
import dynamic from 'next/dynamic';

const LastAddedProducts = dynamic(
    () => import('~/components/details-components/LastAddedProducts'),
    { ssr: false }
);

const SimilarProducts = dynamic(
    () => import('~/components/details-components/SimilarProducts'),
    { ssr: false }
);

const AISoffiaPresentation = dynamic(
    () => import('~/components/elements/AISoffiaPresentation'),
    { ssr: false }
);

const FileProductDetatails = dynamic(
    () =>
        import(
            '~/components/details-components/file-products-detail/details-page'
        ),
    { ssr: true }
);

const ThreeDesignProductDetails = dynamic(
    () =>
        import(
            '~/components/details-components/templates-details/details-page'
        ),
    { ssr: true }
);
const VideosProductDetails = dynamic(
    () =>
        import('~/components/details-components/video-tutorials/details-page'),
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

const productsContentDetails = contentType => {
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
    const similarRef = useRef();
    const contentType = defaultProducts?.document?.content_type;
    const DetailComponent = productsContentDetails(
        defaultProducts?.document?.content_type
    );
    const shouldShowAISoffia =
        defaultProducts?.document?.content_type === 'file';

    const removeHTMLTags = html => {
        return html.replace(/<[^>]+>/g, '');
    };

    return (
        <PageContainer>
            <Meta
                title={
                    defaultProducts?.title ||
                    'Soff.uz - Intellektual mulk marketi'
                }
                description={
                    defaultProducts?.description
                        ? removeHTMLTags(defaultProducts?.description)
                        : `${
                              defaultProducts?.title
                          } + ${defaultProducts?.tag
                              ?.map(e => e?.name)
                              ?.join(', ') ||
                              'soff.uz - Intellektual mulk marketi'} `
                }
                keywords={[
                    { name: defaultProducts?.title },
                    { name: defaultProducts?.slug },
                    ...(defaultProducts?.tag ? defaultProducts?.tag : []),
                    { name: defaultProducts?.seller?.first_name },
                    { name: defaultProducts?.seller?.last_name },
                ]}
                image={
                    defaultProducts?.poster_url ||
                    'https://soff.uz/static/img/soff/logo-dark.png'
                }
                type="product"
                url={
                    typeof window !== 'undefined'
                        ? window.location.href
                        : 'https://soff.uz'
                }
                author={
                    defaultProducts?.seller
                        ? `${defaultProducts?.seller?.first_name} ${defaultProducts?.seller?.last_name}`
                        : 'Soff.uz'
                }
            />
            <div>
                <div
                    className="container mb-5"
                    style={{ position: 'relative' }}>
                    <div
                        className={`ps-page--product ${
                            defaultProducts?.price === 0 ? '' : 'pt-2'
                        }`}>
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
                                    O’xshash mahsulotlar
                                </h3>
                                <SimilarProducts />
                            </div>
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
                <Joyride
                    steps={steps}
                    run={true}
                    continuous={true}
                    showProgress={false}
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
            </div>
        </PageContainer>
    );
}

export async function getServerSideProps({ query, req, res }) {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token;

    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    let defaultProducts = null;
    const deviceId = getOrCreateDeviceId({ req, res });

    try {
        const request = await fetch(
            `${baseUrl}customer/documents/${query.pid}/`,
            {
                headers: {
                    ...headers,
                    'X-Device-ID': deviceId,
                },
            }
        );

        if (request.status === 403 || request.status === 401) {
            throw new Error(
                'Token invalid yoki muddati o‘tgan. Iltimos, qaytadan tizimga kiring.'
            );
        }

        if (request.status === 404) {
            return { notFound: true };
        }
        defaultProducts = await request.json();
    } catch (error) {
        const request = await fetch(
            `${baseUrl}customer/documents/${query.pid}/`,
            {
                headers: {
                    'X-Device-ID': deviceId,
                },
            }
        );

        if (!request.ok) {
            return {
                notFound: true,
            };
        }

        defaultProducts = await request.json();
    }

    return {
        props: {
            defaultProducts,
        },
    };
}
