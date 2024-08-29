import React, { useEffect, useRef, useState } from 'react';
import wavesurfer from 'wavesurfer.js';


const InlinePlayer = () => {
    const wavesurferRef = useRef(null);
    const [wavesurferObj, setWavesurferObj] = useState(null);

    const fileurl = 'https://eu2.contabostorage.com/20ddac7ab90d4d188d1ca104120b91ed:soffuz/media/documents/soff_7177_IMG_9740.mp3'
    const poster_url = 'https://eu2.contabostorage.com/20ddac7ab90d4d188d1ca104120b91ed:soffuz/media/poster/%D0%A2%D0%B5%D0%BA%D1%81%D1%82_%D0%B0%D0%B1%D0%B7%D0%B0%D1%86%D0%B0.png'

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
                    height: 30,
                    width: '500px'
                })
            );
        }
    }, [wavesurferObj]);

    useEffect(() => {
        if (wavesurferObj) {
            wavesurferObj.load(fileurl);
        }
    }, [wavesurferObj]);


    return (
        <div className="w-100 playerrr">
            <div className='play-img'>
                <img src={poster_url} height={45} width={45} style={{ borderRadius: '3px', objectFit: 'cover', maxWidth: '45px' }} />
                {true ? (
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
                <p className='m-0'>00:00</p>
                <div ref={wavesurferRef} id="waveform"></div>
                <p className='m-0'>00:58</p>
            </div>
            <marquee className="w-100 text-truncate fs-4 m-0" style={{ maxWidth: '100%' }}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam, reiciendis?
            </marquee>
            <i class="fa-solid fa-close" style={{ cursor: 'pointer' }}></i>
        </div>

    );
}

export default InlinePlayer;
