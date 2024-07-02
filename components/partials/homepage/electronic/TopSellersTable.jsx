import { Table } from 'antd';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import PostRepository from '~/repositories/PostRepository';

function checkIfUserIsOnline(lastVisit) {
    const currentTime = new Date();
    const lastVisitTime = new Date(lastVisit);
    const fiveMinutesAgo = new Date(currentTime.getTime() - 5 * 60000); // 5 daqiqa oldingi vaqtni hisoblash

    return lastVisitTime >= fiveMinutesAgo;
}


export default function TopSellersTable() {
    const [sellerData, setSellerData] = useState([]);
    const [search, setSearch] = useState('');
    const [select, setSelect] = useState('');
    const getTopSeller = async () => {
        const ItemsData = await PostRepository.getTopSeller('');
        if (ItemsData) {
            setSellerData(ItemsData?.data?.results);
        }
    };
    const options = [];
    for (let i = 10; i < 36; i++) {
        options.push({
            value: i.toString(36) + i,
            label: i.toString(36) + i,
        });
    }

    function addPeriodToThousands(number) {
        const numStr = String(number);

        const [integerPart, decimalPart] = numStr.split('.');

        const formattedIntegerPart = integerPart.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ' '
        );

        const formattedNumber =
            decimalPart !== undefined
                ? `${formattedIntegerPart}`
                : formattedIntegerPart;

        return formattedNumber;
    }

    useEffect(() => {
        getTopSeller();
    }, []);




    const columns = [
        {
            title: 'Sotuvchi',
            dataIndex: 'seller',
            key: 'name',
            render: (seller) => (
                <div className="d-flex gap-5 align-items-center">
                    <div className="text-center" style={{ position: "relative" }}>
                        <Link href={`seller/${seller?.id}`} >
                            <a >

                                <img
                                    alt="soff"
                                    src={seller?.image ? seller?.image : "/static/img/ozodbek.png"}
                                    className="profile__image-client-top-seller"
                                />

                                <span>{checkIfUserIsOnline(seller?.last_login) ?
                                    <i className="fa-solid fa-circle text-success fs-5" style={{ position: "absolute", bottom: "-42%", right: "3%" }}></i> :
                                    <i className="fa-solid fa-circle text-secondary  fs-5" style={{ position: "absolute", bottom: "-42%", right: "3%" }}></i>

                                }</span>

                            </a>
                        </Link>
                    </div>
                    <div className="truncate whitespace-nowrap d-flex align-items-center fs-3">
                        <Link href={`seller/${seller?.id}`}>
                            <a> {seller?.full_name}</a>
                        </Link>
                    </div>
                </div>
            ),
        },
        {
            title: 'Jami mahsulotlar soni',
            dataIndex: 'total_approved_documents',
            key: 'address',
            // width: 300,
            render: (total_approved_documents) => (
                <span className="fs-3 text-center d-block">
                    {' '}
                    {total_approved_documents} ta
                </span>
            ),
        },
        {
            title: 'Sotilgan mahsulotlar soni',
            dataIndex: 'total_sold_documents',
            key: 'address',
            // width: 300,
            render: (total_sold_documents) => (
                <span className="fs-3 text-center d-block">
                    {' '}
                    {total_sold_documents} ta
                </span>
            ),
        },
        {
            title: 'Daromad',
            dataIndex: 'total_income',
            key: 'address',
            // width: 300,
            render: (total_income) => (
                <div className="d-block fs-3 text-center fw-bold">
                    <span> {addPeriodToThousands(total_income)} so'm</span>
                </div>
            ),
        },
    ];

    const getSearch = async (e) => {
        setSearch(e);
        const ItemsData = await PostRepository.getTopSeller(e, select);
        if (ItemsData) {
            setSellerData(ItemsData?.data?.results);
        }
    };

    const handleSelect = async (value) => {
        const ItemsData = await PostRepository.getTopSeller(
            search,
            value.target.value
        );
        if (ItemsData) {
            setSellerData(ItemsData?.data?.results);
        }
    };

    return (
        <div className="top-sellers">
            <div className="top-sellers-filter">
                <label className="category-search-label">
                    <i className="fa-solid fa-magnifying-glass search-label"></i>
                    <input
                        width="100%"
                        className="ps-input"
                        type="text"
                        placeholder="Qidiruv..."
                        onChange={(e) => getSearch(e.target.value)}
                    />
                </label>
                <select
                    className="ps-select form-control select2"
                    style={{ backgroundColor: '#fff' }}
                    data-placeholder="Sort Items"
                    onChange={(e) => handleSelect(e)}>
                    <option selected disabled>Saralash</option>
                    <option value="total_approved_documents">
                        Jami mahsulotlari soni bo'yicha saralash
                    </option>
                    <option value="total_sold_documents">
                        Sotilgan mahsulotlar soni bo'yicha saralash
                    </option>
                    <option value="">Daromadi bo'yicha saralash</option>
                </select>
            </div>
            <Table
                dataSource={sellerData}
                columns={columns}
                pagination={false}
                className="text-center bg-white"
                // onRow={(e) => navigateSeller(e)}
                scroll={{ x: 1200 }}
            />
        </div>
    );
}
