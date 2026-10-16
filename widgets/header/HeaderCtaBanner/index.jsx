import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { HiSparkles } from 'react-icons/hi2';
import { useSelector } from 'react-redux';
import { useMounted } from '~/shared/hooks/useMounted';
import { trackEvent } from '~/shared/utilities/analytics';
import styles from './HeaderCtaBanner.module.scss';

const SUBSCRIPTION_URL = '/subscription';

// GA4 event for both banner buttons; cta_action tells them apart.
const trackCtaClick = (authState, ctaAction) =>
    trackEvent('pro_cta_click', {
        cta_location: 'header_banner',
        cta_action: ctaAction,
        auth_state: authState,
    });

const CtaText = () => (
    <p className={styles.text}>
        <strong>Pro tarifida</strong>
        <span className={styles.highlight}>
            <b>2 mln+</b> mahsulot
        </span>
        <span className={styles.plus}>+</span>
        <span className={styles.highlight}>AI vositalar</span>
        <span className={styles.detail}>video, rasm, taqdimot va ilmiy ishlar</span>
    </p>
);

const GuestCta = () => (
    <>
        <CtaText />
        <Link href={SUBSCRIPTION_URL}>
            <a className={styles.button} onClick={() => trackCtaClick('guest', 'subscribe')}>Obuna olish</a>
        </Link>
    </>
);

const UserCta = () => (
    <>
        <CtaText />
        <Link href={SUBSCRIPTION_URL}>
            <a className={styles.button} onClick={() => trackCtaClick('user', 'view_pro')}>Pro ni ko'rish</a>
        </Link>
    </>
);

// Always visible near the page top; ignore tiny scroll jitter.
const TOP_OFFSET = 80;
const SCROLL_DELTA = 8;

// Hides the banner while scrolling down and brings it back on scroll up.
const useHideOnScrollDown = () => {
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        let lastY = window.scrollY;
        let ticking = false;

        const update = () => {
            const y = window.scrollY;
            if (y < TOP_OFFSET) {
                setIsHidden(false);
            } else if (Math.abs(y - lastY) > SCROLL_DELTA) {
                setIsHidden(y > lastY);
            } else {
                ticking = false;
                return;
            }
            lastY = y;
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                window.requestAnimationFrame(update);
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return isHidden;
};

// Hides the banner by sliding the sticky header up by the banner's height
// (header.module.scss reads --header-cta-offset as its `top`). Collapsing the
// banner's own height instead shrinks the header, which shifts the page and
// changes scrollY — the hook reads that as a scroll up, shows the banner again,
// and the header jitters. A sticky offset never affects layout, so no loop.
const useStickyOffset = (ref, isHidden) => {
    useEffect(() => {
        const banner = ref.current;
        const header = banner?.parentElement;
        if (!header) return undefined;

        const apply = () => {
            header.style.setProperty('--header-cta-offset', isHidden ? `-${banner.offsetHeight}px` : '0px');
        };
        apply();

        // The banner wraps to more lines on narrow screens.
        const observer = new ResizeObserver(apply);
        observer.observe(banner);
        return () => observer.disconnect();
    }, [ref, isHidden]);
};

const HeaderCtaBanner = () => {
    const bannerRef = useRef(null);
    const isHidden = useHideOnScrollDown();
    useStickyOffset(bannerRef, isHidden);
    const isMounted = useMounted();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    // Render the guest copy until mounted so server and client markup match.
    const showUserCta = isMounted && isLoggedIn;

    return (
        <div
            ref={bannerRef}
            className={`${styles.banner} ${isHidden ? styles.hidden : ''}`}
            role="region"
            aria-label="Pro tarif taklifi"
            aria-hidden={isHidden}
        >
            <span className={styles.badge}>
                <HiSparkles />
                SoffX AI
            </span>
            <div className={styles.content}>{showUserCta ? <UserCta /> : <GuestCta />}</div>
        </div>
    );
};

export default HeaderCtaBanner;
