import React from 'react'

export const VideoComponent = () => {
    return (
        <div className='video-card homePageVideoComponentVideo'>
            <video
                className="w-100 "
                controls
                poster="/static/img/homePageVideo.png"
                preload="auto"
                crossOrigin="anonymous"
                role="video"
                playsInline
                muted
            >
                <source
                    role="source"
                    src="static/video/soff.uz haqida.mp4"
                    type="video/mp4"
                />
                <track
                    role="track"
                    label="EN"
                    srclang="en-US"
                    src="https://npm-assets.fiverrcdn.com/assets/@fiverr/logged_out_homepage_perseus/subtitles_en.c0bcbb7.vtt"
                    default
                    kind="subtitles"
                />
            </video>
        </div>
    );
};

export default function HomeVideo() {

    return (
        <div className="container p-md-0 mt-4 homePageVideoComponent">
            <h2 className='product-list-title'>Soff.uz - bu qanday loyiha?</h2>
            <VideoComponent />
        </div>
    )
}

