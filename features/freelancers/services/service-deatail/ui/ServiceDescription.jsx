import React from 'react';
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
import { sanitizeHtml } from '~/shared/utilities/sanitize-html';

const ServiceDescription = ({ description = {}, priceBox = {} }) => {
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
                        {formatCurrencyWithSpace(price)} so'm
                    </span>
                </div>
                <div className={cn('flex', 'items-center', 'gap-2')}>
                    <IoTimeOutline color="rgba(0,0,0,0.5)" />
                    <span className={cn('text-[14px]')}>{days} kun</span>
                </div>
                <div className={cn('flex', 'items-center', 'gap-2')}>
                    <GoPencil color="rgba(0,0,0,0.5)" />
                    <span className={cn('text-[14px]')}>
                        {revisions} ta tahrir
                    </span>
                </div>
            </div>
            <h2>Xizmat tavsifi</h2>
            {descText && (
                <div
                    style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(descText) }}
                />
            )}

            <h3>Boshlash uchun kerak</h3>
            {requirements && (
                <div
                    style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(requirements) }}
                />
            )}
            {file && (
                <>
                    <h3>Xizmat talablari uchun shablon fayl</h3>
                    <Button
                        type="primary"
                        icon={<DownloadOutlined />}
                        href={file}
                        target="_blank"
                        download
                        className={styles.downloadBtn}>
                        Fayllarni yuklab olish
                    </Button>
                </>
            )}
            {serviceItems?.length > 0 && (
                <div className={styles.serviceBox}>
                    <h3>Nimalar kiradi</h3>
                    {serviceItems.map((item, idx) => (
                        <p key={idx} className={styles.serviceItem}>
                            <FaCheck color="green" /> {item.service_item}
                        </p>
                    ))}
                </div>
            )}

            <div className={styles.pricing}>
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
                                Buyurtma berish (
                                {formatCurrencyWithSpace(price)}so'm)
                            </Button>
                        </div>
                    )}
                </ServiceOrderModal>
            </div>
        </div>
    );
};

export default ServiceDescription;
