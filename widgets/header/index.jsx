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

const Header = () => {
    const { headerRef } = useViewportContext();
    const { isMobile } = useResponsive();
    const dispatch = useDispatch();
    const router = useRouter();
    const isHomePage = router.pathname === '/';
    const isVideoLessonsPage = router.pathname.startsWith('/video-lessons');

    const [scrollDirection, setScrollDirection] = useState('up');
    const [isScrolled, setIsScrolled] = useState(false);

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

    return (
        <header className={headerClassName} ref={headerRef}>
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
