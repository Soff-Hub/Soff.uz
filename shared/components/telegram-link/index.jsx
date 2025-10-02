import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './style.module.scss'

export function TelegramLink() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 576);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (isMobile) return null;

    return (
        <div className={styles.telegramWrapper}>
            <Link href="https://t.me/+y5GpvEz48_hkMzli" passHref>
                <a
                    target="_blank"
                    className={styles.telegramBtn}
                >
                    <i className="fa-regular fa-paper-plane" />
                </a>
            </Link>
        </div>
    );
}
    