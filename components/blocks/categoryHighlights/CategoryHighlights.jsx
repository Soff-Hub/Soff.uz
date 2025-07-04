'use client';

import { Spin } from 'antd';
import Axios from 'axios';
import { useEffect, useState, useMemo } from 'react';
import SwiperPages from '~/components/details-components/swiper/swiper-page';
import DesignDevelopmentProducts from '~/components/elements/products/DesignDevelopmentProducts';
import { useGet } from '~/repositories/https';
import { baseUrl } from '~/repositories/Repository';
import { baseUrlUseApi } from '~/repositories/useApi';

export default function CategoryHighlights () {
    const productDirections = useMemo(
        () => [
            {
                key: 'file',
                direction: 'file',
                title: 'Ilmiy ishlar',
                type: 'file',
            },
            {
                key: '3d',
                direction: '3d',
                title: '3D moddellar va Interier dizaynlar',
                type: '3d',
            },
            {
                key: 'design',
                direction: 'design',
                title: 'Dizayn shablonlar',
                type: 'design',
            },
            {
                key: 'video',
                direction: 'video',
                title: 'Video ishlanmalar',
                type: 'video',
            },
            {
                key: 'template',
                direction: 'template',
                title: 'Tayyor shablonlar',
                type: 'template',
            },
        ],
        []
    );

    const apiQueries = {
        dataFile: useGet(
            'file',
            `${baseUrlUseApi}customer/products/?direction=file&page_size=48`
        ),
        data3d: useGet(
            '3d',
            `${baseUrlUseApi}customer/products/?direction=3d&page_size=48`
        ),
        dataDesign: useGet(
            'design',
            `${baseUrlUseApi}customer/products/?direction=design&page_size=48`
        ),
        dataVideo: useGet(
            'video',
            `${baseUrlUseApi}customer/products/?direction=video&page_size=48`
        ),
        dataTemplate: useGet(
            'template',
            `${baseUrlUseApi}customer/products/?direction=template&page_size=48`
        ),
    };

    // Similar products state
    const [similarProduct, setSimilarProduct] = useState([]);
    const pid = 'rus-tili-va-adabiyoti-sushchnost-iazyka-jego-funktsiidocx';

    // Similar products fetch function
    const fetchSimilarProducts = async () => {
        try {
            const { data } = await Axios.get(
                `${baseUrl}customer/similar/${pid}/`
            );
            setSimilarProduct(data);
        } catch (error) {
            console.error('Oxshash mahsulotlarni olishda xatolik:', error);
        }
    };

    useEffect(() => {
        fetchSimilarProducts();
    }, []);

    // Loading holatini tekshirish
    const isAnyLoading = useMemo(
        () => {
            return Object.values(apiQueries).some(query => query.isLoading);
        },
        Object.values(apiQueries).map(query => query.isLoading)
    );

    // Ma'lumotlarni mapping qilish
    const getDataByKey = key => {
        const dataMap = {
            file: apiQueries.dataFile.data,
            '3d': apiQueries.data3d.data,
            design: apiQueries.dataDesign.data,
            video: apiQueries.dataVideo.data,
            template: apiQueries.dataTemplate.data,
        };
        return dataMap[key];
    };

    const getLoadingByKey = key => {
        const loadingMap = {
            file: apiQueries.dataFile.isLoading,
            '3d': apiQueries.data3d.isLoading,
            design: apiQueries.dataDesign.isLoading,
            video: apiQueries.dataVideo.isLoading,
            template: apiQueries.dataTemplate.isLoading,
        };
        return loadingMap[key];
    };

    // Loading komponenti
    const LoadingComponent = ({ message = "Ma'lumotlar yuklanmoqda..." }) => (
        <div className='d-flex justify-content-center py-5'>
            <div className='d-flex flex-column align-items-center'>
                <Spin size='large' />
                <p className='mt-2 text-muted'>{message}</p>
            </div>
        </div>
    );

    // Bo'sh holat komponenti
    const EmptyComponent = ({
        message = 'Hech qanday mahsulot topilmadi.',
    }) => <p className='text-center py-5 text-muted'>{message}</p>;

    // Mahsulot bo'limini render qilish
    const renderProductSection = ({ key, direction, title, type }) => {
        const data = getDataByKey(key);
        const isLoading = getLoadingByKey(key);
        const hasResults = data?.results?.length > 0;

        return (
            <div key={key} className='products mt-1'>
                <h3 className='mb-3'>{title}</h3>

                {isLoading ? (
                    <LoadingComponent />
                ) : !hasResults ? (
                    <EmptyComponent />
                ) : (
                    <SwiperPages type={type}>
                        {data.results.map((item, index) => (
                            <DesignDevelopmentProducts
                                key={`${key}-${item.id || index}`}
                                product={item}
                            />
                        ))}
                    </SwiperPages>
                )}
            </div>
        );
    };

    // Debug ma'lumotlari (development rejimida)
    const debugInfo = useMemo(() => {
        if (process.env.NODE_ENV !== 'development') return null;

        return {
            loadingStates: Object.keys(apiQueries).reduce((acc, key) => {
                acc[key] = apiQueries[key].isLoading;
                return acc;
            }, {}),
            dataLengths: Object.keys(apiQueries).reduce((acc, key) => {
                acc[key] = apiQueries[key].data?.results?.length || 0;
                return acc;
            }, {}),
            similarProductsCount: similarProduct.length,
        };
    }, [apiQueries, similarProduct]);

    // Agar barcha ma'lumotlar yuklanmagan bo'lsa
    if (isAnyLoading) {
        return <LoadingComponent message='Barcha mahsulotlar yuklanmoqda...' />;
    }

    // Agar hech qanday ma'lumot bo'lmasa
    const hasAnyData = productDirections.some(({ key }) => {
        const data = getDataByKey(key);
        return data?.results?.length > 0;
    });

    if (!hasAnyData && similarProduct.length === 0) {
        return (
            <div className='container p-0'>
                <EmptyComponent message='Hech qanday mahsulot kategoriyasi topilmadi.' />
            </div>
        );
    }

    return (
        <div className='products mt-1'>
            <div className='container p-0'>
                {productDirections.map(renderProductSection)}

                {similarProduct.length > 0 && (
                    <div className='products mt-1'>
                        <h3 className='mb-3 product-list-title'>
                            O'xshash mahsulotlar
                        </h3>
                        <SwiperPages type='similar'>
                            {similarProduct.map((item, index) => (
                                <DesignDevelopmentProducts
                                    key={`similar-${item.id || index}`}
                                    product={item}
                                />
                            ))}
                        </SwiperPages>
                    </div>
                )}
            </div>
        </div>
    );
}
