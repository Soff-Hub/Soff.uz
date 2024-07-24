import React, { useEffect } from 'react';

export default function DefaultVideo({
    product,
    class_products,
    isPlay,
    setIsPlay,
}) {

console.log(product);

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
        <div className='video_iframe' style={{ backgroundSize: 'cover', borderRadius: '14px', backgroundImage: `url("${product?.poster_url}")`, padding: '0', maxHeight: '450px', overflow: 'hidden', position: 'relative', width: '100%', height: '100%' }}>
            {/* <div style={{ filter: 'blur(30px)', height: '100%', width: '100%', position: 'absolute', top: '0', left: '0', zIndex: 1 }} ></div> */}
            <video
                id={`videoPlayer-${product.id}`}
                onPlay={() => setIsPlay?.(product?.id)}
                onContextMenu={(e) => e.preventDefault()}
                controls
                disablePictureInPicture
                controlsList="nodownload"
                style={{
                    maxHeight: '450px', height: '100%', width: '100%', position: 'relative',
                    zIndex: 2
                }}
                poster={product?.poster_url ? product?.poster_url : product?.poster}
            >
                <source src={url} />
            </video>
        </div>
    );
}
