import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import MediaRepository from '~/repositories/MediaRepository';

function ElectronicBanner() {

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


    return (
        <section className="ps-home-banner">
            <div className="container">
                <div className="ps-section__left">
                    <div className="item banner-left-one">
                        {bannerItem?.[0]?.image ? (
                            <Link target="_blank" href={`${bannerItem?.[0].url}`}>
                                <a target="_blank">
                                    <img
                                        style={{
                                            width: '100%',
                                            height: '370px',
                                            backgroundImage: `url(${bannerItem?.[0]?.image})`,
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                        }}
                                    />
                                </a>
                            </Link>
                        ) : (
                            <>
                                <div>
                                    <div
                                        className="placeholder col-12"
                                        style={{
                                            width: '100%',
                                            height: '370px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <div
                                            className="spinner-border"
                                            role="status">
                                            <span className="visually-hidden">
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
                    {bannerItem?.[1] ? (
                        <div className="banner-right">
                            <Link href={`${bannerItem?.[1].url}`} target="_blank">
                                <a className="ps-collection" target="_blank">
                                    <div
                                        style={{
                                            height: '170px',
                                            backgroundImage: `url(${bannerItem?.[1]?.image})`,
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                        }}></div>
                                </a>
                            </Link>
                            <Link href={`${bannerItem?.[2].url}`} target="_blank">
                                <a className="ps-collection" target="_blank">
                                    <div
                                        style={{
                                            height: '170px',
                                            backgroundImage: `url(${bannerItem?.[2]?.image})`,
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                        }}>
                                        {' '}
                                    </div>
                                </a>
                            </Link>
                        </div>
                    ) : (
                        <div className="banner-placholder">
                            {[1, 2].map((item, i) => {
                                return (
                                    <div key={i}>
                                        <div
                                            className="placeholder "
                                            alt="banner"
                                            id="banner-placholder-item">
                                            <div
                                                className="spinner-border"
                                                role="status">
                                                <span className="visually-hidden">
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
