import React, { useEffect } from 'react';

export default function DefaultVideoContent({
    product,
    isPlay,
    setIsPlay,
    type,
}) {




    useEffect(() => {
        const player = document.getElementById(`videoPlayer-${product?.id}`);
        if (player) {
            if (isPlay === product?.id) {
                player.play();
            } else {
                player.pause();
            }
        }
    }, [isPlay, product]);



    const url = product?.document?.file_url
        ? product?.document?.file_url
        : product?.document?.short_content_url


    return (
        <div className='video_iframe'
            style={{
                backgroundSize: 'cover',
                borderRadius: '5px',
                backgroundImage: `url("${product?.poster_url}")`,
                padding: '0', maxHeight: '450px',
                overflow: 'hidden',
                position: 'relative',
                width:'100%',
                height:'100%'
            }}
        >
            <video
                id={`videoPlayer-${product?.id}`}
                onPlay={(e) => {
                    if (type === 'playlists') {
                        e.target.pause()
                    } else {
                        setIsPlay?.(product?.id)
                    }
                }
                }

                onContextMenu={(e) => e.preventDefault()}
                controls={!(type === 'playlists')}
                controlsList="nodownload"
                preload='none'

                style={{
                    maxHeight: '450px',
                    height:'100%',
                    width: '100%',
                    position: 'relative',
                    zIndex: 2
                }}
                poster={product?.poster_url ? product?.poster_url : product?.poster}
                src={url}
            >


            </video>
        </div >
    );
}
