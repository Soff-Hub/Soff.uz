import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function DefaultVideo({
    product,
    class_products,
    isPlay,
    setIsPlay,
}) {
    const { user } = useSelector((state) => state.auth);
    const { asPath } = useRouter();
    const [showControls, setShowControls] = useState(false);

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
            src={
                (user?.role === 'admin' || user?.role === 'seller') &&
                (asPath === '/account/products?page=1' || asPath === '/account/myproducts')
                    ? product?.document?.file_url
                    : (product?.document?.short_content_url || product?.file_url)
            }>
            Your browser does not support the video tag.
        </video>
    );
}
