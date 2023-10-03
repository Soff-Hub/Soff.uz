import React, { useEffect } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import { generateTempArray } from '~/utilities/common-helpers';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import Product from '~/components/elements/products/Product';
import useGetProducts from '~/hooks/useGetProducts';


const ElectronicProductGroupWithCarousel = ({
    collectionSlug,
    title,
    data,
    id
}) => {
    const { productItems, loading, getProductsByCollection } = useGetProducts();
    useEffect(() => {
        if (collectionSlug) {
            getProductsByCollection(collectionSlug);
        }
    }, [collectionSlug]);

    // Views
console.log(data);
    let productItemsView;
    if (!loading) {
        if (data && data?.promotional_sliders.length > 0) {
            productItemsView = 
            (
              <div className='d-flex align-content-center row'>
               {
                 data?.promotional_sliders?.slice(0,6).map((item, index) => (
                  <div className='home-card col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-3 col-6' >   <Product key={item.id} product={item} /> </div>
                ))
               }
              </div>
            )
        } else {
            productItemsView = <p>Hujjat topilmadi</p>;
        }
    } else {
        const skeletons = generateTempArray(6).map((item) => (
            <div key={item.id} className="col-xl-2 col-lg-3 col-sm-3 col-6">
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
