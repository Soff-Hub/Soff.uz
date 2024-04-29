import React from 'react';
import { useState } from 'react';
import ModuleProductActions from './modules/ModuleProductActions';
import WavesurferPlayer from '@wavesurfer/react';
import Link from 'next/link';

export default function AudioProductCart({ product }) {
    const [wavesurfer, setWavesurfer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const onReady = (ws) => {
        setWavesurfer(ws);
        setIsPlaying(false);
    };

    const onPlayPause = () => {
        wavesurfer && wavesurfer.playPause();
    };

    return (
        <div className="audio-cart-container">
            <div className="audio-cart-content">
                <div className="row">
                    <div className="col-3">
                        <div className="d-flex gap-5 audio-list-left">
                            <div
                                className="col-xl-1 col-lg-1 col-md-1  audio-play-list"
                                onClick={onPlayPause}>
                                {isPlaying ? (
                                    <>
                                        <i class="fa-solid fa-circle-pause"></i>
                                    </>
                                ) : (
                                    <>
                                        <i class="fa-solid fa-circle-play"></i>
                                    </>
                                )}
                            </div>
                            <p  >
                                <Link style={{display:'flex'}}  href="/product/[pid]" as={`/product/${product.slug}`}>
                                    <a className='audio-name text-truncate'>
                                {product?.title}
                                    </a>
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-7 col-lg-9">
                        <WavesurferPlayer
                            height={40}
                            waveColor="#00A44F"
                            url={product?.document?.short_content_url}
                            onReady={onReady}
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                        />
                    </div>
                    <div className="col-xl-2 col-lg-9 d-flex align-content-center justify-content-start justify-content-xl-center pl-xl-0 pl-5 p pt-2">
                        <ModuleProductActions product={product} audio={true} />
                    </div>
                </div>
            </div>
        </div>
    );
}
