import React from 'react';
import { useState } from 'react';
import ModalVideo from "react-modal-video"

export default function VedioPage() {
    const [modalClose, setModalClose] = useState(false);


    const iframeSrc = "https://www.youtube.com/embed/RW65MEGen4w"

    const videoId = iframeSrc?.split("/").pop(); // Son parçayı alırız

    return (
        <div className="container mb-5">
            <div
                className="banner-bottom-vedio"
                onClick={() => setModalClose(true)}>
                <div className="player">
                    <i className="fa-regular fa-circle-play fa-beat fa-2xl"></i>
                </div>
                <div className="content">
                    <p> <span>Soff.uz</span> - biz bilan bilimingiz orqali daromad qiling</p>
                </div>
            </div>
            <ModalVideo  channel="youtube" autoplay isOpen={modalClose} 
            videoId={videoId} onClose={() => setModalClose(false)} />
        </div>
    );
}
