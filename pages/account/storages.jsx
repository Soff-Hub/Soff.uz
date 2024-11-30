import React from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Page404 from '../page/page-404';
import { useSelector } from 'react-redux';
import Selection from './selection';
import { BdCrumb } from '~/components/elements/BreadCrumb';
import HostingList from '~/components/partials/account/HostingList';

const Application = () => {
    const { user } = useSelector((state) => state.auth);

    return user?.role === 'admin' ? (
        <PageContainer footer={<FooterDefault />} title="Notifications">
            <div className="ps-page--my-account">
                <BdCrumb title={'Video yuklash uchun sotuvchilar tomonidan sotib olingan hostinglar'} />
                <HostingList />
            </div>
        </PageContainer>
    ) : user?.access ? (
        <Page404 />
    ) : (
        <Selection />
    );
};

export default Application;
