import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import { useSelector } from 'react-redux';
import Meta from '~/components/shared/headers/Meta';
import MarketingMain from '~/components/partials/account/marketing/MarketingMain';
import Page404 from '~/pages/page/page-404';
import Selection from '../selection';
import SidebarLayout from '~/components/partials/SidebarLayout';
import PageLoader from '~/components/elements/common/PageLoader';
import Router from 'next/router';

const Application = () => {

    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: "Marketing",

        },
    ];

    const { user, accountLinks } = useSelector(state => state.auth)
    const { profile } = useSelector(state => state.ecomerce)
    console.log(profile);


    if (profile) {
        if (profile?.fields?.length) {
            Router.push('/account/marketing/dashboard')
        } else {
            Router.push('/account/marketing/select-category')
        }
    }

    return (
        <div style={{ opacity: 0 }}>
            <PageContainer><PageLoader /></PageContainer>
        </div>
    )
};

export default Application;
