import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import GetRepository from '~/reositoriy-admin/GetRepository';

export default function NotificationList() {
    const [notification, setNotification] = useState(null);
    const { user } = useSelector((state) => state.auth);

    const getNotification = async (token) => {
        const respons = await GetRepository.getNotificationData(token);
        if (respons) {
            setNotification(respons.results);
        }
    };

    useEffect(() => {
        if (user?.access) {
            getNotification(user?.access);
        }
    }, []);

    return (
        <div className="ps-section--shopping ps-whishlist">
            <div className="container">
                <div className="ps-section__header">
                    <h1>Yangiliklar</h1>
                </div>
                <div className="ps-section__content">
                    {notification?.length ? (
                        <div className="text-center">{
                            notification?.map((el) => <div>{el}</div>)
                        }</div>
                    ) : (
                        <div className="alert alert-danger" role="alert">
                            Yangiliklar hozircha yo'q!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
