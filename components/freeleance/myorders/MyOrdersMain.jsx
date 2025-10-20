import React, { useState } from 'react';
import useGetCustomBalance from './myorder/api/useGetCustomBalance';
import TelegramNotification from '~/shared/components/telegram-notlification';
import MyOrderTabs from './myorder/MyOrderTabs';
import { Button } from 'antd';
import BalanceWithDrawModal from '~/shared/components/modals/balance-with-draw-modal';



const MyOrdersMain = () => {
    const { data } = useGetCustomBalance();
    const [ open, setOpen ] = useState(false)

    return (
        <div className='navTabsPadding' style={{ margin: '40px 0px', maxWidth: '100%' }}>
            <TelegramNotification/>
            <div className="d-flex flex-column flex-sm-row align-items-start mb-4 justify-content-between">
                <h1 className="fs-1 m-0">Mening buyurtmalarim</h1>
                <Button
                    onClick={() => setOpen(true)}
                    className="fs-3"
                >
                    Balance -{' '}
                    {Number(data?.wallet || 0).toLocaleString('en-US')} so'm
                </Button>
            </div>
            <MyOrderTabs />

            <BalanceWithDrawModal
                open={open}
                onClose={() => setOpen(false)}
            />
        </div>
    );
};

export default MyOrdersMain;
