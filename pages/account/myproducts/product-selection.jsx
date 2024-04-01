import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Meta from '~/components/shared/headers/Meta';
import Page404 from '~/pages/page/page-404';
import LoginPage from '../login';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Link from 'next/link';

const Posts = () => {
    const { user } = useSelector((state) => state.auth);

    const breadCrumb = [
        {
            text: 'Asosiy Sahifa',
            url: '/',
        },
        {
            text: 'Mahsulot qo’shishni tanlash',
        },
    ];

    return user?.role === 'seller' || user?.role === 'customer' ? (
        <PageContainer
            footer={<FooterDefault />}
            title="Recent Viewed Products">
            <div className="ps-page--my-account">
                <Meta title={'Soff | Yangi mahsulot yaratishni tanlash'} />
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="container product-selection">
                    <div className="row w-100">
                        <div className="col-12 col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12 select-col">
                            <Link href="/account/myproducts/posts">
                                <a>
                                    <div className="select-card file">
                                    <i className="fa-regular fa-folder-open"></i>
                                        <span>File</span>
                                    </div>
                                </a>
                            </Link>
                        </div>
                        <div className="col-12 my-5 my-xxl-0 my-xl-0 my-lg-0 my-md-0 my-sm-5 col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12 select-col">
                            <Link href="/account/myproducts/audio-posts">
                                <a>
                                    <div className="select-card file">
                                        <i className="fa-solid fa-music"></i>
                                        <span> Audio</span>
                                    </div>
                                </a>
                            </Link>
                        </div>
                        <div className="col-12 col-xxl-4 col-xl-4 col-lg-4 col-md-12 col-sm-12 select-col">
                            <Link href="/account/myproducts/design-template-posts">
                                <a>
                                    <div className="select-card file">
                                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                                        <span>Shablonlar</span>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    ) : user?.access ? (
        <Page404 />
    ) : (
        <LoginPage />
    );
};

export default Posts;
