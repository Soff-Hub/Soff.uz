import React from 'react';

import PageContainer from '~/components/layouts/PageContainer';

import HomeElectronicsPage from './home/electronic'
import { baseUrl } from '~/repositories/Repository';

const HomepageDefaultPage = ({ category }) => {
    return (
        <PageContainer title="Soff - barcha ma'lumotlar bazasi">
            <HomeElectronicsPage category={category?.results} />
        </PageContainer>
    );
};

export async function getServerSideProps() {
    const request = await fetch(baseUrl + `customer/category-list/`)
    const category = await request.json()


    return {
        props: {
            category
        },
    };
}


export default HomepageDefaultPage;
