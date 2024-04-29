import { Alert, Table } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import GetRepository from '~/reositoriy-admin/GetRepository';
var parse = require('html-react-parser');

export default function DonateList() {
    const [donate, setDonate] = useState(null);
    const { user } = useSelector((state) => state.auth);

    const getDonate = async (token) => {
        const respons = await GetRepository.getDonateList(token);
        if (respons) {
            setDonate(respons?.results);
        }
    };

    useEffect(() => {
        if (user?.access) {
            getDonate(user?.access);
        }
    }, [user?.access]);

    console.log('donate list', donate);

    const columnsDonate = [
        {
            title: 'Ismi',
            dataIndex: 'sponsor_info',
            key: 'sponsor_info',
            render: (sponsor_info) => (
                <div className="d-flex flex-column">
                    <span className="truncate whitespace-nowrap">
                        {sponsor_info}
                    </span>
                </div>
            ),
        },
        {
            title: 'Miqdori',
            dataIndex: 'amount_paid',
            key: 'amount_paid',
            render: (amount_paid) => (
                <div className="d-flex flex-column">
                    <span className="truncate whitespace-nowrap">
                        {amount_paid}
                    </span>
                </div>
            ),
        },
        {
            title: 'Yuborilgan sana',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at) => (
                <div className="d-flex flex-column">
                    <span className="truncate whitespace-nowrap">
                        {created_at}
                    </span>
                </div>
            ),
        },
        {
            title: 'Tavsif',
            dataIndex: 'description',
            key: 'description',
            render: (description) => (
                <div className="d-flex flex-column">
                    <span className="truncate whitespace-nowrap">
                        {description}
                    </span>
                </div>
            ),
        },
    ];

    return (
        <div className="ps-section--shopping ps-whishlist">
            <div className="container">
                <div className="ps-section__header m-0 p-0 mb-5">
                    <h2>Qo'llab quvvatlaganlar</h2>
                    <p>
                        <Alert type='info' message="Bu yerda siz ulashgan ishlaringizni ko'rgan Soff.uz foydalanuvchilari, qo'llab quvvatlash maqsadida pul o'tkazmalarini amalga oshirganliklarini ko'rishingiz mumkin" >
                            Bu yerda siz ulashgan ishlaringizni ko'rgan Soff.uz foydalanuvchilari, qo'llab quvvatlash maqsadida pul o'tkazmalarini amalga oshirganliklarini ko'rishingiz mumkin
                        </Alert>
                    </p>
                </div>

                <div className="ps-section__content">
                    {donate?.length > 0 ? (
                        <Table
                            scroll={{ x: 1150 }}
                            dataSource={donate}
                            columns={columnsDonate}
                            pagination={false}
                        />
                    ) : (
                        <div className="alert alert-danger text-center" role="alert">
                            Qo'llab quvvatlaganlar hozircha yo'q!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
