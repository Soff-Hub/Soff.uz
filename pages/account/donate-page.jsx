import React from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Meta from '~/components/shared/headers/Meta';
import DonateList from '~/components/partials/account/DonateList';
import { useSelector } from 'react-redux';
import Page404 from '../page/page-404';
import Selection from './selection';
import { BdCrumb } from '~/components/elements/BreadCrumb';

const DonatePage = () => {

    const { user } = useSelector(state => state.auth)

    return ( (user?.role === 'admin' || user?.role === 'seller') ?
            <PageContainer footer={<FooterDefault />} title="Notifications">
                <div className="ps-page--my-account">
                    <Meta
                        title={"Yangiliklar"}
                    />
                    <BdCrumb title={'Kelib tushgan donatlar'} />
                    <DonateList/>
                </div>
            </PageContainer> 
             : user?.access ? <Page404 /> : <Selection />

    );
};

export default DonatePage;
