import React from 'react';
import { connect, useSelector } from 'react-redux';
import Link from 'next/link';
import ProductOnCart from '~/components/elements/products/ProductOnCart';
import { calculateAmount } from '~/shared/utilities/ecomerce-helpers';
import { addPeriodToThousands } from '~/components/partials/account/price-formatter';
import { Badge, Popover, Button } from 'antd';
import { cn } from '~/shared/utilities/cn';

const flexStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    justifyContent: 'center',
};

const flexItemStyle = {
    flex: '1',
};

const fullWidthStyle = {
    width: '100%',
};

const MiniCart = () => {
    const state = useSelector((state) => state.auth.user);
    const data = useSelector((state) => state.ecomerce.cartDataItems);

    const amount = calculateAmount(data);
    const hisob = addPeriodToThousands(amount);

    // Popover content for cart items
    const cartContent =
        data && data.length > 0 ? (
            <div className={'ps-basket__content'}>
                <div className="ps-basket__content__items">
                    {data?.map((item) => (
                        <ProductOnCart product={item} key={item?.id} />
                    ))}
                </div>
                <div className="ps-basket__content__footer">
                    <h3>
                        Jami:
                        <strong
                            style={{
                                fontWeight: 'bold',
                            }}>
                            {hisob ? hisob : 0} so'm
                        </strong>
                    </h3>
                    <div
                        // className="ps-basket__content__footer__figure"
                        style={flexStyle}>
                        <Link href="/account/shopping-cart">
                            <a
                                // className="ps-basket__content__footer__figure__btn--secondary"
                                style={flexItemStyle}>
                                <Button size="large" style={fullWidthStyle}>
                                    Savat
                                </Button>
                            </a>
                        </Link>
                        {state !== null ? (
                            <Link href="/account/checkout">
                                <a
                                    // className="ps-basket__content__footer__figure__btn--primary"
                                    style={flexItemStyle}>
                                    <Button
                                        size="large"
                                        variant="filled"
                                        type="primary"
                                        style={fullWidthStyle}>
                                        Sotib olish
                                    </Button>
                                </a>
                            </Link>
                        ) : (
                            <Link href="/auth/login?returnUrl=/account/checkout">
                                <a
                                    // className="ps-basket__content__footer__figure__btn--primary"
                                    style={flexItemStyle}>
                                    <Button
                                        size="large"
                                        variant="filled"
                                        type="primary"
                                        style={fullWidthStyle}>
                                        Sotib olish
                                    </Button>
                                </a>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        ) : (
            <div className="ps-cart__content">
                <div className="ps-cart__items">
                    <span>Savatda mahsulot yo'q</span>
                </div>
            </div>
        );

    return (
        <Popover
            content={cartContent}
            title={null}
            className={cn('pe-4 h-36', 'ps-basket')}
            classNames={{
                root: 'ps-basket',
            }}
            arrow={{
                pointAtCenter: false,
            }}>
            <div>
                <Link
                    href="/account/shopping-cart"
                    passHref
                    className={cn(
                        'header__extra inline-flex items-center justify-center',
                        'transition-transform duration-200 hover:scale-105'
                    )}>
                    <a>
                        <Badge count={data.length}>
                            <img
                                src="/static/img/wishlist.png"
                                width={'25px'}
                                alt="Savat"
                                className="transition-all duration-200"
                            />
                        </Badge>
                    </a>
                </Link>
            </div>
        </Popover>
    );
};

export default connect((state) => state)(MiniCart);
