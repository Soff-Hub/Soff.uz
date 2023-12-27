import React, { useEffect, useMemo } from 'react';
import ElectronicProductGroupWithCarousel from '~/components/partials/homepage/electronic/ElectronicProductGroupWithCarousel';
import ElectronicBanner from '~/components/partials/homepage/electronic/ElectronicBanner';
import ElectronicTopCategories from '~/components/partials/homepage/electronic/ElectronicTopCategories';
import SiteFeatures from '~/components/partials/homepage/autopart/SiteFeatures';
import { PropagateLoader } from 'react-spinners';
import useCart from '~/hooks/useCart';
import useWishlist from '~/hooks/useWishlist';
import { useSelector } from 'react-redux';
import VedioPage from '~/components/VedioPage';
import Meta from '~/components/shared/headers/Meta';
import Link from 'next/link';

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

    const memoizedCard = useMemo(() => {
        return  <ElectronicTopCategories />
    }, []);
    const memoizedBanner = useMemo(() => {
        return   <ElectronicBanner />
    }, []);

    return (
        <main id="homepage-7">
              <Meta  title="Soff.uz" image="/static/img/soff/soff_green_white.png"/>
          {memoizedBanner}
            <VedioPage/>
           {memoizedCard}
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
            <div className="text-center">
                    <div className=" more-parent">
                        <div className="more">
                            <Link href="/topCategory/categories">
                                <a>
                                    Ko'proq
                                    <i
                                        className="fa-solid fa-angles-right fa-beat-fade"
                                        style={{
                                            fontSize: '13px',
                                            paddingTop: '1px',
                                            paddingLeft: '5px',
                                        }}></i>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
        </main>
    );
};

export default HomeElectronicsPage;
