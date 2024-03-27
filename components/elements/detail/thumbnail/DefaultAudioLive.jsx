import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { ScaleLoader } from 'react-spinners';

export default function DefaultAudioLive({
    product,
    liveFile,
    title,
    categoryName,
}) {
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

    useEffect(() => {
        const audioPlayer = audioRef.current;
        audioPlayer.addEventListener('timeupdate', updateTime);
        return () => {
            audioPlayer.removeEventListener('timeupdate', updateTime);
        };
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${
            remainingSeconds < 10 ? '0' : ''
        }${remainingSeconds}`;
    };
    console.log('Live audio', product?.data?.short_content);

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
                {!liveFile ? (
                    <>
                        <div
                            className="audio__poster"
                            style={{
                                backgroundImage: `url('https://png.pngtree.com/background/20230612/original/pngtree-colorful-musical-notes-and-music-notes-picture-image_3176403.jpg'
                         )`,
                                borderRadius: '5px',
                                backgroundPositionX: 'center',
                                backgroundPositionY: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                borderRadius: '15px',
                            }}></div>
                    </>
                ) : (
                    <div
                        className="audio__poster"
                        style={{
                            backgroundImage: `url( ${liveFile} )`,
                            borderRadius: '5px',
                            backgroundPositionX: 'center',
                            backgroundPositionY: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            borderRadius: '15px',
                        }}></div>
                )}
            </div>
            <div className="col-xxl-9 col-xl-9 xol-lg-9  col-md-8 col-sm-7 col-12 audio-col-8">
                <marquee class="w-100 text-truncate">
                    {title ? title : "To'ldirilmadi"}{' '}
                </marquee>
                <div className="audio_child">
                    <span>
                        {product?.data?.file_type
                            ? product?.data?.file_type
                            : "To'ldirilmadi"}
                    </span>
                    <span>
                        {product?.data?.file_size
                            ? product?.data?.file_size
                            : "To'ldirilmadi"}
                    </span>
                </div>
                <p className="audio_acteg">
                    {categoryName ? categoryName : "To'ldirilmadi"}
                </p>
                <div className="audio_content">
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
                        <span>
                            {product?.data?.content_duration
                                ? product?.data?.content_duration
                                : "To'ldirilmadi"}
                        </span>
                    </div>
                </div>

                <audio
                    id="audioPlayer"
                    style={{ display: 'none' }}
                    ref={audioRef}
                        src={product?.data?.short_content}
                    controls>
                    Your browser does not support the audio element.
                </audio>
            </div>
        </div>
    );
}
