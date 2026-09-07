import React, { useCallback, useEffect, useState } from 'react';
import styles from './style.module.scss';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import AuthModal from '~/features/auth/ui/auth-modal';
import { useRouter } from 'next/router';
import { StarFilled } from '@ant-design/icons';
import Image from 'next/image';

const DEFAULT_AVATAR = '/static/img/ozodbek.png';

const isValidSlug = (slug) => {
    return (
        slug &&
        typeof slug === 'string' &&
        slug.trim().length > 0 &&
        slug !== 'undefined' &&
        slug !== 'null'
    );
};

const ServiceCard = ({ service, hasFooter = true, disabled = false }) => {
    const { isLoggedIn } = useSelector((state) => state.auth);
    const [open, setOpen] = useState(false);
    const { push } = useRouter();

    const [avatarUrl, setAvatarUrl] = useState(
        service?.user?.photo_url || DEFAULT_AVATAR
    );

    useEffect(() => {
        setAvatarUrl(service?.user?.photo_url || DEFAULT_AVATAR);
    }, [service?.user?.photo_url]);

    const handleAvatarError = () => {
        if (avatarUrl !== DEFAULT_AVATAR) {
            setAvatarUrl(DEFAULT_AVATAR);
        }
    };

    const handleOrder = useCallback(
        (e) => {
            e?.stopPropagation();
            if (!isValidSlug(service?.slug)) {
                console.error('Invalid service slug for order:', service?.slug);
                return;
            }

            if (isLoggedIn) {
                push(`/service/${service.slug}?paymodal=open`);
            } else {
                setOpen(true);
            }
        },
        [isLoggedIn, push, service?.slug]
    );

    const handleViewDetails = useCallback(
        (e) => {
            e?.stopPropagation();
            if (!isValidSlug(service?.slug)) {
                console.error('Invalid service slug for details:', service?.slug);
                return;
            }
            push(`/service/${service.slug}`);
        },
        [service?.slug, push]
    );

    if (!service || !isValidSlug(service?.slug)) {
        console.warn('ServiceCard: Invalid service data or slug', service);
        return null;
    }

    const hasRating = Boolean(service?.avg_rating && Number(service?.avg_rating) > 0);

    return (
        <>
            <div className={styles.card}>
                <div className={styles.cardBody}>
                    <div className={styles.titleWrapper}>
                        <Link href={`/service/${service.slug}`}>
                            <a
                                className={styles.cardTitleLink}
                                onClick={(e) => {
                                    if (disabled) e.preventDefault();
                                }}>
                                <h3 className={styles.cardTitle}>
                                    {service?.title}
                                </h3>
                            </a>
                        </Link>
                    </div>

                    <div className={styles.metaRow}>
                        {hasRating ? (
                            <div className={styles.ratingBadge}>
                                <StarFilled className={styles.starIcon} />
                                <span className={styles.ratingVal}>
                                    {Number(service.avg_rating).toFixed(1)}
                                </span>
                                {service?.feedback_count ? (
                                    <span className={styles.feedbackCount}>
                                        ({service.feedback_count})
                                    </span>
                                ) : null}
                            </div>
                        ) : (
                            <div className={styles.newBadge}>
                                <span className={styles.pulseDot} />
                                <span>Xizmat</span>
                            </div>
                        )}

                        <div className={styles.priceBadge}>
                            <span className={styles.priceAmount}>
                                {formatCurrencyWithSpace(service?.price)}
                            </span>
                            <span className={styles.priceUnit}>so'm</span>
                        </div>
                    </div>

                    <div className={styles.btns}>
                        <button
                            type="button"
                            disabled={disabled}
                            onClick={handleViewDetails}
                            className={styles.secondaryBtn}>
                            Batafsil
                        </button>

                        <button
                            type="button"
                            disabled={disabled}
                            onClick={handleOrder}
                            className={styles.primaryBtn}>
                            Buyurtma berish
                        </button>
                    </div>
                </div>

                {hasFooter && (
                    <>
                        <div className={styles.divider} />
                        <div className={styles.footer}>
                            <Link
                                href={`/seller/${service?.user?.soff_seller_id}`}>
                                <a className={styles.avatarLink}>
                                    <div className={styles.avatarWrapper}>
                                        <img
                                            src={avatarUrl}
                                            alt=""
                                            width={32}
                                            height={32}
                                            onError={handleAvatarError}
                                            className={styles.userImg}
                                            loading="lazy"
                                        />
                                    </div>
                                </a>
                            </Link>
                            <Link
                                href={`/seller/${service?.user?.soff_seller_id}`}>
                                <a className={styles.username}>
                                    {service?.user?.full_name || 'Sotuvchi'}
                                </a>
                            </Link>
                        </div>
                    </>
                )}
            </div>
            <AuthModal
                slug={service?.slug}
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
};

export default React.memo(ServiceCard);
