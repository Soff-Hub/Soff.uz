import React, { useState } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import ProductRepository from '~/repositories/ProductRepository';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ModulePaymentOrderSummaryOne = () => {
    const Router = useRouter();
    const { id } = Router.query;
    const [data, setData] = useState(null);

    const getOneProductData = async () => {
        const res = await ProductRepository.postCartData([id]);
        setData(res?.data?.data?.[0]);
    };

    useEffect(() => {
        getOneProductData();
    }, [id]);

    function addPeriodToThousands(number) {
        const numStr = String(number);

        const [integerPart, decimalPart] = numStr.split('.');

        const formattedIntegerPart = integerPart.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ' '
        );

        const formattedNumber =
            decimalPart !== undefined
                ? `${formattedIntegerPart}.${decimalPart}`
                : formattedIntegerPart;

        return formattedNumber;
    }
    const hisob = addPeriodToThousands(data?.discount_price);

    console.log('data', data);
    return (
        <div className="ps-block--checkout-order">
            <h3>Buyurtma mahsulotlari</h3>
            <div className="shot">
                <div className="ps-block__content">
                    {data ? (
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
                    ) : (
                        <figure className="ps-block__total">
                            <p>Mahsulot yo'q.</p>;
                        </figure>
                    )}
                </div>
                <div className="checkout_footer">
                    {data && (
                        <figure>
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
                                    <i class="fa-solid fa-angles-left"></i>{' '}
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
