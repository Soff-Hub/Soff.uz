import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Notifications from '~/components/partials/account/ShopList';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';

const AccountShopsPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Sotuchilar',
        },
    ];
    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Notifications">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <Notifications />
                </div>
                <Newletters layout="container" />
            </PageContainer>
        </>
    );
};

export default AccountShopsPage;
