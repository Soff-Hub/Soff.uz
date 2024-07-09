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
        <div className="video-container">
            <video
                id={`videoPlayer-${product.id}`}
                className={'video_iframe'}
                onPlay={() => setIsPlay?.(product?.id)}
                onContextMenu={(e) => e.preventDefault()}
                controls
                disablePictureInPicture
                controlsList="nodownload"
                poster={product?.poster_url ? product?.poster_url : product?.poster}
            >
                <source src={url} />
            </video>
        </div>
    );
}
