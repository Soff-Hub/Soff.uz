import React, { useEffect, useState } from 'react';
import Product from '~/components/elements/products/Product';
import ProductVideo from '~/components/elements/products/ProductVideo';
import AudioProductCart from '~/components/elements/products/AudioProductCart';

const RelatedProduct = ({ collectionSlug, boxed, layout, pid, data, isPlay, setIsPlay }) => {
    const [relatedProduct, setRelatedProduct] = useState(null);

    useEffect(() => {
        if (data) {
            setRelatedProduct(data);
        }
    }, [collectionSlug, pid]);



    // Views
    let productItemsView;
    if (relatedProduct && relatedProduct?.length > 0) {
        productItemsView = (
            <div className="d-flex align-content-center row p-0">
                {relatedProduct?.map((item, index) => (
                    item?.document?.content_type === 'audio' ?
                        <div
                            key={index}
                            className="col-md-12 my-2">
                            <AudioProductCart product={item} />{' '}
                        </div>
                        : item?.document?.content_type === 'video' ?
                            <div
                                key={index}
                                className="col-md-4 my-2">
                                <ProductVideo product={item} isPlay={isPlay} setIsPlay={setIsPlay} />{' '}
                            </div>
                            :
                            <div
                                key={index}
                                className="col-md-2 my-2">
                                <Product product={item} />
                            </div>
                ))}
            </div>
        );
    } else {
        productItemsView = <p>Mahsulot topilmadi</p>;
    }


    return (
        <>
            {relatedProduct?.length > 0 ? (
                <div
                    className={`ps-section--default ps-related-products ${boxed === true ? 'boxed' : ''
                        }`}>
                    <div className="ps-section__header">
                        <h3>O'xshash mahsulotlar</h3>
                    </div>
                    <div className="ps-section__content">{productItemsView}</div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default RelatedProduct;
