import React, { useState, useEffect, useRef, useContext } from 'react';
import wavesurfer from 'wavesurfer.js';
import Link from 'next/link';
import ModuleProductActions from './modules/ModuleProductActions';
import { addPeriodToThousands } from '~/components/partials/account/ProductsLists';
import { AudioContext } from '~/hooks/AudioContext';

const AudioWaveform = ({ product, inCategory }) => {
    const wavesurferRef = useRef(null);
    const [wavesurferObj, setWavesurferObj] = useState(null);
    const { wavesurferObj2, setWavesurferObj2 } = useContext(AudioContext)
    const [playing, setPlaying] = useState(false);
    const { setPlayerVisible, setPlaying2, playing2, playerVisible } = useContext(AudioContext)
    const [url, setUrl] = useState('')



    useEffect(() => {
        if (wavesurferRef.current && !wavesurferObj) {
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
                    height: 40,
                })
            );
        }
    }, [wavesurferObj]);

    useEffect(() => {
        if (wavesurferObj && product?.document?.short_content_url) {
            wavesurferObj?.load(product?.document?.short_content_url);
            setUrl(product?.document?.short_content_url)
        }
    }, [product?.document?.short_content_url, wavesurferObj]);


    useEffect(() => {
        if (wavesurferObj) wavesurferObj.setVolume(1);
    }, [wavesurferObj]);

    const handlePlayPause = () => {
        setPlayerVisible({
            url: product?.document?.short_content_url,
            time: 0
        })
        // document
        //     .querySelectorAll('.audio-cart-content .fa-circle-pause')
        //     .forEach((el) => {
        //         el.click();
        //     });

        if (playing2) {
            wavesurferObj.pause();
            wavesurferObj2?.pause()
            console.log(playerVisible?.url , 3, product?.document?.short_content_url);
            
            if (playerVisible?.url === product?.document?.short_content_url) {
                setPlaying(true)
            } else {
                setPlaying(false)
            }
        } else {
            wavesurferObj.pause();
            wavesurferObj2?.pause()
            setPlaying(false)
        }
        // if (playing) {
        //     wavesurferObj.pause();
        //     wavesurferObj2?.pause()
        // } else {
        //     wavesurferObj.pause();
        //     wavesurferObj2?.pause()
        // }
    };

    useEffect(() => {
        if (wavesurferObj) {
            wavesurferObj.on('finish', handleAudioFinish);
        }
    }, [wavesurferObj]);

    useEffect(() => {
        // if (playerVisible?.url === product?.document?.short_content_url) {
        //     setPlaying(playing2)
        // } else {
        //     setPlaying(false)
        // }
    }, [playing2])

    const handleAudioFinish = () => {
        setPlaying(false);
    };



    return (
        <>
            <div className="audio-cart-container" >
                <div className="audio-cart-content">
                    <div className="row">
                        <div
                            className={`${!inCategory ? 'col-3' : 'col-4'
                                } align-content-center`}>
                            <div className="d-flex gap-5 audio-list-left">
                                <div
                                    className="col-xl-1 col-lg-1 col-md-1  audio-play-list"
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
                                    <Link
                                        href="/seller/[pid]"
                                        as={`/seller/${product?.seller?.id}`}>
                                        <a className="text-truncate">
                                            {product?.seller?.first_name}{' '}
                                            {product?.seller?.last_name}
                                        </a>
                                    </Link>
                                    <div>
                                        {+product?.discount_price === 0 ? (
                                            <p className='free-audio-price'>Bepul</p>
                                        ) : product?.discount === 0 ? (
                                            <p>
                                                {addPeriodToThousands(
                                                    product?.discount_price
                                                )}{' '}
                                                so'm
                                            </p>
                                        ) : (
                                            <>
                                                <del>
                                                    {addPeriodToThousands(
                                                        product?.price
                                                    )}{' '}
                                                    so'm
                                                </del>
                                                <p>
                                                    {addPeriodToThousands(
                                                        product?.discount_price
                                                    )}
                                                    so'm
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-9 d-flex align-items-center w-100">
                            <div className='w-100'>
                                <div ref={wavesurferRef} id="waveform-2"></div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center col-xl-2 col-lg-9 d-flex align-content-center justify-content-start justify-content-xl-center pl-xl-0 pl-5 p pt-2">
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
