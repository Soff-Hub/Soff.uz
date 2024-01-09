
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import MediaRepository from '~/repositories/MediaRepository';
import { useDispatch, useSelector } from 'react-redux';
import { Category } from '~/store/auth/action';
import Image from 'next/image';
import NextImage from '~/components/nextImage';
import HotTopic from '~/components/HotTopic';

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
            console.error("Error fetching banners: ", error);
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
                <div className="container">
                    <div className="ps-section__left">
                        <div className="item banner-left-one">
                            {bannerItem?.[0]?.image ? (
                                <Link href={`${bannerItem?.[0]?.url}`}>
                                    <a>
                                        {/* <img
                                    style={{
                                        width: '100%',
                                        height: '370px',
                                        backgroundImage: `url(${bannerItem?.[0]?.image})`,
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover',
                                    }}
                                /> */}
                                        <NextImage
                                            url={bannerItem[0]?.image}
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
                                <Link href={`${bannerItem?.[1].url}`}>
                                    <a className="ps-collection">
                                        <div
                                            style={{
                                                height: '170px',
                                                backgroundImage: `url(${bannerItem?.[1]?.image})`,
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: 'cover',
                                            }}></div>
                                        {/* <NextImage url={bannerItem?.[1]?.image} width='400px' height='170px' /> */}
                                    </a>
                                </Link>
                                <Link href={`${bannerItem?.[2].url}`}>
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
                                        {/* <NextImage url={bannerItem?.[2]?.image} width='400px' height='170px' /> */}
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
            { modal ? (
                <>
                    <div
                        onClick={closeBanner}
                        className={
                            modalClose
                                ? 'modalBannerCarousel '
                                : 'modalBanner2Carousel '
                        }></div>
                    <div
                        className={
                            modalClose
                                ? ' bannerModal2Carousel  '
                                : 'bannerModal3Carousel  '
                        }>
                        <div
                            className="closeButton"
                            style={{
                                position: 'absolute',
                                right: 0,
                                top: ' -9px',
                                zIndex: 1
                            }}
                            >
                            <span
                                className="fs-3"
                                style={{ cursor: 'pointer' }}>
                                <i
                                    onClick={closeBanner}
                                    className="fa-solid  fa-2x p-3 text-white fa-xmark"></i>{' '}
                            </span>
                        </div>
                        <div className="iframe-containerCarousel">
                            {modalClose ? (
                                <>
                                    <div className="modal-carousel-header">
                                        <h3>Xush kelibsiz! 😊</h3>
                                        <p>
                                            Platformada qanday qilib daromad
                                            topish mumkin ?
                                        </p>
                                    </div>
                                    <HotTopic />
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
            {/* {
        category ?
            <>
                <div    onClick={CloseButton} className={modalClose ? "modalBanner " : "modalBanner2 "} >
                </div>
                <div className={modalClose ? " bannerModal2  " : "bannerModal3  "} > 
                    <div className='closeButton'   style={{ position: "absolute", right: ("-50px"), top: ("-10px") }}>
                        <span className='fs-3' style={{ cursor: "pointer" }}><i onClick={CloseButton} className="fa-solid  fa-2x p-3 text-white fa-xmark"></i> </span>
                    </div>
                    <div className="iframe-container" style={{border:'1px solid red'}}>
                        {
                            modalClose ?
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/SF5MuRFg-0I?si=G3Z1ZqUBSvAfUPJU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                         :
                         <></>
                        }
                    </div>


                </div>
            </>
            :
            <></>
    } */}
        </>
    );
}

export default ElectronicBanner;

