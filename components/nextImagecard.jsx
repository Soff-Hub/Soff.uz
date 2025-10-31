import Image from 'next/image';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTimeManager } from '~/shared/hooks/useTimeManager';

export default function NextImageCard({
    url,
    width,
    height,
    clasS,
    payload,
    detail,
}) {
    const [up, setUp] = useState(true);
    const { startTimeout, stopTimeout } = useTimeManager();

    const handleUp = () => {
        setUp(false);
    };

    useEffect(() => {
        const timing = startTimeout(() => {
            setUp(false);
        }, 3000);

        return () => stopTimeout(timing);
    }, [up]);

    return (
        <div
            className={`${
                (payload?.document?.content_type === 'video' ||
                    payload?.document?.content_type === 'audio') &&
                'video_poster'
            }`}>
            {payload?.document?.content_type === 'video' ? (
                <>
                    <div className="video_poster_fon">
                        <i className="fa-regular fa-circle-play"></i>
                    </div>
                    {url && (
                        <Image
                            src={url}
                            width={width}
                            height={height}
                            alt={url}
                            className={clasS}
                            objectFit="contain"
                            unoptimized
                        />
                    )}
                </>
            ) : payload?.document?.content_type === 'audio' ? (
                <>
                    <div className="video_poster_fon">
                        <i className="fa-solid fa-music"></i>
                    </div>
                    {url && (
                        <Image
                            src={url}
                            width={width}
                            height={height}
                            alt={url}
                            className={clasS}
                            objectFit="contain"
                            unoptimized
                        />
                    )}
                </>
            ) : detail ? (
                <div
                    onClick={() => handleUp()}
                    className={` ${up && 'product_priview'} `}>
                    {url && (
                        <Image
                            src={url}
                            width={width}
                            height={height}
                            alt={url}
                            className={clasS}
                            objectFit="contain"
                            unoptimized
                        />
                    )}
                    {up && (
                        <div className="up_left">
                            <i className="fa-solid fa-angles-up fa-bounce"></i>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    {url && (
                        <Image
                            src={url}
                            width={width}
                            height={height}
                            alt={url}
                            className={clasS}
                            objectFit="contain"
                            unoptimized
                        />
                    )}
                </>
            )}
        </div>
    );
}
