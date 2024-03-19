import React from 'react';
import Link from 'next/link';
import { generateTempArray } from '~/utilities/common-helpers';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import Product from '~/components/elements/products/Product';
import TopSellers from './TopSeller';

const ElectronicTopSellersGroupWithCarousel = ({
    title,
    data,
    id,
    slug
}) => {

    // Views
    let productItemsView;
    if (true) {
        if (data && data?.promotional_sliders?.length > 0) {
            productItemsView = (
                <div className="d-flex align-content-center">
                {/* <TopSellers/> */}
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
                    <h3 className='titleeeeeeee'>{title}</h3>
                    <ul className="ps-section__links">
                        <li>
                            <Link href={`/category/${slug}`}>
                                <a className='d-flex align-items-center gap-2'>
                                    <span>Barchasini ko'rish</span>
                                    <i className='fa-solid fa-angles-right fa-beat-fade'></i>
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="ps-section__content">{productItemsView}</div>
            </div>
        </div>
    );
};
export default ElectronicTopSellersGroupWithCarousel;
