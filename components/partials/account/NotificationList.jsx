import { Skeleton, Alert } from 'antd';
import Link from 'next/link';
import React, { useEffect, useState, useCallback, memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import GetRepository from '~/reositoriy-admin/GetRepository';
import parse from 'html-react-parser';

export default function NotificationList() {
    const [notification, setNotification] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useSelector((state) => state.auth);

    const getNotification = useCallback(async (token) => {
        setLoading(true);
        setError(null);
        try {
            const response = await GetRepository.getNotificationData(token);
            if (response) {
                setNotification(response.results);
            } else {
                setNotification([]);
            }
        } catch (err) {
            console.error(err);
            setError("Xatolik yuz berdi, qayta urinib ko‘ring!");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (user?.access) {
            getNotification(user.access);
        }
    }, [user?.access, getNotification]);

    // Memoized notification list
    const memoizedNotifications = useMemo(() => (
        notification?.map((el, i) => (
            <Notification
                key={el.id || i}
                notification={el?.notification}
                link={el?.link}
                index={i}
            />
        ))
    ), [notification]);

    return (
        <div className="ps-section--shopping ps-whishlist">
            <div className="container">
                <div className="ps-section__header pb-4">
                    <h1>Bildirishnomalar</h1>
                </div>
                <div className="ps-section__content">
                    {loading ? (
                        Array(3).fill(null).map((_, i) => (
                            <Skeleton key={i} active paragraph={{ rows: 2 }} className="mb-3" />
                        ))
                    ) : error ? (
                        <Alert message={error} type="error" showIcon />
                    ) : notification?.length > 0 ? (
                        <div className="text-start">{memoizedNotifications}</div>
                    ) : (
                        <Alert message="Yangiliklar hozircha yo‘q!" type="warning" showIcon />
                    )}
                </div>
            </div>
        </div>
    );
}

const Notification = memo(({ notification, link, index }) => {
    const { title, created_at, body } = notification || {};
    return (
        <div className="border shadow-sm mb-4 bg-success-subtle rounded-4 p-4">
            <div className='d-flex justify-content-between align-items-center mb-2'>
                <h3 className="fs-4 fw-bold mb-2">
                    {index + 1}. {title}{" "}
                </h3>
                <small className="text-muted">
                    {new Date(created_at).toLocaleDateString("uz-UZ")}
                </small>
            </div>

            {body && (
                <p className="m-0 text-dark-emphasis mb-3">
                    {parse(body)}
                </p>
            )}

            {link && (
                <div className="text-end">
                    <Link href={link}>
                        <a target="_blank" className="btn btn-success rounded-pill fs-5 px-4 py-1">
                            Batafsil <i className="fa-solid fa-arrow-right ms-1"></i>
                        </a>
                    </Link>
                </div>
            )}
        </div>
    );
});
