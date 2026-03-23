import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import HeaderTop from './HeaderTop';
import HeaderLogo from './HeaderLogo';
import HeaderActions from './HeaderActions';
import { useDispatch } from 'react-redux';
import { initLocalCart } from '~/store/ecomerce/slice';
import useResponsive from '~/shared/utilities/useResponsive';
import NavbarSearch from './navbar-search';
import NavbarMenu from '~/widgets/navbar-menu';
import FastDownloadSection from '~/shared/components/fast-dowload/FastDowloadSection';
import { initSearchHistory } from '~/store/search/slice';
import { useViewportContext } from '~/shared/hooks/useViewportContext';
import { VideoNavbar } from '~/features/videos';
import ProductRepository from '~/repositories/ProductRepository';
import { useCountTimeBack } from '~/shared/hooks/useCountDown';
import { useMounted } from '~/shared/hooks/useMounted';
import { FaClock, FaPercent } from 'react-icons/fa';
import Link from 'next/link';
import styles from './header.module.scss';

const Header = () => {
    const { headerRef } = useViewportContext();
    const { isMobile } = useResponsive();
    const dispatch = useDispatch();
    const router = useRouter();
    const isHomePage = router.pathname === '/';
    const isVideoLessonsPage = router.pathname.startsWith('/video-lessons');

    const [scrollDirection, setScrollDirection] = useState('up');
    const [isScrolled, setIsScrolled] = useState(false);
    const [promotion, setPromotion] = useState({
        discount_percent: 0,
        expires_at: null,
    });
    const isMounted = useMounted();
    const timeLeft = useCountTimeBack(promotion.expires_at || null);

    useEffect(() => {
        const fetchPromotion = async () => {
            try {
                const res = await ProductRepository.getActivePromotion();
                if (res) setPromotion(res);
            } catch (err) {
                console.error('Promotion fetch failed', err);
            }
        };
        fetchPromotion();
    }, []);

    useEffect(() => {
        const initFunctions = () => {
            dispatch(initLocalCart());
            dispatch(initSearchHistory());
        };
        initFunctions();
    }, []);

    useEffect(() => {
        let lastScrollY = window.pageYOffset;
        const handleScroll = () => {
            const currentScrollY = Math.max(0, window.pageYOffset);
            setIsScrolled(currentScrollY > 70);

            if (currentScrollY > lastScrollY && currentScrollY > 70) {
                setScrollDirection('down');
            } else if (currentScrollY < lastScrollY) {
                setScrollDirection('up');
            }
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isScrolledUp = isScrolled && scrollDirection === 'up';
    let headerClassName = `site-header`;
    if (!isHomePage && isMobile) {
        if (isScrolledUp) {
            headerClassName += ` smart-sticky-up`;
        } else {
            headerClassName += ` non-sticky-mobile`;
        }
    }

    const renderNavbar = () => {
        if (isMobile) {
            return <NavbarSearch isScrolledUp={isScrolledUp} />;
        }

        if (isVideoLessonsPage) {
            return <VideoNavbar />;
        }

        return <NavbarMenu />;
    };

    const isExpiring = promotion.expires_at && (timeLeft.minutes > 0 || timeLeft.seconds > 0);

    const renderPromoBanner = () => {
        if (!isMounted || promotion.discount_percent <= 0) return null;

        return (
            <div className={styles.promotionBanner}>
                <div className={styles.mainInfo}>
                    <div className={styles.iconWrapper}>
                        <FaPercent size={12} className="text-white" />
                    </div>
                    <span className={styles.text}>
                        MAXSUS TAKLIF: {promotion.discount_percent}% CHEGIRMA BILAN SOTIB OLING!
                    </span>
                </div>

                {isExpiring && (
                    <div className={styles.countdown}>
                        <FaClock size={12} className="text-white/80" />
                        <span className={styles.time}>
                            {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                        </span>
                    </div>
                )}

                {!isMobile && (
                    <Link href="/account/shopping-cart">
                        <a className={styles.cartLink}>
                            Savatga o'tish
                        </a>
                    </Link>
                )}
            </div>
        );
    };

    return (
        <header className={headerClassName} ref={headerRef}>
            {renderPromoBanner()}
            <div className={`header-bottom top-0 bg-white`}>
                <div className="container">
                    <HeaderTop />
                    <div className="">
                        <div className="header-inner">
                            <HeaderLogo mode={'dark'} />
                            <HeaderActions />
                        </div>
                    </div>
                </div>
                {renderNavbar()}
                <FastDownloadSection />
            </div>
        </header>
    );
};

export default Header;
