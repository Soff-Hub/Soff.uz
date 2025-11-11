import React, { useEffect, useRef, useState } from 'react';
import styles from "./style.module.scss";
import { useGet } from '~/repositories/https';
import Link from 'next/link';
import { BESTS } from '~/shared/api/end-points';
import { Skeleton } from 'antd';

const Bests = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const queryOptions = {
        enabled: isVisible,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
    };

    const { data: sellers, isLoading: sellersLoading } = useGet(
        "customer/top-seller-statistics",
        BESTS,
        { filter_stats: 'active_sellers', filter_by: "week" },
        queryOptions
    );

    const { data: authors, isLoading: authorsLoading } = useGet(
        "customer/top-seller-statistics",
        BESTS,
        { filter_stats: 'best_seller', filter_by: "week" },
        queryOptions
    );

    const { data: products, isLoading: productsLoading } = useGet(
        "customer/top-seller-statistics",
        BESTS,
        { filter_stats: 'top_product', filter_by: "week" },
        queryOptions
    );

    const isLoading =
        sellersLoading || authorsLoading || productsLoading;

    return (
        <div ref={sectionRef} id='bests' className={styles.bestsWrapper}>
            <div className={styles.titleWrapper}>
                <img src="/static/img/star.svg" alt="badge" className={styles.badge} />
                <h2>Haftaning eng yaxshilari</h2>
            </div>

            {isLoading ? (
                <div className={styles.grid}>
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className={styles.column}>
                            <Skeleton.Input active size="small" style={{ width: "100%", marginBottom: 20 }} />

                            {[...Array(5)].map((_, idx) => (
                                <div key={idx} className={styles.item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Skeleton.Avatar active size={60} shape="circle" />
                                    <Skeleton title={false} active paragraph={{ rows: 2, width: ["100%", "100%"] }} size="small" />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.grid}>
                    {/* Eng faol sotuvchilar */}
                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>Eng faol sotuvchilar</h3>
                        {sellers?.map((item, idx) => (
                            <Link key={item.id || idx} href={`/seller/${item?.id}`}>
                                <div className={styles.item}>
                                    <img
                                        src={item.image || "/static/img/ozodbek.png"}
                                        alt={item.first_name}
                                        className={styles.avatar}
                                    />
                                    <div>
                                        <p className={`${styles.name} p-0`}>
                                            {item.first_name} {item.last_name}
                                        </p>
                                        <p className={styles.infoGreen}>
                                            {item.products_count} mahsulot yuklangan
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Bestseller mualliflari */}
                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>Bestseller mualliflari</h3>
                        {authors?.map((item, idx) => (
                            <Link key={item.id || idx} href={`/seller/${item?.id}`}>
                                <div className={styles.item}>
                                    <img
                                        src={item.image || "/static/img/ozodbek.png"}
                                        alt={item.first_name}
                                        className={styles.avatar}
                                    />
                                    <div>
                                        <p className={styles.name}>
                                            {item.first_name} {item.last_name}
                                        </p>
                                        <p className={styles.info}>
                                            {item.order_count} ta sotuv{" "}
                                            <span className={styles.infoGreen}>
                                                {item.total_amount.toLocaleString()} so’m
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Top mahsulotlar */}
                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>Top mahsulotlar</h3>
                        {products?.map((item, idx) => (
                            <Link key={item.id || idx} href={`/product/${item?.slug}`}>
                                <div className={styles.item}>
                                    <img
                                        src={item.poster || "/static/img/ozodbek.png"}
                                        alt={item.title}
                                        className={styles.avatar}
                                    />
                                    <div>
                                        <p className={styles.name}>{item.title}</p>
                                        <p className={styles.info}>
                                            {item.view_count} ta ko‘rilgan,{" "}
                                            <span className={styles.infoGreen}>
                                                {item.sold_count} ta sotilgan
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )
            }
        </div >
    );
};

export default Bests;
