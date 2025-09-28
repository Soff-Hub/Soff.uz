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
import Axios from 'axios';
import { Skeleton } from 'antd';
import { useDispatch } from 'react-redux';
import { setShowFastDownload } from '~/store/fast-dowload/slice';
import ProductCard from '~/entities/product/product-card';

export default function ProductDefaultPage({ defaultProducts }) {
    const router = useRouter();
    const { pid } = router.query;
    const [isPlay, setIsPlay] = useState(null);

    const [initialDelayPassed, setInitialDelayPassed] = useState(false);
    const [similarProduct, setSimilarProduct] = useState([]);
    const [hasLoadedSimilar, setHasLoadedSimilar] = useState(false);
    const [lastAdded, setLastAdded] = useState()
    const [lastLoading, setLastLoading] = useState(false)
    const similarRef = useRef();
    const dispatch = useDispatch();

    const contentType = defaultProducts?.document?.content_type;

    useEffect(() => {
        dispatch(setShowFastDownload(false));

        return () => {
            dispatch(setShowFastDownload(true));
        };
    }, [dispatch])

    useEffect(() => {
        const timer = setTimeout(() => {
            setInitialDelayPassed(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);
    const fetchSimilarProducts = async () => {
        try {
            const { data } = await Axios.get(`${baseUrl}customer/similar/${pid}/`);
            setSimilarProduct(data);

        } catch (error) {
            console.error('Oxshash mahsulotlarni olishda xatolik:', error);
        }
    };

    useEffect(() => {
        if (!initialDelayPassed) return; // delay tugamaguncha observer ishlamasin

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting && !hasLoadedSimilar) {
                    fetchSimilarProducts();
                    setHasLoadedSimilar(true);
                }
            },
            {
                threshold: 0.2,
            }
        );

        if (similarRef.current) {
            observer.observe(similarRef.current);
        }

        return () => {
            if (similarRef.current) {
                observer.unobserve(similarRef.current);
            }
        };
    }, [initialDelayPassed, pid]); // observer faqat delaydan keyin ishga tushadi

    useEffect(() => {
        const fetchLastAdded = async () => {
            setLastLoading(true)
            try {
                const { data } = await Axios.get(`${baseUrl}customer/last-added?direction=${contentType}&limit=${contentType == "3d" ? "4" : '6'}`)
                setLastAdded(data)
            } catch (error) {
            }
            finally {
                setLastLoading(false)
            }
        }
        fetchLastAdded()
    }, [])

    const removeHTMLTags = html => {
        return html.replace(/<[^>]+>/g, '');
    };

    const [run, setRun] = useState(false);
    const [steps, setSteps] = useState([
        {
            target: '.product-short-view',
            content: 'Bu yerda mahsulotning bir qismi joylashgan.',
            disableBeacon: false,
        },
        // {
        //     target: '.product-description',
        //     content: 'Bu esa mahsulotning batafsil tavsifi.',
        // },
        {
            target: '.product-price-section',
            content:
                'Bu yerda narxi va sotib olish tugmasi bor. Bosib sotib olasiz.',
        },
    ]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setRun(true);
        }, 2400);

        return () => clearTimeout(timer);
    }, []);

    const joyrideFeature = run && (
        <Joyride
            steps={steps}
            run={run}
            continuous={true}
            showProgress={false}
            styles={{
                options: {
                    arrowColor: '#e3ffeb',
                    primaryColor: '#00A44F',
                    textColor: '#004a14',
                    width: 300,
                },
            }}
            locale={{
                back: 'Oldingisi',
                last: 'Tushundim',
                close: 'Yopish',
                next: 'Keyingisi',
                open: 'Ochish',
                skip: 'Bilaman',
            }}
        />
    );


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


    return (
        <>
            <PageContainer
                title={defaultProducts ? defaultProducts?.title : 'Loading...'}
                boxed={true}>
                <Head>
                    <title>
                        {defaultProducts?.title ||
                            'Soff.uz - Intellektual mulk marketi'}
                    </title>
                    <meta
                        name='title'
                        content={
                            defaultProducts?.title ||
                            'soff.uz - Intellektual mulk marketi'
                        }
                    />
                    <meta
                        name='description'
                        content={
                            defaultProducts?.description
                                ? removeHTMLTags(defaultProducts?.description)
                                : `${defaultProducts?.title} + ${defaultProducts?.tag
                                    ?.map(e => e?.name)
                                    ?.join(', ') ||
                                'soff.uz - Intellektual mulk marketi'
                                } `
                        }
                    />
                    <meta name='robots' content='index, follow' />
                    <meta
                        name='image'
                        content={
                            defaultProducts?.poster_url ||
                            '../../static/img/soff/logo-dark.png'
                        }
                    />
                    <meta
                        name='keywords'
                        content={
                            defaultProducts?.tag
                                ? defaultProducts?.tag
                                    ?.map(e => e?.name)
                                    ?.join(', ')
                                : 'kurs ishi, taqdimotlar, slaydlar, diplom ishi, prezentatsiya'
                        }
                    />

                    <meta property='og:type' content='website' />
                    <meta
                        property='og:title'
                        content={
                            defaultProducts?.title ||
                            'soff.uz - Intellektual mulk marketi'
                        }
                    />
                    <meta
                        property='og:description'
                        content={
                            defaultProducts?.description
                                ? removeHTMLTags(defaultProducts?.description)
                                : `${defaultProducts?.title} + ${defaultProducts?.tag
                                    ?.map(e => e?.name)
                                    ?.join(', ') ||
                                'soff.uz - Intellektual mulk marketi'
                                } `
                        }
                    />
                    <meta
                        property='og:image'
                        content={
                            defaultProducts?.poster_url ||
                            '../../static/img/soff/logo-dark.png'
                        }
                    />
                    <meta property='og:url' content='https://soff.uz' />
                    <meta property='og:site_name' content='soff.uz' />
                    <meta
                        property='og:keywords'
                        content={
                            defaultProducts?.tag
                                ? defaultProducts?.tag
                                    ?.map(e => e?.name)
                                    ?.join(', ')
                                : 'kurs ishi, taqdimotlar, slaydlar, diplom ishi, prezentatsiya'
                        }
                    />

                    <meta
                        property='twitter:image'
                        content={
                            defaultProducts?.poster_url ||
                            '../../static/img/soff/logo-dark.png'
                        }></meta>
                    <meta property='twitter:type' content='website' />
                    <meta
                        property='twitter:title'
                        content={
                            defaultProducts?.title ||
                            'soff.uz - Intellektual mulk marketi'
                        }
                    />
                    <meta
                        property='twitter:description'
                        content={
                            defaultProducts?.description
                                ? removeHTMLTags(defaultProducts?.description)
                                : `${defaultProducts?.title} + ${defaultProducts?.tag
                                    ?.map(e => e?.name)
                                    ?.join(', ') ||
                                'soff.uz - Intellektual mulk marketi'
                                } `
                        }
                    />
                    <meta property='twitter:url' content='https://soff.uz' />
                    <meta property='twitter:site_name' content='soff.uz' />
                    <meta
                        property='twitter:keywords'
                        content={
                            defaultProducts?.tag
                                ? defaultProducts?.tag
                                    ?.map(e => e?.name)
                                    ?.join(', ')
                                : 'kurs ishi, taqdimotlar, slaydlar, diplom ishi, prezentatsiya'
                        }
                    />
                </Head>

                {joyrideFeature}

                <div >
                    <div className='container' style={{ position: 'relative' }}>
                        <div
                            className={`ps-page--product ${defaultProducts?.price === 0 ? '' : 'pt-2'
                                }`}>
                            <div className='ps-container p-0'>
                                <div className='ps-page__container'>
                                    {!defaultProducts && (
                                        <SkeletonProductDetail />
                                    )}
                                    {
                                        productsDetails[
                                        defaultProducts?.document
                                            ?.content_type
                                        ]
                                    }
                                </div>
                                {defaultProducts?.document?.content_type ==
                                    'file' && <AISoffiaPresentation />}

                                {similarProduct && (
                                    <div ref={similarRef} className="my-5">
                                        <h3
                                            style={{
                                                fontSize: '25px',
                                                fontWeight: 400,
                                            }}
                                            className="py-4 similar_title"
                                        >
                                            O’xshash mahsulotlar
                                        </h3>
                                        {hasLoadedSimilar ? (
                                            <div className='row px-1 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-gap-4'>
                                                {similarProduct?.map((item, index) =>
                                                    <div className='col px-3' key={item?.id}>
                                                        <ProductCard product={item} />
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="row g-5 py-3 justify-content-center">
                                                {Array.from({ length: 12 }).map((_, index) => (
                                                    <div
                                                        key={index}
                                                        className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2  mb-3 d-flex justify-content-center"
                                                    >
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
                                        )}
                                    </div>
                                )}
                                <h3
                                    style={{
                                        fontSize: '25px',
                                        fontWeight: 400,
                                    }}
                                    className='py-4 similar_title'>
                                    So'ngi yuklangan mahsulotlar
                                </h3>
                                {
                                    lastLoading ? (
                                        <div className='row g-3 py-3'>
                                            {Array.from({ length: 6 }).map((_, index) => (
                                                <div
                                                    key={index}
                                                    className='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4 d-flex justify-content-center'>
                                                    <Skeleton.Input
                                                        active
                                                        style={{
                                                            width: 250,
                                                            height: 300,
                                                            borderRadius: 8,
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        lastAdded && (
                                            <div className='row px-1 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-gap-4'>
                                                {lastAdded?.results?.map((p, i) => (
                                                    <div key={p?.id} className="col px-3">
                                                        <ProductCard product={p} />
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </PageContainer>
        </>
    );
}

export async function getServerSideProps({ query, req }) {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token;

    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const resquest = await fetch(`${baseUrl}customer/documents/${query.pid}/`, {
        headers,
    });

    const defaultProducts = await resquest.json();
    return {
        props: {
            defaultProducts,
        },
    };
}
