import React, { useEffect } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import ProductRepository from '~/repositories/ProductRepository';
import { useState } from 'react';
import { addPeriodToThousands } from '../price-formatter';
import { Skeleton } from 'antd';
import useCart from '~/hooks/useCart';

const RedesignModulePaymentOrderSummary = ({ ecomerce }) => {
    const [percentage, setPercentage] = useState(0);
    const { removeCartOneItem } = useCart();

    let amount = calculateAmount(ecomerce.cartDataItems);
    console.log(ecomerce.cartDataItems);

    async function getPercentage () {
        const responseData = await ProductRepository.getOrderPercentage();
        if (responseData) {
            setPercentage(Number(responseData?.data?.percentage));
        }
    }

    const hisob = addPeriodToThousands(
        amount + Math.floor(amount * percentage)
    );
    const hisobb = addPeriodToThousands(Math.floor(amount * percentage));

    const handleRemoveItem = async (e, item) => {
        e.preventDefault();
        removeCartOneItem(item.id);
    };

    // view
    let listItemsView, totalView;
    if (ecomerce.cartDataItems && ecomerce.cartDataItems.length > 0) {
        listItemsView = ecomerce.cartDataItems?.map((item, i) => (
            <Link href='/' key={item.id}>
                <a>
                    <strong>
                        {i + 1}. {item.title}
                    </strong>
                    <small>
                        {item?.discount === 0 ? (
                            <p>{addPeriodToThousands(item.price)} so'm</p>
                        ) : (
                            <>
                                <del>
                                    {addPeriodToThousands(item.price)} so'm
                                </del>
                                <p>
                                    {addPeriodToThousands(item.discount_price)}{' '}
                                    so'm
                                </p>
                            </>
                        )}
                    </small>
                </a>
            </Link>
        ));
    } else {
        listItemsView = <p>Mahsulot yo'q.</p>;
    }

    totalView = (
        <figure className='ps-block__total'>
            <h3>
                Umumiy hisob:
                <strong>{hisob}.00 so'm </strong>
            </h3>
        </figure>
    );

    useEffect(() => {
        getPercentage();
    }, []);

    return (
        <div className='RedesignModulePaymentOrderSummarySection'>
            <div className='RedesignModulePaymentOrderSummaryWrapper'>
                <p className='RedesignModulePaymentOrderSummary_product_count'>
                    {ecomerce.cartDataItems.length} ta mahsulot
                </p>
                <div
                    className='RedesignModulePaymentOrderSummary_Wrap'
                    style={{ backgroundColor: 'transparent' }}>
                    {ecomerce.cartDataItems &&
                    ecomerce.cartDataItems.length > 0 ? (
                        ecomerce.cartDataItems?.map((el, i) => (
                            <div
                                className='RedesignModulePaymentOrderSummary_Card'
                                key={el?.slug}>
                                <img
                                    className='RedesignModulePaymentOrderSummary_Card_img'
                                    src={el.poster_url}
                                    alt='document'
                                />
                                <div className='RedesignModulePaymentOrderSummary_Card_body'>
                                    <Link href={`/product/${el?.slug}`}>
                                        <p className='RedesignModulePaymentOrderSummary_Card_title'>
                                            {el?.title}
                                        </p>
                                    </Link>
                                    <p className='RedesignModulePaymentOrderSummary_Card_product_type'>
                                        {el?.file_type}
                                    </p>
                                </div>
                                <div className='RedesignModulePaymentOrderSummary_Card_priceBox'>
                                    <p className='RedesignModulePaymentOrderSummary_Card_price'>
                                        {addPeriodToThousands(
                                            el?.discount_price
                                        )}{' '}
                                        so'm
                                    </p>
                                </div>
                                <a
                                    className='RedesignModulePaymentOrderSummary_Card_delete'
                                    href='#'
                                    onClick={e => handleRemoveItem(e, el)}>
                                    <img src='/static/img/exitBtn.png' alt='' />
                                </a>
                            </div>
                        ))
                    ) : (
                        <p className='no-products'>Savatda mahsulot yo'q</p>
                    )}
                </div>
            </div>
            <div className='RedesignModulePaymentOrderSummarySection_info_wrap'>
                {ecomerce.cartDataItems && ecomerce.cartDataItems.length > 0 && (
                    <div className='RedesignModulePaymentOrderSummarySection_info_wrap_total_amount_box'>
                        <figcaption className='RedesignModulePaymentOrderSummarySection_info_wrap_total_amount'>
                            <p className='RedesignModulePaymentOrderSummarySection_info_wrap_total_amount_item'>
                                Jami narx
                            </p>
                            <p className='RedesignModulePaymentOrderSummarySection_info_wrap_total_amount_item'>
                                {hisobb} so`m {`(${percentage * 100} %)`}
                            </p>
                        </figcaption>

                        {percentage > 0 && (
                            <div className='RedesignModulePaymentOrderSummarySection_info_wrap_service_fee'>
                                <p className='RedesignModulePaymentOrderSummarySection_info_wrap_service_fee_item'>Xizmat haqi uchun</p>
                                <p className='RedesignModulePaymentOrderSummarySection_info_wrap_service_fee_item'> {hisob} so'm </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
export default connect(state => state)(RedesignModulePaymentOrderSummary);
