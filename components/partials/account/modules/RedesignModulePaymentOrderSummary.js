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
        <div className='ps-block--checkout-order  p-xl-0 p-l-0'>
            <div className='shot w-100 shadow_llg'>
                <p className='product_count m-0'>
                    {ecomerce.cartDataItems.length} ta mahsulot
                </p>
                <div
                    className='ps-block__content w-100 hidden-scroll'
                    style={{ backgroundColor: 'transparent' }}>
                    {ecomerce.cartDataItems &&
                    ecomerce.cartDataItems.length > 0 ? (
                        ecomerce.cartDataItems?.map((el, i) => (
                            <div
                                className='sell_card shadow_llg'
                                key={el?.slug}>
                                <img
                                    className='sell_card_img'
                                    src={el.poster_url}
                                    alt='document'
                                />
                                <div className='sell_card_body'>
                                    <Link href={`/product/${el?.slug}`}>
                                        <p className='sell_card_title'>
                                            {el?.title}
                                        </p>
                                    </Link>
                                    <p className='product_type'>
                                        {el?.file_type}
                                    </p>
                                </div>

                                <div className='sell_card_price'>
                                    <a
                                        className='sell_card_delete'
                                        href='#'
                                        onClick={e => handleRemoveItem(e, el)}>
                                        <img
                                            src='/static/img/exitBtn.png'
                                            alt=''
                                        />
                                    </a>
                                    <p className='w-100'>
                                        {addPeriodToThousands(
                                            el?.discount_price
                                        )}
                                        so'm
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <figure className='ps-block__total'>
                            <Skeleton active paragraph={{ rows: 7 }} />
                        </figure>
                    )}
                </div>
            </div>
            <div className='checkout_footer rounded-2 my-5 bg-white shadow_llg'>
                {ecomerce.cartDataItems && ecomerce.cartDataItems.length > 0 && (
                    <div className='total_amount'>
                        <figcaption className='product_price_click_all'>
                            <p>Jami narx</p>
                            <p className='text-end'>{hisob} so'm </p>
                        </figcaption>

                        {percentage > 0 && (
                            <div className='total_amount_service_fee'>
                                <p>Xizmat haqi uchun</p>
                                <p>
                                    {' '}
                                    {hisobb} so`m {`(${percentage * 100} %)`}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
export default connect(state => state)(RedesignModulePaymentOrderSummary);
