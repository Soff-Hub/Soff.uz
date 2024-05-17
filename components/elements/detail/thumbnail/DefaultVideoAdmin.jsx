import React, { useEffect } from 'react';


export default function DefaultVideoAdmin({
    product,
    class_products,
    isPlay,
    setIsPlay,
    short,
}) {

    useEffect(() => {
        const player = document.getElementById(`videoPlayer-${product.id}`);
        if (player && isPlay === product.id) {
            player.play();
        } else {
            player.pause();
        }
    }, [product, isPlay, short]);



    const url = short
        ? product?.document?.short_content_url
        : product?.document?.file_url;

    return (
        <video
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
