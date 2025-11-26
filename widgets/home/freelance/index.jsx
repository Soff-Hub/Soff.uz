import React, { useState, useEffect, useRef } from 'react';
import styles from './style.module.scss';
import cardStyle from './service.module.scss';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';
import { Button, Skeleton } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperController from '~/widgets/navbar-menu/swiperController';
import 'swiper/css';
import { useGetDirectionsQuery } from '~/store/profile/slice';
import { directionsImg } from '~/shared/constants/directions-img';
import { useFGet } from '~/shared/hooks/useFApi';
import SearchSellerCard from '~/entities/seller/search-seller-card';
import useResponsive from '~/shared/utilities/useResponsive';
import { rankingsImg } from '~/shared/constants/rankings-img';

const items = [
    {
        label: 'Ilmiy va Akademik Xizmatlar',
        content_type: 'file',
        images: {
            left: '/static/img/HomePage/file1.webp',
            rightTop: '/static/img/HomePage/file2.webp',
            rightBot: '/static/img/HomePage/file3.webp',
        },
    },
    {
        label: 'Grafik va & UI, UX Dizayn xizmatlari',
        content_type: 'design',
        images: {
            left: '/static/img/HomePage/design1.webp',
            rightTop: '/static/img/HomePage/design3.webp',
            rightBot: '/static/img/HomePage/design2.webp',
        },
    },
    {
        label: 'IT & Dasturlash xizmatlari',
        content_type: 'website',
        images: {
            left: '/static/img/HomePage/web3.webp',
            rightTop: '/static/img/HomePage/web1.webp',
            rightBot: '/static/img/HomePage/web2.webp',
        },
    },
    {
        label: '3D Dizayn va Vizualizatsiya',
        content_type: '3d',
        images: {
            left: '/static/img/HomePage/3d2.webp',
            rightTop: '/static/img/HomePage/3d1.webp',
            rightBot: '/static/img/HomePage/3d3.webp',
        },
    },
];

const title = {
    '3d': '3D Dizayn va Vizualizatsiya',
    website: 'Dasturlash xizmatlari',
    design: 'Dizayn',
    file: 'Ilmiy va Akademik Xizmatlar',
};

const link = {
    '3d': '/orders?direction=three_d',
    website: '/orders?direction=web',
    design: '/orders?direction=dizayn',
    file: '/orders?direction=scientific_work',
};

const ranksImg = [
    rankingsImg['first'],
    rankingsImg['second'],
    rankingsImg['third'],
];

const Freelance = () => {
    return (
        <>
            <TopFreelanceRankings />
            <div className={styles.freelance_section}>
                <div className={styles.freelance_text}>
                    <div className="d-flex  gap-2 flex-fill">
                        <div className="d-none d-md-flex">
                            <img
                                src={'/static/img/star.svg'}
                                width={30}
                                height={30}
                                alt="starts"
                            />
                        </div>
                        <div className={styles.titleWrapper}>
                            <h2 className={styles.labelWrapperH1}>
                                Xizmatni tanlang – Buyurtma bering
                            </h2>

                            <p className={styles.labelWrapperP}>
                                Tajribali frilanserlar bilan ishlang va sifatli
                                natijaga erishing.
                            </p>
                        </div>
                    </div>
                </div>
                <Link href="/orders">
                    <a className={styles.freelance_button}>
                        Barcha xizmatlar
                        <img
                            src={'/static/img/arrowwhite.svg'}
                            sizes="15"
                            alt="arrow"
                        />
                    </a>
                </Link>
            </div>
            <div className={styles.serviceCardSection}>
                {items.map((item) => (
                    <ServiceCard
                        key={item.content_type}
                        content_type={item.content_type}
                        items={item.images}
                    />
                ))}
            </div>
        </>
    );
};

export default Freelance;

