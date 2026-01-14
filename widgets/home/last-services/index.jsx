import React from 'react';
import styles from './style.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import useResponsive from '~/shared/utilities/useResponsive';
import ServiceCard from '~/entities/service/service-card';
import { useFGet } from '~/shared/hooks/useFApi';
import { LAST_ADDED_SERVICES } from '~/shared/api/end-points';
import { useTranslation } from 'next-i18next';

const LastServices = () => {
    const { t } = useTranslation('index');
    const { isMobile } = useResponsive();
    const { data } = useFGet('last-services', LAST_ADDED_SERVICES);

    const displayedData = React.useMemo(() => {
        if (!data) return [];
        return isMobile ? data : data.slice(0, 5);
    }, [data, isMobile]);

    return (
        <>
            <div className={styles.freelance_section}>
                <div className={styles.freelance_text}>
                    <div className="d-flex gap-2 flex-fill align-items-start">
                        <div className="d-none d-md-flex mt-2">
                            <Image
                                src={'/static/img/star.svg'}
                                width={30}
                                height={30}
                                alt="starts"
                            />
                        </div>
                        <div className={styles.titleWrapper}>
                            <h2 className={styles.labelWrapperH1}>
                                {t('lastServices.title')}
                            </h2>
                            <p className={styles.labelWrapperP}>
                                {t('lastServices.subtitle')}
                            </p>
                        </div>
                    </div>
                </div>
                <Link href="/orders">
                    <a className={styles.freelance_button}>
                        <span>{t('lastServices.allServices')}</span>
                        <img
                            src={'/static/img/arrowwhite.svg'}
                            width={45}
                            height={5}
                            alt="arrow"
                        />
                    </a>
                </Link>
            </div>

            {/* Cardlar */}
            <div className={styles.cardSection}>
                {displayedData.map((item) => (
                    <ServiceCard key={item.id} service={item} />
                ))}
            </div>
        </>
    );
};

export default LastServices;
