import React from 'react';

import PageContainer from '~/components/layouts/PageContainer';

import HomeElectronicsPage from './home/electronic'
import { baseUrl } from '~/repositories/Repository';
import Meta from '~/components/shared/headers/Meta';

const HomepageDefaultPage = ({ category }) => {
    return (
        <PageContainer title="Soff - barcha ma'lumotlar bazasi">
               <Meta  title="Soff.uz" image="/static/img/soff/soff_green_white.png"/>
            <HomeElectronicsPage category={category?.results} />
        </PageContainer>
    );
};


export async function getServerSideProps() {
    try {
        const request = await fetch(baseUrl + 'customer/category-list/');
        if (!request.ok) {
            throw new Error('Request to the API failed with status ' + request.status);
        }

        const categoryResponse = await request.json();

        return {
            props: {
                category: categoryResponse,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                category: null,
            },
        };
    }
}



export default HomepageDefaultPage;
