import React, { useEffect, useRef } from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import { baseUrl } from '~/repositories/Repository';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';
import Joyride from 'react-joyride';
import FileProductsDetails from '~/components/details-components/file-products-detail/details-page';
import ThreeDesignProductsDetails from '~/components/details-components/templates-details/details-page';
import VideosProductsDetails from '~/components/details-components/video-tutorials/details-page';
import SkeletonProductDetail from '~/components/elements/skeletons/SkeletonProductDetail';
import * as cookie from 'cookie';
import AISoffiaPresentation from '~/components/elements/AISoffiaPresentation';
import { Skeleton } from 'antd';
import ProductCard from '~/entities/product/product-card';
import useResponsive from '~/shared/utilities/useResponsive';
import { useQuery } from '@tanstack/react-query';
import Meta from '~/components/shared/headers/Meta';

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

export default function ProductDefaultPage({ defaultProducts }) {
    const router = useRouter();
    const { query } = router;
    const [isPlay, setIsPlay] = useState(null);
    const { isMobile } = useResponsive();

    const similarRef = useRef();

    const contentType = defaultProducts?.document?.content_type;

    const { data: lastAdded, isLoading: lastLoading } = useQuery({
        queryKey: ['last-products', contentType],
        queryFn: async () => {
            const res = await fetch(
                `${baseUrl}customer/last-added?direction=${contentType}&limit=${
                    contentType == '3d' ? '4' : '6'
                }`
            );
            return await res.json();
        },
    });

    const {
        data: similarProducts,
        isLoading: similarProductsLoading,
        isError: similarProductsError,
    } = useQuery({
        queryKey: ['similar-products', query.pid],
        queryFn: async () => {
            const similarProductsRequest = await fetch(
                `${baseUrl}customer/similar/${query.pid}/`
            );

            return await similarProductsRequest.json();
        },
    });

    let similarProductsContent = null;
    if (similarProductsLoading) {
        similarProductsContent = (
            <div className="row g-5 py-3 justify-content-center">
                {Array.from({ length: 12 }).map((_, index) => (
                    <div
                        key={index}
                        className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2  mb-3 d-flex justify-content-center">
                        <Skeleton.Input
                            active
                            style={{
                                width: '100%',
                                maxWidth: 170,
                                height: '38vw',
                                maxHeight: 230,
                                minHeight: 120,
                                borderRadius: 8,
                            }}
                        />
                    </div>
                ))}
            </div>
        );
    } else if (similarProducts?.length) {
        similarProductsContent = (
            <div className="row px-1 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-gap-4">
                {similarProducts
                    ?.slice(0, isMobile ? 12 : 10)
                    ?.map((item, index) => (
                        <div className="col px-3" key={item?.id}>
                            <ProductCard product={item} />
                        </div>
                    ))}
            </div>
        );
    }

    const removeHTMLTags = (html) => {
        return html.replace(/<[^>]+>/g, '');
    };

    const productsDetails = {
        file: <FileProductsDetails product={defaultProducts} />,
        '3d': <ThreeDesignProductsDetails product={defaultProducts} />,
        template: <ThreeDesignProductsDetails product={defaultProducts} />,
        website: <ThreeDesignProductsDetails product={defaultProducts} />,
        design: <ThreeDesignProductsDetails product={defaultProducts} />,
        video: (
            <VideosProductsDetails
                isPlay={isPlay}
                setIsPlay={setIsPlay}
                product={defaultProducts}
            />
        ),
    };

    console.log('defaultProducts', defaultProducts);

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
                        : `${defaultProducts?.title} + ${
                              defaultProducts?.tag
                                  ?.map((e) => e?.name)
                                  ?.join(', ') ||
                              'soff.uz - Intellektual mulk marketi'
                          } `
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
                                {!defaultProducts && <SkeletonProductDetail />}
                                {
                                    productsDetails[
                                        defaultProducts?.document?.content_type
                                    ]
                                }
                            </div>
                            {defaultProducts?.document?.content_type ==
                                'file' && <AISoffiaPresentation />}

                            {!similarProductsError && (
                                <div ref={similarRef} className="my-5">
                                    <h3
                                        style={{
                                            fontSize: '25px',
                                            fontWeight: 400,
                                        }}
                                        className="py-4 similar_title">
                                        O’xshash mahsulotlar
                                    </h3>
                                    {similarProductsContent}
                                </div>
                            )}
                            <h3
                                style={{
                                    fontSize: '25px',
                                    fontWeight: 400,
                                }}
                                className="py-4 similar_title">
                                So'ngi yuklangan mahsulotlar
                            </h3>
                            {lastLoading ? (
                                <div className="row g-3 py-3">
                                    {Array.from({ length: 6 }).map(
                                        (_, index) => (
                                            <div
                                                key={index}
                                                className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4 d-flex justify-content-center">
                                                <Skeleton.Input
                                                    active
                                                    style={{
                                                        width: 250,
                                                        height: 300,
                                                        borderRadius: 8,
                                                    }}
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                            ) : (
                                lastAdded && (
                                    <div className="row px-1 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-gap-4">
                                        {lastAdded?.results
                                            ?.slice(0, isMobile ? 6 : 5)
                                            ?.map((p, i) => (
                                                <div
                                                    key={p?.id}
                                                    className="col px-3">
                                                    <ProductCard product={p} />
                                                </div>
                                            ))}
                                    </div>
                                )
                            )}
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

export async function getServerSideProps({ query, req }) {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token;

    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    let defaultProducts = null;
    try {
        const request = await fetch(
            `${baseUrl}customer/documents/${query.pid}/`,
            {
                headers,
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
            `${baseUrl}customer/documents/${query.pid}/`
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
