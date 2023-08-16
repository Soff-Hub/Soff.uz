import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import CategoryLists from '~/components/partials/account/categoryLists';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import FooterDefault from '~/components/shared/footers/FooterDefault';

const MyAccountPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Kategoriyalar',
        },
    ];
    return (
        <PageContainer footer={<FooterDefault />} title="Address">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <CategoryLists />
            </div>
            <Newletters layout="container" />
        </PageContainer>
    );
};

export default MyAccountPage;
