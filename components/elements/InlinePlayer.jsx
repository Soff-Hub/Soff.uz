import Router from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import wavesurfer from 'wavesurfer.js';
import { AudioContext } from '~/hooks/AudioContext';
import RepeatIcon from './products/RepeatIcon';
import useResponsive from '~/utilities/useResponsive';


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
    const [isEnd, setIsEnd] = useState(false)
    const [replay, setReplay] = useState(false)
    const { isMobile } = useResponsive()

    const poster_url = audioData?.poster_url

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
                        width: isMobile ? '150px' : '400px'
                    })
                );
            }, 100);
        }
    }, [wavesurferObj2]);

    useEffect(() => {
        setReplay(!!localStorage.getItem('replay'))
    }, [])

    const loadMusic = () => {
        if (wavesurferObj2) {
            setIsEnd(false)

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
                if (replay) {
                    wavesurferObj2?.seekTo(0)
                    wavesurferObj2?.play()
                } else {
                    setPlaying2(false)
                    wavesurferObj2?.pause()
                    setPlaying2(false)
                }
            });
        }
    }

    const handleReplay = () => {
        setReplay(c => {
            wavesurferObj2.on('finish', () => {
                if (!c) {
                    wavesurferObj2?.seekTo(0)
                    wavesurferObj2?.play()
                } else {
                    setPlaying2(false)
                    wavesurferObj2?.pause()
                    setPlaying2(false)
                }
            });

            return !c
        })
        if (replay) {
            localStorage.removeItem('replay')
        } else {
            localStorage.setItem('replay', 'true')
        }
    }

    useEffect(() => {
        loadMusic()
    }, [wavesurferObj2, playerVisible?.url])


    useEffect(() => {

        return () => {
            setWavesurferObj2(null)
            setPlaying2(false)
        }
    }, [])


    return (
        <div className="w-100 playerrr ">
            <div className='play-img' onClick={handlePlayPause}>
                <img src={poster_url} height={isMobile ? 40 : 60} width={isMobile ? 40 : 60} style={{ borderRadius: '3px', objectFit: 'cover', maxWidth: '60px' }} />
            </div>
            {audioData?.title ? <p className="text-truncate fs-4 m-0" style={{ maxWidth: '100%' }}>
                {audioData?.title}.mp3
            </p> : ''}
            <div className="wafe-line">
                <div>

                </div>
                {playing2 ? (
                    <>
                        <i onClick={handlePlayPause} class="fa-solid fa-circle-pause"></i>
                    </>
                ) : (
                    <>
                        <i onClick={handlePlayPause} class="fa-solid fa-circle-play"></i>
                    </>
                )}
                <p className='m-0' style={{ width: '57px' }}>{timer}</p>
                <div ref={wavesurferRef} id="waveform-2"></div>
                <p className='m-0'>{wavesurferObj2 ? formatTime(wavesurferObj2.getDuration()) : timer}</p>
                <div className='ms-2' style={{ color: replay ? '#00A44F' : '#000000', cursor: 'pointer' }} onClick={handleReplay}>
                    <RepeatIcon />
                </div>
            </div>

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
