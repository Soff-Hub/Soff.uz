import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { logOut } from '~/store/auth/slice';
import { logout as profileLogout } from '~/store/profile/slice';
import useAuth from '~/shared/hooks/useAuth';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useFGet } from '~/shared/hooks/useFApi';
import { CHAT_UNSEENS } from '~/shared/api/end-points';
import { cn } from '~/shared/utilities/cn';
import { accountLinks } from '../constants/account-links';
import Icon from '~/shared/ui/Icon';
import { FaRightFromBracket } from 'react-icons/fa6';
import { MdWorkspacePremium } from 'react-icons/md';
import { MY_SUBSCRIPTION_URL, useMySubscription } from '~/features/platform-subscription/model';
import SubscriptionMenuCard, {
    isSubscriptionUsable,
} from '~/features/platform-subscription/ui/SubscriptionMenuCard';
import styles from './HeaderUserDropdown.module.scss';

const HeaderUserDropdown = () => {
    const dispatch = useDispatch();
    const { user, isLoggedIn } = useSelector((state) => state.auth);
    const { user: profile } = useSelector((state) => state.profile);
    const refresh = useSelector((state) => state.auth?.user?.refresh);
    const router = useRouter();
    const { logOutAuth } = useAuth();

    const handleLogout = async () => {
        await logOutAuth({ refresh });
        dispatch(profileLogout());
        // Redirects to home from protected pages, otherwise stays on the page.
        dispatch(logOut());
    };

    const { data } = useFGet('unread_messages_count', CHAT_UNSEENS, {
        enabled: !!user?.access,
        token: user?.access,
    });

    const { subscription } = useMySubscription();
    const isPremium = isSubscriptionUsable(subscription);

    // The subscription card already links to "Mening obunam".
    const links = subscription ? accountLinks.filter((item) => item.url !== MY_SUBSCRIPTION_URL) : accountLinks;

    const linksView = links.map((item, index) => (
        <li key={index} className={styles.menuItem}>
            <Link href={item.url}>
                <a className="text-decoration-none">
                    <div className={styles.icon}>
                        <Icon icon={item.icon} />
                    </div>
                    <span className={styles.itemText}>{item.text}</span>
                    {data?.unread_messages != 0 && item.url == '/chat' && (
                        <span className={styles.badge}>
                            {data?.unread_messages}
                        </span>
                    )}
                </a>
            </Link>
        </li>
    ));

    const returnUrl = router.query?.returnUrl
        ? router.query.returnUrl
        : decodeURIComponent(router.asPath);

    if (isLoggedIn === true) {
        return (
            <div className={styles.userAccountContainer}>
                <div className="d-flex align-items-center">
                    <Link href={'/account/sellerproducts'}>
                        <a
                            className={cn(styles.avatarFrame, isPremium && styles.avatarPremium)}
                            title={isPremium ? subscription.tier?.title : undefined}>
                            <span className={styles.avatarWrapper}>
                                <Image
                                    src={profile?.image || '/static/img/ozodbek.png'}
                                    className={cn('object-cover')}
                                    layout="fill"
                                    alt="user"
                                />
                            </span>
                            {isPremium && (
                                <span className={styles.premiumBadge}>
                                    <MdWorkspacePremium />
                                </span>
                            )}
                        </a>
                    </Link>
                </div>
                <div className={cn(styles.dropdownContent, subscription && styles.dropdownWide)}>
                    <div className={styles.profileHeader}>
                        <Link
                            href={
                                user?.role === 'admin'
                                    ? '/account/dashbord'
                                    : user?.role === 'seller'
                                        ? '/account/sellerproducts'
                                        : '#'
                            }>
                            <a className="text-decoration-none">
                                <h4 className={styles.userName}>
                                    {profile?.first_name} {profile?.last_name}
                                </h4>
                                <div className={styles.userMeta}>
                                    <p title={profile?.email}>{profile?.email}</p>
                                    <p>{profile?.phone}</p>
                                </div>
                            </a>
                        </Link>
                    </div>

                    <SubscriptionMenuCard subscription={subscription} />

                    <ul className={styles.menuList}>
                        {linksView}
                    </ul>

                    <div className={styles.footer}>
                        <div className={styles.menuItem}>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className={styles.logoutBtn}
                            >
                                <div className={styles.icon}>
                                    <FaRightFromBracket />
                                </div>
                                Chiqish
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <Link href={`/auth/login?returnUrl=${returnUrl}`}>
                <a className={cn(styles.loginEntrance, "m-0")}>Kirish</a>
            </Link>
        );
    }
};

export default connect((state) => state)(HeaderUserDropdown);
