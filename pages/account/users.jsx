import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import UsersLists from '~/components/partials/account/UsersLists';

const AccountUsersPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Xaridorlar',
        },
    ];
    return (
        <>
            <PageContainer footer={<FooterDefault />} title="   s">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <UsersLists/>
                </div>
                <Newletters layout="container" />
            </PageContainer>
        </>
    );
};

export default AccountUsersPage;
