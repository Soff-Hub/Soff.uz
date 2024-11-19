import Image from 'next/image';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

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

    const [up, setUp] = useState(true)

    const handleUp = () => {
        setUp(false)
    }

    useEffect(() => {
        setTimeout(() => {
            setUp(false)
        }, 3000);
    }, [up])

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
                            className={clasS}
                            objectFit="contain"
                            unoptimized
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
                            className={clasS}
                            objectFit="contain"
                            unoptimized
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
                            className={clasS}
                            objectFit="contain"
                            unoptimized
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
                            className={clasS}
                            objectFit="contain"
                            unoptimized
                        />
                    }
                </>
            )}
        </div>
    );
}
