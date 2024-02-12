import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Page404 from '../page/page-404';
import { useSelector } from 'react-redux';
import TegLists from '~/components/partials/account/TegLists ';
import Selection from './selection';
import Meta from '~/components/shared/headers/Meta';

const AccountTegPage = () => {
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: 'Teglar',
        },
    ];
    const { user } = useSelector(state => state.auth)
    return (

        user?.role === 'admin' ?
            <PageContainer footer={<FooterDefault />} title="tag">
                <div className="ps-page--my-account">
                    <Meta
                        title={"Soff | Teglar"}
                    />
                    <BreadCrumb breacrumb={breadCrumb} />
                    <TegLists />
                </div>
            </PageContainer> : user?.access ? <Page404 /> : <Selection />

    );
};

export default AccountTegPage;
