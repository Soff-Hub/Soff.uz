import React from 'react';
import { useState } from 'react';

export default function VedioPage() {
    const [modalClose, setModalClose] = useState(false);

    function CloseButton() {
        setModalClose(false);
    }

    return (
        <div className="container mb-5">
            <div
                className="banner-bottom-vedio"
                onClick={() => setModalClose(true)}>
                <div className="player">
                    <i class="fa-regular fa-circle-play fa-beat fa-2xl"></i>
                </div>
                <div className="content">
                    <p> <span>Soff.uz</span> - biz bilan bilimingiz orqali daromad qiling</p>
                </div>
            </div>
            <>
                <div
                    onClick={CloseButton}
                    className={
                        modalClose ? 'modalBanner ' : 'modalBanner2 '
                    }></div>
                <div
                    className={
                        modalClose ? ' bannerModal2  ' : 'bannerModal3  '
                    }>
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
                                src="https://www.youtube.com/embed/RW65MEGen4w"
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                                allowfullscreen></iframe>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </>
        </div>
    );
}
