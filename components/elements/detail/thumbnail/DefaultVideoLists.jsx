import React, { useEffect } from 'react';

export default function DefaultVideoLists({
    product,
    isPlay,
    setIsPlay,
    minWidth,
    height,
    style = {},
    bgStyle = {}
}) {



    useEffect(() => {
        const player = document.getElementById(`videoPlayer-${product.id}`);
        if (player && isPlay === product.id) {
            player.play();
        } else {
            player.pause();
        }
    }, [product, isPlay]);



    const url = product?.document?.file_url
        ? product?.document?.file_url
        : product?.document?.short_content_url


    return (
        <div style={{ backgroundSize: 'cover', borderRadius: '4px', backgroundImage: `url("${product?.poster_url}")`, }}>
            <video
                id={`videoPlayer-${product.id}`}
                className={'video_iframe'}
                width={'100%'}
                height="100%"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: height,
                    minWidth: minWidth,
                    objectFit: 'cover',
                    borderRadius: "10px",
                    ...style
                }}
                onPlay={() => setIsPlay?.(product?.id)}
                controls={false}
                controlsList="nodownload"
                poster={product?.poster_url ? product?.poster_url : product?.poster}
                src={url}>
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
