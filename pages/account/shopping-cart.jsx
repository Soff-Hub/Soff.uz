import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/widgets/layouts/PageContainer';
import { connect, useSelector } from 'react-redux';
import ModuleEcomerceCartItems from '~/components/ecomerce/modules/ModuleEcomerceCartItems';
import Link from 'next/link';
import ModuleCartSummary from '~/components/ecomerce/modules/ModuleCartSummary';
import Meta from '~/components/shared/headers/Meta';
import { FaArrowLeft, FaBoxOpen } from 'react-icons/fa6';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import SidebarLayout from '~/widgets/sidebar/SidebarLayout';
import ShoppingCart from '~/components/account/shopping-cart';

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
    const { cartDataItems, status } = useSelector((state) => state.ecomerce);
    const router = useRouter();
    const hasItems = cartDataItems && cartDataItems.length;

    console.log({ cartDataItems });

    let contentView;
    if (hasItems) {
        contentView = (
            <>
                <div className="ps-section__content">
                    <ModuleEcomerceCartItems cartItems={cartDataItems} />
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
                            <ModuleCartSummary source={cartDataItems} />
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
            <div className="ps-section__content w-100">
                <div
                    style={{ height: '50vh' }}
                    className="d-flex justify-content-center flex-column align-items-center">
                    <div
                        style={{
                            borderRadius: '50%',
                            background: '#7575751c',
                            width: '130px',
                            height: '130px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '20px',
                        }}>
                        <FaBoxOpen
                            style={{
                                color: '#00a44f',
                                fontSize: '70px',
                            }}
                        />
                    </div>
                    <h3
                        style={{ fontSize: '30px' }}
                        className="font-bold mb-2 text-gray-800">
                        Savat bo'sh
                    </h3>
                    <p className="mb-4 text-center text-muted">
                        To'lov qilish uchun biror mahsulot qo'shing.
                    </p>
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => router.push('/')}>
                        <FaArrowLeft />
                        Xarid qilishni boshlash
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <PageContainer>
            <Meta
                title={'Xarid savati'}
                description={
                    'Xarid savatingizdagi mahsulot va xizmatlarni ko‘rib chiqing, narxlarni solishtiring va to‘lovni amalga oshiring. Soff.uz — ishonchli onlayn marketplace va frilans platformasi.'
                }
            />
            <ShoppingCart />
        </PageContainer>
    );
};

export default connect((state) => state)(ShoppingCartScreen);
