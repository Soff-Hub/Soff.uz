import React from 'react';
import Link from 'next/link';
import { generateTempArray } from '~/utilities/common-helpers';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import Product from '~/components/elements/products/Product';

const ElectronicProductGroupWithCarousel = ({
    title,
    data,
    id,
    slug
}) => {

    // Views
    let productItemsView;
    if (true) {
        if (data && data?.promotional_sliders.length > 0) {
            productItemsView = (
                <div className="d-flex align-content-center row">
                    {data?.promotional_sliders
                        ?.slice(0, 6)
                        .map((item, index) => (
                            <div key={index} className="home-card col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-3 col-6">
                                <Product  product={item} />{' '}
                            </div>
                        ))}
                </div>
            );
        } else {
            productItemsView = <p>Mahsulot topilmadi</p>;
        }
    } else {
        const skeletons = generateTempArray(6).map((item, i) => (
            <div key={i} className="col-xl-2 col-lg-3 col-sm-3 col-6">
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
                        <li>
                            <Link href={`/category/${slug}`}>
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
