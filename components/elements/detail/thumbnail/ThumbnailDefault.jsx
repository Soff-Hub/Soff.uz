import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import NextImageCard from '~/components/nextImagecard';

const ThumbnailDefault = ({ product, vertical = true, views }) => {
    return (
        <div
            className="ps-product__thumbnail"
            data-vertical={vertical ? 'true' : 'false'}>
            <figure>
                <div className="ps-wrapper">
                    {product?.document?.images?.length > 0 ? (
                        product?.document?.images?.map((item,i) => (
                            // <img
                            // key={i}
                            //     src={item?.image_url}
                            //     alt="document"
                            //     className="border mb-3 "
                            //     style={{ objectFit: 'contain' }}
                            // />
                            <NextImageCard url={item?.image_url} clasS='border mb-3' width='270px' height='350px' style={{objectFit:'contain'}} />
                        ))
                    ) : (
                        ''
                    )}
                </div>
            <div className='views' >  <i class="fa-solid fa-eye"></i> <span>{views?.count}</span></div>
            </figure>
        </div>
    );
};

export default ThumbnailDefault;
