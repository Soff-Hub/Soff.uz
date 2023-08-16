import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import DashbordList from '~/components/partials/account/dashbordList';
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
            text: 'Bosh panel',
        },
    ];
    return (
        <PageContainer footer={<FooterDefault />} title="Address">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <DashbordList />
            </div>
            <Newletters layout="container" />
        </PageContainer>
    );
};

export default MyAccountPage;
