import React, { useEffect } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import { connect, useSelector } from 'react-redux';
import ModuleEcomerceCartItems from '~/components/ecomerce/modules/ModuleEcomerceCartItems';
import Link from 'next/link';
import ModuleCartSummary from '~/components/ecomerce/modules/ModuleCartSummary';
import useCart from '~/hooks/useCart';
import Meta from '~/components/shared/headers/Meta';

const ShoppingCartScreen = () => {
    const state = useSelector((state) => state.auth.user);
    const cartItems = useSelector(state => state.ecomerce.cartDataItems)


    const { setAllCartItem } = useCart()


    useEffect(() => {
        if (cartItems.length !== JSON.parse(localStorage.getItem('cart'))) {
            setAllCartItem();
        }
    }, []);



    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: 'Savat',
        },
    ];







    // View
    let contentView;
    if (cartItems) {
        if (cartItems?.length > 0) {
            contentView = (
                <>
                    <div className="ps-section__content">
                        <ModuleEcomerceCartItems
                            cartItems={cartItems}
                        />
                        <div className="ps-section__cart-actions">
                            <Link href="/">
                                <a className="ps-btn btn_color" style={{maxWidth:'120px', width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}} ><i className="fa-solid fa-angles-left"></i> Ortga</a>
                            </Link>
                        </div>
                    </div>
                    <div className="ps-section__footer">
                        <div className="row justify-space-between">
                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                                <ModuleCartSummary
                                    source={cartItems}
                                />
                                {state !== null ? (
                                    <Link href='/account/checkout' as='/account/checkout'>
                                        <a className="ps-btn ps-btn--fullwidth btn_color "

                                        >
                                            Sotib olish
                                        </a>

                                    </Link>

                                ) : (
                                    <Link href="/auth/login?returnUrl=/account/shopping-cart">
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
                                <a className="ps-btn btn_color btn_color" style={{maxWidth:'120px', width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}} > <i className="fa-solid fa-angles-left"></i> Ortga</a>
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
                    <Meta
                        title={"Xarid savati"}
                    />
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
