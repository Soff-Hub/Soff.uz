import React, { memo, useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { useGet } from '~/repositories/https';
import Link from 'next/link';
import useResponsive from '~/shared/utilities/useResponsive';
import ProductCard from '~/entities/product/product-card';
import { LAST_ADDED_PRODUCTS } from '~/shared/api/end-points';
import { Skeleton } from 'antd';
import { AiOutlineRight } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import { FiFile, FiBox, FiPenTool, FiVideo, FiLayout, FiGlobe } from 'react-icons/fi';

const LastProducts = () => {
    const { isMobile } = useResponsive();
    const sectionRef = useRef(null);
    const limit = isMobile ? 6 : 5;
    const [isVisible, setIsVisible] = useState(false);
    const [animate, setAnimate] = useState();

    const options = {
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
        enabled: isVisible,
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    // API lar
    const { data: fileData, isLoading: fileLoading } = useGet(
        'file_product',
        `${LAST_ADDED_PRODUCTS}?direction=file&limit=${limit}`,
        '',
        options
    );

    const { data: threeDData, isLoading: threeDLoading } = useGet(
        'three_d_product',
        `${LAST_ADDED_PRODUCTS}?direction=3d&limit=${limit}`,
        '',
        options
    );

    const { data: designData, isLoading: designLoading } = useGet(
        'design_product',
        `${LAST_ADDED_PRODUCTS}?direction=design&limit=${limit}`,
        '',
        options
    );

    const { data: videoData, isLoading: videoLoading } = useGet(
        'video_product',
        `${LAST_ADDED_PRODUCTS}?direction=video&limit=${limit}`,
        '',
        options
    );

    const { data: websiteData, isLoading: websiteLoading } = useGet(
        'web_product',
        `${LAST_ADDED_PRODUCTS}?direction=website&limit=${limit}`,
        '',
        options
    );

    const { data: templateData, isLoading: templateLoading } = useGet(
        'templates_product',
        `${LAST_ADDED_PRODUCTS}?direction=template&limit=${limit}`,
        '',
        options
    );

    const data = [
        {
            title: 'Fayllar',
            href: '/scientific-resources/all',
            data: fileData?.results,
            icon: <FiFile />,
        },
        {
            title: '3D moddellar',
            href: '/3d-models-and-interior-designs/all',
            data: threeDData?.results,
            icon: <FiBox />,
        },
        {
            title: 'Dizayn shablonlari',
            href: '/design-developments/all',
            data: designData?.results,
            icon: <FiPenTool />,
        },
        {
            title: 'Video ishlanmalar',
            href: '/video-lessons',
            data: videoData?.results,
            icon: <FiVideo />,
        },
        {
            title: 'Tayyor shablonlar',
            href: '/templates/all',
            data: templateData?.results,
            icon: <FiLayout />,
        },
        {
            title: 'Vebsaytlar',
            href: '/websites/all',
            data: websiteData?.results,
            icon: <FiGlobe />,
        },
    ];

    const isLoading =
        fileLoading ||
        threeDLoading ||
        designLoading ||
        videoLoading ||
        websiteLoading ||
        templateLoading;

    useEffect(() => {
        if (!isLoading && isVisible) {
            const timeout = setTimeout(() => setAnimate(true), 100);
            return () => clearTimeout(timeout);
        }
    }, [isLoading, isVisible]);

    return (
        <section
            ref={sectionRef}
            className={`${styles.wrapper} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.titleWrapper}>
                <img
                    src="/static/img/star.svg"
                    alt="badge"
                    className={styles.badge}
                />
                <h2>So’ngi yuklangan mahsulotlar</h2>
            </div>

            {isLoading && <ProductSkeleton limit={limit} />}

            {!isLoading && (
                <div className={styles.sectionsList}>
                    {data
                        .filter((section) => section.data?.length > 0)
                        .map((section, index) => (
                            <ProductSection
                                key={section.title}
                                isVisible={animate}
                                title={section.title}
                                href={section.href}
                                data={section.data}
                                icon={section.icon}
                                delay={index * 0.2}
                            />
                        ))}
                </div>
            )}
        </section>
    );
};

export default LastProducts;

const ProductSection = memo(({ title, href, data, isVisible, delay, icon }) => (
    <div
        className={`${styles.productBox} ${isVisible ? styles.fadeIn : ''}`}
        style={{ transitionDelay: `${delay}s` }}>
        <div className={styles.titleBox}>
            <Link href={href}>
                <a className={styles.titleLeft}>
                    <span className={styles.iconBadge}>{icon}</span>
                    <h3>{title}</h3>
                    <AiOutlineRight className={styles.chevron} />
                </a>
            </Link>
            <Link href={href}>
                <a className={styles.viewAllLink}>
                    <span>Barchasini ko‘rish</span>
                    <BsArrowRight className={styles.viewAllArrow} />
                </a>
            </Link>
        </div>
        <div className="row px-1 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-gap-4">
            {data?.map((p) => (
                <div key={p.id} className="col px-2">
                    <ProductCard product={p} />
                </div>
            ))}
        </div>
    </div>
));

const ProductSkeleton = memo(({ limit = 5 }) => {
    return (
        <div className="px-2 py-6 mt-4">
            <div className="row px-1 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-gap-4">
                {Array.from({ length: limit * 6 }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        </div>
    );
});

export const SkeletonCard = () => {
    return (
        <div className="col d-flex flex-column">
            <Skeleton.Image
                active
                style={{
                    width: '100%',
                    height: 180,
                    borderRadius: '12px',
                }}
            />
            <Skeleton
                active
                paragraph={{
                    rows: 3,
                    width: ['100%', '100%', '100%'],
                }}
                title={false}
                className="mt-4"
            />
        </div>
    );
};
