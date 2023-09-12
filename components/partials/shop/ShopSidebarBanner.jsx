import React, { Component } from 'react';
import Slider from 'react-slick';
import Link from 'next/link';
import { carouselSingle } from '../../../utilities/carousel-helpers';

class ShopSidebarBanner extends Component {
    render() {
        return (
            <div className="ps-shop-banner">
                <Slider {...carouselSingle} className="ps-carousel blur">
                    <div className="item">
                        <Link href="/shop">
                           <a>
                           <img
                                src="/static/img/slider/shop-sidebar/1.jpg"
                                alt="martfury"
                            />
                           </a>
                        </Link>
                    </div>
                    <div className="item">
                        <Link href="/shop">
                            <a>
                            <img
                                src="/static/img/slider/shop-sidebar/2.jpg"
                                alt="martfury"
                            />
                            </a>
                        </Link>
                    </div>
                </Slider>
            </div>
        );
    }
}

export default ShopSidebarBanner;
