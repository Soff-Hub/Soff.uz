import React, { useEffect } from 'react';

export default function DefaultVideo({
    product,
    isPlay,
    setIsPlay,
    type,
}) {




    useEffect(() => {
        const player = document.getElementById(`videoPlayer-${product.id}`);
        if (player) {
            if (isPlay === product.id) {
                player.play();
            } else {
                player.pause();
            }
        }
    }, [isPlay, product.id]);



    const url = product?.document?.file_url
        ? product?.document?.file_url
        : product?.document?.short_content_url


    return (
        <div className='video_iframe'
            style={{
                backgroundSize: 'cover',
                borderRadius: '10px',
                backgroundImage: `url("${product?.poster_url}")`,
                padding: '0', maxHeight: '450px',
                overflow: 'hidden',
                position: 'relative',
                width: '100%',
                height: '100%'
            }}
        >
            <video
                id={`videoPlayer-${product.id}`}
                onPlay={(e) => {
                    if (type === 'playlists' || type === 'similler') {
                        e.target.pause()
                    } else {
                        setIsPlay?.(product?.id)
                    }
                }
                }

                onContextMenu={(e) => e.preventDefault()}
                controls={!(type === 'playlists' || type === 'similler')}
                controlsList="nodownload"
                preload='none'

                style={{
                    maxHeight: type === 'playlists' ? '100px' : type === 'similler' ? '120px' : '450px',
                    height: type === 'playlists' ? '56px' : type === 'similler' ? '56px' : '100%',
                    width: type === 'playlists' ? '100px' : type === 'similler' ? '120px' : '100%',
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
