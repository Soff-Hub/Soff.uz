import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ContextList from '~/components/partials/account/ContextList';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';

const AccountNotificationsPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Context',
        },
    ];
    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Notifications">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <ContextList />
                </div>
                <Newletters layout="container" />
            </PageContainer>
        </>
    );
};

export default AccountNotificationsPage;
