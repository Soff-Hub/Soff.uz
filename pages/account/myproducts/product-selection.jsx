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
                        <div className="col-6 select-col">
                            <Link href="/account/myproducts/posts">
                                <a>
                                    <div className="select-card file">File</div>
                                </a>
                            </Link>
                        </div>
                        <div className="col-6 select-col">
                            <Link href="/account/myproducts/audio-posts">
                                <a>
                                    <div className="select-card file">
                                        Audio
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