const TopFreelanceRankings = () => {
    const { isDesktop, isMobile } = useResponsive();
    const [isEnd, setIsEnd] = useState(false);
    const [isBeginning, setIsBeginning] = useState(true); // Start with true as initial state
    const [swiperController, setSwiperController] = useState(null);
    const [rankingCategory, setRankingCategory] = useState(null);
    const swiperRef = useRef(null);

    const sizesOptions = isDesktop
        ? { size: 'large', gap: 20 }
        : isMobile
        ? { size: 'small', gap: 8 }
        : { size: 'middle', gap: 10 };

    const { data: directions } = useGetDirectionsQuery();
    const {
        data: sellersData,
        isSuccess,
        isLoading,
    } = useFGet(
        ['customer/sellers', rankingCategory],
        `users/freelancers/list/?limit=3&offset=0${
            rankingCategory ? `&direction=${rankingCategory}` : ''
        }`
    );

    const getMethods = (swiperClass) => {
        setSwiperController(swiperClass);
    };

    const setEnding = (status) => {
        setIsEnd(status);
    };
    const setBeginning = (status) => {
        setIsBeginning(status);
    };

    // Function to update swiper state
    const updateSwiperState = (swiper) => {
        if (swiper) {
            setIsEnd(swiper.isEnd);
            setIsBeginning(swiper.isBeginning);
        }
    };

    // Handle swiper initialization
    const handleSwiperInit = (swiper) => {
        // Set initial state
        updateSwiperState(swiper);
    };

    // Handle slide change
    const handleSlideChange = (swiper) => {
        updateSwiperState(swiper);
    };

    const showResults =
        Array.isArray(sellersData?.results) && sellersData?.results?.length;

    let resultsContent = null;
    if (isLoading) {
        resultsContent = (
            <div className="d-flex gap-3" style={{ marginTop: '30px' }}>
                {Array(4)
                    .fill(0)
                    .map((_, i) => (
                        <Skeleton
                            key={i}
                            active
                            className="Search_Results_Wrap_skeleton"
                        />
                    ))}
            </div>
        );
    } else if (showResults) {
        resultsContent = (
            <div
                className={styles.resultsWrapper}
                style={{ marginTop: '30px' }}>
                {sellersData.results.map((item, index) => (
                    <SearchSellerCard
                        seller={{
                            ...item,
                            total_feedbacks_count: item?.feedbacks_count,
                            soff_seller_id: item.seller_id,
                        }}
                        rankImage={ranksImg[index]}
                        key={item?.soff_seller_id}
                    />
                ))}
                <div className={styles.card}>
                    <h3 className={styles.title}>
                        {sellersData?.count} ta frilanser topildi
                    </h3>
                    <Link href="/freelancers">
                        <a className={styles.viewAllButton}>
                            <button className={styles.btn}>
                                Barchasini ko'rish
                            </button>
                        </a>
                    </Link>
                </div>
            </div>
        );
    } else {
        resultsContent = (
            <div>
                <div className="Search_Results_not_found">
                    <img
                        src="/static/img/searchNotFound.png"
                        alt=""
                        className="Search_Results_not_found_img"
                    />
                    <p
                        className="Search_Results_not_found_title"
                        style={{
                            marginTop: '20px',
                            marginBottom: 0,
                        }}>
                        Afsuski, bu yo'nalishda frilanserlar topilmadi.
                    </p>
                </div>
            </div>
        );
    }

    useEffect(() => {
        if (swiperRef.current?.swiper) {
            const swiper = swiperRef.current.swiper;

            // Set initial state
            updateSwiperState(swiper);

            // Add event listeners
            swiper.on('slideChange', () => updateSwiperState(swiper));
            swiper.on('reachEnd', () => setIsEnd(true));
            swiper.on('reachBeginning', () => setIsBeginning(true));
            swiper.on('fromEdge', () => {
                updateSwiperState(swiper);
            });

            // Cleanup function
            return () => {
                swiper.off('slideChange');
                swiper.off('reachEnd');
                swiper.off('reachBeginning');
                swiper.off('fromEdge');
            };
        }
    }, []);

    useEffect(() => {
        if (isSuccess && !rankingCategory) {
            setRankingCategory(directions?.[0]?.value || null);
        }
    }, [isSuccess]);

    return (
        <div className={styles.topFreelanceRankings}>
            <div
                className={styles.freelance_section}
                style={{
                    paddingBottom: '20px',
                }}>
                <div className={styles.freelance_text}>
                    <div className="d-flex gap-2 flex-fill">
                        <div className="d-none d-md-flex">
                            <img
                                src={'/static/img/star.svg'}
                                width={30}
                                height={30}
                                alt="starts"
                            />
                        </div>
                        <div className={styles.titleWrapper}>
                            <h2 className={styles.labelWrapperH1}>
                                Top frilanser va sotuvchilar reytingi
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.swiperContainer}>
                <Button
                    aria-label="previous"
                    size={sizesOptions.size}
                    onClick={() => swiperController?.slidePrev()}
                    style={{
                        display: isBeginning ? 'none' : 'flex',
                    }}
                    className={styles.swipe_btn}
                    disabled={isBeginning}>
                    <IoIosArrowBack />
                </Button>
                <Swiper
                    ref={swiperRef}
                    spaceBetween={sizesOptions.gap}
                    navigation={false}
                    freeMode={true}
                    slidesPerView={'auto'}
                    onSwiper={handleSwiperInit}
                    onSlideChange={handleSlideChange}
                    className={` ${!isEnd && styles.categorySwiperEnding} ${
                        !isBeginning && styles.categorySwiperBeginning
                    }`}>
                    {directions?.map((item) => (
                        <SwiperSlide key={item.value}>
                            <Button
                                icon={directionsImg[item.value]}
                                type="text"
                                size={sizesOptions.size}
                                className={
                                    item.value === rankingCategory
                                        ? styles['categoryButton--selected']
                                        : styles['categoryButton--ordinary']
                                }
                                onClick={() => setRankingCategory(item.value)}>
                                <span className={styles.rankingCardText}>
                                    {item.label}
                                </span>
                            </Button>
                        </SwiperSlide>
                    ))}

                    <SwiperController
                        getMethods={getMethods}
                        setEnding={setEnding}
                        setBeginning={setBeginning}
                    />
                </Swiper>
                <Button
                    aria-label="next"
                    size={sizesOptions.size}
                    style={{
                        display: isEnd ? 'none' : 'flex',
                    }}
                    className={styles.swipeNext}
                    onClick={() => swiperController?.slideNext()}
                    disabled={isEnd}>
                    <IoIosArrowBack />
                </Button>
            </div>
            {resultsContent}
        </div>
    );
};

const ServiceCard = ({ content_type = 'file', items = {} }) => {
    return (
        <Link href={link[content_type]}>
            <a>
                <div className={cardStyle.catalogCard}>
                    <div className={cardStyle.cardImageBlock}>
                        <div
                            className={cardStyle.cardBlockLeft}
                            style={{
                                backgroundImage: `url(${
                                    items.left || '/static/img/not-found.png'
                                })`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                            }}></div>
                        <div className={cardStyle.cardBlockRight}>
                            <div
                                className={cardStyle.cardBlockRightBottom}
                                style={{
                                    backgroundImage: `url(${
                                        items.rightTop ||
                                        '/static/img/not-found.png'
                                    })`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                }}></div>
                            <div
                                className={cardStyle.cardBlockRightBottom}
                                style={{
                                    backgroundImage: `url(${
                                        items.rightBot ||
                                        '/static/img/not-found.png'
                                    })`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                }}></div>
                        </div>
                    </div>
                    <div className="d-flex flex-column flex-fill">
                        <h3 className={cardStyle.cardTile}>
                            {title[content_type]}
                        </h3>
                    </div>
                </div>
            </a>
        </Link>
    );
};
