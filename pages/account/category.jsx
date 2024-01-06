import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import CategoryLists from '~/components/partials/account/categoryLists';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import { useSelector } from 'react-redux';
import Page404 from '../page/page-404';
import Selection from './selection';

const MyAccountPage = () => {
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/main',
        },
        {
            text: 'Kategoriyalar',
        },
    ];
    const { user } = useSelector(state => state.auth)
    return (
        user?.role === 'admin' ?
        <PageContainer footer={<FooterDefault />} title="Address">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <CategoryLists />
            </div>
        </PageContainer> : user?.access ? <Page404/> : <Selection /> 
    );
};

export default MyAccountPage;
