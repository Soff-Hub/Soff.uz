import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import MediaRepository from '~/repositories/MediaRepository';
import { useDispatch, useSelector } from 'react-redux';
import { Category } from '~/store/auth/action';
import Image from 'next/image';
import NextImage from '~/components/nextImage';
import HotTopic from '~/components/HotTopic';
import SearchPage from './SearchPage';

function ElectronicBanner() {
    const [bannerItem, setBannerItems] = useState([]);
    const [modalClose, setModalClose] = useState(true);
    const { category } = useSelector((state) => state?.auth);
    const [modal, setModal] = useState(true);
    const dispatch = useDispatch();

    async function getBannerItems() {
        try {
            const responseData = await MediaRepository.getBannersBySlug();
            if (responseData) {
                setBannerItems(responseData);
            }
        } catch (error) {
            console.error('Error fetching banners: ', error);
        }
    }

    function closeBanner() {
        dispatch(Category(false));
        setModalClose(false);
        localStorage.setItem('soat', new Date().getHours());
    }

    useEffect(() => {
        getBannerItems();
        const expr = localStorage.getItem('soat');
        const hours = new Date().getHours();

        if (expr) {
            switch (true) {
                case expr === '20':
                case expr === '21':
                case expr === '22':
                case expr === '23':
                case expr === '24':
                    setModal(hours === 2);
                    break;
                default:
                    setModal(expr + 5 === hours);
                    break;
            }
        }
    }, []);

    return (
        <>
            <section className="ps-home-banner">
                {/* <div className="container">
                    <div className="ps-section__left">
                        <div className="item banner-left-one">
                            {bannerItem?.[0]?.image ? (
                                <Link
                                    href={`${bannerItem?.[0]?.url.replace(
                                        'https://soff.uz',
                                        ''
                                    )}`}>
                                    <a>
                                        <NextImage
                                            url={bannerItem?.[0]?.image}
                                            width="800px"
                                            height="370px"
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
                                <Link
                                    href={`${bannerItem?.[1]?.url?.replace(
                                        'https://soff.uz',
                                        ''
                                    )}`}>
                                    <a className="ps-collection">
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
                                <Link
                                    href={`${bannerItem?.[2]?.url?.replace(
                                        'https://soff.uz',
                                        ''
                                    )}`}>
                                    <a className="ps-collection">
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
                </div> */}
                <SearchPage/>
            </section>
        </>
    );
}

export default ElectronicBanner;
