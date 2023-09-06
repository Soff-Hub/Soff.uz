import React, { Component, useEffect, useState } from 'react';
import Link from 'next/link';
import MediaRepository from '~/repositories/MediaRepository';

function ElectronicBanner() {
    // constructor(props) {
    //     super(props);
    // }

    const [bannerItem, setBannerItems] = useState([]);

    async function getBannerItems() {
        const responseData = await MediaRepository.getBannersBySlug();
        if (responseData) {
            setBannerItems(responseData);
        }
    }

    useEffect(() => {
        getBannerItems();
    }, []);

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
                    <div className="item banner-left-one">
                        {bannerItem[0]?.image ? (
                            <Link target="_blank" href={`${bannerItem[0].url}`}>
                                <a target="_blank">
                                    <img
                                        style={{
                                            width: '100%',
                                            height: '370px',
                                        }}
                                        src={`${bannerItem[0]?.image}`}
                                        alt="alldata"
                                    />
                                </a>
                            </Link>
                        ) : (
                            <>
                                <div>
                                    <div
                                        class="placeholder col-12"
                                        style={{
                                            width: '100%',
                                            height: '370px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <div
                                            class="spinner-border"
                                            role="status">
                                            <span class="visually-hidden">
                                                Loading...
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="ps-section__right">
                    {bannerItem[1] ? (
                        <div
                           
                            className='banner-right'
                            >
                                
                            <Link href={`${bannerItem[1].url}`} target="_blank">
                                <a className="ps-collection" target="_blank">
                                    <img
                                        style={{ height: '170px' }}
                                        src={bannerItem[1]?.image}
                                        alt="alldata"
                                    />
                                </a>
                            </Link>
                            <Link href={`${bannerItem[2].url}`} target="_blank">
                                <a className="ps-collection" target="_blank">
                                    <img
                                        style={{ height: '170px' }}
                                        src={bannerItem[2]?.image}
                                        alt="alldata"
                                    />
                                </a>
                            </Link>
                        </div>
                    ) : (
                        <div
                        className='banner-placholder'>
                            {[1, 2].map((item, i) => {
                                return (
                                    <div key={i}>
                                        <div
                                            class="placeholder "
                                            alt="banner"
                                            id='banner-placholder-item'
                                            >
                                            <div
                                                class="spinner-border"
                                                role="status">
                                                <span class="visually-hidden">
                                                    Loading...
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default ElectronicBanner;
