import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import { useSelector } from 'react-redux';
import Meta from '~/components/shared/headers/Meta'; 
import ApplicationsReceiveds from '~/components/partials/account/ApplicationsReceived';

const ApplicationsReceived = () => {

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
            <PageContainer footer={<FooterDefault />} title="Notifications">
                <div className="ps-page--my-account">
                    <Meta
                        title={"Kelib tushgan arizalar"}
                        description="Soff - Sizga kelib tushgan Ariza va Takliflarni ko'rib chiqing"
                    />
                    <BreadCrumb breacrumb={breadCrumb} />
                    <ApplicationsReceiveds />
                </div>
            </PageContainer>
    )
}

export default ApplicationsReceived
