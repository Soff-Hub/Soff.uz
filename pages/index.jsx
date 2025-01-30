import React from 'react'
import HeroMain from '~/components/blocks/hero'
import HomeCategories from '~/components/blocks/home-categories'
import SubProjects from '~/components/blocks/home-products/sub-projects'
import HomeVideo from '~/components/blocks/home-video'
import PageLayout from '~/components/layouts/PageLayout'
import Meta from '~/components/shared/headers/Meta'
import VedioPage from '~/components/VedioPage'

function NewHomePage({ tab, category }) {

    return (
        <PageLayout>
            <Meta title="Soff - barcha ma'lumotlar bazasi" image="/static/img/soff/soff_green_white.png" />
            <HeroMain />
            {/* <CategoryTabs tab={tab} category={category} /> */}
            <HomeCategories/>
            <HomeVideo/>
            {/* <HomeProducts tab={tab} /> */}
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