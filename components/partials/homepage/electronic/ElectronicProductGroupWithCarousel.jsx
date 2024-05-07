import React from 'react';
import Link from 'next/link';
import Product from '~/components/elements/products/Product';
import AudioProductCart from '~/components/elements/products/AudioProductCart';
import ProductVideo from '~/components/elements/products/ProductVideo';


const ElectronicProductGroupWithCarousel = ({ title, data, id, slug }) => {
    // Views

    
    let productItemsView;
    if (data && data?.promotional_sliders?.length > 0) {
        productItemsView = (
            <div className="d-flex align-content-center row">
                {data?.promotional_sliders?.slice(0, 6).map((item, index) => (
                    item?.document?.content_type === 'audio' ?
                        <div
                            key={index}
                            className="col-md-12 my-2">
                            <AudioProductCart product={item} />{' '}
                        </div> :
                        item?.document?.content_type === 'video' ?
                            <div
                                key={index}
                                className="col-md-4 my-2">
                                <ProductVideo product={item} />{' '}
                            </div>
                            :

                            <div
                                key={index}
                                className="home-card col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-3 col-6">
                                <Product product={item} />
                            </div>
                ))}
            </div>
        );
    } else {
        productItemsView = <p>Mahsulot topilmadi</p>;
    }




    return (
        <div className="ps-product-list">
            <div className="container">
                <div className="ps-section__header">
                    <h3 className="titleeeeeeee">{title}</h3>
                    <ul className="ps-section__links">
                        <li>
                            <Link href={`/category/${slug}`}>
                                <a className="d-flex align-items-center gap-2">
                                    <span>Barchasini ko'rish</span>
                                    <i className="fa-solid fa-angles-right fa-beat-fade"></i>
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
                {title === 'Audio materiallar' ? (
                    <div className="ps-section__content">
                        {productItemsView}
                    </div>
                ) :
                    title === 'Video materiallar' ? (
                        <div className="ps-section__content">
                            {productItemsView}
                        </div>
                    )
                        : (
                            <div className="ps-section__content">
                                {productItemsView}
                            </div>
                        )}
            </div>
        </div>
    );
};
export default ElectronicProductGroupWithCarousel;
