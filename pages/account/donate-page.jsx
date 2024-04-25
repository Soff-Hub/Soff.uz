import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Meta from '~/components/shared/headers/Meta';
import DonateList from '~/components/partials/account/DonateList';

const DonatePage = () => {
    const breadCrumb = [
        {
            text: 'Bosh sahifa',
            url: '/',
        },
        {
            text: "Qo'llab quvvatlaganlar ro'yxati",
        },
    ];
    return (
            <PageContainer footer={<FooterDefault />} title="Notifications">
                <div className="ps-page--my-account">
                    <Meta
                        title={"Yangiliklar"}
                    />
                    <BreadCrumb breacrumb={breadCrumb} />
                    <DonateList/>
                </div>
            </PageContainer> 

    );
};

export default DonatePage;
