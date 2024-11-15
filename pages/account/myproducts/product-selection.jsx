import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Meta from '~/components/shared/headers/Meta';
import Page404 from '~/pages/page/page-404';
import LoginPage from '../login';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import axios from 'axios';
import { baseUrl } from '~/repositories/Repository';
import { productTypeItems } from '~/components/partials/account/SellerStart';
import useResponsive from '~/utilities/useResponsive';
import Router from 'next/router';

const Posts = () => {
    const { user } = useSelector((state) => state.auth);
    const [category, setCatgeory] = useState([]);
    const [loading, setLoading] = useState(false);
    const { isMobile } = useResponsive()

    const breadCrumb = [
        {
            text: 'Asosiy Sahifa',
            url: '/',
        },
        {
            text: 'Mahsulot qo’shishni tanlash',
        },
    ];

    async function getCategorLists() {
        const endPoint = 'seller/categories-for-choice/';
        try {
            setLoading(false);
            const response = await axios.get(baseUrl + endPoint);
            if (response?.data) {
                setCatgeory(response?.data);
            }
        } catch (error) {
            console.log('Kategoriyalar olib kelishda xatolik', error);
        }
        setLoading(true);
    }

    useEffect(() => {
        getCategorLists();
    }, []);

    return user?.role === 'seller' || user?.role === 'customer' ? (
        <PageContainer
            footer={<FooterDefault />}
            title="Recent Viewed Products">
            <div className="ps-page--my-account">
                <Meta title={'Yangi mahsulot yaratishni tanlash'} />
                <BreadCrumb breacrumb={breadCrumb} />

                {!loading ? (
                    <div
                        className="ps-product--detail ps-product--fullwidth"
                        style={{
                            height: '400px',
                            display: 'grid',
                            placeContent: 'center',
                        }}>
                        <div
                            className="spinner-border "
                            role="status"
                            style={{
                                width: '150px',
                                height: '150px',
                            }}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        <h2 className="text-center products_title">
                            {' '}
                            Qanday mahsulot yuklamoqchisiz?
                        </h2>
                        <div className="container">
                            <div>
                                <div className="d-flex flex-wrap justify-content-evenly pb-5">
                                    {
                                        productTypeItems.map(el => (
                                            <div className={`new-card-container ${isMobile ? 'w-50' : 'w-25'}`}>
                                                <div className="new-card" onClick={() => Router.push(el.path)}>
                                                    <div className="ilustration">
                                                        <img src={el.img} alt="" />
                                                    </div>
                                                    <h3>{el.title}</h3>
                                                    <button>
                                                        <span>Yuklash</span>
                                                        <i className='fa-solid fa-plus'></i>
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </PageContainer>
    ) : user?.access ? (
        <Page404 />
    ) : (
        <LoginPage />
    );
};

export default Posts;
