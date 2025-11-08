import Link from 'next/link';
import styles from './style.module.scss';
import useResponsive from '~/shared/utilities/useResponsive';
import { useRouter } from 'next/router';

export function TelegramLink() {
    const { isMobile, isTablet } = useResponsive();
    const location = useRouter().pathname;

    if (
        location === '/chat' ||
        location.includes('/order/') ||
        location.includes('/auth')
    ) {
        return null;
    }

    return (
        <div
            className={styles.telegramWrapper}
            style={{
                bottom: isTablet ? '60px' : isMobile ? '70px' : '20px',
            }}>
            <Link href="https://t.me/+y5GpvEz48_hkMzli" passHref>
                <a target="_blank" className={styles.telegramBtn}>
                    <i className="fa-regular fa-paper-plane" />
                </a>
            </Link>
        </div>
    );
}
