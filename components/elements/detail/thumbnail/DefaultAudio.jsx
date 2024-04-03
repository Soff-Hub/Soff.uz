import React, { useRef } from 'react';

export default function DefaultAudio({ product, document }) {
    const audioRef = useRef(null);
    console.log('url', document);

    return (
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
                    {document?.file_url ? (
                        ''
                    ) : (
                        <span style={{ color: '#F4CA16' }}>
                            Batafsil eshitish uchun sotib oling
                        </span>
                    )}
                </div>
                {document?.file_url ? (
                    <div className="audio-detail-container">
                        <audio id="audioPlayer" controls>
                            <source
                                src={document?.file_url}
                                type={`audio/${product?.document?.file_type?.replace(
                                    '.',
                                    ''
                                )}`}
                                defaultValue={document?.file_url}
                            />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                ) : (
                    <div className="audio-detail-container">
                        <audio id="audioPlayer" ref={audioRef} controls>
                            <source
                                src={product?.document?.short_content_url}
                                type={`audio/${product?.document?.file_type?.replace(
                                    '.',
                                    ''
                                )}`}
                                defaultValue={
                                    product?.document?.short_content_url
                                }
                            />
                            Your browser does not support the audio element.
                        </audio>
                        <div className="audio-none">
                            <span></span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
