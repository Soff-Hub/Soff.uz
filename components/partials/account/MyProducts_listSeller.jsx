import React from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { DatePicker, Pagination, Select, Table } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { useSelector } from 'react-redux';
import CalculateTimeDifference from './DateFormatter';
import axios from 'axios';


function MyProductsListsSeller() {

    const [data, setData] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [search, setSerach] = useState('');
    const [dataValCat, setDataCat] = useState(null);
    const [date, setDate] = useState(null);
    const [pageCount, setPageCount] = useState(0)
    const [currPage, setCurrPage] = useState(1)
    const { RangePicker } = DatePicker;
    const dateFormat0 = date ? `${date[0]?.$y}-${`${date[0].$M + 1}`.length === 1 ? `0${date[0].$M + 1}` : date[0].$M + 1}-${date[0].$D}` : ''
    const dateFormat1 = date ? `${date[1]?.$y}-${`${date[1].$M + 1}`.length === 1 ? `0${date[1].$M + 1}` : date[1].$M + 1}-${date[1].$D}` : ''
    const dataFormat = (date ? `${dateFormat0}&end_date=${dateFormat1}` : '');
    const { accountLinks, user } = useSelector(state => state.auth)
    const Option = Select.Option;


    async function GetItemsProducts(page, category, dataFormat) {
        const ItemsData = await GetRepository.getMyProductsSeller(page, category, dataFormat, search, user?.access);
        if (ItemsData?.results) {
            setCurrPage(page)
            setPageCount(ItemsData.count)
            setData([...ItemsData.results]);
        }
    }
    async function GetItemsCategory() {
        const ItemsData = await GetRepository.getAllCategoryLists();
        if (ItemsData) {
            setDataCategory(ItemsData);
        }
    }

    const onChange = async (name) => {
        if (name !== 'all') {
            for (let j = 0; j < dataCategory.length; j++) {
                if (dataCategory[j].name === name) {
                    setDataCat(dataCategory[j].id);
                }
            }
        }
        else {
            setDataCat("")
        }
    };




    const options = [];

    for (let i = 0; i < dataCategory?.length; i++) {
        options.push(
            <Option key={dataCategory[i].name}>{dataCategory[i].name}</Option>
        );
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
        GetItemsCategory()
    }, [])
    useEffect(() => {
        GetItemsProducts(currPage, dataValCat, dataFormat)
    }, [dataValCat, dataFormat, search])

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
            width: 300,
            render: (category) => (
                <span> <i className=" text-primary-emphasis fa-solid fa-layer-group"></i> {category?.name}</span>
            )
        },
        {
            title: 'Narxi',
            dataIndex: 'discount_price',
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
            title: 'Mahsulot',
            dataIndex: 'id',
            key: 'address',
            render: (id) => <div >
                <a><i className="fa-solid fa-file-arrow-down text-success-emphasis mx-3 fs-3" onClick={() => handleButtonClick(id)}></i></a>
            </div>
        }

    ];
    return (
        <section className="ps-my-account ps-page--account p-0">
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
                                        <input type='search' className={"form-control rounded col-md-9"} placeholder="Qidiruv" onInput={e => setSerach(e.target.value)} />
                                        <div className="accordion accordion-flush p-0" id="accordionFlushExample">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header m-0">
                                                    <button style={{ padding: "17px", backgroundColor: "#F1F1F2" }} className="accordion-button collapsed  responsiveCardButton   text-success " type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                                        <strong> Filter</strong>
                                                    </button>
                                                </h2>
                                                <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                                    <div className="accordion-body row mx-auto gap-4  pb-4 pt-5">
                                                        <Select
                                                            className='col-md-6 p-0'
                                                            mode='select'
                                                            showSearch
                                                            allowClear
                                                            style={{ width: '100%', height: "47px" }}
                                                            onChange={onChange}
                                                            placeholder="Barcha kategoriyalar"
                                                        >
                                                            <Option value="all" >
                                                                Barcha kategoriyalar
                                                            </Option>

                                                            {options}

                                                        </Select>
                                                        <RangePicker className='col-md-5 py-3   rounded-3' onChange={(e) => setDate(e)} />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <Table dataSource={data} scroll={{ x: 1200 }} columns={columns} pagination={false}
                                    />
                                    <Pagination className="mt-3" defaultCurrent={currPage || 1} total={pageCount}
                                        onChange={(page) => GetItemsProducts(page, dataValCat, dataFormat)} />
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
