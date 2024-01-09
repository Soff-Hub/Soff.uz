import Head from 'next/head';
import React from 'react';
import { useState } from 'react';

export default function VedioCart({ title, url, vedioUrl, id }) {
    const [modalClose, setModalClose] = useState(false);
    function CloseButton() {
        setModalClose(false);
    }

    function haldleModalOpen() {
        setModalClose(true);
    }

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={`Watch ${title} video`} />
                <meta name="keywords" content="video, watch, entertainment, soff.uz , soff" />
                <meta name="author" content="Soff.uz soff" />
                <meta name="robots" content="index, follow" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
               
            </Head>
            <div className="vedio-cart-container">
                <div className="vedio-cart-content" onClick={haldleModalOpen}>
                    <div
                        style={{
                            backgroundImage: `url(${url})`,
                            width: '100%',
                            height: '150px',
                            position: 'relative',
                            borderTopRightRadius: '5px',
                            borderTopLeftRadius: '5px',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                        }}>
                        <div className="image-color"></div>
                        <div className="play">
                            <i
                                class="fa-solid fa-play fa-2xl"
                                style={{
                                    color: '#ffffff',
                                    fontSize: '45px',
                                }}></i>
                        </div>
                    </div>
                    <div className="vedio-cart-footer">
                        <p>
                            {' '}
                            <span>{id}.</span> {title}{' '}
                        </p>
                    </div>
                </div>
            </div>
            <div
                onClick={CloseButton}
                className={modalClose ? 'modalBanner ' : 'modalBanner2 '}></div>
            <div className={modalClose ? ' bannerModal2  ' : 'bannerModal3  '}>
                <div
                    className="closeButton"
                    style={{
                        position: 'absolute',
                        right: '-50px',
                        top: '-10px',
                    }}>
                    <span className="fs-3" style={{ cursor: 'pointer' }}>
                        <i
                            onClick={CloseButton}
                            className="fa-solid  fa-2x p-3 text-white fa-xmark"></i>{' '}
                    </span>
                </div>
                <div className="iframe-container">
                    {modalClose ? (
                        <iframe
                            width="560"
                            height="315"
                            src={`${vedioUrl}`}
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                            allowfullscreen
                            ></iframe>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
}
