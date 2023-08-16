import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import Orders from '~/components/partials/account/Orders';

const AccountOrdersPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Buyurtmalar',
        },
    ];
    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Notifications">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <Orders/>
                </div>
                <Newletters layout="container" />
            </PageContainer>
        </>
    );
};

export default AccountOrdersPage;
