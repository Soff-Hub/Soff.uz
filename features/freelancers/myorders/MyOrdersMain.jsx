import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import useGetCustomBalance from './myorder/api/useGetCustomBalance';
import TelegramNotification from '~/shared/components/telegram-notlification';
import MyOrderTabs from './myorder/MyOrderTabs';
import BreadCrumb from '~/shared/ui/breadcrumb';
import BalanceWithDrawModal from '~/shared/components/modals/balance-with-draw-modal';
import { useSafeBack } from '~/shared/hooks/useSafeBack';
import { useViewportContext } from '~/shared/hooks/useViewportContext';
import { FaMoneyCheck } from 'react-icons/fa';
import SidebarLayout from '~/widgets/sidebar/SidebarLayout';
import styles from './style.module.scss';

const MyOrdersMain = () => {
    const { data } = useGetCustomBalance();
    const safeBack = useSafeBack();
    const { headerHeight } = useViewportContext();
    const [open, setOpen] = useState(false);
    const [showStickyButton, setShowStickyButton] = useState(false);
    const buttonRef = useRef(null);
    const observerRef = useRef(null);

    const breadCrumbItems = [
        {
            url: '/',
            text: 'Oldingi sahifa',
            action: safeBack,
        },
        {
            key: 'current',
            text: 'Mening buyurtmalarim',
        },
    ];

    useEffect(() => {
        if (!buttonRef.current) return;

        // Create intersection observer
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Show sticky button when original button is not intersecting (scrolled out of view)
                    setShowStickyButton(!entry.isIntersecting);
                });
            },
            {
                threshold: 0,
                rootMargin: '0px',
            }
        );

        observerRef.current.observe(buttonRef.current);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    return (
        <>
            <BreadCrumb
                breacrumb={breadCrumbItems}
                layout="fullwidth"
                fixedToHeader
            />
            <div
                className={`${styles.stickyButtonContainer} ${
                    showStickyButton ? styles.visible : ''
                }`}
                style={{ top: `${headerHeight + 15}px` }}>
                <Button
                    onClick={() => setOpen(true)}
                    className={styles.stickyButton}>
                    <FaMoneyCheck />
                    Balance -{' '}
                    {Number(data?.wallet || 0).toLocaleString('en-US')} so'm
                </Button>
            </div>
            <div className="container">
                <div
                    className="navTabsPadding"
                    style={{ margin: '20px 0px', maxWidth: '100%' }}>
                    <TelegramNotification />
                    <div className="order_header">
                        <h1 className="order_title">Mening buyurtmalarim</h1>
                        <div ref={buttonRef}>
                            <Button
                                onClick={() => setOpen(true)}
                                className={styles.orderButton}>
                                <FaMoneyCheck />
                                Balance -{' '}
                                {Number(data?.wallet || 0).toLocaleString(
                                    'en-US'
                                )}{' '}
                                so'm
                            </Button>
                        </div>
                    </div>
                    <SidebarLayout>
                        <MyOrderTabs />
                    </SidebarLayout>

                    <BalanceWithDrawModal
                        open={open}
                        onClose={() => setOpen(false)}
                    />

                    <style jsx>
                        {`
                            .order_header {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                margin-bottom: 24px;
                            }

                            .order_title {
                                font-size: 32px;
                                font-weight: 600;
                                margin-bottom: 0px;
                            }

                            .order_button {
                                font-size: 16px;
                            }

                            @media (max-width: 576px) {
                                .order_title {
                                    font-size: 20px;
                                }

                                .order_header {
                                    flex-direction: column;
                                    gap: 6px;
                                }
                            }
                        `}
                    </style>
                </div>
            </div>
        </>
    );
};

export default MyOrdersMain;
