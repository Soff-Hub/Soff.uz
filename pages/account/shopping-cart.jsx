import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/widgets/layouts/PageContainer';
import { connect, useSelector } from 'react-redux';
import ModuleEcomerceCartItems from '~/components/ecomerce/modules/ModuleEcomerceCartItems';
import Link from 'next/link';
import ModuleCartSummary from '~/components/ecomerce/modules/ModuleCartSummary';
import Meta from '~/components/shared/headers/Meta';

const breadCrumb = [
    {
        text: 'Asosiy sahifa',
        url: '/',
    },
    {
        text: 'Savat',
    },
];

const ShoppingCartScreen = () => {
    const state = useSelector((state) => state.auth.user);
    const cartItems = useSelector((state) => state.ecomerce.cartDataItems);

    let contentView;
    if (cartItems) {
        if (cartItems?.length > 0) {
            contentView = (
                <>
                    <div className="ps-section__content">
                        <ModuleEcomerceCartItems cartItems={cartItems} />
                        <div className="ps-section__cart-actions">
                            <Link href="/">
                                <a
                                    className="ps-btn btn_color"
                                    style={{
                                        maxWidth: '120px',
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <i className="fa-solid fa-angles-left"></i>{' '}
                                    Ortga
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="ps-section__footer mb-5">
                        <div className="row justify-space-between mb-4">
                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                                <ModuleCartSummary source={cartItems} />
                                {state !== null ? (
                                    <Link
                                        href="/account/checkout"
                                        as="/account/checkout">
                                        <a className="ps-btn ps-btn--fullwidth btn_color ">
                                            Sotib olish
                                        </a>
                                    </Link>
                                ) : (
                                    <Link href="/auth/login?returnUrl=/account/checkout">
                                        <a className="ps-btn ps-btn--fullwidth btn_color ">
                                            Sotib olish
                                        </a>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            );
        } else {
            contentView = (
                <>
                    <div className="ps-section__content">
                        <div className="alert alert-info">
                            <p className="mb-0">Sizning savatingiz bo'sh...</p>
                        </div>

                        <div className="ps-section__cart-actions">
                            <Link href="/">
                                <a
                                    className="ps-btn btn_color btn_color"
                                    style={{
                                        maxWidth: '120px',
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    {' '}
                                    <i className="fa-solid fa-angles-left"></i>{' '}
                                    Ortga
                                </a>
                            </Link>
                        </div>
                    </div>
                </>
            );
        }
    }

    return (
        <>
            <PageContainer title="Xarid savati">
                <div className="ps-page--simple mb-4">
                    <Meta title={'Xarid savati'} />
                    <BreadCrumb breacrumb={breadCrumb} />
                    <div className="ps-section--shopping ps-shopping-cart">
                        <div className="container">
                            <div className="ps-section__header">
                                <h1>Savat</h1>
                            </div>
                            {contentView}
                        </div>
                    </div>
                </div>
            </PageContainer>
        </>
    );
};

export default connect((state) => state)(ShoppingCartScreen);
