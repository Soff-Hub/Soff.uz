import React, { useEffect } from 'react';
import ElectronicProductGroupWithCarousel from '~/components/partials/homepage/electronic/ElectronicProductGroupWithCarousel';
import ElectronicBanner from '~/components/partials/homepage/electronic/ElectronicBanner';
import ElectronicTopCategories from '~/components/partials/homepage/electronic/ElectronicTopCategories';
import SiteFeatures from '~/components/partials/homepage/autopart/SiteFeatures';
import { PropagateLoader } from 'react-spinners';
import useCart from '~/hooks/useCart';
import useWishlist from '~/hooks/useWishlist';
import { useSelector } from 'react-redux';
import VedioPage from '~/components/VedioPage';

const HomeElectronicsPage = ({ category }) => {
    const { cartDataItems, wishlist } = useSelector((state) => state.ecomerce);

    const { setAllCartItem } = useCart();
    const { setAllSaved } = useWishlist();

    useEffect(() => {
        if (
            cartDataItems?.length !== JSON.parse(localStorage.getItem('cart'))
        ) {
            setAllCartItem();
        }

        if (wishlist?.length !== JSON.parse(localStorage.getItem('wishlist'))) {
            setAllSaved();
        }
    }, []);

    return (
        <main id="homepage-7">
            <ElectronicBanner />
            <VedioPage/>
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
                                slug={item.slug}
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
