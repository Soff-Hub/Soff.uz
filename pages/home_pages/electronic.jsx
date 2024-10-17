import React, { useEffect, useMemo, useState } from 'react';
import ElectronicProductGroupWithCarousel from '~/components/partials/homepage/electronic/ElectronicProductGroupWithCarousel';
import ElectronicBanner from '~/components/partials/homepage/electronic/ElectronicBanner';
import ElectronicTopCategories from '~/components/partials/homepage/electronic/ElectronicTopCategories';
import SiteFeatures from '~/components/partials/homepage/autopart/SiteFeatures';
import useCart from '~/hooks/useCart';
import useWishlist from '~/hooks/useWishlist';
import { useSelector } from 'react-redux';
import VedioPage from '~/components/VedioPage';
import Meta from '~/components/shared/headers/Meta';
import Link from 'next/link';
import { baseUrl } from '~/repositories/Repository';
import axios from 'axios';


const HomeElectronicsPage = () => {
    // debuger();
    const { cartDataItems, wishlist } = useSelector((state) => state.ecomerce);
    const [category, setCategory] = useState([]);
    const [freeProducts, setFreeProducts] = useState({});
    const [topSellers, setTopSellers] = useState({});

    const { setAllCartItem } = useCart();
    const { setAllSaved } = useWishlist();

    async function getProducts() {
        const responseData = await axios.get(
            baseUrl + 'customer/category-list/'
        );
        setCategory(responseData?.data?.results);
    }

    async function getFreeDocuments() {
        const responseData = await axios.get(
            baseUrl + 'customer/free-document/'
        );

        setFreeProducts({
            id: 999999999999999,
            name: 'Bepul mahsulotlar',
            icon: null,
            image: null,
            slug: 'free',
            promotional_sliders: [...responseData.data],
        });
    }

    async function getTopSellers() {
        const responseData = await axios.get(
            baseUrl + 'customer/free-document/'
        );
        setTopSellers({
            id: 999999999999999,
            name: 'Top sotuvchilar',
            icon: null,
            image: null,
            slug: 'top-sellers',
            promotional_sliders: [...responseData.data],
        });
    }

    useEffect(() => {
        getProducts();
        getFreeDocuments();
        // getTopSellers();
    }, []);

    useEffect(() => {
        // localStoragedagi ma'lumotlar va redux store o'rtasidagi ma'lumotlar solishtiriladi
        if (
            cartDataItems?.length !== JSON.parse(localStorage.getItem('cart'))
        ) {
            setAllCartItem();
        }

        if (wishlist?.length !== JSON.parse(localStorage.getItem('wishlist'))) {
            setAllSaved();
        }
    }, []);

    // Memoization bilan komponentlarni o'zlashtirish
    const memoizedCard = useMemo(() => {
        return <ElectronicTopCategories />;
    }, []);

    const memoizedBanner = useMemo(() => {
        return (
            <>
                <ElectronicBanner />
            </>
        );
    }, []);

    

    // useEffect(() => {
    //     if (window) {
    //         window.onblur = function (e) {
    //             //    alert(`Brauzer oynasi yoki Developer Tools ochildi => ${JSON.stringify(e.isTrusted)}`);
    //             Router.push("/")
    //                debuger()
    //             // debugger;
    //         };
    //     }
    // }, []);

    // function debuger() {
    //     var devtoolsOpen = false;

    //     function detectDevTools() {
    //         const start = Date.now();
    //         debugger; // Bu yerda to'xtatiladi agar DevTools ochilgan bo'lsa


    //         const duration = Date.now() - start;

    //         if (duration > 100) {
    //             if (!devtoolsOpen) {
    //                 devtoolsOpen = true;
    //                 console.log('Developer Tools ochildi');
    //             }
    //         } else {
    //             if (devtoolsOpen) {
    //                 devtoolsOpen = false;
    //                 console.log('Developer Tools yopildi');
    //             }
    //         }
    //     }

    //     setInterval(detectDevTools, 5);

    //     if (typeof window !== 'undefined') {
    //         window.addEventListener('devtoolschange', (event) => {
    //             if (event.detail.open) {
    //                 console.log(
    //                     'Developer Tools ochildi:',
    //                     event.detail.orientation
    //                 );
    //                 alert("network ochildi")
    //                 if (event.detail.orientation === 'vertical') {
    //                     // Network tab ochilganda bajariladigan kod
    //                     alert("network ochildi")
    //                 }
    //             }
    //         });
    //     }
    // }



    return (
        <main id="homepage-7">
            <Meta
                title="Soff | Barcha ma'lumotlar bazasi"
                image="/static/img/soff/soff_green_white.png"
            />

            {memoizedBanner}
            <VedioPage /> 
            {memoizedCard}

            {/* <ElectronicTopSellersGroupWithCarousel
                collectionSlug="electronics-top-sellers"
                title={topSellers.name}
                data={topSellers}
                id={topSellers.id}
                slug={topSellers.slug}
            /> */}

            <ElectronicProductGroupWithCarousel
                collectionSlug="electronics-best-sellers"
                title={freeProducts.name}
                data={freeProducts}
                id={freeProducts.id}
                key={234}
                slug={freeProducts.slug}
            />
            

            {category?.length > 0 ? (
                category.map(
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
