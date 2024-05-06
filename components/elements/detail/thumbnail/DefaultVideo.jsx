import React from 'react';

export default function DefaultVideo({ product }) {

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
                    poster={product?.poster_url ? product?.poster_url : product?.poster}
                    src={product?.document?.short_content_url}
                >
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
}
