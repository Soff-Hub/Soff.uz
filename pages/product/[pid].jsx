import React from 'react';
import ProductDetailFullwidth from '~/components/elements/detail/ProductDetailFullwidth';
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

const ProductDefaultPage = ({ defaultProducts }) => {
    const router = useRouter();
    const { pid } = router.query;
    const [views, setViews] = useState('');
    const [product, setProduct] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [isPlay, setIsPlay] = useState(null);
    const [run, setRun] = useState(false);
    const [loading, setLoading] = useState(false);

    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const removeHTMLTags = html => {
        return html.replace(/<[^>]+>/g, '');
    };

    async function getProducts() {
        const token = user?.access;
        setLoading(true);
        try {
            const response = await axios.get(
                baseUrl + `customer/documents/${pid}/`,
                {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : '',
                    },
                }
            );

            setProduct(response?.data);
        } catch (error) {
            console.error('Error fetching document:', error);
        }
        setLoading(false);
    }

    async function getProductSimiller() {
        try {
            const token = user?.access;
            const response = await axios.get(
                baseUrl + `customer/similar/${pid}/`,
                {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : '',
                    },
                }
            );

            const responseDocumentFile = response.data;

            setSimilar(responseDocumentFile);
        } catch (error) {
            console.error('Error fetching document:', error);
        }
    }

    async function getUUID(uuid) {
        const respons = await PostRepository.postProductUUID(pid, uuid);
        if (respons) {
            setViews(respons);
        }
    }

    useEffect(() => {
        if (pid) {
            getProducts();
            getProductSimiller();
        }

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

    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: product?.title ? product?.title : 'Loading...',
        },
    ];

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
        'file': <FileProductsDetails
            product={product} />,
        "3d": <ThreeDesignProductsDetails
            product={product}
        />,
        "template": <ThreeDesignProductsDetails
            product={product}
        />,
        "website": <WebSitesProductsDetails
            product={product}
        />,
        "design": <ThreeDesignProductsDetails
            product={product}
        />,
        "video": <VideosProductsDetails
            isPlay={isPlay}
            setIsPlay={setIsPlay}
            // similar={similar}
            product={product}
        />
    }


    return (
        <>
            <PageContainer
                title={defaultProducts ? defaultProducts?.title : 'Loading...'}>
                {/* <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" /> */}

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
                                : `${defaultProducts?.title ||
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
                                : `${defaultProducts?.title ||
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
                                : `${defaultProducts?.title ||
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
                            className={`ps-page--product ${defaultProducts?.price === 0 ? '' : 'pt-2'
                                }`}>
                            <div className='ps-container p-0'>
                                <div className='ps-page__container'>
                                    {productsDetails[product?.document?.content_type]}
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

export async function getServerSideProps({ query }) {
    const resquest = await fetch(baseUrl + `customer/documents/${query.pid}/`);
    const defaultProducts = await resquest.json();

    return {
        props: {
            defaultProducts,
        },
    };
}

export default ProductDefaultPage;
