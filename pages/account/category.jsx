import React from 'react';
import CategoryLists from '~/components/partials/account/categoryLists';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import { useSelector } from 'react-redux';
import Page404 from '../page/page-404';
import Selection from './selection';
import Meta from '~/components/shared/headers/Meta';
import { BdCrumb } from '~/components/elements/BreadCrumb';

const MyAccountPage = () => {
    const { user } = useSelector(state => state.auth)
    return (
        user?.role === 'admin' ?
            <PageContainer footer={<FooterDefault />} title="Address">
                <div className="ps-page--my-account">
                    <Meta
                        title={"Kategoriyalar"}
                    />
                    <BdCrumb title={'Kategoriyalar'} />
                    <CategoryLists />
                </div>
            </PageContainer> : user?.access ? <Page404 /> : <Selection />
    );
};

export default MyAccountPage;
