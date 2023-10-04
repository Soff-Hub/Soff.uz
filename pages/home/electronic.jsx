import React, { useEffect, useState } from 'react';
import ElectronicProductGroupWithCarousel from '~/components/partials/homepage/electronic/ElectronicProductGroupWithCarousel';
import ElectronicBanner from '~/components/partials/homepage/electronic/ElectronicBanner';
import ElectronicTopCategories from '~/components/partials/homepage/electronic/ElectronicTopCategories';
import SiteFeatures from '~/components/partials/homepage/autopart/SiteFeatures';

import CollectionRepository from '~/repositories/CollectionRepository';
import { PropagateLoader } from 'react-spinners';
import useCart from '~/hooks/useCart';
import { useSelector } from 'react-redux';
import useWishlist from '~/hooks/useWishlist';

const HomeElectronicsPage = () => {
    const [categoryData, setCategoryData] = useState([]);


    async function getCategoryFunc() {
        const responseData = await CollectionRepository.getCategoryData(
            `customer/category-list/`
        );
        if (responseData?.data.results.length > 0) {
            setCategoryData(responseData.data.results);
        }
    }


    const { cartDataItems, wishlist } = useSelector(state => state.ecomerce)
    const { setAllCartItem } = useCart()
    const { setAllSaved } = useWishlist()


    useEffect(() => {
        if (cartDataItems.length !== JSON.parse(localStorage.getItem('cart'))) {
            setAllCartItem();
        }

        if (wishlist.length !== JSON.parse(localStorage.getItem('wishlist'))) {
            setAllSaved();
        }

        getCategoryFunc();
    }, []);
    return (
        <main id="homepage-7">
            <ElectronicBanner />
            <ElectronicTopCategories />
            {categoryData?.length > 0 ? (
                categoryData?.map(
                    (item, index) =>
                        item.promotional_sliders?.length > 0 && (
                            <ElectronicProductGroupWithCarousel
                                collectionSlug="electronics-best-sellers"
                                title={item.name}
                                data={item}
                                id={item.id}
                                key={index}
                            />
                        )
                )
            ) : (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}>
                    <PropagateLoader className="progres-color" />
                </div>
            )}


            <SiteFeatures />
        </main>
    );
};

export default HomeElectronicsPage;
