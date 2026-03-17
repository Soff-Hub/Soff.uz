import React, { useEffect, useState } from 'react';
import Hls from 'hls.js';
// @ts-ignore
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import styles from './PlyrPlayer.module.scss';

interface PlyrPlayerProps {
    videoSrc: string;
    token?: string;
    poster?: string;
    onPortraitStateChange?: (isPortrait: boolean) => void;
}

const PlyrPlayer: React.FC<PlyrPlayerProps> = ({ videoSrc, token, poster, onPortraitStateChange }) => {
    const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);
    const hlsRef = React.useRef<Hls | null>(null);

    useEffect(() => {
        if (!videoElement || !videoSrc) return;

        let player: Plyr | null = null;
        const defaultOptions: any = {
            controls: [
                'play-large', 'restart', 'rewind', 'play', 'fast-forward',
                'progress', 'current-time', 'duration', 'mute', 'volume',
                'captions', 'settings', 'pip', 'airplay', 'fullscreen'
            ],
            settings: ['quality', 'speed', 'loop'],
            i18n: {
                qualityLabel: {
                    0: 'Auto',
                },
            },
        };

        // Clean up previous HLS instance
        if (hlsRef.current) {
            hlsRef.current.destroy();
            hlsRef.current = null;
        }

        if (Hls.isSupported() && videoSrc.includes('.m3u8')) {
            const hls = new Hls({
                debug: false,
                xhrSetup: (xhr, url) => {
                    let finalUrl = url;
                    if (url.includes('/video-key/')) {
                        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
                        if (baseUrl) {
                            const basePathMatch = url.match(/\/api\/v1\/.*/);
                            if (basePathMatch) {
                                finalUrl = `${baseUrl}${basePathMatch[0]}`;
                            }
                        }
                    }

                    xhr.open('GET', finalUrl);

                    if (finalUrl.includes('/video-key/') && token) {
                        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
                    }
                }
            });

            hls.loadSource(videoSrc);
            hls.attachMedia(videoElement);

            hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
                const availableQualities = hls.levels.map((l) => l.height);
                availableQualities.unshift(0); // 0 translates to Auto

                player = new Plyr(videoElement, {
                    ...defaultOptions,
                    quality: {
                        default: 0,
                        options: availableQualities,
                        forced: true,
                        onChange: (e: number) => {
                            if (e === 0) {
                                hls.currentLevel = -1; // Auto
                            } else {
                                const idx = hls.levels.findIndex((level) => level.height === e);
                                if (idx !== -1) {
                                    hls.currentLevel = idx;
                                }
                            }
                        },
                    },
                });

                player.on('ready', () => {
                    player?.play().catch((e: any) => console.error("[Plyr] Auto-play failed:", e));
                });
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
                if (data.fatal) {
                    switch (data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            hls.startLoad();
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            hls.recoverMediaError();
                            break;
                        default:
                            hls.destroy();
                            break;
                    }
                }
            });

            hlsRef.current = hls;
        } else {
            // Safari has native HLS support or MP4 video format etc.
            videoElement.src = videoSrc;
            player = new Plyr(videoElement, defaultOptions);
            videoElement.addEventListener('loadedmetadata', () => {
                player?.play().catch((e: any) => console.error("Playback failed:", e));
            });
        }

        return () => {
            if (player) {
                player.destroy();
            }
            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
            }
        };
    }, [videoElement, videoSrc, token]);

    return (
        <div className={styles.playerContainer}>
            <video
                ref={setVideoElement}
                playsInline
                crossOrigin="anonymous"
                controlsList="nodownload"
                poster={poster}
                onLoadedMetadata={(e: React.SyntheticEvent<HTMLVideoElement>) => {
                    const { videoWidth, videoHeight } = e.currentTarget;
                    if (onPortraitStateChange) {
                        onPortraitStateChange(videoHeight > videoWidth);
                    }
                }}
            />
        </div>
    );
};

export default React.memo(PlyrPlayer);
