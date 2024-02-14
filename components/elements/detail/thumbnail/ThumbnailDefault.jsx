import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import NextImageCard from '~/components/nextImagecard';

const ThumbnailDefault = ({ product, vertical = true, views }) => {
    console.log('product', product);
    return (
        <div className="ps-product__thumbnail" data-vertical={vertical}>
            {product?.document?.content_type === 'video' ? (
                <div className="ps-wrapper">
                   <div className='product__video--container' >
                   <video className='product__video' controls >
                        <source
                            src={product?.document?.short_content_url}
                            type={`video/${product?.document?.file_type?.replace(".","")}`}
                        />
                    </video>
                   </div>
                    <div className="views">
                        {' '}
                        <i class="fa-solid fa-eye"></i>{' '}
                        <span>{views?.count}</span>
                    </div>
                </div>
            ) : product?.document?.content_type === 'file' ? (
                <figure>
                    <div className="ps-wrapper">
                        {product?.document?.images?.length > 0
                            ? product?.document?.images?.map((item, i) => (
                                  <NextImageCard
                                      url={item?.image_url}
                                      clasS="border mb-3"
                                      width="270px"
                                      height="350px"
                                      style={{ objectFit: 'contain' }}
                                  />
                              ))
                            : ''}
                    </div>
                    <div className="views">
                        {' '}
                        <i class="fa-solid fa-eye"></i>{' '}
                        <span>{views?.count}</span>
                    </div>
                </figure>
            ) : (
                ''
            )}
        </div>
    );
};

export default ThumbnailDefault;
