import Link from 'next/link';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import GetRepository from '~/reositoriy-admin/GetRepository';
var parse = require('html-react-parser');

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
    }, [user?.access]);


    return (
        <div className="ps-section--shopping ps-whishlist">
            <div className="container">
                <div className="ps-section__header">
                    <h1>Yangiliklar</h1>
                </div>
                <div className="ps-section__content">
                    {notification?.length ? (
                        <div className="text-start">{
                            notification?.map((el, i) => <div key={el?.notification?.title} >
                                <h3>{i + 1}. {" "} {el?.notification?.title}  <span style={{ fontSize: '16px', color: '#999' }} > | {el?.notification?.created_at} |  {el?.link && <Link href={`${el?.link}`} ><a className='text-success'>Batafsil <i className="fa-solid fa-hand-point-right mx-2"></i></a></Link>}

                                </span>   </h3>
                                <p>{el?.notification?.body && parse(el?.notification?.body)}</p>

                                <hr />
                            </div>)
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
