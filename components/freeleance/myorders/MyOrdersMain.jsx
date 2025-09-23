import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Loader from '~/components/shared/loader';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../shared/api/freeleanceApi';
import useGetCustomBalance from './myorder/api/useGetCustomBalance';
import TelegramNotification from '~/shared/components/telegram-notlification';

// MyOrderTabs faqat client-side'da yuklanadi
const MyOrderTabs = dynamic(() => import('./myorder/MyOrderTabs'), {
    ssr: false,
    loading: () => <Loader />, // ixtiyoriy: loading paytida ko‘rsatish uchun
});

const MyOrdersMain = () => {
    const { data } = useGetCustomBalance();

    return (
        <div className='navTabsPadding' style={{ margin: '40px 0px', maxWidth: '100%' }}>
            <TelegramNotification/>
            <div className="d-flex flex-column flex-sm-row align-items-start mb-4 justify-content-between">
                <h1 className="fs-1 m-0">Mening buyurtmalarim</h1>
                <span className="fs-3">
                    Balance -{' '}
                    {Number(data?.wallet || 0).toLocaleString('en-US')} so'm
                </span>
            </div>
            <MyOrderTabs />
        </div>
    );
};

export default MyOrdersMain;
