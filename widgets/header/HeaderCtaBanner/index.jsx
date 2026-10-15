import React from 'react';
import Link from 'next/link';
import { HiSparkles } from 'react-icons/hi2';
import { useSelector } from 'react-redux';
import { useMounted } from '~/shared/hooks/useMounted';
import { trackEvent } from '~/shared/utilities/analytics';
import styles from './HeaderCtaBanner.module.scss';

const SUBSCRIPTION_URL = '/subscription';
const LOGIN_URL = '/auth/login';

// GA4 event for both banner buttons; cta_action tells them apart.
const trackCtaClick = (authState, ctaAction) =>
    trackEvent('pro_cta_click', {
        cta_location: 'header_banner',
        cta_action: ctaAction,
        auth_state: authState,
    });

const GuestCta = () => (
    <>
        <p className={styles.text}>
            <strong>Pro tarifida</strong> SoffX AI xizmatlari kiradi: video, rasm, taqdimot va ilmiy ishlar
        </p>
        <Link href={LOGIN_URL}>
            <a className={styles.button} onClick={() => trackCtaClick('guest', 'register')}>Ro'yxatdan o'tish</a>
        </Link>
    </>
);

const UserCta = () => (
    <>
        <p className={styles.text}>
            <strong>Pro tarifida</strong> SoffX AI xizmatlari kiradi: video, rasm, taqdimot va ilmiy ishlar
        </p>
        <Link href={SUBSCRIPTION_URL}>
            <a className={styles.button} onClick={() => trackCtaClick('user', 'view_pro')}>Pro ni ko'rish</a>
        </Link>
    </>
);

const HeaderCtaBanner = () => {
    const isMounted = useMounted();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    // Render the guest copy until mounted so server and client markup match.
    const showUserCta = isMounted && isLoggedIn;

    return (
        <div className={styles.banner} role="region" aria-label="Pro tarif taklifi">
            <span className={styles.badge}>
                <HiSparkles />
                SoffX AI
            </span>
            <div className={styles.content}>{showUserCta ? <UserCta /> : <GuestCta />}</div>
        </div>
    );
};

export default HeaderCtaBanner;
