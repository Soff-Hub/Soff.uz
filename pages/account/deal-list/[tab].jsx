import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import DealListPage from '~/components/partials/account/DealListPage';
import DealsList from '~/components/partials/account/DealsList';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Meta from '~/components/shared/headers/Meta';

const DealList = (props) => {
    const breadCrumb = [
        {
            text: 'Bosh sahifa',
            url: '/',
        },
        {
            text: 'Qabul qilinadigan takliflar',
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Notifications">
            <div className="ps-page--my-account">
                <Meta title={'Qabul qilinadigan takliflar'} />
                <BreadCrumb breacrumb={breadCrumb} />
                <DealListPage {...props} />
            </div>
        </PageContainer>
    );
};

export async function getStaticPaths() {
    const paths = [
        { params: { tab: 'list' } },
        { params: { tab: 'my' } },
        { params: { tab: 'published' } },
    ];

    return {
        paths,
        fallback: false,
    };
}


export async function getStaticProps({ params }) {
    const { tab } = params

    const resp = tab === 'list' ? await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/deals`) : {}
    const deals = tab === 'list' ? await resp.json() : null

    return {
        props: {
            deals,
            tab
        },
    };
}

export default DealList;
