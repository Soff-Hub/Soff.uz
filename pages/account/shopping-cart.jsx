import React, { useEffect } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import { connect, useSelector } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';
import ModuleEcomerceCartItems from '~/components/ecomerce/modules/ModuleEcomerceCartItems';
import Link from 'next/link';
import ModuleCartSummary from '~/components/ecomerce/modules/ModuleCartSummary';

const ShoppingCartScreen = ({ ecomerce }) => {


    const { products, getProducts } = useEcomerce();
    const state = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (ecomerce.cartItems) {
            getProducts(ecomerce.cartItems, 'card');
        }
    }, [ecomerce]);

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shopping Cart',
        },
    ];

  

    // View
    let contentView;
    if (ecomerce.cartItems) {
        if (ecomerce.cartItems?.length > 0) {
            contentView = (
                <>
                    <div className="ps-section__content">
                        <ModuleEcomerceCartItems
                            cartItems={ecomerce.cartItems}
                        />
                        <div className="ps-section__cart-actions">
                            <Link href="/shop">
                                <a className="ps-btn">Ortga</a>
                            </Link>
                        </div>
                    </div>
                    <div className="ps-section__footer">
                        <div className="row justify-space-between">
                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                                <ModuleCartSummary
                                    source={ecomerce.cartItems}
                                />
                                {state !== null ? (
                                    <Link href="/account/checkout">
                                        <a className="ps-btn ps-btn--fullwidth">
                                            Sotib olish
                                        </a>
                                    </Link>
                                ) : (
                                    <Link href="/account/register">
                                        <a className="ps-btn ps-btn--fullwidth">
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
                            <Link href="/shop">
                                <a className="ps-btn">Ortga</a>
                            </Link>
                        </div>
                    </div>
                </>
            );
        }
    } else {
    }

    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Shopping Cart">
                <div className="ps-page--simple">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <div className="ps-section--shopping ps-shopping-cart">
                        <div className="container">
                            <div className="ps-section__header">
                                <h1>Xarid savati</h1>
                            </div>
                            {contentView}
                        </div>
                    </div>
                </div>
                <Newletters layout="container" />
            </PageContainer>
        </>
    );
};

export default connect((state) => state)(ShoppingCartScreen);
