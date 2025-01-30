import Head from 'next/head';
import React from 'react';
import { useState } from 'react';
import ModalVideo from "react-modal-video"

export default function VedioCart({ title, url, vedioUrl, id }) {
    const [modalClose, setModalClose] = useState(false);

    const videoId = vedioUrl?.split("/").pop(); // Son parçayı alırız


    function haldleModalOpen() {
        setModalClose(true);
    }

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={`${title} video`} />
                <meta name="keywords" content="video, watch, entertainment, soff.uz , soff" />
                <meta name="author" content="soff.uz soff" />
                <meta name="robots" content="index, follow" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            </Head>
            <div className="vedio-cart-container">
                <div className="vedio-cart-content" onClick={haldleModalOpen}>
                    <div className="vedio-cart-footer">
                        <p className='fs-3'> 
                            {id}. {title}{' '}
                        </p>
                    </div>
                    <div
                        style={{
                            backgroundImage: `url(${url})`,
                            width: '100%',
                            position: 'relative',
                            borderTopRightRadius: '5px',
                            borderTopLeftRadius: '5px',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                        }}>
                        <div className="image-color"></div>
                        <div className="play">
                            <i
                                className="fa-solid fa-play fa-2xl"
                                style={{
                                    color: '#ffffff',
                                    fontSize: '45px',
                                }}></i>
                        </div>
                    </div>
                </div>
            </div>
            <ModalVideo channel="youtube" autoplay isOpen={modalClose}
                videoId={videoId} onClose={() => setModalClose(false)} />
        </div>
    );
}
