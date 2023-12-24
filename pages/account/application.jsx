import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ApplicationLists from '~/components/partials/account/ApplicationLists';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Page404 from '../page/page-404';
import { useSelector } from 'react-redux';
import Selection from './selection';

const Application = () => {
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: "Ariza bo'limi",

        },
    ];
    const { user } = useSelector(state => state.auth)
    return (

        user?.role === 'admin' || user?.role === 'seller' ?
            <PageContainer footer={<FooterDefault />} title="Notifications">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <ApplicationLists />
                </div>
            </PageContainer> : user?.access ? <Page404/> : <Selection /> 

    );
};

export default Application;
