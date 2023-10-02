
import React, { useEffect, useState } from 'react';
import ElectronicProductGroupWithCarousel from '~/components/partials/homepage/electronic/ElectronicProductGroupWithCarousel';
import ElectronicBanner from '~/components/partials/homepage/electronic/ElectronicBanner';
import ElectronicTopCategories from '~/components/partials/homepage/electronic/ElectronicTopCategories';
import SiteFeatures from '~/components/partials/homepage/autopart/SiteFeatures';

import CollectionRepository from '~/repositories/CollectionRepository';
import { PropagateLoader } from 'react-spinners';

const HomeElectronicsPage = () => {

    const [categoryData, setCategoryData] = useState([]);

    async function getCategoryFunc() {
        const responseData = await CollectionRepository.getCategoryData(
            `customer/category-list/`
        );
        if (responseData?.length > 0) {
            setCategoryData(responseData);
        }
    }

    useEffect(() => {
        getCategoryFunc();
    }, []);

    return (

         <main id="homepage-7">
         <ElectronicBanner />
         <ElectronicTopCategories />
         {
            categoryData?.length > 0 ?
            categoryData?.map((item, index) => (
                    item.promotional_sliders?.length > 0 &&
                <ElectronicProductGroupWithCarousel
                    collectionSlug="electronics-best-sellers"
                    title={item.name}
                    data={item}
                    id={item.id}
                    key={index}
                />

            )) :
             <div style={{
                    display:'flex',
                    justifyContent:'center',
                    alignContent:'center'
                }}><PropagateLoader color="#F4CA16" /></div>
         } 
        
         <SiteFeatures />
     </main>
    );
};

export default HomeElectronicsPage;
