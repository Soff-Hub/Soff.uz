import React, { Component } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { DatePicker, Modal, Table } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';
import MediaRepository from '~/repositories/MediaRepository';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import { useSelector ,useDispatch} from 'react-redux';
import ModalDelete from './Modal';
import Link from 'next/link';
import CalculateTimeDifference from './DateFormatter';
import { MyProductsEdit } from '~/store/auth/action';


function MyProductsLists() {
    const [data, setData] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [search, setSerach] = useState([]);
    const [tagName, setTagName] = useState(null);
    const [tagItems, setTagItems] = useState([]);
    const [View, setView] = useState({});
    const [dataValCat, setDataCat] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [date, setDate] = useState(null);
    const dispatch = useDispatch();
    const { RangePicker } = DatePicker;
    const dateFormat0 = date ? `${date[0]?.$y}-${`${date[0].$M + 1}`.length === 1 ? `0${date[0].$M + 1}` : date[0].$M + 1}-${date[0].$D}` : ''
    const dateFormat1 = date ? `${date[1]?.$y}-${`${date[1].$M + 1}`.length === 1 ? `0${date[1].$M + 1}` : date[1].$M + 1}-${date[1].$D}` : ''
    const dataFormat = (date ? `${dateFormat0}&end_date=${dateFormat1}` : '');
    const { accountLinks, user } = useSelector(state => state.auth)


    async function GetItemsProducts(page, category, tagName, dataFormat) {
        if (page === 1) {
            setData([])
        }
        const ItemsData = await GetRepository.getMyProducts(page, category, tagName, dataFormat, user?.access);
        if (ItemsData?.results) {
            setData((prev) => [...prev, ...ItemsData.results]);
            setSerach((prev) => [...prev, ...ItemsData.results]);
            if (ItemsData.next) {
                GetItemsProducts(page + 1, category, tagName, dataFormat)
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
    async function GetItemsTag() {
        const ItemsData = await MediaRepository.getTagItmes(user?.access);
        if (ItemsData?.results) {
            setTagItems(ItemsData.results);
        }
    }
    function handleClick(e) {
        const text = e.target.value;
        const filterSearch = search.filter(item => (
            item.title.toLowerCase().includes(text.toLowerCase())
        ))
        setData(filterSearch)
    }
    async function handleClickView(item) {
        const ItemsData = await GetRepository.getMyProductsView(item.id, user?.access);
        setView(ItemsData);
    }
    async function DeleteItemsProducts() {
        const ItemsData = await PatchRepository.getMyProductsDelete(deleteId, user?.access);



        const modal = Modal.error({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: `Siz malumotlarni o'chirdingiz`,
        });
        GetItemsProducts(1, dataValCat, tagName, dataFormat)

    }
   function handleClickIdEdit(productsItems){
    dispatch(MyProductsEdit(productsItems))
   }
    useEffect(() => {
        GetItemsCategory(1)
        GetItemsTag()
    }, [])
    useEffect(() => {
        GetItemsProducts(1, dataValCat, tagName, dataFormat)
    }, [dataValCat, tagName, dataFormat])

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
    const handleButtonClick = () => {
        // Faylni yaratish  
        const fileContent = data?.map(item=>(item.file)) // Faylni matni yoki ma'lumoti
        const fileName = "fayl.jpeg"; // Fayl nomi
      
        const blob = new Blob([fileContent], { type: "text/plain" });
      
        // Faylni yuklab olish uchun link yaratish
        const aTag = document.createElement("a");
        const url = URL.createObjectURL(blob);
      
        aTag.setAttribute("href", url);
        aTag.setAttribute("download", fileName);
        document.body.appendChild(aTag);
      
        // Faylni yuklab olish va linkni o'chirish
        aTag.click();
        URL.revokeObjectURL(url);
      };
      
      
    const columns = [
        {
            title: 'Rasm',
            dataIndex: 'poster_url',
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
            title: 'Sana',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at) => <span> <i className="fa-solid fa-clock text-info-emphasis"></i> <CalculateTimeDifference targetDate={created_at} /></span>
        },
       user?.role === "seller" ? {
            title: 'Holat',
            dataIndex: 'status',
            key: 'address',
            render: (status) => (
                status === "moderation" ?
                    (<span><i className="text-primary-emphasis fa-solid fa-circle-info"></i> Moderatsiya</span>) :
                    status === 'approved' ?
                        (<span><i className="fa-solid text-success fa-circle-check"></i> Tasdiqlangan</span>) :
                        status === 'cancelled' ?
                            (<span><i className="fa-solid fa-circle-xmark text-danger"></i> Bekor qilingan</span>) :
                            <></>
            ),

        } : <></> ,

       user?.role ==="seller" ?   {
            title: 'Harakatlar',
            dataIndex: 'id',
            key: 'address',
            render: (id) => <div >
                <a data-bs-target="#staticBackdropView" data-bs-toggle="modal"><i className="fa-solid fa-eye text-success-emphasis mx-2" onClick={() => handleClickView(data.find(item => item.id === id))}></i></a>
                {
                    data.some(el => el.id == id && el.status === 'moderation') ?

                    <Link href={"/account/MyProducts/Edit"}>
                     <a>
                     <i className="fa-solid fa-pen-to-square mx-3  text-success-emphasis" onClick={() =>handleClickIdEdit(data.find(item => item.id === id))}></i>
                     </a>
                        </Link>
                    : 
                    <i style={{opacity:0.7 ,cursor:"not-allowed"}} className="fa-solid fa-pen-to-square mx-3  text-success-emphasis" ></i>
                }
                <a data-bs-target="#exampleModalToggle" data-bs-toggle="modal"><i className="fa-solid fa-trash-can text-danger mx-2" onClick={() => setDeleteId(id)}></i></a>

            </div>
        } :  {
            title: 'Harakatlar',
            dataIndex: 'id',
            key: 'address',
            render: (id) => <div >
                <button><i className="fa-solid fa-eye text-success-emphasis mx-2" onClick={handleButtonClick}></i></button>
            </div>
        }  ,
        
    ];
    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className=" p-5 mb-5 rounded row gap-5 row-gap-3 mx-auto" style={{ backgroundColor: "#fff", boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)" }}>
                    <h3 className='col-md-4'>Mening mahsulotlarim</h3>
                        <input type='search' className={user?.role==="seller" ? 'form-control rounded col-md-5' :  "form-control rounded col-md-7"} placeholder="Qidiruv" onInput={handleClick} />
                       {
                        user?.role==="seller"?
                      <Link href={"/account/MyProducts/Posts"}>
                      <button className="  btn btn-success col-md-2 py-3 "  ><span className='fs-4'>+ Mahsulot qo'shish</span></button>
                      </Link> 
                      :
                      <></>
                       }

                </div>
                <div className="row " style={{ alignItems: "flex-start" }}>
                    <div className="col-lg-4 pb-5">
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} />
                        </div>
                    </div>
                    <div className="col-lg-8 pb-5">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div className="ps-section__content">
                                {
                                    user?.role==="seller" ?
                                    <div className='d-flex flex-column gap-2'>
                                    <span className='fs-4'><i className="text-primary-emphasis fa-solid fa-circle-info"></i> <strong>Moderatsiya</strong> <em>malumotlar ko'rib chiqilmoqda...</em></span>
                                 <span className='fs-4'><i className="fa-solid text-success fa-circle-check"></i> <strong>Tasdiqlangan </strong> <em>malumotlaringiz muvaffaqqiyatli tasdiqlandi!</em></span>
                                 <span className='fs-4'><i className="fa-solid fa-circle-xmark text-danger"></i> <strong>Bekor qilingan</strong> <em>malumotlaringiz bekor qilindi</em></span>
                                    </div>
                                    :
                                    <></>
                                }
                                    <div className='row mx-auto gap-4  pb-4 pt-5'>
                                        <select className='form-select rounded-3 col-md-4 fs-3 py-3' onChange={(e) => setDataCat(e.target.value)} >
                                            <option className='fs-3' value=''>Kategoriyalar</option>

                                            {
                                                dataCategory?.length > 0 && (
                                                    dataCategory?.map(item => (
                                                        <option key={item.id} value={item.id}>{item.name} </option>
                                                    ))
                                                )
                                            }
                                        </select>
                                        <select required className='form-select col-md-3 rounded-3 py-3 fs-3' onChange={(e) => setTagName(e.target.value)} >
                                            <option value="">Teglar</option>
                                            {
                                                tagItems?.length > 0 && (
                                                    tagItems.map(item => (
                                                        <option value={item.id}>{item.name}</option>
                                                    ))
                                                )
                                            }
                                        </select>
                                        <RangePicker className='col-md-4 py-3   rounded-3' onChange={(e) => setDate(e)} />
                                    </div>
                                    {
                                        user?.role === "seller" ?
                                        <Table dataSource={data} scroll={{  x: 1100 }} columns={columns} />
                                        :
                                        <Table dataSource={data} scroll={{  x:900 }} columns={columns} />

                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ModalDelete onSuccess={DeleteItemsProducts}  />
                <div className="modal fade " id="staticBackdropView" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                    <div className='modal-dialog modal-dialog-centered modal-lg'>
                        <div className='modal-content'>
                            <div className='d-flex justify-content-end p-3'>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="card  " style={{ maxWidth: "840px" }}>
                                <div className="row g-0 px-3 modal-body m-0">
                                    <div className="col-md-4 mt-4 ">
                                        <img src={View?.poster_url} className="img-fluid rounded-start" alt="..." />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body pt-5">
                                            <p className="card-text"> <strong>Nomi:</strong> {View?.category?.name}</p>
                                            <p className="card-text"><strong>Narxi:</strong>  ${View?.price} </p>
                                            <p className="card-text"><strong>Chegirma: </strong> {View?.discount}%</p>
                                            <p className="card-text"><strong>Sotuvchi:</strong> {View?.title}</p>

                                            <p><strong>Teg:</strong> {View?.tag?.map(item=>(item?.name))}</p>

                                        </div>
                                    </div>
                                    <div className='col-md-12 pt-3'>
                                        <p className="card-text"><strong>Qisqa tasvir:</strong> {View?.short_description}</p>
                                        <p className="card-text m-0"><strong>Tavsifi:</strong> {View?.description}</p>
                                        <div className='d-flex justify-content-end py-3'>
                                            <a href={View?.file} className='btn btn-outline-warning w-25 py-2  fs-5' target='_blank' download> <i className="fa-solid fa-download mx-2"></i> File yuklash</a>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

}

export default MyProductsLists;
