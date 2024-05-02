import {Table } from 'antd';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import PostRepository from '~/repositories/PostRepository';

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
                ? `${formattedIntegerPart}.${decimalPart}`
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
            // width: 400,
            render: (seller) => (
                <div className="d-flex gap-5 ">
                    <div className="text-center">
                        <Link href={`seller/${seller?.id}`}>
                            <a>
                                {seller?.image ? (
                                    <img
                                        alt="soff"
                                        src={seller?.image}
                                        className="profile__image-client-top-seller"
                                    />
                                ) : (
                                    <i
                                        className=" fa-2x text-info fa-solid fa-circle-user"
                                        style={{
                                            fontSize: '33px',
                                        }}></i>
                                )}
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
                className="text-center"
                // onRow={(e) => navigateSeller(e)}
                scroll={{ x: 1200 }}
            />
        </div>
    );
}
