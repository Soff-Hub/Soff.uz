import Link from 'next/link';
import styles from './style.module.scss';
import useResponsive from '~/shared/utilities/useResponsive';
import { useRouter } from 'next/router';

const disabledLocations = ['/chat', '/order/', '/auth', 'shopping-cart'];

export function TelegramLink() {
    const { isMobile, isTablet } = useResponsive();
    const location = useRouter().pathname;

    if (
        disabledLocations.some(
            (path) => location === path || location.includes(path)
        )
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
