import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { ScaleLoader } from 'react-spinners';

export default function DefaultAudio({ product }) {
    // product?.document?.short_content_url
    // `video/${product?.document?.file_type?.replace('.','' )}`
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const togglePlay = () => {
        const audioPlayer = audioRef.current;

        if (isPlaying) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }

        setIsPlaying(!isPlaying);
    };

    const updateTime = () => {
        const audioPlayer = audioRef.current;
        setCurrentTime(audioPlayer.currentTime);
        setDuration(audioPlayer.duration);
    };

    // useEffect(() => {
    //     const audioPlayer = audioRef.current;

    //     audioPlayer.addEventListener('timeupdate', updateTime);

    //     return () => {
    //         audioPlayer.removeEventListener('timeupdate', updateTime);
    //     };
    // }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${
            remainingSeconds < 10 ? '0' : ''
        }${remainingSeconds}`;
    };
    console.log('product', product);
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
                <marquee class="w-100 text-truncate">{product?.title} </marquee>
                <div className="audio_child">
                    <span>{product?.document?.file_type}</span>
                    <span>{product?.document?.file_size}</span>
                </div>
                <p className="audio_acteg">{product?.category?.name}</p>
                {/* <div className="audio_content">
                    <div className="audio_play" onClick={togglePlay}>
                        {isPlaying ? (
                            <i class="fa-solid fa-pause"></i>
                        ) : (
                            <i class="fa-solid fa-play"></i>
                        )}
                    </div>
                    <div className="audio_player">
                        <ScaleLoader fontSiza="40px" color="#fff" />
                        <ScaleLoader fontSiza="40px" color="#fff" />
                    </div>
                    <div>
                        <span>{formatTime(currentTime)}</span> /{' '}
                        <span>{product?.document?.content_duration}</span>
                    </div>
                </div> */}

                <audio
                    id="audioPlayer"
                    // style={{ display: 'none' }}
                    ref={audioRef}
                    controls>
                    <source
                        src={product?.document?.short_content_url}
                        type={`audio/${product?.document?.file_type?.replace(
                            '.',
                            ''
                        )}`}
                    />
                    Your browser does not support the audio element.
                </audio>
                {/* <iframe
                    title="Audio Player"
                    width="300"
                    height="50"
                    src={product?.document?.short_content_url}
                    frameBorder="0"
                    allow="autoplay encrypted-media"></iframe> */}
            </div>
        </div>
    );
}
