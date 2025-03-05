import React from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import { baseUrl } from '~/repositories/Repository';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import PostRepository from '~/repositories/PostRepository';
import axios from 'axios';
import Head from 'next/head';
import Joyride from 'react-joyride';
import { setOneShopDoc } from '~/store/auth/slice';
import Script from 'next/script';
import FileProductsDetails from '~/components/details-components/file-products-detail/details-page';
import ThreeDesignProductsDetails from '~/components/details-components/templates-details/details-page';
import WebSitesProductsDetails from '~/components/details-components/website-products-details/details-page';
import VideosProductsDetails from '~/components/details-components/video-tutorials/details-page';
import { useGet } from '~/repositories/https';
import RedesignProduct from '~/components/elements/products/Redesign/Redesign-Product';
import WebsitesProduct from '~/components/elements/products/WebsitesProduct';
import DesignDevelopmentProducts from '~/components/elements/products/DesignDevelopmentProducts';
import VideoLessonsProducts from '~/components/elements/products/VideoLessonsProducts';
import SwiperPages from '~/components/details-components/swiper/swiper-page';
import { Skeleton } from 'antd';

const ProductDefaultPage = ({ defaultProducts }) => {
    const router = useRouter();
    const { pid } = router.query;
    const [views, setViews] = useState('');
    const [isPlay, setIsPlay] = useState(null);
    const [run, setRun] = useState(false);
    const { data: product, isLoading } = useGet(
        'productsDetails',
        `customer/documents/${pid}/`,
        undefined,
        { enabled: Boolean(pid) }
    );
    const { data: similarProduct } = useGet(
        'productSimilar',
        `customer/similar/${pid}/`,
        undefined,
        { enabled: Boolean(pid) }
    );

    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const removeHTMLTags = html => {
        return html.replace(/<[^>]+>/g, '');
    };

    async function getUUID (uuid) {
        const respons = await PostRepository.postProductUUID(pid, uuid);
        if (respons) {
            setViews(respons);
        }
    }

    useEffect(() => {
        {
            /* Yandex reklama kodi */
        }
        if (window.yaContextCb) {
            window.yaContextCb.push(() => {
                Ya.Context.AdvManager.render({
                    blockId: 'R-A-13331140-3',
                    renderTo: 'yandex_rtb_R-A-13331140-3',
                });
            });
        }

        {
            /* Yandex reklama kodi */
        }
        if (window.yaContextCb) {
            window.yaContextCb.push(() => {
                Ya.Context.AdvManager.render({
                    blockId: 'R-A-13331140-2',
                    renderTo: 'yandex_rtb_R-A-13331140-2',
                });
            });
        }
    }, [user?.access, pid]);

    useEffect(() => {
        if (product?.slug) {
            if (pid) {
                localStorage.getItem('uuid')
                    ? ''
                    : localStorage.setItem('uuid', uuidv4() + product?.slug);
            }
        }
    }, [product]);

    useEffect(() => {
        if (product?.slug) {
            getUUID(
                localStorage.getItem('uuid')
                    ? localStorage.getItem('uuid')
                    : uuidv4() + product?.slug
            );
        }
    }, [pid, product?.slug]);

    console.log(similarProduct);

    const steps = [
        {
            target: '.buystep-0',
            content: "Mahsulot sotib olish bo'yicha yordam kerakmi?",
            locale: {
                close: 'Yopish',
                next: 'Ha, albatta',
                open: '5',
            },
            placement: 'top',
        },
        {
            target: '.buystep-1',
            content:
                "Mahsulotni savatga qo'shib bir nechta mahsulotni bittada sotib oling!",
        },
        {
            target: '.buystep-2',
            content: 'Mahsulotni hoziroq sotib oling',
        },
    ];

    const callbackSingle = data => {
        if (data.action === 'reset' || data.action === 'close') {
            const doc = document.querySelector('.headerSticky');
            doc.id = 'headerSticky';
            setRun(false);
            if (user?.access) {
                dispatch(setOneShopDoc(product));
                router.push(`/account/checkout-one?id=${product?.id}`);
            } else {
                router.push(`/auth/login?id=${product?.id}`);
            }
        }
    };

    const handleClickStepper = () => {
        const doc = document.querySelector('.headerSticky');
        doc.id = '';

        setTimeout(() => {
            setRun(true);
        }, 500);
    };

    const productsDetails = {
        file: <FileProductsDetails product={product} />,
        '3d': <ThreeDesignProductsDetails product={product} />,
        template: <ThreeDesignProductsDetails product={product} />,
        website: <WebSitesProductsDetails product={product} />,
        design: <ThreeDesignProductsDetails product={product} />,
        video: (
            <VideosProductsDetails
                isPlay={isPlay}
                setIsPlay={setIsPlay}
                // similar={similar}
                product={product}
            />
        ),
    };
    const productsDetailsSimilar = {
        file: similarProduct?.map((item, index) => (
            <RedesignProduct product={item} key={index} />
        )),
        '3d': [
            <ThreeDesignProductsDetails product={similarProduct} key='3d' />,
        ],
        template: similarProduct?.map((item, index) => (
            <DesignDevelopmentProducts product={item} key={index} />
        )),
        website: similarProduct?.map((item, index) => (
            <WebsitesProduct key={index} product={item} />
        )),
        design: similarProduct?.map((item, index) => (
            <DesignDevelopmentProducts key={index} product={item} />
        )),
        video: similarProduct?.map((item, index) => (
            <VideoLessonsProducts product={item} key={index} />
        )),
    };

    return (
        <>
            <PageContainer
                title={defaultProducts ? defaultProducts?.title : 'Loading...'}>
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
                                : `${
                                      defaultProducts?.title ||
                                      'soff.uz - Intellektual mulk marketi'
                                  } `
                        }
                    />
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
                                : `${
                                      defaultProducts?.title ||
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
                                : `${
                                      defaultProducts?.title ||
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

                <div className='container'>
                    {/* Yandex reklama kodi */}
                    <div id='yandex_rtb_R-A-13331140-2'></div>
                    {/* Yandex scriptni yuklash */}
                    <Script
                        src='https://yandex.ru/ads/system/context.js'
                        strategy='lazyOnload'
                        onLoad={() => {
                            if (window.yaContextCb) {
                                window.yaContextCb.push(() => {
                                    Ya.Context.AdvManager.render({
                                        blockId: 'R-A-13331140-2',
                                        renderTo: 'yandex_rtb_R-A-13331140-2',
                                    });
                                });
                            }
                        }}
                    />
                </div>
                {/* <div> */}
                <div>
                    <div className='container' style={{ position: 'relative' }}>
                        <div className='text-end m-0'>
                            {defaultProducts?.discpunt_price === 0 && (
                                <p
                                    onClick={handleClickStepper}
                                    style={{ cursor: 'pointer', margin: 0 }}>
                                    Sotib olish bo'yicha qo'llanma
                                </p>
                            )}
                        </div>

                        <Joyride
                            steps={steps}
                            run={run}
                            continuous
                            floaterProps={{
                                autoOpen: true,
                                placement: 'right-start',
                                offset: 0,
                            }}
                            styles={{
                                options: {
                                    arrowColor: '#e3ffeb',
                                    primaryColor: '#00A44F',
                                    textColor: '#004a14',
                                    padding: '0 !important',
                                    width: 300,
                                },
                            }}
                            callback={callbackSingle}
                            locale={{
                                back: 'Oldingisi',
                                last: 'Tushundim',
                                close: 'Yopish',
                                next: 'Tushundim',
                                open: 'Ochish',
                            }}
                        />

                        <div
                            className={`ps-page--product ${
                                defaultProducts?.price === 0 ? '' : 'pt-2'
                            }`}>
                            <div className='ps-container p-0'>
                                {isLoading && (
                                    <div className='mt-5'>
                                        <Skeleton.Button
                                            active
                                            size={'large'}
                                            shape={'buttonShape'}
                                            block={'block'}
                                            para
                                            style={{height:'100px'}}
                                        />
                                        <Skeleton.Input
                                            active={'active'}
                                            size={'Defoult'}
                                            className='mt-2'
                                            style={{width:'500px'}}

                                        />
                                        <div className='d-flex gap-5 flex-wrap mt-5'>
                                            <Skeleton.Image 
                                                active={'active'}
                                                style={{
                                                    width: '785px',
                                                    height: '615px',
                                                }}
                                                className='mt-2'
                                            />
                                            <Skeleton.Input
                                                active={'active'}
                                                style={{
                                                    width: '550px',
                                                    height: '615px',
                                                }}
                                                className='mt-2'
                                            />
                                            <Skeleton.Input
                                                active={'active'}
                                                style={{
                                                    width: '785px',
                                                    height: '150px',
                                                }}
                                                className='mt-2'
                                            />
                                            <Skeleton.Input
                                                active={'active'}
                                                style={{
                                                    width: '550px',
                                                    height: '300px',
                                                }}
                                                className='mt-2'
                                            />
                                        </div>
                                    </div>
                                     )}
                                <div className='ps-page__container'>
                                    {
                                        productsDetails[
                                            product?.document?.content_type
                                        ]
                                    }
                                </div>
                                <div className=' my-5'>
                                    <h3
                                        style={{
                                            fontSize: '25px',
                                            fontWeight: 400,
                                        }}
                                        className='py-4 similar_title'>
                                        O’xshash mahsulotlar
                                    </h3>
                                    <SwiperPages
                                        type={product?.document?.content_type}>
                                        {
                                            productsDetailsSimilar[
                                                product?.document?.content_type
                                            ]
                                        }
                                    </SwiperPages>
                                </div>

                                {/* Yandex reklama kodi */}
                                <div id='yandex_rtb_R-A-13331140-3'></div>
                                {/* Yandex scriptni yuklash */}
                                <Script
                                    src='https://yandex.ru/ads/system/context.js'
                                    strategy='lazyOnload'
                                    onLoad={() => {
                                        if (window.yaContextCb) {
                                            window.yaContextCb.push(() => {
                                                Ya.Context.AdvManager.render({
                                                    blockId: 'R-A-13331140-3',
                                                    renderTo:
                                                        'yandex_rtb_R-A-13331140-3',
                                                });
                                            });
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </PageContainer>
        </>
    );
};

export async function getServerSideProps ({ query }) {
    const resquest = await fetch(baseUrl + `customer/documents/${query.pid}/`);
    const defaultProducts = await resquest.json();

    return {
        props: {
            defaultProducts,
        },
    };
}

export default ProductDefaultPage;
