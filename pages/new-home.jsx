import React from 'react'
import CategoryTabs from '~/components/blocks/categories'
import HeroMain from '~/components/blocks/hero'
import HomeProducts from '~/components/blocks/home-products'
import PageLayout from '~/components/layouts/PageLayout'

export default function NewHomePage() {
    return (
        <PageLayout>
            <HeroMain />
            <CategoryTabs />
            <HomeProducts />
        </PageLayout>
    )
}
