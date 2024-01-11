import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import DashbordList from '~/components/partials/account/dashbordList';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import { useSelector } from 'react-redux';
import Page404 from '../page/page-404';
import Selection from './selection';
import Meta from '~/components/shared/headers/Meta';

const MyAccountPage = () => {
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: 'Bosh panel',
        },
    ];

    const { user } = useSelector(state => state.auth)

    return (
        user?.role === 'admin' || user?.role === 'seller' ? <PageContainer footer={<FooterDefault />} title="Address">
            <div className="ps-page--my-account">
                <Meta
                    title={"Soff | Bosh panel"}
                />
                <BreadCrumb breacrumb={breadCrumb} />
                <DashbordList />
            </div>
        </PageContainer> : user?.access ? <Page404 /> : <Selection />
    );
};

export default MyAccountPage;
