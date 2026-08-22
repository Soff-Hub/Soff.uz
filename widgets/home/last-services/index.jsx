import React from 'react';
import styles from './style.module.scss';
import Link from 'next/link';
import useResponsive from '~/shared/utilities/useResponsive';
import ServiceCard from '~/entities/service/service-card';
import { useFGet } from '~/shared/hooks/useFApi';
import { LAST_ADDED_SERVICES } from '~/shared/api/end-points';
import { BsArrowRight } from 'react-icons/bs';
import { HiSparkles } from 'react-icons/hi2';

const LastServices = ({ compact = false }) => {
    const { isMobile } = useResponsive();
    const { data, isLoading } = useFGet('last-services', LAST_ADDED_SERVICES);

    const displayedData = React.useMemo(() => {
        if (!data) return [];
        if (isMobile) return data;
        return data.slice(0, compact ? 4 : 5);
    }, [data, isMobile, compact]);

    const count = compact ? 4 : 5;

    return (
        <section className={styles.lastServicesWrapper}>
            <div
                className={`${styles.freelance_section} ${
                    compact ? styles.compact : ''
                }`}>
                <div className={styles.freelance_text}>
                    <div className={styles.headerLeft}>
                        <div className={styles.iconBadge}>
                            <HiSparkles className={styles.sparkleIcon} />
                        </div>
                        <div className={styles.titleWrapper}>
                            <h2 className={styles.labelWrapperH1}>
                                So’ngi ochilgan xizmatlar
                            </h2>
                            <p className={styles.labelWrapperP}>
                                Xizmatni tanlang – Buyurtma bering
                            </p>
                        </div>
                    </div>
                </div>

                <Link href="/orders">
                    <a className={styles.freelance_button}>
                        <span>Barcha xizmatlar</span>
                        <BsArrowRight className={styles.arrowIcon} />
                    </a>
                </Link>
            </div>

            {/* Cardlar / Skeleton */}
            <div
                className={`${styles.cardSection} ${
                    compact ? styles.cardSectionCompact : ''
                }`}>
                {isLoading && (!displayedData || displayedData.length === 0)
                    ? Array(count)
                          .fill(0)
                          .map((_, idx) => (
                              <div key={idx} className={styles.skeletonCard}>
                                  <div className={styles.skeletonTitle} />
                                  <div className={styles.skeletonTitleShort} />
                                  <div className={styles.skeletonMetaRow}>
                                      <div className={styles.skeletonBadge} />
                                      <div className={styles.skeletonPrice} />
                                  </div>
                                  <div className={styles.skeletonBtns}>
                                      <div className={styles.skeletonBtn} />
                                      <div className={styles.skeletonBtnPrimary} />
                                  </div>
                                  <div className={styles.skeletonDivider} />
                                  <div className={styles.skeletonFooter}>
                                      <div className={styles.skeletonAvatar} />
                                      <div className={styles.skeletonName} />
                                  </div>
                              </div>
                          ))
                    : displayedData.map((item) => (
                          <ServiceCard key={item.id} service={item} />
                      ))}
            </div>
        </section>
    );
};

export default LastServices;

