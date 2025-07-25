import React from 'react';
import BestSellerStatics from '~/components/blocks/bestSellerStatics';
import HomeCategoryHighlights from '~/components/blocks/categoryHighlights';
import ResutsComponents from '~/components/blocks/header/Results/ResutsComponents';
import HeroSearch from '~/components/blocks/hero';
import HomeCategories from '~/components/blocks/home-categories';
import ItServicesCategories from '~/components/blocks/home-categories/ItServicesCategories';
import SubProjects from '~/components/blocks/home-products/sub-projects';
import LastAddedProducts from '~/components/blocks/lastAddedProducts/lastAddedProducts';
import PageLayout from '~/components/layouts/PageLayout';
import Meta from '~/components/shared/headers/Meta';
import { TelegramLink } from '~/components/shared/telegramLink';
import { baseURL } from '~/repositories/api';

function NewHomePage ({ tab, category, lastProductsData }) {
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
                image='c'
            />
            <HeroSearch />
            <HomeCategories />
            <BestSellerStatics />
            {/* <LastAddedProducts lastAdded={lastProductsData}/> */}
            <HomeCategoryHighlights />
            <ItServicesCategories />
            <ResutsComponents />
            <SubProjects />
            <TelegramLink/>
        </PageLayout>
    );
}

export async function getServerSideProps (context) {
    const { query } = context;
    const res = await fetch(`${baseURL}customer/last-added?limit=6`)
    const lastProductsData = await res.json()
 
    return {
        props: {
            tab: query?.tab || 'file',
            category: query?.category || null,
            lastProductsData,
        },
    };
}

export default NewHomePage;
