import React from 'react';
import Link from 'next/link';
import Product from '~/components/elements/products/Product';
import ReactAudioPlayer from 'react-audio-player';

const ElectronicProductGroupWithCarousel = ({ title, data, id, slug }) => {


    // Views
    let productItemsView;
    if (true) {
        if (data && data?.promotional_sliders?.length > 0) {
            productItemsView = (
                <div className="d-flex align-content-center row">
                    {data?.promotional_sliders
                        ?.slice(0, 6)
                        .map((item, index) => (
                            <div
                                key={index}
                                className="home-card col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-3 col-6">
                                <Product product={item} />{' '}
                            </div>
                        ))}

                    {/* <ReactAudioPlayer
                        src="https://audio-previews.elements.envatousercontent.com/files/271591854/preview.mp3?response-content-disposition=attachment%3B+filename%3D%22AX3HBJW-inspiring-epic.mp3%22"
                        autoPlay
                        controls
                    /> */}
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
export default ElectronicProductGroupWithCarousel;
