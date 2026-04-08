import React, { useEffect, useState } from 'react';
import Hls from 'hls.js';
// @ts-ignore
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import styles from './PlyrPlayer.module.scss';
import { LockOutlined } from '@ant-design/icons';

interface PlyrPlayerProps {
    videoSrc: string;
    token?: string;
    poster?: string;
    onPortraitStateChange?: (isPortrait: boolean) => void;
    onEnded?: () => void;
    isAccessRestricted?: boolean;
    onBuyClick?: () => void;
    actualDuration?: string;
}

const PlyrPlayer: React.FC<PlyrPlayerProps> = ({
    videoSrc,
    token,
    poster,
    onPortraitStateChange,
    onEnded,
    isAccessRestricted,
    onBuyClick,
    actualDuration
}) => {
    const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);
    const [showCta, setShowCta] = useState(false);
    const hlsRef = React.useRef<Hls | null>(null);
    const playerRef = React.useRef<Plyr | null>(null);

    const parseDurationToSeconds = (durationStr?: string) => {
        if (!durationStr) return undefined;

        // Handle "8.37s"
        if (durationStr.toLowerCase().endsWith('s')) {
            return parseFloat(durationStr.slice(0, -1));
        }

        // Handle "HH:MM:SS" or "MM:SS"
        if (durationStr.includes(':')) {
            const parts = durationStr.split(':').map(Number);
            if (parts.length === 3) {
                const [h, m, s] = parts;
                return (h * 3600) + (m * 60) + s;
            }
            if (parts.length === 2) {
                const [m, s] = parts;
                return (m * 60) + s;
            }
        }

        const parsed = parseFloat(durationStr);
        return isNaN(parsed) ? undefined : parsed;
    };

    useEffect(() => {
        setShowCta(false); // Reset when src changes
    }, [videoSrc]);

    const handleVideoEnded = () => {
        if (isAccessRestricted) {
            // Exit fullscreen if active to ensure CTA is visible and clickable
            if (playerRef.current?.fullscreen?.active) {
                playerRef.current.fullscreen.exit();
            }
            setShowCta(true);
        }
        if (onEnded) onEnded();
    };

    useEffect(() => {
        if (!videoElement || !videoSrc) return;

        let player: Plyr | null = null;
        const durationInSeconds = parseDurationToSeconds(actualDuration);

        const defaultOptions: any = {
            controls: [
                'play-large', 'restart', 'rewind', 'play', 'fast-forward',
                'progress', 'current-time', 'duration', 'mute', 'volume',
                'captions', 'settings', 'pip', 'airplay', 'fullscreen'
            ],
            settings: ['quality', 'speed', 'loop'],
            duration: durationInSeconds,
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

                playerRef.current = player;

                player.on('ready', () => {
                    player?.play().catch((e: any) => console.error("[Plyr] Auto-play failed:", e));
                });

                player.on('ended', handleVideoEnded);
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
            playerRef.current = player;
            videoElement.addEventListener('loadedmetadata', () => {
                player?.play().catch((e: any) => console.error("Playback failed:", e));
            });
            player.on('ended', handleVideoEnded);
        }

        return () => {
            if (player) {
                player.destroy();
            }
            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
            }
            playerRef.current = null;
        };
    }, [videoElement, videoSrc, token, actualDuration]);

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

            {showCta && isAccessRestricted && (
                <div className={styles.ctaOverlay}>
                    <LockOutlined className={styles.ctaIcon} />
                    <h3 className={styles.ctaTitle}>Davomi mavjud</h3>
                    <p className={styles.ctaText}>
                        To'liq variantni ko'rish uchun xarid qilishingiz kerak bo'ladi.
                    </p>
                    <button
                        className={styles.ctaButton}
                        onClick={() => {
                            if (onBuyClick) onBuyClick();
                        }}
                    >
                        Xarid qilish
                    </button>
                </div>
            )}
        </div>
    );
};

export default React.memo(PlyrPlayer);
