import React from 'react';

export default function DefaultVideo({ product }) {
    // product?.document?.short_content_url
    // `video/${product?.document?.file_type?.replace('.','' )}`
    return (
        <div className="video_container">
            <div className="video_content">
                <video
                    id='videoPlayer'
                    className="video_iframe"
                    width="100%"
                    height="auto"
                    style={{ maxHeight: '380px' }}
                    controls
                    preload='none'
                    poster={product?.poster}
                    src='https://video-previews.elements.envatousercontent.com/h264-video-previews/0096fd70-06bc-4309-8fed-07762e53c9fd/6386658.mp4'
                >
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
}
