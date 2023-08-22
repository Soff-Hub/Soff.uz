import React, { Component, useEffect, useState } from 'react';
import Slider from 'react-slick';
import Link from 'next/link';
import MediaRepository from '~/repositories/MediaRepository';
import { getItemBySlug } from '~/utilities/product-helper';

function ElectronicBanner() {
    // constructor(props) {
    //     super(props);
    // }

    const [bannerItem, setBannerItems] = useState([]);
    const [bannersItems, setBannersItems] = useState([]);

    async function getBannerItems() {
        const responseData = await MediaRepository.getBannersBySlug();
        if (responseData) {
            setBannerItems(responseData);
        }
    }

    async function getBannersItems() {
        const responseData = await MediaRepository.getTwoBannersData();
        if (responseData) {
            setBannersItems(responseData);
            console.log(responseData, ' yyy');
        }
    }


    useEffect(() => {
        getBannerItems();
    //    setTimeout(() => {
        getBannersItems();
    //    }, 2000);
    }, []);

    // render() {
    // console.log(this.props.first);
    const carouselSettings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <section className="ps-home-banner">
            <div className="container">
                <div className="ps-section__left">
                    {/* <Slider {...carouselSettings}> */}
                    <div className="item">
                        {bannerItem ? (
                            <Link
                                target="_blank"
                                href={`${bannerItem[0]?.url}`}>
                                <a target='_blank'>
                                    <img
                                        src={`${bannerItem[0]?.image}`}
                                        alt="alldata"
                                    />
                                </a>
                            </Link>
                        )
                    :
                    <>
                     <img src="https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=" class="card-img-top" alt=""></img></>
                    }
                    </div>
                    {/* <div className="item">
                                <Link href="/shop">
                                    <a>
                                        <img src="/static/img/slider/home-7/2.jpg" alt="martfury" />
                                    </a>
                                </Link>
                            </div>
                            <div className="item">
                                <Link href="/shop">
                                    <a>
                                        <img src="/static/img/slider/home-7/3.jpg" alt="martfury" />
                                    </a>
                                </Link>
                            </div> */}
                    {/* </Slider> */}
                </div>
                <div className="ps-section__right">
                    {bannersItems ? (
                        bannersItems.splice(1, 2).map((item, i) => {
                            return (
                                <Link href={`${item?.url}`} target='_blank'>
                                    <a className="ps-collection" target='_blank'>
                                        <img src={item?.image} alt="alldata" />
                                    </a>
                                </Link>
                            );
                        })
                    ) : (
                        <div className='card'>
                         <img src="..." class="card-img-top" alt="..."></img>
                        </div>
                    )}
                    {/* <Link href="/shop">
                            <a className="ps-collection">
                                <img src="/static/img/slider/home-7/promotion-2.jpg" alt="martfury" />
                            </a>
                        </Link> */}
                </div>
            </div>
        </section>
    );
    // }
}

export default ElectronicBanner;
