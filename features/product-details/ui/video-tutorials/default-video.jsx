import React, { useEffect } from 'react';
import { LockOutlined } from '@ant-design/icons';
import useResponsive from '~/shared/utilities/useResponsive';

export default function DefaultVideoContent({ product, isPlay, setIsPlay, type }) {
    const url = product?.document?.file_url;
    const poster = product?.poster_url || product?.poster;
    const hasPoster = !!poster;
    const hasVideo = !!url;
    const { isMobile, isTablet, isDesktop } = useResponsive()

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

    return (
        <div
            className='video_iframe'
            style={{
                backgroundSize: 'cover',
                borderRadius: '5px',
                backgroundImage: hasPoster ? `url("${poster}")` : 'none',
                backgroundColor: hasPoster ? 'transparent' : '#111',
                minHeight: isMobile ? '100px' : isTablet ? '350px' : '450px',
                maxHeight: isMobile ? '100px' : isTablet ? '350px' : '450px',
                overflow: 'hidden',
                position: 'relative',
                width: '100%',
                height: '100%',
            }}
        >
            {hasVideo ? (
                <video
                    id={`videoPlayer-${product?.id}`}
                    onContextMenu={(e) => e.preventDefault()}
                    controls={false}
                    controlsList="nodownload"
                    preload="none"
                    style={{
                        maxHeight: '450px',
                        height: '100%',
                        width: '100%',
                        position: 'relative',
                        zIndex: 1,
                        pointerEvents: 'none',
                        backgroundColor: hasPoster ? 'transparent' : '#000',
                    }}
                    poster={poster}
                    src={url}
                />
            ) : null}

            {/* Qulf ikoni doim chiqadi, lekin agar video yo‘q bo‘lsa — u markazda, katta; agar video bo‘lsa — ustida chiqadi */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 3,
                    color: 'white',
                    display: hasVideo ? 'none' : 'block',
                }}
            >
                <LockOutlined style={{ fontSize: '48px', color: 'white' }} />
            </div>
        </div>
    );
}
