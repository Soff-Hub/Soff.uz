
import React, { useEffect, useState } from 'react';
import ElectronicProductGroupWithCarousel from '~/components/partials/homepage/electronic/ElectronicProductGroupWithCarousel';
import ElectronicBanner from '~/components/partials/homepage/electronic/ElectronicBanner';
import ElectronicTopCategories from '~/components/partials/homepage/electronic/ElectronicTopCategories';
import SiteFeatures from '~/components/partials/homepage/autopart/SiteFeatures';
import HeaderElectronic from '~/components/shared/headers/HeaderElectronic';
import HeaderMobileElectronic from '~/components/shared/headers/HeaderMobileElectronic';
import FooterSecond from '~/components/shared/footers/FooterSecond';

import CollectionRepository from '~/repositories/CollectionRepository';
import { useDispatch } from 'react-redux';
import { isLoginning } from '~/store/auth/action';

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

    const dispatch = useDispatch()

    const defaultRoutePage = () => {
        dispatch(isLoginning());
    }

    useEffect(() => {
        defaultRoutePage()
        getCategoryFunc();
    }, []);

    // const smartPhoneLinks = ['Iphone, Ipad, Samsung'];
    // const electronicLinks = [
    //     'Smart',
    //     'TV LED',
    //     'Air Conditions',
    //     'Sony Speakers',
    //     'Panasonic Refrigerations',
    // ];
    // const computerLinks = [
    //     'Laptop',
    //     'Desktop PC',
    //     'Smartphone',
    //     'Mainboards',
    //     'PC Gaming',
    //     'Accessories',
    // ];
    // const cameraLinks = [
    //     'Videos',
    //     'Projectors',
    //     'Digital Cameras',
    //     'Printers & Scanners',
    //     'Accessorices',
    // ];

    const headers = (
        <>
            <HeaderElectronic />
            <HeaderMobileElectronic />
        </>
    );

    const footer = <FooterSecond classes="ps-footer--electronic" />;

    return (

         <main id="homepage-7">
         <ElectronicBanner />
         <ElectronicTopCategories />
         {/* <ProductGroupDealOfDay
             categorySlug="computers-and-technologies"
             boxed={true}
         /> */}
         {
            categoryData && categoryData.map((item, index) => (
                    item.promotional_sliders?.length > 0 &&
                <ElectronicProductGroupWithCarousel
                    collectionSlug="electronics-best-sellers"
                    title={item.name}
                    data={item}
                    id={item.id}
                    key={item.id}
                />
            ))
         }
        
         <SiteFeatures />
     </main>
    );
};

export default HomeElectronicsPage;
