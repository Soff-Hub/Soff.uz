import React, { useEffect } from 'react';
import ElectronicProductGroupWithCarousel from '~/components/partials/homepage/electronic/ElectronicProductGroupWithCarousel';
import ElectronicBanner from '~/components/partials/homepage/electronic/ElectronicBanner';
import ElectronicTopCategories from '~/components/partials/homepage/electronic/ElectronicTopCategories';
import SiteFeatures from '~/components/partials/homepage/autopart/SiteFeatures';
import { PropagateLoader } from 'react-spinners';

import CollectionRepository from '~/repositories/CollectionRepository';
import useCart from '~/hooks/useCart';
import { useDispatch, useSelector } from 'react-redux';
import useWishlist from '~/hooks/useWishlist';
import { CategorySlug } from '~/store/auth/action';

const HomeElectronicsPage = ({ category }) => {
    const dispatch = useDispatch()
    async function getCategoryFunc() {
        const responseData = await CollectionRepository.getCategoryData(
            `customer/category-list/`
        );
        if (responseData?.data?.results) {
            dispatch(CategorySlug(responseData.data.results));
        }
    }

    const { cartDataItems, wishlist } = useSelector(state => state.ecomerce)
    const { category_lists: categoryData } = useSelector(state => state.auth)

    const { setAllCartItem } = useCart()
    const { setAllSaved } = useWishlist()

    useEffect(() => {
        if (cartDataItems?.length !== JSON.parse(localStorage.getItem('cart'))) {
            setAllCartItem();
        }

        if (wishlist?.length !== JSON.parse(localStorage.getItem('wishlist'))) {
            setAllSaved();
        }

        if (categoryData?.length === 0) {
            getCategoryFunc();
        }

    }, []);


    return (
        <main id="homepage-7">
            <ElectronicBanner />
            <ElectronicTopCategories />
            {category?.length > 0 ? (
                category?.map(
                    (item, index) =>
                        item?.promotional_sliders?.length > 0 && (
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
