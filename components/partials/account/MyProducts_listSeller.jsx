import React from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { DatePicker, Modal, Pagination, Select, Table, Tabs } from 'antd';
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
import SidebarLayout from '../SidebarLayout';

function MyProductsListsSeller() {
    const [data, setData] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [search, setSerach] = useState('');
    const [dataValCat, setDataCat] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    const [loading2, setLoading2] = useState(null);
    const [loadingData, setLoadingData] = useState(false);
    const [loadingPlay, setLoadingPlay] = useState(false);
    const { RangePicker } = DatePicker;
    const { accountLinks, user } = useSelector((state) => state.auth);
    const Option = Select.Option;
    const searchDebounce = useDebounce(search, 1000);
    const [pageCountPlay, setPageCountPlay] = useState(0);
    const [currPagePlay, setCurrPagePlay] = useState(1);
    const [dataPlayLists, setDataPlayLists] = useState([]);
    const [openFilter, setOpenFilter] = useState(false);
    const [lifeTime, setLifetime] = useState('');
    const [lifeTime1, setLifetime2] = useState('');
    const [isSeller, setIsSeller] = useState(false)


    const handleChangeDate = (date) => {

        if (date?.[0]) {
            setLifetime(date[0].format('YYYY-MM-DD'));
            setLifetime2(date[1].format('YYYY-MM-DD'));
        } else {
            setLifetime('');
            setLifetime2('');
        }
    };
    const dataFormat = `${lifeTime}&end_date=${lifeTime1}`;


    async function GetItemsProducts(page, category, dataFormat) {
        setLoadingData(true)
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
        setLoadingData(false)
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


    const handlePaginationPlayLists = (page) => {
        setCurrPagePlay(page)
    }

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

    async function GetItemsProductsPlayLists() {
        setLoadingPlay(true)
        const ItemsData = await GetRepository.getPopularPlayListsApproved(currPagePlay, user?.access);
        if (ItemsData?.results) {
            setDataPlayLists(ItemsData?.results);
            setPageCountPlay(ItemsData.count);
        }
        setLoadingPlay(false)
    }

    const handeClearFilter = () => {
        setDataCat('');
        setLifetime('');
        setLifetime2('');
        setOpenFilter(false);
    }


    useEffect(() => {
        if (user?.access) {
            GetItemsProductsPlayLists()
        }
    }, [currPagePlay, user?.access]);



    useEffect(() => {
        GetItemsCategory();

        setTimeout(() => {
            const s = localStorage.getItem('is_seller')
            setIsSeller(s === '1')
        }, 1000);
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
                                    className="rounded-3 mb-2"
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

    const columnsApproved = [
        {
            title: 'Rasm',
            dataIndex: 'image',
            key: 'image',
            render: (text, record) => (
                <div>
                    {record?.image ? (
                        <Link href={record?.slug === "/account/sellerproducts" ? "/account/sellerproducts" : `/product/${record?.slug}`} className='cursor-pointer'>
                            <a>
                                <NextImageCard
                                    url={record?.image}
                                    className="rounded-3 mb-2"
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
            dataIndex: 'id',
            key: 'age',
            width: 300,
            render: (text, record) => (

                <Link href={record?.slug === "/account/sellerproducts" ? "/account/sellerproducts" : `/product/${record?.slug}`} >

                    <a>
                        <span className="truncate whitespace-nowrap"> {record?.name}</span>
                    </a>
                </Link>
            ),
        },
        {
            title: 'Tavsif',
            dataIndex: 'description',
            key: 'description',
            width: 300,
            render: (description) => (
                <span>
                    {' '}
                    <i className=" text-primary-emphasis fa-solid fa-layer-group"></i>{' '}
                    {description}
                </span>
            ),
        },
        {
            title: 'Narxi',
            dataIndex: 'price',
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


    const itemsOrder = [
        {
            key: '1',
            label: (
                dataPlayLists?.length > 0 &&
                <span
                    style={{
                        marginRight: '20px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}>
                    Sotib olingan mahsulotlar
                </span>
            ),
            children: (
                <>

                    <Table
                        dataSource={data}
                        scroll={{ x: 1200 }}
                        columns={columns}
                        pagination={false}
                        loading={loadingData}
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
                </>
            ),
        },
        ...(dataPlayLists?.length > 0 ? [{
            key: '2',
            label: (
                <span
                    style={{
                        marginLeft: '30px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}>
                    Sotib olingan  playlistlar
                </span>
            ),
            children: (
                <>

                    <Table
                        dataSource={dataPlayLists}
                        scroll={{ x: 1100 }}
                        columns={columnsApproved}
                        pagination={false}
                        loading={loadingPlay}
                    />
                    <Pagination
                        className="mt-3"
                        defaultCurrent={currPagePlay}
                        total={pageCountPlay}
                        onChange={handlePaginationPlayLists}
                    />
                </>
            ),
        }] : []),
    ];



    return (
        <section className="ps-my-account ps-page--account ">
            <div className="container">
                <div className="row " style={{ alignItems: 'flex-start' }}>
                    <SidebarLayout accountLinks={accountLinks}>
                        <div className="ps-page__content">
                            {isSeller &&
                                <div className={`mb-2  p-4 d-flex flex-column justify-content-between mobileImage`}
                                    style={{
                                        borderRadius: "10px",
                                        backgroundSize: "cover",
                                        backgroundRepeat: "no-repeat",
                                        backgroundImage: "url(/static/img/img7.png)",
                                        backgroundSize: 'contain',
                                        backgroundColor: 'white',
                                        backgroundPosition: 'center right'
                                    }} >

                                    <div className="d-flex justify-content-between text-white fw-bold " >
                                        <Link href={"https://seller.soff.uz/account/login"}>
                                            <a className='iconsmar d-flex align-items-end gap-2' target='_blank'>
                                                <img src="/static/img/seller-logo.png" alt="birjalogo"
                                                    height={30}
                                                />
                                            </a></Link>
                                        {/* <a className='iconsmar' style={{ cursor: "pointer", color: 'black' }} onClick={() => setStyle("none")}><i className="fa-solid fa-xmark fs-2 p-0"></i></a> */}
                                    </div>
                                    <div style={{ maxWidth: '500px' }}>
                                        <p className='py-3 fs-3' style={{ color: '#00A44F' }}>Endilikda siz sotuvchilik faoliyatingizni, SELLER.SOFF.UZ saytimizda davom ettirishingiz mumkin!</p>
                                    </div>
                                    <Link href={"https://seller.soff.uz/account/login/"}>
                                        <a className='btn  fs-4 text-white fw-medium '
                                            href='https://seller.soff.uz/account/login/'
                                            target='_blank'
                                            style={{
                                                borderRadius: "30px",
                                                padding: "6px 0",
                                                width: "190px",
                                                opacity: "0.9",
                                                backgroundColor: "#151526"
                                            }} >
                                            Saytga o'tish
                                            <i className="fa-solid fa-angle-right ml-2"></i></a>
                                    </Link>

                                </div>}
                            <div className="ps-section--account-setting">
                                <div className="ps-section__content">
                                    <div className="row mx-auto gap-4  pt-5">
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

                                        <button className='btn btn-outline-success fs-4 col-md-2 py-3'
                                            onClick={() => (setOpenFilter(true))}>
                                            <i className="fa-solid fa-sliders"></i> Filter
                                        </button>

                                    </div>

                                    <Tabs
                                        centered
                                        defaultActiveKey="1"
                                        items={itemsOrder}
                                        className="bg-white"
                                    />
                                </div>
                            </div>
                        </div>
                    </SidebarLayout>
                </div>

                <Modal
                    title={"Mahsulotlarni filterlash"}
                    open={openFilter}
                    onOk={() => setOpenFilter(true)}
                    onCancel={() => setOpenFilter(false)}
                    footer={null}
                    width={500}
                >

                    <div className="p-0 mt-5 mb-3 w-100 d-flex gap-4 flex-column">
                        <button
                            onClick={handeClearFilter}
                            className='btn btn-outline-secondary rounded-3 fs-4 py-3 w-100'>
                            Barcha mahsulotlar
                        </button>

                        <Select
                            className=" p-0"
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
                            className="py-3   rounded-3"
                            onChange={handleChangeDate}
                        />


                    </div>


                </Modal>
            </div>
        </section>
    );
}

export default MyProductsListsSeller;
