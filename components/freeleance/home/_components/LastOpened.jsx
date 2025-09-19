import React from 'react';
import styles from '../styles/LastOpened.module.scss';
import useLastOpened from '../../chat/api/useLastOpened';
import Image from 'next/image';
import Link from 'next/link';
import ServiceCard from '../../services/service-card';
import useResponsive from '~/utilities/useResponsive';

const LastOpened = () => {
    const { data } = useLastOpened();
    const { isMobile } = useResponsive();

    // data ni moslashtiramiz
    const displayedData = React.useMemo(() => {
        if (!data) return [];
        return isMobile ? data : data.slice(0, 5);
    }, [data, isMobile]);

    return (
        <>
            <div className={styles.freelance_section}>
                <div className={styles.freelance_text}>
                    <div className="d-flex gap-2 flex-fill align-items-start">
                        <div className="d-none d-md-flex ">
                            <Image
                                src={'/static/img/star.svg'}
                                width={30}
                                height={30}
                                alt="starts"
                            />
                        </div>
                        <div className={styles.titleWrapper}>
                            <h1 className={styles.labelWrapperH1}>
                                So’ngi ochilgan xizmatlar
                            </h1>
                            <p className={styles.labelWrapperP}>
                                Xizmatni tanlang – Buyurtma bering
                            </p>
                        </div>
                    </div>
                </div>
                <Link href="/orders">
                    <button className={styles.freelance_button}>
                        <span>Barcha xizmatlar</span>
                        <img
                            src={'/static/img/arrowwhite.svg'}
                            width={45}
                            height={5}
                            alt="arrow"
                        />
                    </button>
                </Link>
            </div>

            {/* Cardlar */}
            <div className={styles.cardSection}>
                {displayedData.map(item => (
                    <ServiceCard key={item.id} service={item} />
                ))}
            </div>
        </>
    );
};

export default LastOpened;
