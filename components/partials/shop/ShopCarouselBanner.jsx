import React from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import { carouselSingle } from '~/utilities/carousel-helpers';

const ShopCarouselBanner = () => {

    return (
        <div className="ps-shop-banner">
            <Slider {...carouselSingle} className="ps-carousel inside">
                <div className="item">
                    <Link href="/shop">
                     <a>
                     <img
                            src="/static/img/slider/shop-default/1.jpg"
                            alt="martfury"
                        />
                     </a>
                    </Link>
                </div>
                <div className="item">
                    <Link href="/shop">
                       <a>
                       <img
                            src="/static/img/slider/shop-default/2.jpg"
                            alt="martfury"
                        />
                       </a>
                    </Link>
                </div>
            </Slider>
        </div>
    );
};

export default ShopCarouselBanner;
