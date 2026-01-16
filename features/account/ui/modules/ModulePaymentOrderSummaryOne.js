import React, { useState } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import ProductRepository from '~/repositories/ProductRepository';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { addPeriodToThousands } from '../price-formatter';
import axios from 'axios';
import { baseUrl } from '~/repositories/Repository';
import { Skeleton } from 'antd';
import { useTranslation } from 'next-i18next';

const ModulePaymentOrderSummaryOne = () => {
    const { t } = useTranslation('account');
    const Router = useRouter();
    const { type, slug, id } = Router.query;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [percentage, setPercentage] = useState(0);

    async function getPercentage() {
        if (type !== 'playlist') {
            const responseData = await ProductRepository.getOrderPercentage();
            if (responseData) {
                setPercentage(responseData?.data?.percentage);
            }
        } else if (slug) {
            const endPoint = `customer/playlist/${slug}/`;
            try {
                const response = await axios.get(baseUrl + endPoint, {
                    headers: {
                        // Authorization: `Bearer ${user?.access}`,
                    },
                });
                setData(response.data);
            } catch (error) {}
        }
    }

    const getOneProductData = async () => {
        setLoading(true);
        if (type !== 'playlist' && id) {
            const res = await ProductRepository.postCartData([id]);
            setData(res?.data?.data?.[0]);
        }
        if (type === 'playlist' && slug) {
            const endPoint = `customer/playlist/${slug}/`;
            try {
                const response = await axios.get(baseUrl + endPoint, {
                    headers: {
                        // Authorization: `Bearer ${user?.access}`,
                    },
                });
                setData(response.data);
            } catch (error) {}
        }
        setLoading(false);
    };

    useEffect(() => {
        getPercentage();
        getOneProductData();
    }, [slug, id]);

    return (
        <div className="ps-block--checkout-order">
            <h3>{t('checkout.orderProducts')}</h3>
            <div className="shot">
                {data && (
                    <>
                        <div
                            className="ps-block__content checkoutstep-0"
                            style={{ backgroundColor: 'transparent' }}>
                            {data && type !== 'playlist' ? (
                                <figure>
                                    <p>{t('checkout.product')}</p>
                                    <div className="my-2">
                                        <Link href={`/product/${data?.slug}`}>
                                            <a>
                                                <strong>{data?.title}</strong>
                                            </a>
                                        </Link>
                                    </div>
                                    <span className="product_type  ">
                                        {data?.file_type}
                                    </span>
                                    <div className="product_price_click my-3">
                                        <p>{t('checkout.price')}</p>
                                        <div></div>
                                        <strong>
                                            {addPeriodToThousands(
                                                data?.discount_price
                                            )}{' '}
                                            {t('checkout.currency')}
                                        </strong>
                                    </div>
                                </figure>
                            ) : type === 'playlist' ? (
                                <figure>
                                    <p>{t('checkout.playlist')}</p>
                                    <div className="my-2">
                                        <Link
                                            href={`/product/${data?.playlist_document?.[0]?.slug}`}>
                                            <a>
                                                <strong>{data?.title}</strong>
                                            </a>
                                        </Link>
                                    </div>
                                    <span className="product_type  ">
                                        {t('checkout.videosCount', {
                                            count: data?.playlist_document
                                                ?.length,
                                        })}
                                    </span>
                                    <div className="product_price_click my-3">
                                        <p>{t('checkout.price')}</p>
                                        <div></div>
                                        <strong>
                                            {addPeriodToThousands(data?.price)}{' '}
                                            {t('checkout.currency')}
                                        </strong>
                                    </div>
                                </figure>
                            ) : (
                                <figure className="ps-block__total">
                                    <Skeleton active />
                                </figure>
                            )}
                        </div>
                        <div className="checkout_footer">
                            {data && type !== 'playlist' && (
                                <figure>
                                    {percentage > 0 && (
                                        <div className="product_price_click my-3">
                                            <p>
                                                {t('checkout.serviceFeeLabel')}
                                            </p>
                                            <div></div>
                                            <strong>
                                                {addPeriodToThousands(
                                                    Math.floor(
                                                        data?.discount_price *
                                                            percentage
                                                    )
                                                )}{' '}
                                                {t('checkout.currency')}{' '}
                                                {`(${percentage * 100} %)`}
                                            </strong>
                                        </div>
                                    )}
                                    <figcaption className="product_price_click_all">
                                        <strong>
                                            {t('checkout.totalPrice')}
                                        </strong>
                                        <div></div>
                                        <strong>
                                            {addPeriodToThousands(
                                                data?.discount_price +
                                                    Math.floor(
                                                        data?.discount_price *
                                                            percentage
                                                    )
                                            )}{' '}
                                            {t('checkout.currency')}{' '}
                                        </strong>
                                    </figcaption>
                                </figure>
                            )}
                            {data?.slug ? (
                                <Link href={`/product/${data?.slug}`}>
                                    <a>
                                        <div className="prevev_button">
                                            {' '}
                                            <i className="fa-solid fa-angles-left"></i>{' '}
                                            {t('checkout.back')}
                                        </div>
                                    </a>
                                </Link>
                            ) : (
                                ''
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
export default connect((state) => state)(ModulePaymentOrderSummaryOne);
