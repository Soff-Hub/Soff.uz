import React, { useEffect } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { calculateAmount } from '~/utilities/ecomerce-helpers';

const ModulePaymentOrderSummary = ({ ecomerce }) => {
    let amount = calculateAmount(ecomerce.cartDataItems);

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
    const hisob = addPeriodToThousands(amount);

    // view
    let listItemsView, totalView;
    if (ecomerce.cartDataItems && ecomerce.cartDataItems.length > 0) {
        listItemsView = ecomerce.cartDataItems?.map((item, i) => (
            <Link href="/" key={item.id}>
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
        <figure className="ps-block__total">
            <h3>
                Umumiy hisob:
                <strong>{hisob}.00 so'm </strong>
            </h3>
        </figure>
    );

    return (
        <div className="ps-block--checkout-order">
             <h3>Buyurtma mahsulotlari</h3>
             <div className='shot' >
            <div className="ps-block__content">
                { ecomerce.cartDataItems && ecomerce.cartDataItems.length > 0 ? (
                    ecomerce.cartDataItems?.map((el, i) => (
                        <figure>
                            <p>Mahsulot</p>
                            <div className="my-2">
                                <Link href={`/product/${el?.slug}`}>
                                    <a>
                                        <strong>{el?.title}</strong>
                                    </a>
                                </Link>
                            </div>
                            <span className="product_type  ">
                                {el?.file_type}
                            </span>
                            <div className="product_price_click my-3">
                                <p>Narxi</p>
                                <div></div>
                                <strong>
                                    {addPeriodToThousands(el?.discount_price)}{' '}
                                    so'm
                                </strong>
                            </div>
                        </figure>
                    ))
                ) : (
                    <figure className="ps-block__total">
                        <p>Mahsulot yo'q.</p>
                    </figure>
                )}
            </div>
            <div className="checkout_footer">
                    {(ecomerce.cartDataItems && ecomerce.cartDataItems.length > 0 ) && (
                        <figure>
                            <figcaption className="product_price_click_all">
                                <strong>Jami narx</strong>
                                <div></div>
                                <strong>{hisob} so'm </strong>
                            </figcaption>
                        </figure>
                    )}
                    {ecomerce.cartDataItems && ecomerce.cartDataItems.length > 0 ? (
                        <Link href={'/account/shopping-cart'}>
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
export default connect((state) => state)(ModulePaymentOrderSummary);
