import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';

import {
    getProductsByCategoriesHelper,
    getProductsByCollectionHelper,
} from '~/utilities/strapi-fetch-data-helpers';
import { generateTempArray } from '~/utilities/common-helpers';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import Product from '~/components/elements/products/Product';
import { carouselStandard } from '~/utilities/carousel-helpers';
import useGetProducts from '~/hooks/useGetProducts';

import CollectionRepository from '~/repositories/CollectionRepository';

const ElectronicProductGroupWithCarousel = ({
    collectionSlug,
    title,
    data,
    id
}) => {
    // console.log(title, data);
    const { productItems, loading, getProductsByCollection } = useGetProducts();
    useEffect(() => {
        if (collectionSlug) {
            getProductsByCollection(collectionSlug);
        }
    }, [collectionSlug]);

    // Views
    // const [categoryId, setCategoryId] = useState(null)
    // console.log(categoryId);
    let productItemsView;
    if (!loading) {
        if (data && data.promotional_sliders.length > 0) {
            //  let slideItems
            productItemsView = (
                <Slider
                    {...carouselStandard}
                    arrows={false}
                    className="ps-carousel outside">

                    {/* {slideItems} */}
                    {
                    data.promotional_sliders.map((item, index) => (
                        <Product product={item} />
                    ))
                    }
                </Slider>
            );
        } else {
            productItemsView = <p>Hujjat topilmadi</p>;
        }
    } else {
        const skeletons = generateTempArray(6).map((item) => (
            <div className="col-xl-2 col-lg-3 col-sm-3 col-6" key={item}>
                <SkeletonProduct />
            </div>
        ));
        productItemsView = <div className="row">{skeletons}</div>;
    }

    return (
        <div className="ps-product-list">
            <div className="container">
                <div className="ps-section__header">
                    <h3>{title}</h3>
                    <ul className="ps-section__links">

                        {/* {linksView} */}
                        <li>
                            <Link href={`/category/${id}`}>
                                <a>Barchasini ko'rish</a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="ps-section__content">{productItemsView}</div>
            </div>
        </div>
    );
};
export default ElectronicProductGroupWithCarousel;
