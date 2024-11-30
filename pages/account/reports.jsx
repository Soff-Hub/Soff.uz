import React from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Page404 from '../page/page-404';
import { useSelector } from 'react-redux';
import Selection from './selection';
import Meta from '~/components/shared/headers/Meta';
import { BdCrumb } from '~/components/elements/BreadCrumb';
import ReportsList from '~/components/partials/account/ReportsList';

const Application = () => {
    const { user } = useSelector((state) => state.auth);

    return user?.role === 'admin' ? (
        <PageContainer footer={<FooterDefault />} title="Notifications">
            <div className="ps-page--my-account">
                <BdCrumb title={'Mualliflik huquqi buzilishi boyicha kelib tushgan shikoyatlar'} />
                <ReportsList />
            </div>
        </PageContainer>
    ) : user?.access ? (
        <Page404 />
    ) : (
        <Selection />
    );
};

export default Application;
