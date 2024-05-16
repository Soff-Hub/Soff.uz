import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function DefaultVideoAdmin({
    product,
    class_products,
    isPlay,
    setIsPlay,
    short,
}) {
    const { user } = useSelector((state) => state.auth);
    const { asPath, pathname } = useRouter();
    const [showControls, setShowControls] = useState(false);
    useEffect(() => {
        const player = document.getElementById(`videoPlayer-${product.id}`);
        if (player && isPlay === product.id) {
            player.play();
        } else {
            player.pause();
        }
    }, [product, isPlay, short]);


    // const handleMouseLeave = (id) => {
    //     const player = document.getElementById(`videoPlayer-${id}`);
    //     if (id) {
    //         setIsPlay?.(id);
    //         player.muted = true;
    //         setShowControls(true);
    //     }
    // };
    // const handleMousePaused = (id) => {
    //     const player = document.getElementById(`videoPlayer-${id}`);
    //     if (player) {
    //         setShowControls(false);
    //         player.pause(); // Video to'xtatiladi
    //         player.currentTime = 0; // Video vaqtini boshiga qaytaradi
    //         player.load();
    //     }
    // };

    const url = short
        ? product?.document?.short_content_url
        : product?.document?.file_url;

    return (
        <video
            // onMouseEnter={() => handleMouseLeave(product?.id)}
            // onMouseLeave={() => handleMousePaused(product?.id)}
            // controlsList='nodownload'
            id={`videoPlayer-${product.id}`}
            className={class_products ? 'border w-100' : 'video_iframe'}
            width="100%"
            height="auto"
            style={{
                background: class_products ? 'unset' : '',
                maxHeight: class_products ? '' : '380px',
                objectFit: 'contain',
            }}
            onPlay={() => setIsPlay?.(product?.id)}
            controls
            preload="none"
            poster={product?.poster_url ? product?.poster_url : product?.poster}
            src={url}>
            Your browser does not support the video tag.
        </video>
    );
}
