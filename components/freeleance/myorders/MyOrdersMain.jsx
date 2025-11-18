import React, { useState } from 'react';
import { Button } from 'antd';
import useGetCustomBalance from './myorder/api/useGetCustomBalance';
import TelegramNotification from '~/shared/components/telegram-notlification';
import MyOrderTabs from './myorder/MyOrderTabs';
import BreadCrumb from '~/components/elements/BreadCrumb';
import BalanceWithDrawModal from '~/shared/components/modals/balance-with-draw-modal';
import { useSafeBack } from '~/shared/hooks/useSafeBack';
import { FaMoneyCheck } from 'react-icons/fa';
import SidebarLayout from '~/widgets/sidebar/SidebarLayout';

const MyOrdersMain = () => {
    const { data } = useGetCustomBalance();
    const safeBack = useSafeBack();
    const [open, setOpen] = useState(false);

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

    return (
        <>
            <BreadCrumb
                breacrumb={breadCrumbItems}
                layout="fullwidth"
                fixedToHeader
            />
            <div className="container">
                <div
                    className="navTabsPadding"
                    style={{ margin: '20px 0px', maxWidth: '100%' }}>
                    <TelegramNotification />
                    <div className="order_header">
                        <h1 className="order_title">Mening buyurtmalarim</h1>
                        <Button
                            onClick={() => setOpen(true)}
                            className="order_button">
                            <FaMoneyCheck />
                            Balance -{' '}
                            {Number(data?.wallet || 0).toLocaleString(
                                'en-US'
                            )}{' '}
                            so'm
                        </Button>
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
                                fonsize: 16px;
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
