import React from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { DatePicker, Pagination, Select, Table } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { useSelector } from 'react-redux';
import CalculateTimeDifference from './DateFormatter';
import axios from 'axios';
import NextImageCard from '~/components/nextImagecard';
import useDebounce from '~/hooks/useDebounce';
import Link from "next/link"
import { baseUrl } from '~/repositories/Repository';
import { addPeriodToThousands } from './ProductsLists';

function MyProductsListsSeller() {
    const [data, setData] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [search, setSerach] = useState('');
    const [dataValCat, setDataCat] = useState(null);
    const [date, setDate] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    const [loading2, setLoading2] = useState(null);
    const { RangePicker } = DatePicker;
    const dateFormat0 = date
        ? `${date[0]?.$y}-${`${date[0].$M + 1}`.length === 1
            ? `0${date[0].$M + 1}`
            : date[0].$M + 1
        }-${date[0].$D}`
        : '';
    const dateFormat1 = date
        ? `${date[1]?.$y}-${`${date[1].$M + 1}`.length === 1
            ? `0${date[1].$M + 1}`
            : date[1].$M + 1
        }-${date[1].$D}`
        : '';
    const dataFormat = date ? `${dateFormat0}&end_date=${dateFormat1}` : '';
    const { accountLinks, user } = useSelector((state) => state.auth);
    const Option = Select.Option;
    const searchDebounce = useDebounce(search, 1000);

    async function GetItemsProducts(page, category, dataFormat) {
        const ItemsData = await GetRepository.getMyProductsSeller(
            page,
            category,
            dataFormat,
            search,
            user?.access
        );
        if (ItemsData?.results) {
            setCurrPage(page);
            setPageCount(ItemsData.count);
            setData([...ItemsData.results]);
        }
    }
    async function GetItemsCategory() {
        const ItemsData = await GetRepository.getAllCategoryListsGlobal();
        if (ItemsData) {
            setDataCategory(ItemsData);
        }
    }

    const onSearchCategory = async (value) => {
        const ItemsData = await GetRepository.getAllCategoryListsGlobal(value);
        setDataCategory(ItemsData);
    }

    const onChange = async (name) => {
        if (name !== 'all') {
            for (let j = 0; j < dataCategory.length; j++) {
                if (dataCategory[j].name === name) {
                    setDataCat(dataCategory[j].id);
                }
            }
        } else {
            setDataCat('');
        }
    };

    const options = [];

    for (let i = 0; i < dataCategory?.length; i++) {
        options.push(
            <Option key={dataCategory[i].name}>{dataCategory[i].name}</Option>
        );
    }

  

    const handleButtonClick = async (ID) => {
        try {
            setLoading2(ID);
            const fileContent = data?.find((item) => item.id == ID);
            const filee = fileContent?.file.includes('?AWSAccessKeyId') ? fileContent?.file.split('?')[0] : fileContent?.file
            const response = await axios.get(fileContent?.file, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
            a.download =
                fileContent?.name?.title +
                '.' +
                filee?.split('.')[
                filee?.split('.').length - 1
                ];

            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);

            const apiResponse = await axios.post(
                baseUrl + `seller/upload-count/${fileContent?.id}`
            );

            setLoading2(null);
        } catch (error) {
            console.error('Error downloading file: ', error);
            setLoading2(null);
        }
    };



    useEffect(() => {
        GetItemsCategory();
    }, []);
    useEffect(() => {
        GetItemsProducts(currPage, dataValCat, dataFormat);
    }, [dataValCat, dataFormat, searchDebounce]);





    const columns = [
        {
            title: 'Yuklab olish',
            dataIndex: 'content_type_id',
            key: 'content_type_id',
            render: (content_type_id) => (
                content_type_id?.content_type === 'video' ?
                    <></>
                    :
                    <>
                        {
                            content_type_id?.id !== loading2 ?
                                <a>
                                    <i
                                        className="fa-solid fa-file-arrow-down text-success-emphasis mx-3 fs-3"
                                        onClick={() => handleButtonClick(content_type_id?.id)}></i>
                                </a>
                                :
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                        }

                    </>
            ),
        },
        {
            title: 'Rasm',
            dataIndex: 'image',
            key: 'image',
            render: (image) => (
                <div>
                    {image?.poster_url ? (
                        <Link href={image?.slug === "/account/sellerproducts" ? "/account/sellerproducts" : `/product/${image?.slug}`} className='cursor-pointer'>
                            <a>
                                <NextImageCard
                                    url={image?.poster_url}
                                    clasS="rounded-3 mb-2"
                                    width="54px"
                                    height="54px"
                                />
                            </a>
                        </Link>
                    ) : (
                        <i className="fa-solid fa-image fa-2x"></i>
                    )}
                </div>
            ),
        },
        {
            title: 'Nomi',
            dataIndex: 'name',
            key: 'age',
            width: 300,
            render: (name) => (

                <Link href={name?.slug === "/account/sellerproducts" ? "/account/sellerproducts" : `/product/${name?.slug}`} >

                    <a>
                        <span className="truncate whitespace-nowrap"> {name?.title}</span>
                    </a>
                </Link>
            ),
        },
        {
            title: 'Kategoriya',
            dataIndex: 'category',
            key: 'address',
            width: 300,
            render: (category) => (
                <span>
                    {' '}
                    <i className=" text-primary-emphasis fa-solid fa-layer-group"></i>{' '}
                    {category?.name}
                </span>
            ),
        },
        {
            title: 'Narxi',
            dataIndex: 'discount_price',
            key: 'address',
            render: (price) => (
                <span>
                    {' '}
                    <i className="fa-solid fa-coins text-warning"></i>{' '}
                    {addPeriodToThousands(price)}
                </span>
            ),
        },
        {
            title: 'Xarid sanasi',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at) => (
                <span>
                    {' '}
                    <i className="fa-solid fa-clock text-info-emphasis"></i>{' '}
                    <CalculateTimeDifference targetDate={created_at} />
                </span>
            ),
        },
    ];


    return (
        <section className="ps-my-account ps-page--account ">
            <div className="container">
                <div className="row " style={{ alignItems: 'flex-start' }}>
                    <div className="col-lg-4">
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} />
                        </div>
                    </div>
                    <div className="col-lg-8 pb-5">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div className="ps-section__content">
                                    <div className="row mx-auto gap-4  pb-4 pt-5">
                                        <label
                                            className="form-label border col-md-9 m-0 p-0 d-flex justify-content-between align-items-center"
                                            style={{
                                                backgroundColor: '#F1F1F1',
                                            }}>
                                            <input
                                                type="search"
                                                className="form-control"
                                                style={{ border: 'none' }}
                                                placeholder="Qidiruv"
                                                onInput={(e) =>
                                                    setSerach(e.target.value)
                                                }
                                            />
                                            <span className="px-4">
                                                <i className="fa-solid fa-search "></i>
                                            </span>
                                        </label>
                                        <div
                                            className="accordion accordion-flush p-0"
                                            id="accordionFlushExample">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header m-0">
                                                    <button
                                                        style={{
                                                            padding: '17px',
                                                            backgroundColor:
                                                                '#F1F1F2',
                                                        }}
                                                        className="accordion-button collapsed  responsiveCardButton   text-success "
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#flush-collapseOne"
                                                        aria-expanded="false"
                                                        aria-controls="flush-collapseOne">
                                                        <strong> Filter</strong>
                                                    </button>
                                                </h2>
                                                <div
                                                    id="flush-collapseOne"
                                                    className="accordion-collapse collapse"
                                                    data-bs-parent="#accordionFlushExample">
                                                    <div className="accordion-body row mx-auto gap-4  pb-4 pt-5">
                                                        <Select
                                                            className="col-md-6 p-0"
                                                            mode="select"
                                                            showSearch
                                                            allowClear
                                                            style={{
                                                                width: '100%',
                                                                height: '47px',
                                                            }}
                                                            onChange={onChange}
                                                            onSearch={onSearchCategory}
                                                            placeholder="Barcha kategoriyalar">
                                                            <Option value="all">
                                                                Barcha
                                                                kategoriyalar
                                                            </Option>

                                                            {options}
                                                        </Select>
                                                        <RangePicker
                                                            className="col-md-5 py-3   rounded-3"
                                                            onChange={(e) =>
                                                                setDate(e)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Table
                                        dataSource={data}
                                        scroll={{ x: 1200 }}
                                        columns={columns}
                                        pagination={false}
                                    />
                                    <Pagination
                                        className="mt-3"
                                        defaultCurrent={currPage || 1}
                                        total={pageCount}
                                        onChange={(page) =>
                                            GetItemsProducts(
                                                page,
                                                dataValCat,
                                                dataFormat
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MyProductsListsSeller;
