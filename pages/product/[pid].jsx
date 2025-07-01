import React, { useEffect, useRef } from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import { baseUrl } from '~/repositories/Repository';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import Joyride from 'react-joyride';
import FileProductsDetails from '~/components/details-components/file-products-detail/details-page';
import ThreeDesignProductsDetails from '~/components/details-components/templates-details/details-page';
import WebSitesProductsDetails from '~/components/details-components/website-products-details/details-page';
import VideosProductsDetails from '~/components/details-components/video-tutorials/details-page';
import RedesignProduct from '~/components/elements/products/Redesign/Redesign-Product';
import WebsitesProduct from '~/components/elements/products/WebsitesProduct';
import DesignDevelopmentProducts from '~/components/elements/products/DesignDevelopmentProducts';
import VideoLessonsProducts from '~/components/elements/products/VideoLessonsProducts';
import SwiperPages from '~/components/details-components/swiper/swiper-page';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import SkeletonProductDetail from '~/components/elements/skeletons/SkeletonProductDetail';
import * as cookie from 'cookie';
import AISoffiaPresentation from '~/components/elements/AISoffiaPresentation';
import ModelAndDesignProduct from '~/components/elements/products/ModelAndDesignProduct';
import Axios from 'axios';
import { Spin } from 'antd';


export default function ProductDefaultPage ({
    defaultProducts,
}) {
    const router = useRouter();
    const { pid } = router.query;
    const [isPlay, setIsPlay] = useState(null);

   const [similarProduct, setSimilarProduct] = useState([]);
    const [hasLoadedSimilar, setHasLoadedSimilar] = useState(false);
    const similarRef = useRef();

    const fetchSimilarProducts = async () => {
        try {
            const { data } = await Axios.get(`${baseUrl}customer/similar/${pid}/`);
            setSimilarProduct(data);
        } catch (error) {
            console.error("Oxshash mahsulotlarni olishda xatolik:", error);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting && !hasLoadedSimilar) {
                    fetchSimilarProducts();
                    setHasLoadedSimilar(true);
                }
            },
            { threshold: 0.2 }
        );

        if (similarRef.current) {
            observer.observe(similarRef.current);
        }

        return () => {
            if (similarRef.current) {
                observer.unobserve(similarRef.current);
            }
        };
    }, [pid]); 



    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

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
                // similar={similar}
                product={defaultProducts}
            />
        ),
    };
    // const productsDetailsSimilar = {
    //     'file': similarProduct?.map((item, index) => (
    //         <RedesignProduct product={item} key={index} />
    //     )),
    //     '3d': [
    //         <ModelAndDesignProduct product={similarProduct} key='3d' />,
    //     ],
    //     'template': similarProduct?.map((item, index) => (
    //         <DesignDevelopmentProducts product={item} key={index} />
    //     )),
    //     'website': similarProduct?.map((item, index) => (
    //         <DesignDevelopmentProducts key={index} product={item} />
    //     )),
    //     'design': similarProduct?.map((item, index) => (
    //         <DesignDevelopmentProducts key={index} product={item} />
    //     )),
    //     'video': similarProduct?.map((item, index) => (
    //         <VideoLessonsProducts product={item} key={index} />
    //     )),
    // };

    return (
        <>
            <PageContainer
                footer={<FooterDefault />}
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
                                : `${defaultProducts?.title} + ${
                                      defaultProducts?.tag
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
                                : `${defaultProducts?.title} + ${
                                      defaultProducts?.tag
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
                                : `${defaultProducts?.title} + ${
                                      defaultProducts?.tag
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

                <div>
                    <div className='container' style={{ position: 'relative' }}>
                        <div
                            className={`ps-page--product ${
                                defaultProducts?.price === 0 ? '' : 'pt-2'
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
                                {defaultProducts?.document?.content_type == 'file' && <AISoffiaPresentation />}
                                
                                {defaultProducts  && (
                                    <div ref={similarRef} className=' my-5'>
                                        <h3
                                            style={{
                                                fontSize: '25px',
                                                fontWeight: 400,
                                            }}
                                            className='py-4 similar_title'>
                                            O’xshash mahsulotlar
                                        </h3>
                                        {hasLoadedSimilar ? (
                                            <SwiperPages type={defaultProducts?.document?.content_type}>
                                                {similarProduct.map((item, index) => (
                                                    <DesignDevelopmentProducts product={item} key={index} />
                                                ))}
                                            </SwiperPages>
                                        ) : (
                                            <div className=' d-flex justify-content-center align-items-center py-5'>
                                                <Spin size='large'/>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </PageContainer>
        </>
    );
}

export async function getServerSideProps ({ query, req }) {
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
