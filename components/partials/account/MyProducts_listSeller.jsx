import React, { Component } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { DatePicker, Modal, Table } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';
import MediaRepository from '~/repositories/MediaRepository';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import { useSelector, useDispatch } from 'react-redux';
import ModalDelete from './Modal';
import Link from 'next/link';
import CalculateTimeDifference from './DateFormatter';
import { MyProductsEdit } from '~/store/auth/action';
import ModalDeletePostEdit from './ModalPostEdit';
var parse = require("html-react-parser");
import axios from 'axios';
import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription';
import ModuleDetailTopInformation from '~/components/elements/detail/modules/ModuleDetailTopInformation';
import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault';
import { Tabs } from 'antd';
import PartialDescription from '~/components/elements/detail/description/PartialDescription';
const { TabPane } = Tabs;


function MyProductsListsSeller() {

    const [data, setData] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [search, setSerach] = useState([]);
    const [dataValCat, setDataCat] = useState(null);
    const [date, setDate] = useState(null);
    const { RangePicker } = DatePicker;
    const dateFormat0 = date ? `${date[0]?.$y}-${`${date[0].$M + 1}`.length === 1 ? `0${date[0].$M + 1}` : date[0].$M + 1}-${date[0].$D}` : ''
    const dateFormat1 = date ? `${date[1]?.$y}-${`${date[1].$M + 1}`.length === 1 ? `0${date[1].$M + 1}` : date[1].$M + 1}-${date[1].$D}` : ''
    const dataFormat = (date ? `${dateFormat0}&end_date=${dateFormat1}` : '');
    const { accountLinks, user } = useSelector(state => state.auth)


    async function GetItemsProducts(page, category, dataFormat) {
        if (page === 1) {
            setData([])
        }
        const ItemsData = await GetRepository.getMyProductsSeller(page, category,  dataFormat, user?.access);
        if (ItemsData?.results) {
            setData((prev) => [...prev, ...ItemsData.results]);
            setSerach((prev) => [...prev, ...ItemsData.results]);
            if (ItemsData.next) {
                GetItemsProducts(page + 1, category,  dataFormat)
            }
        }
    }
    async function GetItemsCategory(page) {
        if (page === 1) {
            setDataCategory([])
        }
        const ItemsData = await GetRepository.getCategory(page, user?.access);
        setDataCategory(ItemsData.results);
    }

    function handleClick(e) {
        const text = e.target.value;
        const filterSearch = search.filter(item => (
            item.title.toLowerCase().includes(text.toLowerCase())
        ))
        setData(filterSearch)
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
    const handleButtonClick = async (ID) => {

        try {
            const fileContent = data?.find(item => (item.id == ID))
            const response = await axios.get(
                fileContent.file,
                { responseType: 'blob' }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
            a.download = fileContent.title + "." + fileContent.file.split('.')[fileContent.file.split('.').length - 1];
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file: ', error);
        }
    };

    useEffect(() => {
        GetItemsCategory(1)
    }, [])
    useEffect(() => {
        GetItemsProducts(1, dataValCat,  dataFormat)
    }, [dataValCat,  dataFormat])

    const columns = [
        {
            title: 'Rasm',
            dataIndex: 'poster',
            key: 'name',
            render: (poster_url) => (
                <div >
                    {
                        poster_url ?
                            <img className='rounded-3' src={poster_url} width={54} height={54} />
                            :
                            <i className="fa-solid fa-image fa-2x"></i>
                    }
                </div>
            ),
        },
        {
            title: 'Nomi',
            dataIndex: 'title',
            key: 'age',
            width: 300,
            render: (title) => (
                <span className="truncate whitespace-nowrap"> {title}</span>

            ),
        },
        {
            title: 'Kategoriya',
            dataIndex: 'category',
            key: 'address',
            render: (category) => (
                <span> <i className=" text-primary-emphasis fa-solid fa-layer-group"></i> {category?.name}</span>
            )
        },
        {
            title: 'Narxi',
            dataIndex: 'price',
            key: 'address',
            render: (price) => (
                <span> <i className="fa-solid fa-coins text-warning"></i> {addPeriodToThousands(price)}</span>
            ),
        },
        {
            title: 'Xarid sanasi',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at) => <span> <i className="fa-solid fa-clock text-info-emphasis"></i> <CalculateTimeDifference targetDate={created_at} /></span>
        },
        {
            title: 'Hujjat',
            dataIndex: 'id',
            key: 'address',
            render: (id) => <div >
                <a><i className="fa-solid fa-file-arrow-down text-success-emphasis mx-3 fs-3" onClick={() => handleButtonClick(id)}></i></a>
            </div>
        }

    ];
    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="row " style={{ alignItems: "flex-start" }}>
                    <div className="col-lg-4">
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} />
                        </div>
                    </div>
                    <div className="col-lg-8 pb-5">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div className="ps-section__content">
                                    <div className='row mx-auto gap-4  pb-4 pt-5'>
                                        <input type='search' className={"form-control rounded col-md-9"} placeholder="Qidiruv" onInput={handleClick} />
                                        <div className="accordion accordion-flush" id="accordionFlushExample">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header m-0">
                                                    <button style={{ padding: "17px" }} className="accordion-button collapsed  responsiveCardButton   text-warning admin-filter-color" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                                        <strong> Filter</strong>
                                                    </button>
                                                </h2>
                                                <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                                    <div className="accordion-body row mx-auto gap-4  pb-4 pt-5">
                                                        <select className='form-select rounded-3 col-md-5 fs-3 py-3' onChange={(e) => setDataCat(e.target.value)} >
                                                            <option className='fs-3' value=''>Kategoriyalar</option>

                                                            {
                                                                dataCategory?.length > 0 && (
                                                                    dataCategory?.map(item => (
                                                                        item.is_child === true ?
                                                                            <option key={item.id} value={item.id}>{item.name} </option>
                                                                            :
                                                                            <></>
                                                                    ))
                                                                )
                                                            }
                                                        </select>
                                                        <RangePicker className='col-md-5 py-3   rounded-3' onChange={(e) => setDate(e)} />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <Table dataSource={data} scroll={{ x: 1100 }} columns={columns} />

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
