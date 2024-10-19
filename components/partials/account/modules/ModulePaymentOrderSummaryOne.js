import React, { useState } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import ProductRepository from '~/repositories/ProductRepository';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { addPeriodToThousands } from '../ProductsLists';
import axios from 'axios';
import { baseUrl } from '~/repositories/Repository';

const ModulePaymentOrderSummaryOne = () => {
    const Router = useRouter();
    const { type, slug, id } = Router.query;
    const [data, setData] = useState(null);
    const [percentage, setPercentage] = useState(0);

    async function getPercentage() {
        if (type !== 'playlist') {
            const responseData = await ProductRepository.getOrderPercentage();
            if (responseData) {
                setPercentage(responseData?.data?.percentage);
            }
        } else {
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
        if (type !== 'playlist') {
            const res = await ProductRepository.postCartData([id]);
            setData(res?.data?.data?.[0]);
        }
        if (type === 'playlist') {
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
    };

    useEffect(() => {
        getOneProductData();
        getPercentage();
    }, [slug, id]);

    const hisob = addPeriodToThousands(
        data?.discount_price + Math.floor(data?.discount_price * percentage)
    );
    const hisobb = addPeriodToThousands(
        Math.floor(data?.discount_price * percentage)
    );

    return (
        <div className="ps-block--checkout-order">
            <h3>Buyurtma mahsulotlari</h3>
            <div className="shot">
                <div
                    className="ps-block__content checkoutstep-0"
                    style={{ backgroundColor: 'transparent' }}>
                    {data && type !== 'playlist' ? (
                        <figure>
                            <p>Mahsulot</p>
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
                                <p>Narxi</p>
                                <div></div>
                                <strong>
                                    {addPeriodToThousands(data?.discount_price)}{' '}
                                    so'm
                                </strong>
                            </div>
                        </figure>
                    ) : type === 'playlist' ? (
                        <figure>
                            <p>To'plam</p>
                            <div className="my-2">
                                <Link
                                    href={`/product/${data?.playlist_document?.[0]?.slug}`}>
                                    <a>
                                        <strong>{data?.title}</strong>
                                    </a>
                                </Link>
                            </div>
                            <span className="product_type  ">
                                {data?.playlist_document?.length} ta video
                            </span>
                            <div className="product_price_click my-3">
                                <p>Narxi</p>
                                <div></div>
                                <strong>
                                    {addPeriodToThousands(data?.price)} so'm
                                </strong>
                            </div>
                        </figure>
                    ) : (
                        <figure className="ps-block__total">
                            <p>Mahsulot yo'q.</p>;
                        </figure>
                    )}
                </div>
                <div className="checkout_footer">
                    {data && type !== 'playlist' && (
                        <figure>
                            {percentage > 0 && (
                                <div className="product_price_click my-3">
                                    <p>Xizmat haqi uchun</p>
                                    <div></div>
                                    <strong>
                                        {hisobb} so`m{' '}
                                        {`(${percentage * 100} %)`}
                                    </strong>
                                </div>
                            )}
                            <figcaption className="product_price_click_all">
                                <strong>Jami narx</strong>
                                <div></div>
                                <strong>{hisob} so'm </strong>
                            </figcaption>
                        </figure>
                    )}
                    {data?.slug ? (
                        <Link href={`/product/${data?.slug}`}>
                            <a>
                                <div className="prevev_button">
                                    {' '}
                                    <i className="fa-solid fa-angles-left"></i>{' '}
                                    orqaga
                                </div>
                            </a>
                        </Link>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    );
};
export default connect((state) => state)(ModulePaymentOrderSummaryOne);
