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
                    style={{maxHeight:'380px'}}
                    controls
                    poster={product?.poster_url}>
                    <source
                        src={product?.document?.short_content_url}
                        type={`video/${product?.document?.file_type?.replace(
                            '.',
                            ''
                        )}`}
                    />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
}
