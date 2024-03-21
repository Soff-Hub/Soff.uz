import React from 'react';
import Link from 'next/link';
import { generateTempArray } from '~/utilities/common-helpers';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import TopSellersTable from './TopSellersTable';

const ElectronicTopSellersGroupWithCarousel = ({
    title,
    data,
    id,
    slug,
    key
}) => {

    // Views
    let productItemsView;
    if (true) {
        if (data && data?.promotional_sliders?.length > 0) {
            productItemsView = (
                <TopSellersTable/>
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
                           
                        </li>
                    </ul>
                </div>
                <div className={`ps-section__content top-seller-content`}>{productItemsView}</div>
            </div>
        </div>
    );
};
export default ElectronicTopSellersGroupWithCarousel;
