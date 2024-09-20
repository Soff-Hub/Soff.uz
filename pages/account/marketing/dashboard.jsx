import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import { useSelector } from 'react-redux';
import Meta from '~/components/shared/headers/Meta';
import Page404 from '~/pages/page/page-404';
import Selection from '../selection';
import AccountMenuSidebar from '~/components/partials/account/modules/AccountMenuSidebar';
import MarketingDashboard from '~/components/partials/account/marketing/MarketingDashboard';

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
                        <div className="container" style={{ maxWidth: '1400px' }}>
                            <div className="row" style={{ alignItems: "flex-start" }}>
                                {/* <div className="col-lg-4">
                                    <div className="ps-page__left">
                                        <AccountMenuSidebar data={accountLinks} />
                                    </div>
                                </div> */}
                                <div className="col-lg-12">
                                    <div className='ps-page__content p-0'>
                                        <MarketingDashboard />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </PageContainer> : user?.access ? <Page404 /> : <Selection />

    );
};

export async function getServerSideProps(context) {
    const { query } = context;

    return {
        props: {
            month: query?.month || new Date().getMonth() + 1 > 9 ? query?.month || new Date().getMonth() + 1 : `0${query?.month || new Date().getMonth() + 1}`,
            year: query?.year || new Date().getFullYear(),
        },
    };
}

export default Application;
