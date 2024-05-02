import React from 'react';
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
