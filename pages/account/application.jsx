import React from 'react';
import ApplicationLists from '~/components/partials/account/ApplicationLists';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Page404 from '../page/page-404';
import { useSelector } from 'react-redux';
import Selection from './selection';
import Meta from '~/components/shared/headers/Meta';
import { BdCrumb } from '~/components/elements/BreadCrumb';

const Application = () => {
    const { user } = useSelector(state => state.auth)
    return (

        user?.role === 'admin' || user?.role === 'seller' ?
            <PageContainer footer={<FooterDefault />} title="Notifications">
                <div className="ps-page--my-account">
                    <Meta
                        title={"Ariza va Takliflar"}
                    />
                    <BdCrumb title={'Ariza va akliflar'} />
                    <ApplicationLists />
                </div>
            </PageContainer> : user?.access ? <Page404 /> : <Selection />

    );
};

export default Application;
