import React, { useCallback, useState } from 'react';
import styles from './style.module.scss';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import AuthModal from '~/components/AuthModal';
import { useRouter } from 'next/router';
import { StarFilled } from '@ant-design/icons';

// Helper function to validate slug
const isValidSlug = slug => {
    return (
        slug &&
        typeof slug === 'string' &&
        slug.trim().length > 0 &&
        slug !== 'undefined' &&
        slug !== 'null'
    );
};

const ServiceCard = ({ service, hasFooter = true }) => {
    const { isLoggedIn } = useSelector(state => state.auth);
    const [open, setOpen] = useState(false);
    const { push } = useRouter();

    const handleOrder = useCallback(() => {
        if (!isValidSlug(service?.slug)) {
            console.error('Invalid service slug for order:', service?.slug);
            return;
        }

        if (isLoggedIn) {
            push(`/service/${service.slug}?paymodal=open`);
        } else {
            setOpen(true);
        }
    }, [isLoggedIn, push, service?.slug]);

    const handleViewDetails = useCallback(() => {
        if (!isValidSlug(service?.slug)) {
            console.error('Invalid service slug for details:', service?.slug);
            return;
        }
        push(`/service/${service.slug}`);
    }, [service?.slug]);

    // Don't render if service or slug is invalid
    if (!service || !isValidSlug(service?.slug)) {
        console.warn('ServiceCard: Invalid service data or slug', service);
        return null;
    }

    return (
        <>
            <div className={styles.card}>
                <div className={styles.cardBody}>
                    <Link href={`/service/${service.slug}`}>
                        <a>
                            <h1 className={styles.cardTitle}>
                                {service?.title}
                            </h1>
                        </a>
                    </Link>
                    <div className="d-flex justify-content-between align-items-center">
                        {service?.avg_rating !== 0 && service?.avg_rating ? (
                            <div className="d-flex gap-2 align-items-center">
                                <StarFilled
                                    style={{
                                        fontSize: '16px',
                                        color: '#faad14',
                                    }}
                                />
                                <span
                                    style={{
                                        fontSize: '16px',
                                        color: '#faad14',
                                    }}>
                                    {Number(service?.avg_rating).toFixed(1)}
                                </span>
                                <span>({service?.feedback_count} izoh)</span>
                            </div>
                        ) : (
                            <div></div>
                        )}
                        <h3 className={styles.price}>
                            {formatCurrencyWithSpace(service?.price)} so'm
                        </h3>
                    </div>
                    <div className={styles.btns}>
                        <button
                            onClick={handleViewDetails}
                            className={styles.secondaryBtn}>
                            Batafsil
                        </button>

                        <button
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
                                <a>
                                    <img
                                        className={styles.userImg}
                                        src={
                                            service?.user?.photo_url ||
                                            '/static/img/ozodbek.png'
                                        }
                                        alt="user_img"
                                    />
                                </a>
                            </Link>
                            <Link
                                href={`/seller/${service?.user?.soff_seller_id}`}>
                                <a className={styles.username}>
                                    {service?.user?.full_name}
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
