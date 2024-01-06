import React from 'react';
import HomepageDefaultPage from './main';
import { baseUrl } from '~/repositories/Repository';



export default function Page({ category }) {
    return <HomepageDefaultPage category={category} />
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

