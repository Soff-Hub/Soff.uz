import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Meta from '~/components/shared/headers/Meta';
import DonateList from '~/components/partials/account/DonateList';
import { useSelector } from 'react-redux';
import Page404 from '../page/page-404';
import Selection from './selection';

const DonatePage = () => {

    const { user } = useSelector(state => state.auth)

    const breadCrumb = [
        {
            text: 'Bosh sahifa',
            url: '/',
        },
        {
            text: "Qo'llab quvvatlaganlar ro'yxati",
        },
    ];


    return ( (user?.role === 'admin' || user?.role === 'seller') ?
            <PageContainer footer={<FooterDefault />} title="Notifications">
                <div className="ps-page--my-account">
                    <Meta
                        title={"Yangiliklar"}
                    />
                    <BreadCrumb breacrumb={breadCrumb} />
                    <DonateList/>
                </div>
            </PageContainer> 
             : user?.access ? <Page404 /> : <Selection />

    );
};

export default DonatePage;
