import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const ThumbnailDefault = ({ product, vertical = true }) => {
    return (
        <div
            className="ps-product__thumbnail"
            data-vertical={vertical ? 'true' : 'false'}>
            <figure>
                <div className="ps-wrapper">
                    {product?.document?.images?.length > 0 ? (
                        product?.document?.images?.map((item,i) => (
                            <img
                            key={i}
                                src={item?.image_url}
                                alt="document"
                                className="border mb-3 "
                                style={{ objectFit: 'contain' }}
                            />
                        ))
                    ) : (
                        ''
                    )}
                </div>
            </figure>
        </div>
    );
};

export default ThumbnailDefault;
