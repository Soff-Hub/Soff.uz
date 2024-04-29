// import WavesurferPlayer from '@wavesurfer/react';
import React, { useState } from 'react';

export default function DefaultAudio({ product }) {
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
        <>
            <div
                style={{
                    backgroundImage: `url(/static/img/audio_fon.jpg)`,
                    width: '100%',
                    heigh: '100%',
                    backgroundPositionX: '80%',
                    backgroundPositionY: 'center',
                    margin: '0 auto',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    borderRadius: '25px',
                }}
                className="row audio--container">
                <div className="col-xxl-3 col-xl-3 col-lg-3  col-sm-5 col-md-4 col-12 audio_poster text-start">
                    <div
                        className="audio__poster"
                        style={{
                            backgroundImage: `url( ${
                                product?.poster_url
                                    ? product?.poster_url
                                    : 'https://png.pngtree.com/background/20230612/original/pngtree-colorful-musical-notes-and-music-notes-picture-image_3176403.jpg'
                            } )`,
                            borderRadius: '5px',
                            backgroundPositionX: 'center',
                            backgroundPositionY: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            borderRadius: '15px',
                        }}></div>
                </div>
                <div className="col-xxl-9 col-xl-9 xol-lg-9  col-md-8 col-sm-7 col-12 audio-col-8">
                    <marquee className="w-100 text-truncate">
                        {product?.title}{' '}
                    </marquee>
                    <div className="audio_child">
                        <span>{product?.document?.file_type}</span>
                        <span>{product?.document?.file_size}</span>
                    </div>
                    <p className="audio_acteg">{product?.category?.name}</p>
                    <div className="d-xl-flex d-xxl-flex d-lg-flex d-md-block  align-items-center gap-5 mb-3">
                        <span className="d-md-block d-block d-sm-block d-xxl-inline d-xl-inline d-lg-inline">
                            {' '}
                            Davomiyligi {product?.document?.content_duration}
                        </span>
                        {product?.file_url === 'No' ? (
                            <span style={{ color: '#F4CA16' }}>
                                Batafsil eshitish uchun sotib oling
                            </span>
                        ) : (
                            ''
                        )}
                    </div>

                    {product?.file_url === 'No' ? (
                        <div className="row audio-style">
                            {/* <audio
                                id="audioPlayer"
                                controls
                                src={
                                    product?.document?.short_content_url
                                }></audio>
                            <div className="audio-none">
                                <span></span>
                            </div> */}
                            <div
                                className="col-1 audio-play"
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
                            <div className="col-12 col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-11 pl-0">
                                {/* <WavesurferPlayer
                                    height={40}
                                    waveColor="#00A44F"
                                    url={product?.document?.short_content_url}
                                    onReady={onReady}
                                    onPlay={() => setIsPlaying(true)}
                                    onPause={() => setIsPlaying(false)}
                                /> */}
                            </div>
                        </div>
                    ) : (
                        <div className="row  audio-style">
                            {/* <audio
                                id="audioPlayer"
                                controls
                                src={product?.file_url}></audio> */}

                            <div
                                className="col-1 audio-play"
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
                            <div className="col-12 col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-11 pl-0">
                                {/* {
                                    product?.file_url ?
                                    <WavesurferPlayer
                                    height={40}
                                    waveColor="#00A44F"
                                    url={product?.file_url}
                                    onReady={onReady}
                                    onPlay={() => setIsPlaying(true)}
                                    onPause={() => setIsPlaying(false)}
                                />  
                                : "Loading..."

                                } */}
                               
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
