import React from 'react';
import FooterComponents from '~/components/blocks/footer/FooterComponents';
import ResutsComponents from '~/components/blocks/header/Results/ResutsComponents';
import HeroSearch from '~/components/blocks/hero';
import HeroService from '~/components/blocks/hero/HeroService';
import HomeCategories from '~/components/blocks/home-categories';
import ItServicesCategories from '~/components/blocks/home-categories/ItServicesCategories';
import SubProjects from '~/components/blocks/home-products/sub-projects';
import HomeVideo from '~/components/blocks/home-video';
import PageLayout from '~/components/layouts/PageLayout';
import Meta from '~/components/shared/headers/Meta';

function NewHomePage ({ tab, category }) {
    return (
        <PageLayout>
            <Meta
                title="Soff - barcha ma'lumotlar bazasi"
                image='/static/img/soff/soff_green_white.png'
            />
            {/* <HeroService /> */}
            <HeroSearch/>
            <HomeCategories />
            <ItServicesCategories />
            <HomeVideo />
            <ResutsComponents />
            <SubProjects />
        </PageLayout>
    );
}

export async function getServerSideProps (context) {
    const { query } = context;

    return {
        props: {
            tab: query?.tab || 'file',
            category: query?.category || null,
        },
    };
}

export default NewHomePage;
