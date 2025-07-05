import React from 'react';
import HomeCategoryHighlights from '~/components/blocks/categoryHighlights';
import FooterComponents from '~/components/blocks/footer/FooterComponents';
import ResutsComponents from '~/components/blocks/header/Results/ResutsComponents';
import HeroSearch from '~/components/blocks/hero';
import HeroService from '~/components/blocks/hero/HeroService';
import HomeCategories from '~/components/blocks/home-categories';
import ItServicesCategories from '~/components/blocks/home-categories/ItServicesCategories';
import SubProjects from '~/components/blocks/home-products/sub-projects';
import HomeVideo from '~/components/blocks/home-video';
import AISoffiaPresentation from '~/components/elements/AISoffiaPresentation';
import PageLayout from '~/components/layouts/PageLayout';
import Meta from '~/components/shared/headers/Meta';

function NewHomePage ({ tab, category }) {
    return (
        <PageLayout>
            <Meta
                title='Raqamli mahsulotlar va onlayn xizmatlar bozori – Soff.uz'
                description={
                    'Soff.uz - tayyor materiallar, ilmiy ishlar, 3D dizaynlar, veb saytlar, dizayn shablonlari va turli xizmatlar bozori. Hozir xarid qiling yoki soting!'
                }
                keywords={[
                    { name: 'raqamli mahsulotlar' },
                    { name: 'onlayn xizmatlar' },
                    { name: 'tayyor materiallar' },
                    { name: 'ilmiy ishlar' },
                    { name: '3D dizayn' },
                    { name: 'dizayn shablonlari' },
                    { name: 'veb saytlar' },
                    { name: 'grafik dizayn' },
                    { name: 'akademik xizmatlar' },
                    { name: 'Soff.uz' },
                ]}
                author='Soff.uz'
                image='/static/img/soff imkoniyatlari 2.png'
            />
            {/* <HeroService /> */}
            <HeroSearch />
            <HomeCategories />
            <HomeCategoryHighlights />
            <ItServicesCategories />
            {/* <HomeVideo /> */}
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
