import React from 'react'

export const VideoComponent = () => {
    return (
        <div className='video-card'>
            <video
                className="w-100"
                controls
                poster="/static/img/Soff.uz - bu qanday loyiha.png"
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
        <div className="container">
            <h2 className=' py-4'>Soff.uz - bu qanday loyiha?</h2>
            <VideoComponent />
        </div>
    )
}

