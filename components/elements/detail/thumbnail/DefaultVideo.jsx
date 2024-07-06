import React, { useEffect } from 'react';

export default function DefaultVideo({
    product,
    class_products,
    isPlay,
    setIsPlay,
}) {



    useEffect(() => {
        const player = document.getElementById(`videoPlayer-${product.id}`);
        if (player && isPlay === product.id) {
            player.play();
        } else {
            player.pause();
        }
    }, [product, isPlay]);

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

    const url = product?.document?.file_url 
    ? product?.document?.file_url
    : product?.document?.short_content_url


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
            controlsList="nodownload"
            poster={product?.poster_url ? product?.poster_url : product?.poster}
            src={url}>
            Your browser does not support the video tag.
        </video>
    );
}
