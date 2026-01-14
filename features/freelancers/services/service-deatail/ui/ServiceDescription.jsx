import React from 'react';
import { useTranslation } from 'next-i18next';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import styles from '../styles/detail.module.scss';
import { useSelector } from 'react-redux';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import { FaCheck } from 'react-icons/fa6';
import { AiOutlineDollar } from 'react-icons/ai';
import { IoTimeOutline } from 'react-icons/io5';
import { GoPencil } from 'react-icons/go';
import { cn, useRcn } from '~/shared/utilities/cn';
import { sleep } from '~/shared/utilities/sleep';
import ServiceOrderModal from './ServiceOrderModal';

const ServiceDescription = ({ description = {}, priceBox = {} }) => {
    const { t } = useTranslation('orders');
    const { price, days, revisions, title, category, user } = priceBox;
    const {
        requirements = '',
        file = '',
        serviceItems = [],
        description: descText = '',
    } = description;

    const isBlocked = user[0]?.is_blocked;

    const { isLoggedIn } = useSelector((state) => state.auth);
    const hiddenClass = useRcn({
        mobile: 'flex',
        tablet: 'hidden',
        desktop: 'hidden',
    });

    const flexClass = useRcn({
        mobile: 'block',
        tablet: 'hidden',
        desktop: 'hidden',
    });

    const handleOrderClick = ({ setModalOpen, setAuthOpen }) => {
        if (isLoggedIn) {
            setModalOpen(true);
        } else {
            setAuthOpen(true);
        }
    };

    const handleAuthSuccess = async ({ setModalOpen }) => {
        await sleep(200);
        setModalOpen(true);
    };

    return (
        <div className={styles.serviceDescription}>
            <div className={cn(flexClass)}>
                <h1 className={cn('text-[20px]', 'mb-1')}>{title}</h1>
                <span className={cn('text-secondary', 'text-[14px]')}>
                    {category}
                </span>
            </div>
            <div
                className={cn(
                    'flex',
                    'items-center',
                    'gap-4',
                    'my-4',
                    hiddenClass
                )}>
                <div className={cn('flex', 'items-center', 'gap-2')}>
                    <AiOutlineDollar color="rgba(0,0,0,0.5)" />
                    <span className={cn('text-[14px]')}>
                        {formatCurrencyWithSpace(price)} {t('serviceDetail.serviceDescription.currency')}
                    </span>
                </div>
                <div className={cn('flex', 'items-center', 'gap-2')}>
                    <IoTimeOutline color="rgba(0,0,0,0.5)" />
                    <span className={cn('text-[14px]')}>{days} {t('serviceDetail.serviceDescription.days')}</span>
                </div>
                <div className={cn('flex', 'items-center', 'gap-2')}>
                    <GoPencil color="rgba(0,0,0,0.5)" />
                    <span className={cn('text-[14px]')}>
                        {revisions} {t('serviceDetail.serviceDescription.revisions')}
                    </span>
                </div>
            </div>
            <h2>{t('serviceDetail.serviceDescription.title')}</h2>
            {descText && (
                <div
                    style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}
                    dangerouslySetInnerHTML={{ __html: descText }}
                />
            )}

            <h3>{t('serviceDetail.serviceDescription.requiredToStart')}</h3>
            {requirements && (
                <div
                    style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}
                    dangerouslySetInnerHTML={{ __html: requirements }}
                />
            )}
            {file && (
                <>
                    <h3>{t('serviceDetail.serviceDescription.templateFile')}</h3>
                    <Button
                        type="primary"
                        icon={<DownloadOutlined />}
                        href={file}
                        target="_blank"
                        download
                        className={styles.downloadBtn}>
                        {t('serviceDetail.serviceDescription.downloadFiles')}
                    </Button>
                </>
            )}
            {serviceItems?.length > 0 && (
                <div className={styles.serviceBox}>
                    <h3>{t('serviceDetail.serviceDescription.whatsIncluded')}</h3>
                    {serviceItems.map((item, idx) => (
                        <p key={idx} className={styles.serviceItem}>
                            <FaCheck color="green" /> {item.service_item}
                        </p>
                    ))}
                </div>
            )}

            <div className={styles.pricing}>
                <div className={styles.infoBox}>
                    {/* <p className={styles.info}>
                        <i className="fa-solid fa-clock"></i> {days} kunda
                        yetkazish
                    </p>
                    <p className={styles.info}>
                        <i className="fa-solid fa-pen-to-square"></i>{' '}
                        {revisions} marta tahrirlash huquqi
                    </p> */}
                </div>
                <ServiceOrderModal
                    requirements={requirements}
                    handleAuthSuccess={handleAuthSuccess}
                    order={priceBox}>
                    {({ setAuthOpen, setModalOpen }) => (
                        <div className={styles.btnWrapper}>
                            <Button
                                className={!isBlocked && styles.btn}
                                disabled={isBlocked}
                                onClick={() =>
                                    handleOrderClick({
                                        setAuthOpen,
                                        setModalOpen,
                                    })
                                }>
                                {t('serviceDetail.serviceDescription.placeOrder')}
                                {formatCurrencyWithSpace(price)}{t('serviceDetail.serviceDescription.currency')})
                            </Button>
                        </div>
                    )}
                </ServiceOrderModal>
            </div>
        </div>
    );
};

export default ServiceDescription;
