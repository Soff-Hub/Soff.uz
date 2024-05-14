import React, { useState, useEffect, useRef } from 'react';
import wavesurfer from 'wavesurfer.js';
import Link from 'next/link';
import ModuleProductActions from './modules/ModuleProductActions';

const AudioWaveform = ({ product, inCategory }) => {
    const wavesurferRef = useRef(null);

    const [wavesurferObj, setWavesurferObj] = useState(null);

    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(1);

    // create the waveform inside the correct component
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
        if (wavesurferObj) {
            wavesurferObj?.load(product?.document?.short_content_url);
        }
    }, [product?.document?.short_content_url, wavesurferObj]);

    useEffect(() => {
        if (wavesurferObj) wavesurferObj.setVolume(volume);
    }, [volume, wavesurferObj]);

    const handlePlayPause = () => {
        document
            .querySelectorAll('.audio-cart-content .fa-circle-pause')
            .forEach((el) => {
                el.click();
            });


        
        setPlaying(!playing);
        if (!playing) {
            wavesurferObj.play();
        } else {
            wavesurferObj.pause();
        }
    };

    useEffect(() => {
        if (wavesurferObj) {
            wavesurferObj.on('finish', handleAudioFinish);
        }
    }, [wavesurferObj]);

    const handleAudioFinish = () => {
        // console.log('Audio tugab ketdi');
        setPlaying(false);
    };


    function addPeriodToThousands(number) {
        const numStr = String(number);

        const [integerPart, decimalPart] = numStr.split('.');

        const formattedIntegerPart = integerPart.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ' '
        );

        const formattedNumber =
            decimalPart !== undefined
                ? `${formattedIntegerPart}`
                : formattedIntegerPart;

        return formattedNumber;
    }


    return (
        <>
            <div className="audio-cart-container">
                <div className="audio-cart-content">
                    <div className="row">
                        <div
                            className={`${
                                !inCategory ? 'col-3' : 'col-4'
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
                        <div className="col-xl-7 col-lg-9">
                            <div ref={wavesurferRef} id="waveform"></div>
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
