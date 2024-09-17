import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import { useSelector } from 'react-redux';
import Meta from '~/components/shared/headers/Meta';
import MarketingMain from '~/components/partials/account/marketing/MarketingMain';
import Page404 from '~/pages/page/page-404';
import Selection from '../selection';
import AccountMenuSidebar from '~/components/partials/account/modules/AccountMenuSidebar';

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

    return (
        user?.role === 'seller' ?
            <PageContainer footer={<FooterDefault />} title="Notifications">
                <div className="ps-page--my-account">
                    <Meta
                        title={"Marketing"}
                    />
                    <BreadCrumb breacrumb={breadCrumb} />

                    <section className="ps-my-account ps-page--account pb-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="ps-page__left">
                                        <AccountMenuSidebar data={accountLinks} />
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <div className='ps-page__content bg-white p-4'>
                                        <MarketingMain />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </PageContainer> : user?.access ? <Page404 /> : <Selection />

    );
};

export default Application;
