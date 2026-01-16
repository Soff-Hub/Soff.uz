import React, { memo, useMemo } from 'react';
import { Button, Badge } from 'antd';
import { FaStar } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';
import Image from 'next/image';
import styles from './style.module.scss';
import { IoTimeOutline, IoLocationOutline } from 'react-icons/io5';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const formatLastActive = (lastActive, t) => {
    if (!lastActive) return t('sellerCard.unknown');
    const last = new Date(lastActive);

    if (isNaN(last.getTime())) return lastActive;

    const now = new Date();
    const diffMinutes = Math.floor((now - last) / 1000 / 60);

    if (diffMinutes < 1) return t('sellerCard.activeNow');
    if (diffMinutes < 60)
        return t('sellerCard.minutesAgo', { count: diffMinutes });
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return t('sellerCard.hoursAgo', { count: diffHours });
    const diffDays = Math.floor(diffHours / 24);
    return t('sellerCard.daysAgo', { count: diffDays });
};

const SearchSellerCard = ({ seller, rankImage }) => {
    const { t } = useTranslation('card');
    const isOnline = useMemo(() => {
        if (!seller?.last_active) return false;
        const lastActiveTime = new Date(seller.last_active);
        const now = new Date();
        const diffMinutes = (now - lastActiveTime) / 1000 / 60;
        return diffMinutes <= 5;
    }, [seller?.last_active]);

    return (
        <div className={styles.card}>
            {rankImage && (
                <div className={styles.rankImageWrapper}>{rankImage}</div>
            )}
            <div className={styles.header}>
                <Badge
                    dot
                    color={isOnline ? 'green' : 'gray'}
                    offset={[-20, 90]}
                    className={styles.badge}>
                    <Image
                        src={seller?.photo_url || '/static/img/ozodbek.png'}
                        alt={seller?.full_name || 'Seller'}
                        width={100}
                        height={100}
                        className={styles.avatar}
                    />
                </Badge>

                <div className={styles.info}>
                    <h3 className={styles.name}>{seller?.full_name}</h3>

                    {seller?.average_rating > 0 && (
                        <div className={styles.ratingBox}>
                            <FaStar className={styles.rate} />
                            <span className={styles.ratingValue}>
                                {seller?.average_rating}
                            </span>
                            <span className={styles.reviewCount}>
                                ({seller?.total_feedbacks_count}{' '}
                                {t('sellerCard.reviews')})
                            </span>
                        </div>
                    )}

                    <p className={styles.position}>
                        {seller?.position?.title ||
                            t('sellerCard.professionNotSpecified')}
                    </p>
                </div>
            </div>

            <div className={styles.extraInfo}>
                <p className={styles.lastActive}>
                    <IoTimeOutline className={styles.iconSmall} />{' '}
                    {formatLastActive(seller?.last_active, t)}
                </p>
                {seller?.location && (
                    <p className={styles.location}>
                        <IoLocationOutline className={styles.iconSmall} />{' '}
                        {seller?.location ||
                            t('sellerCard.locationNotSpecified')}
                    </p>
                )}
            </div>
            <Link href={`/seller/${seller?.soff_seller_id}`}>
                <a>
                    <Button type="primary" className={styles.btn}>
                        {t('sellerCard.details')} <FaArrowRightLong />
                    </Button>
                </a>
            </Link>
        </div>
    );
};

export default memo(SearchSellerCard);
