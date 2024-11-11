import Image from 'next/image';
import React, { useState, useEffect } from 'react';

export default function NextImageCard({
    url,
    width,
    height,
    clasS,
    payload,
    detail,
}) {
    const loaderProp = ({ src }) => {
        return src;
    };

    const [up, setUp] = useState(true);

    const handleUp = () => {
        setUp(false);
    };

    useEffect(() => {
        let isMounted = true; // Komponentni montajlanganligini tekshiruvchi flag

        const timer = setTimeout(() => {
            if (isMounted) {  // Faqat komponent mavjud bo'lsa, setUp yangilanishini bajarish
                setUp(false);
            }
        }, 3000);

        // Cleanup function: komponent unmounted bo'lganda timerni to'xtatish
        return () => {
            isMounted = false; // Komponent unmounted bo'lsa, setState chaqirilmaydi
            clearTimeout(timer); // Timerni to'xtatish
        };
    }, []);  // Effekt faqat birinchi marta ishlaydi

    return (
        <div
            className={`${(payload?.document?.content_type === 'video' ||
                payload?.document?.content_type === 'audio') &&
                'video_poster'
                }`}>
            {payload?.document?.content_type === 'video' ? (
                <>
                    <div className="video_poster_fon">
                        <i className="fa-regular fa-circle-play"></i>
                    </div>
                    {
                        url &&
                        <Image
                            src={url}
                            width={width}
                            height={height}
                            alt={url}
                            loader={loaderProp}
                            unoptimized
                            className={clasS}
                            objectFit="contain"
                        />
                    }
                </>
            ) : payload?.document?.content_type === 'audio' ? (
                <>
                    <div className="video_poster_fon">
                        <i className="fa-solid fa-music"></i>
                    </div>
                    {
                        url && <Image
                            src={url}
                            width={width}
                            height={height}
                            alt={url}
                            loader={loaderProp}
                            unoptimized
                            className={clasS}
                            objectFit="contain"
                        />
                    }
                </>
            ) : detail ? (
                <div onClick={() => handleUp()} className={` ${up && 'product_priview'} `}>
                    {
                        url &&
                        <Image
                            src={url}
                            width={width}
                            height={height}
                            alt={url}
                            loader={loaderProp}
                            unoptimized
                            className={clasS}
                            objectFit="contain"
                        />
                    }
                    {
                        up &&
                        <div className="up_left">
                            <i className="fa-solid fa-angles-up fa-bounce"></i>
                        </div>
                    }
                </div>
            ) : (
                <>
                    {
                        url && <Image
                            src={url}
                            width={width}
                            height={height}
                            alt={url}
                            loader={loaderProp}
                            unoptimized
                            className={clasS}
                            objectFit="contain"
                        />
                    }
                </>
            )}
        </div>
    );
}
