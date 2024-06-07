import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Page404 from '../page/page-404';
import { useSelector } from 'react-redux';
import Selection from './selection';
import Meta from '~/components/shared/headers/Meta'; 
import ApplicationsReceiveds from '~/components/partials/account/ApplicationsReceived';

const ApplicationsReceived = () => {
    const { user } = useSelector(state => state.auth);

    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: "Kelib tushgan arizalar ",

        },
    ];

    return (
        user?.role === 'customer' || user?.role === 'seller' ?
            <PageContainer footer={<FooterDefault />} title="Notifications">
                <div className="ps-page--my-account">
                    <Meta
                        title={"Kelib tushgan arizalar"}
                        description="Soff - Sizga kelib tushgan Ariza va Takliflarni ko'rib chiqing"
                    />
                    <BreadCrumb breacrumb={breadCrumb} />
                    <ApplicationsReceiveds />
                </div>
            </PageContainer> : user?.access ? <Page404 /> : <Selection />
    )
}

export default ApplicationsReceived
