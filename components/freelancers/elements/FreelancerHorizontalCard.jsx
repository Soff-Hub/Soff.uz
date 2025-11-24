import React, { useRef, useState, useEffect } from 'react';
import { Badge, Button } from 'antd';
import { FaStar } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';
import { IoTimeOutline, IoLocationOutline } from 'react-icons/io5';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { apiForFreelance } from '~/repositories/api';
import ServiceCard from '~/entities/service/service-card';
import styles from '../styles/freelancerHorizontalCard.module.scss';

const formatLastActive = (lastActive) => {
    if (!lastActive) return "Noma'lum";
    const last = new Date(lastActive);

    if (isNaN(last.getTime())) return lastActive;

    const now = new Date();
    const diffMinutes = Math.floor((now - last) / 1000 / 60);

    if (diffMinutes < 1) return 'Hozir faol';
    if (diffMinutes < 60) return `${diffMinutes} daqiqa oldin`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} soat oldin`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} kun oldin`;
};

const FreelancerHorizontalCard = ({ seller }) => {
    const { push } = useRouter();
    const [swiperInstance, setSwiperInstance] = useState(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const isOnline = React.useMemo(() => {
        if (!seller?.last_active) return false;
        const lastActiveTime = new Date(seller.last_active);
        const now = new Date();
        const diffMinutes = (now - lastActiveTime) / 1000 / 60;
        return diffMinutes <= 5;
    }, [seller?.last_active]);

    const { data: services, isLoading: servicesLoading } = useQuery({
        queryKey: ['seller_services_horizontal', seller?.soff_seller_id],
        queryFn: async () => {
            const response = await apiForFreelance.get(
                `/customer/services/${seller?.soff_seller_id}`
            );
            return response.data;
        },
        enabled: !!seller?.soff_seller_id,
        staleTime: 1000 * 60 * 5,
    });

    const handleSwiperInit = (swiper) => {
        setSwiperInstance(swiper);
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    const handleSlideChange = (swiper) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    useEffect(() => {
        if (swiperInstance?.params && prevRef.current && nextRef.current) {
            swiperInstance.params.navigation.prevEl = prevRef.current;
            swiperInstance.params.navigation.nextEl = nextRef.current;
            swiperInstance.navigation.init();
            swiperInstance.navigation.update();
        }
    }, [swiperInstance, displayServices]);

    const displayServices =
        Array.isArray(services) && services.length > 0
            ? services.slice(0, 10)
            : [];

    return (
        <div className={styles.horizontalCard}>
            <div className={styles.cardHeader}>
                <div className={styles.profileSection}>
                    <Badge
                        dot
                        color={isOnline ? 'green' : 'gray'}
                        offset={[-8, 8]}
                        className={styles.badge}>
                        <Image
                            src={seller?.photo_url || '/static/img/ozodbek.png'}
                            alt={seller?.full_name || 'Seller'}
                            width={100}
                            height={100}
                            className={styles.avatar}
                        />
                    </Badge>
                    <div className={styles.profileInfo}>
                        <div className={styles.nameRow}>
                            <h3 className={styles.name}>{seller?.full_name}</h3>
                            {seller?.is_verified && (
                                <span className={styles.verifiedBadge}>
                                    Tasdiqlangan
                                </span>
                            )}
                        </div>
                        {seller?.position?.title && (
                            <p className={styles.position}>
                                {seller?.position?.title}
                            </p>
                        )}
                        {(seller?.in_progress_orders_count !== undefined ||
                            seller?.completed_orders_count !== undefined ||
                            seller?.failed_orders_count !== undefined) && (
                            <div className={styles.statsRow}>
                                {seller?.in_progress_orders_count !==
                                    undefined && (
                                    <div className={styles.statCard}>
                                        <div className={styles.statCardIcon}>
                                            <span className={styles.statIcon}>
                                                ↻
                                            </span>
                                        </div>
                                        <div className={styles.statCardContent}>
                                            <span className={styles.statValue}>
                                                {seller?.in_progress_orders_count ||
                                                    0}
                                            </span>
                                            <span className={styles.statLabel}>
                                                Jarayondagi ishlar
                                            </span>
                                        </div>
                                    </div>
                                )}
                                {seller?.completed_orders_count !==
                                    undefined && (
                                    <div className={styles.statCard}>
                                        <div
                                            className={
                                                styles.statCardIconSuccess
                                            }>
                                            <span
                                                className={
                                                    styles.statIconSuccess
                                                }>
                                                ✓
                                            </span>
                                        </div>
                                        <div className={styles.statCardContent}>
                                            <span
                                                className={
                                                    styles.statValueSuccess
                                                }>
                                                {seller?.completed_orders_count ||
                                                    0}
                                            </span>
                                            <span className={styles.statLabel}>
                                                Muvaffaqiyatli ishlar
                                            </span>
                                        </div>
                                    </div>
                                )}
                                {seller?.failed_orders_count !== undefined && (
                                    <div className={styles.statCard}>
                                        <div
                                            className={
                                                styles.statCardIconFailed
                                            }>
                                            <span
                                                className={
                                                    styles.statIconFailed
                                                }>
                                                ✗
                                            </span>
                                        </div>
                                        <div className={styles.statCardContent}>
                                            <span
                                                className={
                                                    styles.statValueFailed
                                                }>
                                                {seller?.failed_orders_count ||
                                                    0}
                                            </span>
                                            <span className={styles.statLabel}>
                                                Muvaffaqiyatsiz ishlar
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        <div className={styles.metaRow}>
                            {seller?.average_rating > 0 && (
                                <div className={styles.metaItem}>
                                    <FaStar className={styles.metaStar} />
                                    <span>
                                        {seller?.average_rating} (
                                        {seller?.completed_orders_count || 0} ta
                                        izoh)
                                    </span>
                                </div>
                            )}
                            {seller?.last_active && (
                                <div className={styles.metaItem}>
                                    <IoTimeOutline
                                        className={styles.metaIcon}
                                    />
                                    <span>
                                        {formatLastActive(seller?.last_active)}
                                    </span>
                                </div>
                            )}
                            {seller?.location && (
                                <div className={styles.metaItem}>
                                    <IoLocationOutline
                                        className={styles.metaIcon}
                                    />
                                    <span>{seller?.location}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.actions}>
                    <Button
                        type="default"
                        className={styles.messageBtn}
                        onClick={() =>
                            push(`/seller/${seller?.soff_seller_id}`)
                        }>
                        Xabar
                    </Button>
                    <Link href={`/seller/${seller?.soff_seller_id}`}>
                        <a>
                            <Button
                                type="primary"
                                className={styles.detailsBtn}>
                                Batafsil
                            </Button>
                        </a>
                    </Link>
                </div>
            </div>

            {servicesLoading ? (
                <div className={styles.servicesSection}>
                    <div className={styles.servicesHeader}>
                        <h4 className={styles.servicesTitle}>Xizmatlar</h4>
                    </div>
                    <div className={styles.servicesLoading}>Yuklanmoqda...</div>
                </div>
            ) : displayServices.length > 0 ? (
                <>
                    <div className={styles.servicesSection}>
                        <div className={styles.servicesHeader}>
                            <h4 className={styles.servicesTitle}>Xizmatlar</h4>
                            {displayServices.length > 3 && (
                                <div className={styles.servicesNavigation}>
                                    <button
                                        ref={prevRef}
                                        className={`${styles.navButton} ${
                                            isBeginning
                                                ? styles.navButtonDisabled
                                                : ''
                                        }`}
                                        disabled={isBeginning}
                                        aria-label="Previous">
                                        <IoIosArrowBack />
                                    </button>
                                    <button
                                        ref={nextRef}
                                        className={`${styles.navButton} ${
                                            isEnd
                                                ? styles.navButtonDisabled
                                                : ''
                                        }`}
                                        disabled={isEnd}
                                        aria-label="Next">
                                        <IoIosArrowForward />
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className={styles.servicesSwiperWrapper}>
                            <Swiper
                                modules={[Navigation]}
                                spaceBetween={16}
                                slidesPerView="auto"
                                navigation={{
                                    prevEl: prevRef.current,
                                    nextEl: nextRef.current,
                                }}
                                onSwiper={handleSwiperInit}
                                onSlideChange={handleSlideChange}
                                className={styles.servicesSwiper}>
                                {displayServices.map((service) => (
                                    <SwiperSlide
                                        key={service.id}
                                        className={styles.serviceSlide}>
                                        <div
                                            className={
                                                styles.serviceCardWrapper
                                            }>
                                            <ServiceCard
                                                service={service}
                                                hasFooter={false}
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default FreelancerHorizontalCard;
