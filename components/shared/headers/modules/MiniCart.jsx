import React from 'react';
import { connect, useSelector } from 'react-redux';
import Link from 'next/link';
import ProductOnCart from '~/components/elements/products/ProductOnCart';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import useCart from '~/hooks/useCart';
import { addPeriodToThousands } from '~/components/partials/account/price-formatter';
import { Badge } from 'antd';

const MiniCart = () => {
    const state = useSelector(state => state.auth.user);
    const data = useSelector(state => state.ecomerce.cartDataItems);

    const { removeCartOneItem } = useCart();

    function handleRemoveItem (e, item) {
        e.preventDefault();
        removeCartOneItem(item.id);
    }

    const amount = calculateAmount(data);

    const hisob = addPeriodToThousands(amount);

    return (
        <div className='ps-cart--mini'>
            {data?.length > 0 ? (
                <Link href='/account/shopping-cart' passHref>
                    <a className='header__extra'>
                        <Badge count={data.length}>
                            <img
                                src='/static/img/wishlist.png'
                                width={'25px'}
                                alt='Savat'
                            />
                        </Badge>
                    </a>
                </Link>
            ) : (
                ''
            )}
            {data && data.length > 0 ? (
                <div className='ps-cart__content'>
                    <div className='ps-cart__items'>
                        {data?.map(item => {
                            return (
                                <ProductOnCart product={item}>
                                    <a
                                        className='ps-product__remove'
                                        style={{ cursor: 'pointer' }}
                                        onClick={e =>
                                            handleRemoveItem(e, item)
                                        }>
                                        <i className='icon-cross'></i>
                                    </a>
                                </ProductOnCart>
                            );
                        })}
                    </div>
                    <div className='ps-cart__footer'>
                        <h3>
                            Jami:
                            <strong>{hisob ? hisob : 0} so'm</strong>
                        </h3>
                        <figure>
                            <Link href='/account/shopping-cart'>
                                <a className='ps-btn'>Savat</a>
                            </Link>
                            {state !== null ? (
                                <Link href='/account/checkout'>
                                    <a className='ps-btn'>Sotib olish</a>
                                </Link>
                            ) : (
                                <Link href='/auth/login?returnUrl=/account/checkout'>
                                    <a className='ps-btn'>Sotib olish</a>
                                </Link>
                            )}
                        </figure>
                    </div>
                </div>
            ) : (
                <div className='ps-cart__content'>
                    <div className='ps-cart__items'>
                        <span>Savatda mahsulot yo'q</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default connect(state => state)(MiniCart);