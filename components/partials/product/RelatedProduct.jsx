import React, { useEffect, useState } from 'react';
import Product from '~/components/elements/products/Product';

const RelatedProduct = ({ collectionSlug, boxed, layout, pid, data }) => {
    const [relatedProduct, setRelatedProduct] = useState(null);

    useEffect(() => {
        if (data) {
            setRelatedProduct(data);
        }
    }, [collectionSlug, pid]);


    // Views
    let carouselView;
    if (true) {
        if (relatedProduct) {
            if ((layout = 'fullwidth')) {
                carouselView = (
                    <div className="d-flex align-content-center row  ">
                        {relatedProduct?.length > 0 &&
                            relatedProduct?.map((item, i) => (
                                <div key={i} className="home-card col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-3 col-6 ">
                                    <Product product={item} key={i} />
                                </div>
                            ))
                            }
                    </div>
                )
            } else {
                carouselView = (
                    <>
                        {relatedProduct?.length > 0 &&
                            relatedProduct?.map((item, i) => (
                                <div className="detail-card " key={i}>
                                    {' '}
                                    <Product product={item}  />
                                </div>
                            ))}
                    </>
                );
            }
        } else {
            carouselView = <p>Mahsulot topilmadi</p>;
        }
    } else {
        carouselView = <p>Loading...</p>;
    }

    return (
        <>
            {relatedProduct?.length > 0 ? (
                <div
                    className={`ps-section--default ps-related-products ${
                        boxed === true ? 'boxed' : ''
                    }`}>
                    <div className="ps-section__header">
                        <h3>O'xshash mahsulotlar</h3>
                    </div>
                    <div className="ps-section__content">{carouselView}</div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default RelatedProduct;
