import React from 'react';
import { Player, ControlBar } from 'video-react';
import 'video-react/dist/video-react.css';

export function MyVideoPlayer({ src, poster }) {
    return (
        <Player src={src} poster={poster} preload='none'>
            <ControlBar autoHide={false} className="my-class" />
        </Player>
    );
};