import React from 'react';
import Settings from '~/components/partials/account/Settings';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Page404 from '../page/page-404';
import { useSelector } from 'react-redux';
import Selection from './selection';
import Meta from '~/components/shared/headers/Meta';
import { BdCrumb } from '~/components/elements/BreadCrumb';

const AccountSettingsPage = () => {
    const { user } = useSelector(state => state.auth)
    return (

        user?.role === 'seller' || user?.role === "customer" ?
            <PageContainer footer={<FooterDefault />} title="Notifications">
                <div className="ps-page--my-account">
                    <Meta
                        title={"Sozlamalar"}
                    />
                    <BdCrumb title={'Profil va sozlamalar'} />
                    <Settings />
                </div>
            </PageContainer> : user?.access ? <Page404 /> : <Selection />

    );
};

export default AccountSettingsPage;
