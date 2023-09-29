import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import Lightbox from 'react-image-lightbox';
import { baseUrl } from '~/repositories/Repository';
import NextArrow from '~/components/elements/carousel/NextArrow';
import PrevArrow from '~/components/elements/carousel/PrevArrow';

const ThumbnailDefault = ({ product, vertical = true }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [productImages, setProductImages] = useState([]);

 

    return (
        <div
            className="ps-product__thumbnail"
            data-vertical={vertical ? 'true' : 'false'}>

            <figure >
                <div className="ps-wrapper" >
                    {
                        product?.poster_url ?
                    //   <img src={product?.poster_url} alt="soff-hujjat" />
                    <div style={{
                        backgroundImage:`url(${product?.poster_url})`,
                        width:'100%',
                        backgroundPosition:'center',
                        backgroundRepeat:'no-repeat',
                        backgroundSize:'contain'
                    }}
                    className='hujjat-detail-full-image'></div>
                        :
                       
                        <img src="/static/img/docCopy.jpg" alt="doc" />

                    }
                </div>
            </figure>
        </div>
    );
};

export default ThumbnailDefault;
