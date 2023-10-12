import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import MediaRepository from '~/repositories/MediaRepository';
import { useSelector } from 'react-redux';

function ElectronicBanner() {

    const [bannerItem, setBannerItems] = useState([]);
    const [modalClose, setModalClose] = useState(true)
    const { category } = useSelector(state => (state?.auth))

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
        <>
            <section className="ps-home-banner">
                <div className="container">
                    <div className="ps-section__left">
                        <div className="item banner-left-one">
                            {bannerItem?.[0]?.image ? (
                                <Link href={`${bannerItem?.[0].url}`}>
                                    <a>
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
            {
                !category ?
                    <div>
                        <div onClick={() => setModalClose(false)} className={modalClose ? "modalBanner d-block" : "d-none"} >
                        </div>
                        <div className={modalClose ? " w-50 mx-auto bannerModal2 " : "d-none"} >
                            <div className='modal-content rounded-4'>
                                <div className='p-0'>
                                    <div style={{ position: "absolute", right: 0 }}>
                                        <span style={{ cursor: "pointer" }}><i onClick={() => setModalClose(false)} className="fa-solid fs-1 p-3 text-white fa-circle-xmark"></i> </span>
                                    </div>
                                    <iframe width="550" height="425" src="https://www.youtube.com/embed/WHTAeJWy_hE?si=U_0_h7tLDdyoHvWV"></iframe>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <></>
            }
        </>
    );
}

export default ElectronicBanner;
