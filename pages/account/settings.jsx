import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Settings from '~/components/partials/account/Settings';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';

const AccountSettingsPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Sozlamalar',
        },
    ];
    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Notifications">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <Settings />
                </div>
                <Newletters layout="container" />
            </PageContainer>
        </>
    );
};

export default AccountSettingsPage;
