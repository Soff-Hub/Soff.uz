import React, { useRef, useState, useEffect } from 'react';
import { Badge, Button, Divider, Skeleton } from 'antd';
import { FaStar } from 'react-icons/fa';
import { IoTimeOutline, IoLocationOutline } from 'react-icons/io5';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ServiceCard from '~/entities/service/service-card';
import { AiOutlineRise } from 'react-icons/ai';
import styles from '../styles/freelancerHorizontalCard.module.scss';
import useResponsive from '~/shared/utilities/useResponsive';
import { FaRegCommentDots } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useTimeManager } from '~/shared/hooks/useTimeManager';

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

const FreelancerHorizontalCard = ({ seller, onCreateChat }) => {
    const { isMobile, isDesktop } = useResponsive();
    const { startTimeout } = useTimeManager();
    const [isCustomServicesLoading, setIsCustomServicesLoading] =
        useState(true);
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

    const services = seller?.services || [];

    const statsList = [
        <div className={styles.statCard}>
            <div className={styles.statCardIcon}>
                <span className={styles.statIcon}>↻</span>
            </div>
            <div className={styles.statCardContent}>
                <span className={styles.statLabel}>Jarayondagi ishlar</span>
                <span className={styles.statValue}>
                    {seller?.progress_jobs_count || 0}
                </span>
            </div>
        </div>,
        <div className={styles.statCard}>
            <div className={styles.statCardIconSuccess}>
                <span className={styles.statIconSuccess}>✓</span>
            </div>
            <div className={styles.statCardContent}>
                <span className={styles.statLabel}>Muvaffaqiyatli ishlar</span>
                <span className={styles.statValueSuccess}>
                    {seller?.completed_orders_count || 0}
                </span>
            </div>
        </div>,
        <div className={styles.statCard}>
            <div className={styles.statCardIconSuccessRate}>
                <AiOutlineRise className={styles.statIconSuccessRate} />
            </div>
            <div className={styles.statCardContent}>
                <span className={styles.statLabel}>Muvaffaqiyat darajasi</span>
                <span className={styles.statValueSuccessRate}>
                    {seller?.success_rate || 0} %
                </span>
            </div>
        </div>,
    ];

    const cardActions = (
        <div className={styles.actions}>
            <Button
                type="default"
                iconPosition="start"
                icon={<FaRegCommentDots />}
                className={styles.messageBtn}
                onClick={() => onCreateChat(seller?.seller_id)}>
                Xabar
            </Button>
            <Link href={`/seller/${seller?.seller_id}`}>
                <a>
                    <Button
                        type="primary"
                        iconPosition="end"
                        icon={<FaArrowRightLong />}
                        className={styles.detailsBtn}>
                        Batafsil
                    </Button>
                </a>
            </Link>
        </div>
    );

    const cardInfo = (
        <>
            <div className={styles.nameRow}>
                <Link href={`/seller/${seller?.seller_id}`}>
                    <a className={styles.name}>{seller?.full_name}</a>
                </Link>
                {/* {seller?.has_service && seller?.has_portfolio && (
                    <span className={styles.verifiedBadge}>Tasdiqlangan</span>
                )} */}
            </div>
            {seller?.position?.title && (
                <p className={styles.position}>{seller?.position?.title}</p>
            )}
            <div className={styles.metaRow}>
                {seller?.average_rating > 0 && (
                    <div className={styles.metaItem}>
                        <FaStar className={styles.metaStar} />
                        <span>
                            {seller?.average_rating} (
                            {seller?.feedbacks_count || 0} ta izoh)
                        </span>
                    </div>
                )}
                {seller?.last_active && (
                    <div className={styles.metaItem}>
                        <IoTimeOutline className={styles.metaIcon} />
                        <span>{formatLastActive(seller?.last_active)}</span>
                    </div>
                )}
                {seller?.location && (
                    <div className={styles.metaItem}>
                        <IoLocationOutline className={styles.metaIcon} />
                        <span>{seller?.location}</span>
                    </div>
                )}
            </div>
        </>
    );

    const handleSwiperInit = (swiper) => {
        setSwiperInstance(swiper);
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    const handleSlideChange = (swiper) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    const displayServices =
        Array.isArray(services) && services.length > 0
            ? services.slice(0, 10)
            : [];

    useEffect(() => {
        if (swiperInstance?.params && prevRef.current && nextRef.current) {
            swiperInstance.params.navigation.prevEl = prevRef.current;
            swiperInstance.params.navigation.nextEl = nextRef.current;
            swiperInstance.navigation.init();
            swiperInstance.navigation.update();
        }
    }, [swiperInstance, displayServices]);

    useEffect(() => {
        if (isCustomServicesLoading) {
            startTimeout(() => {
                setIsCustomServicesLoading(false);
            }, 800);
        }
    }, [isCustomServicesLoading]);

    return (
        <div className={styles.horizontalCard}>
            <div className={styles.cardHeader}>
                <div className={styles.profileSection}>
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
                    <div className={styles.profileInfo}>
                        {isDesktop ? (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                }}>
                                <div>{cardInfo}</div>
                                {isDesktop && cardActions}
                            </div>
                        ) : (
                            cardInfo
                        )}
                        <div className={styles.statsRow}>
                            {statsList.map((stat, index) => (
                                <React.Fragment key={index}>
                                    {stat}
                                    {index < statsList.length - 1 &&
                                        !isMobile && (
                                            <Divider
                                                type="vertical"
                                                className={styles.statDivider}
                                            />
                                        )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
                {!isDesktop && cardActions}
            </div>

            {displayServices.length > 0 ? (
                <div className={styles.servicesSection}>
                    <div className={styles.servicesHeader}>
                        <h4 className={styles.servicesTitle}>Xizmatlar</h4>
                        {displayServices.length ? (
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
                                        isEnd ? styles.navButtonDisabled : ''
                                    }`}
                                    disabled={isEnd}
                                    aria-label="Next">
                                    <IoIosArrowForward />
                                </button>
                            </div>
                        ) : null}
                    </div>
                    <div className={styles.servicesSwiperWrapper}>
                        {isCustomServicesLoading ? (
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '16px',
                                    overflow: 'hidden',
                                    paddingBottom: '10px',
                                }}>
                                {[1, 2, 3, 4].map((_, index) => (
                                    <Skeleton.Button
                                        key={index}
                                        active
                                        style={{
                                            width: '280px',
                                            height: '130px',
                                        }}
                                    />
                                ))}
                            </div>
                        ) : (
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
                                className={`${styles.servicesSwiper} ${
                                    !isEnd && styles.categorySwiperEnding
                                } ${
                                    !isBeginning &&
                                    styles.categorySwiperBeginning
                                }`}>
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
                                {seller.services_length > 3 && (
                                    <SwiperSlide
                                        key="see_more"
                                        className={styles.serviceSlide}>
                                        <div className={styles.card}>
                                            <h3 className={styles.title}>
                                                {seller.services_length} ta
                                                xizmatlar topildi
                                            </h3>
                                            <Link
                                                href={`/seller/${seller?.seller_id}/?tab=service`}>
                                                <a
                                                    className={
                                                        styles.viewAllButton
                                                    }>
                                                    <button
                                                        className={styles.btn}>
                                                        Barchasini ko'rish
                                                    </button>
                                                </a>
                                            </Link>
                                        </div>
                                    </SwiperSlide>
                                )}
                            </Swiper>
                        )}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default FreelancerHorizontalCard;
