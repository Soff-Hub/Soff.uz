import React, { useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './ServiceCard.module.scss';

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

const ServiceCard = ({ product }) => {
    const router = useRouter();

    const goToService = useCallback(() => {
        if (!isValidSlug(product?.slug)) {
            console.error(
                'Invalid product slug for navigation:',
                product?.slug
            );
            return;
        }
        router.push(`/service/${product.slug}`);
    }, [product?.slug, router]);

    const goToSeller = useCallback(
        e => {
            e?.stopPropagation();
            if (product?.user?.id && product?.user?.soff_seller_id) {
                router.push(
                    {
                        pathname: `/seller/[pid]`,
                        query: { pid: product.user.soff_seller_id },
                    },
                    `/seller/${product.user.soff_seller_id}`,
                    { shallow: true }
                );
            }
        },
        [product?.user?.id, product?.user?.soff_seller_id, router]
    );

    const handleLike = useCallback(e => {
        e.stopPropagation();
    }, []);

    const formattedPrice = product?.price
        ? new Intl.NumberFormat('ru-RU').format(product.price)
        : '—';

    // Don't render if product or slug is invalid
    if (!product || !isValidSlug(product?.slug)) {
        console.warn('ServiceCard: Invalid product data or slug', product);
        return null;
    }

    return (
        <article
            className={styles.card}
            role="article"
            aria-label={product?.title || 'Service'}
            onClick={goToService}
            tabIndex={0}
            onKeyDown={e => {
                if (e.key === 'Enter') goToService();
            }}>
            <button
                type="button"
                className={styles.likeBtn}
                aria-pressed="false"
                aria-label="Sevimlilarga qo'shish"
                onClick={handleLike}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 25 25"
                    fill="none"
                    aria-hidden>
                    <rect
                        x="0.1875"
                        y="0.176758"
                        width="24.4023"
                        height="24.4023"
                        rx="12.2011"
                        fill="white"
                    />
                    <path d="M19.3134 7.70788C..." fill="#00A44F" />
                </svg>
            </button>

            <div>
                {product?.poster ? (
                    <Image
                        src={product.poster}
                        alt={product.title || 'service image'}
                        width={640}
                        height={500}
                        className={styles.img}
                        priority={false}
                    />
                ) : (
                    <img
                        className={styles.img}
                        src="/static/img/default-service.png"
                        alt={product.title || 'service image'}
                        loading="lazy"
                        decoding="async"
                    />
                )}
            </div>

            <div className={styles.body}>
                <h3 className={styles.title} title={product?.title}>
                    {product?.title}
                </h3>

                <p className={styles.price}>{formattedPrice} so'm</p>

                <div
                    className={styles.seller}
                    role="link"
                    tabIndex={0}
                    onClick={goToSeller}
                    onKeyDown={e => {
                        if (e.key === 'Enter') goToSeller(e);
                    }}
                    aria-label={`Seller ${product?.user?.full_name || ''}`}>
                    <img
                        className={styles.seller_avatar}
                        src={
                            product?.user?.photo_url ||
                            '/static/img/ozodbek.png'
                        }
                        alt={product?.user?.full_name || 'Seller avatar'}
                        loading="lazy"
                        decoding="async"
                    />
                    <p className={styles.seller_name}>
                        {product?.user?.full_name || '—'}
                    </p>
                </div>
            </div>
        </article>
    );
};

export default React.memo(ServiceCard);
