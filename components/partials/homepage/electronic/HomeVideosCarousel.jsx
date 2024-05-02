import React from 'react';
import Link from 'next/link';
import ProductVideo from '~/components/elements/products/ProductVideo';

const HomeVideosCarousel = ({ title, data, id, slug }) => {


    // Views
    let productItemsView;
    if (true) {
        if (data && data?.promotional_sliders?.length > 0) {
            productItemsView = (
                <div className="d-flex align-content-center row" style={{ rowGap: '15px' }}>
                    {data?.promotional_sliders
                        ?.slice(0, 6)
                        .map((item, index) => (
                            <div
                                key={index}
                                className="col-md-4">
                                <ProductVideo product={item} />{' '}
                            </div>
                        ))}
                </div>
            );
        } else {
            productItemsView = <p>Mahsulot topilmadi</p>;
        }
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

                <div className="ps-section__content">{productItemsView}</div>
            </div>
        </div>
    );
};
export default HomeVideosCarousel;
