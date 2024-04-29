// import React from 'react';
// import { useState } from 'react';
// import ModuleProductActions from './modules/ModuleProductActions';
// import Link from 'next/link';
// // import WavesurferPlayer from '@wavesurfer/react';

// export default function AudioProductCart({ product }) {
//     const [wavesurfer, setWavesurfer] = useState(null);
//     const [isPlaying, setIsPlaying] = useState(false);

//     const onReady = (ws) => {
//         setWavesurfer(ws);
//         setIsPlaying(false);
//     };

//     const onPlayPause = () => {
//         wavesurfer && wavesurfer.playPause();
//     };

//     console.log('product', product);

//     return (
// <div className="audio-cart-container">
//     <div className="audio-cart-content">
//         <div className="row">
//             <div className="col-3">
//                 <div className="d-flex gap-5 audio-list-left">
//                     <div
//                         className="col-xl-1 col-lg-1 col-md-1  audio-play-list"
//                         onClick={onPlayPause}>
//                         {isPlaying ? (
//                             <>
//                                 <i class="fa-solid fa-circle-pause"></i>
//                             </>
//                         ) : (
//                             <>
//                                 <i class="fa-solid fa-circle-play"></i>
//                             </>
//                         )}
//                     </div>
//                     <p  >
//                         <Link style={{display:'flex'}}  href="/product/[pid]" as={`/product/${product.slug}`}>
//                             <a className='audio-name text-truncate'>
//                         {product?.title}
//                         {product?.sellr?.first_name} {product?.sellr?.last_name}
//                             </a>
//                         </Link>
//                     </p>
//                 </div>
//             </div>
//             <div className="col-xl-7 col-lg-9">
//                 {/* <WavesurferPlayer
//                     height={40}
//                     waveColor="#00A44F"
//                     url={product?.document?.short_content_url}
//                     onReady={onReady}
//                     onPlay={() => setIsPlaying(true)}
//                     onPause={() => setIsPlaying(false)}
//                 /> */}
//             </div>
//             <div className="col-xl-2 col-lg-9 d-flex align-content-center justify-content-start justify-content-xl-center pl-xl-0 pl-5 p pt-2">
//                 <ModuleProductActions product={product} audio={true} />
//             </div>
//         </div>
//     </div>
// </div>
// )
// }

// Variant 2

import React, { useState, useEffect, useRef } from 'react';
import wavesurfer from 'wavesurfer.js';
import Link from 'next/link';
import ModuleProductActions from './modules/ModuleProductActions';

const AudioWaveform = ({ product }) => {
    const wavesurferRef = useRef(null);
    const timelineRef = useRef(null);

    const [wavesurferObj, setWavesurferObj] = useState();

    const [playing, setPlaying] = useState(true); 
    const [volume, setVolume] = useState(1); 

    // create the waveform inside the correct component
    useEffect(() => {
        if (wavesurferRef.current && !wavesurferObj) {
            setWavesurferObj(
                wavesurfer.create({
                    container:  wavesurferRef.current,
                    scrollParent: true,
                    autoCenter: true,
                    loopSelection: true,
                    cursorColor: '#00A44F',
                    waveColor: '#00A44F',
                    progressColor: '#ccc',
                    responsive: true,
					height: 40
                })
            );
        }
    }, [wavesurferObj]);
	

    useEffect(() => {
        if (wavesurferObj) {
            wavesurferObj.load(
                product?.document?.short_content_url
            );
        }
    }, [product?.document?.short_content_url, wavesurferObj]);



	useEffect(() => {
        if (wavesurferObj) wavesurferObj.setVolume(volume);
    }, [volume, wavesurferObj])

    const handlePlayPause = (e) => {
        wavesurferObj.playPause();
        setPlaying(!playing);
    };


    return (
        <>
           
            <div className="audio-cart-container">
                <div className="audio-cart-content">
                    <div className="row">
                        <div className="col-3 align-content-center">
                            <div className="d-flex gap-5 audio-list-left">
                                <div
                                    className="col-xl-1 col-lg-1 col-md-1  audio-play-list"
                                    onClick={handlePlayPause}>
                                    {!playing ? (
                                        <>
                                            <i class="fa-solid fa-circle-pause"></i>
                                        </>
                                    ) : (
                                        <>
                                            <i class="fa-solid fa-circle-play"></i>
                                        </>
                                    )}
                                </div>
                               <div>
							   <p>
                                    <Link
                                        style={{ display: 'flex' }}
                                        href="/product/[pid]"
                                        as={`/product/${product.slug}`}>
                                        <a className="audio-name text-truncate fw-bolder">
                                            {product?.title}
                                        </a>
                                    </Link>
                                           
                                </p>
								<Link  href="/product/[pid]"
                                        as={`/product/${product.slug}`} >
								<a className='text-truncate' > 
									{product?.seller?.first_name}
									{product?.seller?.last_name}
								</a>
								</Link>
							   </div>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-9" >
                            <div ref={wavesurferRef} id="waveform" ></div>
                        </div>
                        <div className="col-xl-2 col-lg-9 d-flex align-content-center justify-content-start justify-content-xl-center pl-xl-0 pl-5 p pt-2">
                            <ModuleProductActions
                                product={product}
                                audio={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AudioWaveform;


 {/* <section className="waveform-container">
                <div ref={wavesurferRef} id="waveform" />
                <div ref={timelineRef} id="wave-timeline" />
                <div className="all-controls">
                    <div className="left-container">
                        <button
                            title="play/pause"
                            className="controls"
                            onClick={handlePlayPause}>
                            {playing ? (
                                <i className="material-icons">pause</i>
                            ) : (
                                <i className="material-icons">play_arrow</i>
                            )}
                        </button>
                    </div>
                    <div className="right-container">
                        <div className="volume-slide-container">
                            {volume > 0 ? (
                                <i className="material-icons">volume_up</i>
                            ) : (
                                <i className="material-icons">volume_off</i>
                            )}
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                value={volume}
                                onChange={handleVolumeSlider}
                                className="slider volume-slider"
                            />
                        </div>
                    </div>
                </div>
            </section> */}