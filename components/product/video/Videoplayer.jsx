import React, { useEffect, useRef } from 'react';

export default function VideoPlayer({ product, type, className }) {
    const videoRef = useRef(null);

    const url = product?.document?.file_url || product?.document?.short_content_url;
    const poster = product?.poster_url || product?.poster;
    const disableControls = type === 'list' || type === 'similler';

    const handleMouseLeave = () => {
        videoRef.current?.pause()
        videoRef.current.currentTime = 0;
    }

    const handleMouseEnter = () => {
        videoRef.current?.play()
        setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.volume = 0.6; // Set default volume to 0
            }
        }, 400);
    }

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = 0; // Set default volume to 0
        }
    }, []);

    return (
        <div>
            <video
                className={`videoplayer ${className}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={videoRef}
                preload='none'
                onContextMenu={(e) => e.preventDefault()}
                controls={!disableControls} // Show controls conditionally
                controlsList="nodownload"
                poster={poster}
                src={url}
            // controls
            />
        </div>
    );
}
