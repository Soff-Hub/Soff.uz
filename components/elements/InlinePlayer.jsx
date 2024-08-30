import Router from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import wavesurfer from 'wavesurfer.js';
import { AudioContext } from '~/hooks/AudioContext';


function formatTime(seconds) {
    const totalSeconds = Math.floor(seconds); // Umumiy soniyalar
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0'); // Soatlar
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0'); // Daqiqalar
    const secs = String(totalSeconds % 60).padStart(2, '0'); // Soniya

    return `${hrs}:${mins}:${secs}`;
}


const InlinePlayer = () => {
    const wavesurferRef = useRef(null);
    const [timer, setTimer] = useState(formatTime(0))
    const { wavesurferObj2, playing2, setWavesurferObj2, setPlaying2, setPlayerVisible, playerVisible, audioData } = useContext(AudioContext)

    const poster_url = 'https://eu2.contabostorage.com/20ddac7ab90d4d188d1ca104120b91ed:soffuz/media/poster/%D0%A2%D0%B5%D0%BA%D1%81%D1%82_%D0%B0%D0%B1%D0%B7%D0%B0%D1%86%D0%B0.png'

    const handlePlayPause = (e) => {
        wavesurferObj2.playPause();
        setPlaying2(!playing2);
    };

    useEffect(() => {
        if (wavesurferRef.current && !wavesurferObj2) {
            setTimeout(() => {
                setWavesurferObj2(
                    wavesurfer.create({
                        container: wavesurferRef.current,
                        scrollParent: true,
                        autoCenter: true,
                        loopSelection: true,
                        cursorColor: '#00A44F',
                        waveColor: '#00A44F',
                        progressColor: '#ccc',
                        responsive: true,
                        height: 30,
                        width: '400px'
                    })
                );
            }, 100);
        }
    }, [wavesurferObj2]);

    const loadMusic = () => {
        if (wavesurferObj2) {

            wavesurferObj2.load(playerVisible?.url)
            wavesurferObj2.on('ready', () => {
                wavesurferObj2?.seekTo(playerVisible?.time)
                wavesurferObj2?.play()
                const interval = setInterval(() => {
                    if (wavesurferObj2 && wavesurferObj2.isPlaying()) {
                        setTimer(formatTime(Math.floor(wavesurferObj2.getCurrentTime())))
                    }
                }, 1000)
            })


            wavesurferObj2.on('finish', () => {
                setPlayerVisible(false)
            });
        }
    }

    useEffect(() => {
        loadMusic()
    }, [wavesurferObj2])


    useEffect(() => {

        // return () => {
        //     setWavesurferObj2(null)
        //     setPlaying2(false)
        // }
    }, [])


    return (
        <div className="w-100 playerrr">
            <div className='play-img' onClick={handlePlayPause}>
                <img src={poster_url} height={45} width={45} style={{ borderRadius: '3px', objectFit: 'cover', maxWidth: '45px' }} />
                {playing2 ? (
                    <>
                        <i class="fa-solid fa-circle-pause"></i>
                    </>
                ) : (
                    <>
                        <i class="fa-solid fa-circle-play"></i>
                    </>
                )}
            </div>
            <div className="wafe-line">
                <p className='m-0' style={{ width: '57px' }}>{timer}</p>
                <div ref={wavesurferRef} id="waveform-2"></div>
                <p className='m-0'>{wavesurferObj2 ? formatTime(wavesurferObj2.getDuration()) : timer}</p>
            </div>
            {audioData?.title ? <p className="w-100 text-truncate fs-4 m-0" style={{ maxWidth: '100%' }}>
                {audioData?.title}.mp3
            </p> : ''}

            <div onClick={() => Router.push(`/product/${audioData?.slug}`)}>
                <svg
                    height="20px"
                    version="1.1"
                    viewBox="0 0 24 24"
                    width="20px"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                        <g
                            transform="translate(12.000000, 12.000000) scale(-1, 1) translate(-12.000000, -12.000000)"
                        >
                            <path
                                d="M19,19 L5,19 L5,5 L12,5 L12,3 L5,3 C3.89,3 3,3.9 3,5 L3,19 C3,20.1 3.89,21 5,21 L19,21 C20.1,21 21,20.1 21,19 L21,12 L19,12 L19,19 Z M14,3 L14,5 L17.59,5 L7.76,14.83 L9.17,16.24 L19,6.41 L19,10 L21,10 L21,3 L14,3 Z"
                                fill="#000"
                                fillRule="nonzero"
                            ></path>
                        </g>
                    </g>
                </svg>
            </div>
            <i class="fa-solid fa-close" style={{ cursor: 'pointer' }} onClick={() => setPlayerVisible(false)}></i>
        </div>

    );
}

export default InlinePlayer;
