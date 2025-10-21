import React, { useState } from 'react';
import useGetCustomBalance from './myorder/api/useGetCustomBalance';
import TelegramNotification from '~/shared/components/telegram-notlification';
import MyOrderTabs from './myorder/MyOrderTabs';
import { Button } from 'antd';
import BalanceWithDrawModal from '~/shared/components/modals/balance-with-draw-modal';
import { FaMoneyCheck } from "react-icons/fa";


const MyOrdersMain = () => {
    const { data } = useGetCustomBalance();
    const [ open, setOpen ] = useState(false)

    return (
        <div
            className="navTabsPadding"
            style={{ margin: '40px 0px', maxWidth: '100%' }}>
            <TelegramNotification />
            <div className="order_header">
                <h1 className="order_title">Mening buyurtmalarim</h1>
                <Button
                    onClick={() => setOpen(true)}
                    className="order_button"
                >   
                    <FaMoneyCheck/>
                    Balance -{' '}
                    {Number(data?.wallet || 0).toLocaleString('en-US')} so'm
                </Button>
            </div>
            <MyOrderTabs />

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

                        .order_header{
                            flex-direction: column;
                            gap: 6px;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default MyOrdersMain;
