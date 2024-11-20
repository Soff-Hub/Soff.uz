import React from 'react'
import CategoryTabs from '~/components/blocks/categories'
import HeroMain from '~/components/blocks/hero'
import HomeProducts from '~/components/blocks/home-products'
import SubProjects from '~/components/blocks/home-products/sub-projects'
import PageLayout from '~/components/layouts/PageLayout'
import Meta from '~/components/shared/headers/Meta'

function NewHomePage({ tab, category }) {

    return (
        <PageLayout>
            <Meta title="Soff - barcha ma'lumotlar bazasi" image="/static/img/soff/soff_green_white.png" />
            <HeroMain />
            <CategoryTabs tab={tab} category={category} />
            <HomeProducts tab={tab} />
            <SubProjects />
        </PageLayout>
    )
}

export async function getServerSideProps(context) {
    const { query } = context;

    return {
        props: {
            tab: query?.tab || 'file',
            category: query?.category || null,
        },
    };
}

export default NewHomePage