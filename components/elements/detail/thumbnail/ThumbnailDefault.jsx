import React, { useEffect, useRef, useState } from 'react';

const ThumbnailDefault = ({ product, vertical = true }) => {
    return (
        <div
            className="ps-product__thumbnail"
            data-vertical={vertical ? 'true' : 'false'}>
            <figure>
                <div className="ps-wrapper">
                    {product?.iamges?.length > 0 ? (
                        product?.iamges?.map((item) => (
                            <img
                                src={item?.image_url}
                                alt="document"
                                className="border mb-3 "
                                style={{ objectFit: 'contain' }}
                            />
                        ))
                    ) : (
                        <img src="/static/img/docCopy.jpg" alt="doc" />
                    )}
                </div>
            </figure>
        </div>
    );
};

export default ThumbnailDefault;
