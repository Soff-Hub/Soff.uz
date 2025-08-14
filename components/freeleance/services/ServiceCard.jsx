import React, { useCallback } from 'react';
import Image from 'next/image'; 
import { useRouter } from 'next/router';

const ServiceCard = ({ product }) => {
    const router = useRouter();

    const goToService = useCallback(() => {
        if (product?.slug) router.push(`/service/${product.slug}`);
    }, [product?.slug, router]);

    const goToSeller = useCallback((e) => {
        e?.stopPropagation();
        if (product?.user?.id) router.push(`/_seller/${product.user.id}#about_author`);
    }, [product?.user?.id, router]);

    const handleLike = useCallback((e) => {
        e.stopPropagation(); 

    }, []);

    const formattedPrice = product?.price
        ? new Intl.NumberFormat('ru-RU').format(product.price)
        : '—';

    return (
        <article
            className="Services_card"
            role="article"
            aria-label={product?.title || 'Service'}
            onClick={goToService}
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') goToService(); }}
        >
            <button
                type="button"
                className="likeBtn"
                aria-pressed="false"
                aria-label="Sevimlilarga qo'shish"
                onClick={handleLike}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" fill="none" aria-hidden>
                    <rect x="0.1875" y="0.176758" width="24.4023" height="24.4023" rx="12.2011" fill="white" />
                    <path d="M19.3134 7.70788C..." fill="#00A44F" />
                </svg>
            </button>

            <div style={{ cursor: 'pointer' }}>
                {product?.poster ? (
                    <Image
                        src={product.poster}
                        alt={product.title || 'service image'}
                        width={640}
                        height={500}
                        className="Search_Results_Services_card_img"
                        priority={false}
                    />
                ) : (
                    <img
                        className="Search_Results_Services_card_img"
                        src="/static/img/default-service.png"
                        alt={product.title || 'service image'}
                        loading="lazy"
                        decoding="async"
                    />
                )}
            </div>

            <div className="Search_Results_Services_card_body">
                <div
                    className="Search_Results_Services_card_infoPerson"
                    role="link"
                    tabIndex={0}
                    onClick={goToSeller}
                    onKeyDown={(e) => { if (e.key === 'Enter') goToSeller(e); }}
                    aria-label={`Seller ${product?.user?.full_name || ''}`}
                >
                    <img
                        className="Search_Results_Services_card_infoPerson_avatar"
                        src={product?.user?.photo_url || '/static/img/ozodbek.png'}
                        alt={product?.user?.full_name || 'Seller avatar'}
                        loading="lazy"
                        decoding="async"
                    />
                    <p className="Search_Results_Services_card_infoPerson_isname">
                        {product?.user?.full_name || '—'}
                    </p>
                    <img
                        className="Search_Results_Services_card_infoPerson_status"
                        src="/static/img/Ritsar.png"
                        alt=""
                        aria-hidden
                    />
                </div>

                <h3 className="Search_Results_Services_card_title" title={product?.title}>
                    {product?.title}
                </h3>

                <p className="Search_Results_Services_card_price">
                    {formattedPrice} so'm
                </p>
            </div>
        </article>
    );
};

export default React.memo(ServiceCard);
