import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import wavesurfer from 'wavesurfer.js';
import { AudioContext } from '~/hooks/AudioContext';
import PlayButtonIcon from '../../PlayButtonIcon';
import useResponsive from '~/utilities/useResponsive';

export default function DefaultAudio({ product }) {
    const wavesurferRef = useRef(null);
    const { wavesurferObj, setWavesurferObjFn: setWavesurferObj, playing, setPlaying, setPlayerVisible, setAudioData, setPlaying2, setWavesurferObj2 } = useContext(AudioContext)
    const { asPath, push } = useRouter()
    const [url, setUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const { isMobile } = useResponsive()

    async function withFunction() {
        return isMobile ? 240 : 500
    }

    useEffect(() => {
        if (wavesurferRef.current && !wavesurferObj) {
            setPlaying(false)
            setWavesurferObj(
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
                    width: withFunction()
                })
            );
        }
    }, [wavesurferObj, asPath, isMobile]);

    const setAudioUrl = async () => {
        if (wavesurferObj && product?.document) {
            if (product?.document?.file_url) {
                if (wavesurferObj && product?.document?.file_url) {
                    setLoading(true)
                    await wavesurferObj.load(product?.document?.file_url);
                    setLoading(false)
                    setUrl(product?.document?.file_url)
                }
            } else {
                if (wavesurferObj && product?.document?.short_content_url) {
                    await wavesurferObj.load(product?.document?.short_content_url);
                    setUrl(product?.document?.short_content_url)
                }
            }
        }
    }

    useEffect(() => {
        setAudioUrl()
    }, [
        product?.document,
        wavesurferObj,
    ]);

    useEffect(() => {
        if (wavesurferObj) wavesurferObj.setVolume(1);
    }, [wavesurferObj]);

    const handlePlayPause = (e) => {
        if (!playing) {
            setWavesurferObj2(null)
            setPlayerVisible(null)
        }
        wavesurferObj.playPause();
        setPlaying(!playing);
    };

    useEffect(() => {
        if (wavesurferObj) {
            setPlaying(false)
            wavesurferObj?.seekTo(0)
        }
    }, [asPath, wavesurferObj])

    const handleToBottom = async () => {
        setAudioData(product)
        setPlaying(false)
        wavesurferObj.playPause()
        setPlayerVisible({ time: wavesurferObj.getCurrentTime() / wavesurferObj.getDuration(), url, id: product?.id })
        push('/category/audio')
        setPlaying2(true)
    }

    useEffect(() => {

        return () => {
            setWavesurferObj(null)
        }
    }, [])

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
                <div className='handle-to-bottom' onClick={handleToBottom}>
                    <PlayButtonIcon />
                </div>
                <div className="col-xxl-3 col-xl-3 col-lg-3  col-sm-5 col-md-4 col-12 audio_poster text-start">
                    <div
                        className="audio__poster"
                        style={{
                            backgroundImage: `url( ${product?.poster_url
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
                        {product?.discount_price !== 0 ? (
                            <span style={{ color: '#F4CA16' }}>
                                Batafsil eshitish uchun sotib oling
                            </span>
                        ) : (
                            ''
                        )}
                    </div>

                    <div className="row audio-style">

                        <div className="audio-none">
                            <span></span>
                        </div>
                        <div
                            className="col-1 audio-play"
                            onClick={handlePlayPause}>
                            {playing ? (
                                <>
                                    <i class="fa-solid fa-circle-pause"></i>
                                </>
                            ) : (
                                <>
                                    <i class="fa-solid fa-circle-play"></i>
                                </>
                            )}
                        </div>
                        <div className="col-12 col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-11 pl-0" style={{ position: 'relative' }}>
                            {loading ? <div style={{ position: 'absolute', zIndex: 1000, top: '50%', transform: 'translateY(-50%)', width: '75%', height: '2px', backgroundColor: '#00A44F' }} id="loading"></div> : ''}
                            <div ref={wavesurferRef} id="waveform"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
