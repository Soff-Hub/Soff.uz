import React, { useEffect } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { Form, Modal, Pagination, Select, Table, Tabs, Input, Button, Tooltip, InputNumber } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import useDebounce from '~/hooks/useDebounce';
import CalculateTimeDifference from './DateFormatter';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { addPeriodToThousands } from './ProductsLists';
import Repository from '~/reositoriy-admin/Repository';
import { baseUrl } from '~/repositories/Repository';
import ModalDelete from './Modal';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault';
import ModuleDetailTopInformation from '~/components/elements/detail/modules/ModuleDetailTopInformation';
import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription';
import PartialDescription from '~/components/elements/detail/description/PartialDescription';
import NextImageCard from '~/components/nextImagecard';
import Axios from 'axios';
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;




function SellingsLists() {
    const { accountLinks, user } = useSelector((state) => state.auth);
    const [data, setData] = useState([]);
    const [dataStatic, setDataStatic] = useState(null);
    const [evaluation, setEvaluation] = useState(null);
    const [searchdata, setSearchData] = useState([]);
    const [search, setSearch] = useState('');
    const [searchProducts, setSearchProducts] = useState('');
    const debunce = useDebounce(search, 800)
    const debunceProducts = useDebounce(searchProducts, 800)
    const [pageCount, setPageCount] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [loadingDownload, setLoadingDownload] = useState(false);
    const [loadingEval, setLoadingEval] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteIdView, setDeleteIdView] = useState(null);
    const [openDetails, setOpenDetails] = useState(false);
    const [openUpdates, setOpenUpdates] = useState(false);
    const [openApplication, setOpenApplication] = useState(false);
    const [openApplicationID, setOpenApplicationID] = useState(null);
    const [updatesView, setUpdatesView] = useState(null);
    const [status, setStatus] = useState(null);
    const [statusFilter, setStatusFilter] = useState('');
    const [form] = Form.useForm();


    // Sotilgan mahsulotlar listi

    async function GetItems() {
        setLoading(true)
        const ItemsData = await GetRepository.getShopsListsEval(
            null,
            currPage,
            debunceProducts,
            statusFilter,
            user?.access
        );
        if (ItemsData?.results) {
            setData([...ItemsData?.results]);
            setPageCount(ItemsData.count);
        }
        setLoading(false)
    }

    const handlePagination = (pageNum) => {
        setCurrPage(pageNum);
    };

    useEffect(() => {
        GetItems()
    }, [debunceProducts, statusFilter, user?.access])

    // Sotmoqchi bo'lgan mahsulotlar listi file

    async function GetProductsSearch() {
        const ItemsData = await GetRepository.getSellingLists(debunce, user?.access);
        if (ItemsData?.results) {
            setSearchData(ItemsData?.results);
        }
    }

    useEffect(() => {
        if (isModalOpen) {
            GetProductsSearch()
        }
    }, [debunce, isModalOpen, user?.access])

    // Sotmoqchi bo'lgan mahsulotni baholash uchun 

    const Evaluation = async (slug) => {
        if (slug) {
            setTimeout(() => {
                setSearch('')
            }, 600);
            setLoadingEval(true)
            const ItemsData = await GetRepository.getEvaluation(slug, user?.access);
            if (ItemsData) {
                setEvaluation(ItemsData)
            }
            setLoadingEval(false)
        }

    }

    //    Yuborgan arizani o'chirish uchun delete funksiya

    async function DeleteItemsProducts() {
        const ItemsData = await PatchRepository.getSellingsDelete(
            deleteId,
            user?.access
        );
        if (ItemsData.status === 204) {
            const modal = Modal.error({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: `Siz malumotlarni o'chirdingiz`,
            });
            GetItems();
        } else {
            const modal = Modal.error({
                centered: true,
                title: 'Xatolik!',
                content: ItemsData?.status + ' ' + ItemsData?.statusText || `Nimadir xato ketdi`,
            });
        }
    }

    // Fayl yuklash uchun funksiya

    const handleButtonClickViewProducts = async () => {
        try {
            setLoadingDownload(true);
            const fileContent = deleteIdView?.document_data?.document;
            const filee = fileContent?.file_url.includes('?AWSAccessKeyId')
                ? fileContent?.file_url.split('?')[0]
                : fileContent?.file_url;
            const response = await Axios.get(filee, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
            a.download =
                deleteIdView?.document_data?.title +
                '.' +
                filee.split('.')[filee?.split('.').length - 1];
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            setLoadingDownload(false);
        } catch (error) {
            console.error('Error downloading file: ', error);
            setLoadingDownload(false);
        }
    };

    // Mahsulotni sotishga ariza yuborish uchun post funksiya

    const seelingApplication = async () => {
        if (openApplicationID) {
            try {
                const endPoint = "seller/doc-sale-applications/create/";
                await Repository.post(baseUrl + endPoint, { 'document': openApplicationID }, {
                    headers: {
                        'Authorization': `Bearer ${user?.access}`,
                        'Content-Type': 'application/json'
                    }
                });
                Modal.success({
                    centered: true,
                    title: 'Muvaffaqiyatli!',
                    content: 'Arizangiz muvaffaqiyatli  yuborildi',
                });
                GetItems();
                setIsModalOpen(false),
                    setOpenApplication(false)
                setEvaluation(null)

            } catch (error) {
                throw Modal.error({
                    centered: true,
                    title: 'Xatolik!',
                    content: error?.response?.data?.document[0] || error.message,
                });

            }
        }
    };

    // Arizani Detail qismini olib kelish uchun funksiya

    async function handleClickView(item) {
        if (item) {
            setOpenDetails(true)
            setLoadingDetails(true);
            const ItemsStatic = await GetRepository.getCategoryStatic(item, user?.access)
            const ItemsData = await GetRepository.getShopsListsEval(
                item,
                1,
                null,
                '',
                user?.access
            );
            if (ItemsData?.document_data?.title) {
                setDeleteIdView(ItemsData);
                setDataStatic(ItemsStatic)
                setLoadingDetails(false);
            }
        }
    }
    //   Admin uchun updates olish uchun funksiya

    const handleClickViewUpdates = (item) => {
        if (item?.id) {
            setOpenUpdates(true)
            setUpdatesView(item)
        }
    }

    // Holatni o'zgartirish uchun funksiya

    const updatesFunction = async (values) => {

        const ItemsData = await PatchRepository.getSellingsUpdate(values, updatesView?.id, user?.access);
        if (ItemsData?.status == 200) {
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqiyatli!',
                content: "Siz mahsulotni rasmiylashtirdingiz",
            });
            modal.update;
            form.resetFields();
            GetItems();
            setOpenUpdates(false)

        } else {
            const modal = Modal.error({
                centered: true,
                title: 'Xato!',
                content: ItemsData?.status + ' ' + ItemsData?.statusText,
            });
            modal.update;
        }

    }


    useEffect(() => {
        setStatus(updatesView?.status)
        form.setFieldsValue({
            description: updatesView?.description,
            status: updatesView?.status,
            price: updatesView?.price,
        })
    }, [openUpdates, updatesView, form]);


    const statusMap = {
        moderation: {
            iconClass: "text-primary-emphasis fa-solid fa-circle-info",
            text: "Moderatsiya"
        },
        approved: {
            iconClass: "fa-solid text-success fa-circle-check",
            text: "Tasdiqlangan"
        },
        cancelled: {
            iconClass: "fa-solid fa-circle-question text-danger",
            text: "Bekor qilingan",
            tooltip: true
        },
        offer: {
            iconClass: "fa-solid fa-envelope-open-text text-warning",
            text: "Taklif qilingan",
            tooltip: true
        },

    };

    const columns = [
        {
            title: 'Rasm',
            dataIndex: 'document_data',
            key: 'image',
            render: (document_data) => (
                <div>
                    {document_data?.poster ? (
                        <NextImageCard
                            url={document_data?.poster}
                            clasS="rounded-3 mb-2"
                            width="54px"
                            height="54px"
                        />
                    ) : (
                        <i className="fa-solid fa-image fa-2x"></i>
                    )}
                </div>
            ),
        },
        {
            title: 'Nomi',
            dataIndex: 'document_data',
            key: 'age',
            width: 300,
            render: (document_data) => (
                <span className="truncate whitespace-nowrap">
                    {' '}
                    {document_data?.title}
                </span>
            ),
        },
        {
            title: 'Kategoriya',
            dataIndex: 'document_data',
            key: 'address',
            width: 350,
            render: (document_data) => (
                <span >
                    {' '}
                    <i className=" text-primary-emphasis fa-solid fa-layer-group"></i>{' '}
                    {document_data?.category_name}
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
            title: 'Sana',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at) => (
                <span key={created_at}>
                    {' '}
                    <i className="fa-solid fa-clock text-info-emphasis"></i>{' '}
                    <CalculateTimeDifference targetDate={created_at} />
                </span>
            ),
        },
        {
            title: 'Holat',
            dataIndex: 'status',
            key: 'address',
            render: (status, record) => {
                if (!status || !statusMap[status]) return null;

                const statusText = statusMap[status];

                return statusText.tooltip ? (
                    <Tooltip title={record?.description}>
                        <span style={{ cursor: 'pointer' }}>
                            <i className={statusText.iconClass}></i> {statusText.text}{' '}
                        </span>
                    </Tooltip>
                ) : (
                    <span>
                        <i className={statusText.iconClass}></i> {statusText.text}
                    </span>
                );
            }
        },
        {
            title: 'Harakatlar',
            dataIndex: 'id',
            key: 'address',
            render: (id, record) => (
                <div className='d-flex gap-2'>
                    <span style={{ cursor: "pointer" }} onClick={() => handleClickView(id)}>
                        <i
                            className="fa-solid fa-eye text-success-emphasis mx-2"
                        ></i>
                    </span>

                    {(user?.role === "admin" || record?.status === 'offer') && <span style={{ cursor: "pointer" }}
                    >
                        <i
                            onClick={() => handleClickViewUpdates(record)}
                            className="fa-solid fa-pen-to-square mx-3  text-success-emphasis"
                        ></i>
                    </span>}

                    {(record?.status === "moderation" && user?.role === "seller") && <a

                        data-bs-target="#exampleModalToggle"
                        data-bs-toggle="modal">
                        <i
                            className="fa-solid fa-trash-can text-danger mx-2"
                            onClick={() =>
                                setDeleteId(record?.id)
                            }
                        ></i>
                    </a>

                    }
                </div>
            ),
        },

    ];


    const items = [
        {
            key: '1',
            label: "Fayl haqida batafsil ma'lumot",
            children: (<>
                <div className="ps-product__header ">
                    <ThumbnailDefault
                        product={
                            deleteIdView
                                ? deleteIdView?.document_data
                                : ''
                        }
                        views={
                            deleteIdView?.document_data?.view_count
                        }
                    />
                    <div className="ps-product__info">
                        <div className="mb-4">
                            <strong className="text-danger pb-5">
                                {
                                    deleteIdView?.description
                                }
                            </strong>
                        </div>
                        <ModuleDetailTopInformation

                            product={
                                deleteIdView
                                    ? deleteIdView?.document_data
                                    : ''
                            }
                        />
                        <ModuleProductDetailDescription
                            product={
                                deleteIdView
                                    ? deleteIdView?.document_data
                                    : ''
                            }
                        />

                        <div className=" mt-5 d-flex justify-content-start align-content-center flex-wrap">
                            {deleteIdView?.document_data
                                ?.tag
                                ?.length > 0 ? (
                                <p>
                                    {' '}
                                    <strong>
                                        Aktiv
                                        teglar:{' '}
                                    </strong>{' '}
                                    {deleteIdView?.document_data?.tag?.map(
                                        (
                                            item
                                        ) => (
                                            <span
                                                key={
                                                    item.id
                                                }>
                                                #
                                                {
                                                    item.name
                                                }{' '}
                                            </span>
                                        )
                                    )}{' '}
                                </p>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
                <div className="ps-product__content ps-tab-root">
                    <Tabs defaultActiveKey="1">
                        <TabPane
                            tab={"Fayl to’liq tavsifi"}
                            key="1">
                            <PartialDescription
                                product={
                                    deleteIdView?.document_data
                                }
                            />
                        </TabPane>
                    </Tabs>
                </div>
                <div className="d-flex justify-content-end ">
                    {loadingDownload ? (
                        <button
                            className="btn btn-success  p-2 px-5 fs-4 "
                            style={{
                                width: '179px',
                                cursor: 'not-allowed',
                            }}>
                            <div
                                className="spinner-border "
                                role="status">
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        </button>
                    ) : (
                        <button
                            onClick={
                                handleButtonClickViewProducts
                            }
                            className="btn btn-success p-2 px-5 fs-4 ">
                            <i className="fa-solid fa-download mx-1"></i>{' '}
                            <span className="fs-3">
                                File ochish
                            </span>
                        </button>
                    )}
                </div>

            </>
            ),
        },
        ...((dataStatic && user?.role === "admin") ? [{
            key: '2',
            label: "Statistika",
            children: (
                <div className='header_table_content  '>
                    <div style={{ height: "100%", overflowY: "auto", width: "100%" }}>
                        {
                            <div className='d-flex  flex-column gap-3 mx-auto' style={{ height: "100%" }} >

                                <div className='d-flex rounded-3 align-items-center justify-content-center border p-3 w-100 my-4'>
                                    <span className='fw-bold text-secondary  fs-4 text-truncate'>Tizim taklif qilgan baholash</span>

                                </div>

                                <div className='d-flex rounded-3 align-items-center justify-content-between border p-3 w-100'>
                                    <span className='fw-bold text-secondary  fs-4'>Taklif summasi:</span>
                                    <span className='fw-bold text-secondary  fs-4'>{addPeriodToThousands(dataStatic?.total_amount)} so'm</span>
                                </div>

                                <div className='d-flex rounded-3 align-items-center justify-content-between border p-3 w-100'>
                                    <span className='fw-medium  text-secondary fs-4'>
                                        Kategoriya oid sotilgan mahsulotlari bo'yicha baholash :
                                    </span>
                                    <span className='fw-medium  text-secondary fs-4'>{addPeriodToThousands(dataStatic?.amount_by_category)} so'm</span>
                                </div>

                                <div className='d-flex rounded-3 align-items-center justify-content-between border p-3 w-100'>
                                    <span className='fw-medium  text-secondary fs-4 '>Kategoriya bo'yicha baholash :</span>
                                    <span className='fw-medium  text-secondary fs-4 '> {addPeriodToThousands(dataStatic?.amount_by_purchased_docs_in_category)} so'm</span>

                                </div>

                                <div className='d-flex rounded-3 align-items-center justify-content-between border p-3 w-100'>
                                    <span className='fw-medium  text-secondary fs-4 '>Tavsifi bo'yicha baholash :</span>
                                    <span className='fw-medium  text-secondary fs-4 '>{addPeriodToThousands(dataStatic?.description_amount)} so'm</span>

                                </div>

                                <div className='d-flex rounded-3 align-items-center justify-content-between border p-3 w-100'>
                                    <span className='fw-medium  text-secondary fs-4'> Sotilganlar soni bo'yicha baholash:</span>
                                    <span className='fw-medium  text-secondary fs-4'>{addPeriodToThousands(dataStatic?.price_purchase_count)} so'm</span>

                                </div>

                                <div className='d-flex rounded-3 align-items-center justify-content-between border p-3 w-100'>
                                    <span className='fw-medium  text-secondary fs-4'>Ko'rishlar soni bo'yicha baholash:</span>
                                    <span className='fw-medium  text-secondary fs-4'> {addPeriodToThousands(dataStatic?.price_view_count)} so'm</span>

                                </div>

                            </div>


                        }
                    </div>

                    <div style={{ height: "100%", overflowY: "auto", width: "100%" }}>
                        {
                            <div className='d-flex  flex-column gap-3 mx-auto' style={{ height: "100%" }} >

                                <div className='d-flex rounded-3 align-items-center justify-content-center border p-3 w-100 my-4'>
                                    <span className='fw-bold text-secondary  fs-4  text-truncate'>
                                        O'rtacha baholash statistikasi
                                    </span>

                                </div>

                                <div className='d-flex rounded-3 align-items-center justify-content-between border p-3 w-100'>
                                    <span className='fw-bold text-secondary text-truncate w-75 fs-4'>{deleteIdView?.document_data?.title}:</span>
                                    <span className='fw-bold text-secondary w-25 text-end  fs-4'>
                                        {addPeriodToThousands(deleteIdView?.document_data?.price)} so'm</span>
                                </div>

                                <div className='d-flex rounded-3 align-items-center justify-content-between border p-3 w-100'>
                                    <span className='fw-medium  text-secondary fs-4'>
                                        Mahsulot kategoriyasi :</span>
                                    <span className='fw-medium  text-secondary fs-4'>
                                        {deleteIdView?.document_data?.category?.name}</span>
                                </div>

                                <div className='d-flex rounded-3 align-items-center justify-content-between border p-3 w-100'>
                                    <span className='fw-medium  text-secondary fs-4 '>Ko'rishlar soni :</span>
                                    <span className='fw-medium  text-secondary fs-4 '>
                                        <i className="fa-solid fa-eye mr-1"></i> {
                                            deleteIdView?.document_data?.view_count} ta</span>

                                </div>

                                <div className='d-flex rounded-3 align-items-center justify-content-between border p-3 w-100'>
                                    <span className='fw-medium  text-secondary fs-4 '>Betlar soni :</span>
                                    <span className='fw-medium  text-secondary fs-4 '>
                                        {deleteIdView?.document_data?.document?.page_count} ta </span>

                                </div>

                                <div className='d-flex rounded-3 align-items-center justify-content-between border p-3 w-100'>
                                    <span className='fw-medium  text-secondary fs-4 d-flex gap-4'>
                                        <span>Hajmi:</span>
                                        <span className='fw-medium  text-secondary fs-4'>{
                                            deleteIdView?.document_data?.document?.file_size} </span>

                                    </span>
                                    <span className='fw-medium  text-secondary fs-4 d-flex gap-4'>
                                        <span>Turi:</span>
                                        <span className='fw-medium '> {
                                            deleteIdView?.document_data?.document?.file_type}</span>

                                    </span>

                                </div>

                                <div className='d-flex rounded-3 align-items-center justify-content-between border p-3 w-100'>
                                    <span className='fw-medium  text-secondary fs-4'>Yuklanishlari soni:</span>
                                    <span className='fw-medium  text-secondary fs-4'> {
                                        deleteIdView?.document_data?.upload_count} ta </span>

                                </div>

                            </div>


                        }
                    </div>

                </div>
            ),
        }] : [])
        ,
    ];

    if (user?.role === 'admin') {
        columns.splice(1, 0, {
            title: 'Sotuvchi',
            dataIndex: 'user_data',
            key: 'address',
            width: 350,
            render: (user_data) => (
                <div className="d-flex flex-column">
                    <span>
                        {user_data?.first_name} {user_data?.last_name}
                    </span>
                    <span>{user_data?.phone_or_email}</span>
                </div>
            ),
        });
    }


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


                                    {user?.role === 'seller' ? (
                                        <div className="d-flex flex-column gap-2 mb-5">
                                            <span className="fs-4">
                                                <i className="text-primary-emphasis fa-solid fa-circle-info"></i>{' '}
                                                <strong>Moderatsiya</strong>{' '}
                                                <em>
                                                    Arizangiz ko'rib
                                                    chiqilmoqda...
                                                </em>
                                            </span>
                                            <span className="fs-4">
                                                <i className="fa-solid text-success fa-circle-check"></i>{' '}
                                                <strong>Tasdiqlangan </strong>{' '}
                                                <em>
                                                    Arizangiz
                                                    muvaffaqqiyatli tasdiqlandi!
                                                </em>
                                            </span>
                                            <span className="fs-4">
                                                <i className="fa-solid fa-circle-xmark text-danger"></i>{' '}
                                                <strong>Bekor qilingan</strong>{' '}
                                                <em>
                                                    Arizangiz bekor
                                                    qilindi. <br /> (Bekor qilingan mahsulotga 1 oydan so'ng qayta ariza yuborishingiz mumkin)
                                                </em>
                                            </span>
                                            <span className="fs-4">
                                                <i className="fa-solid fa-envelope-open-text text-warning"></i>{' '}
                                                <strong>Taklif</strong>{' '}
                                                <em>
                                                    Soff.uz tomonidan yangi taklif
                                                </em>
                                            </span>

                                        </div>
                                    ) : (
                                        <></>
                                    )}


                                    <div className='header_table_content m-0'>
                                        <label
                                            className={`rounded-3  form-label border p-0 d-flex justify-content-between align-items-center`}
                                            style={{
                                                backgroundColor: '#F1F1F1',
                                            }}>
                                            <input
                                                type="search"
                                                value={searchProducts}
                                                className="form-control rounded-3 px-4"
                                                style={{ border: 'none', height: "43px" }}
                                                placeholder="Qidiruv"
                                                onChange={(e) => setSearchProducts(e.target.value)}
                                            />
                                            <i className="fa-solid fa-search px-4 "></i>

                                        </label>
                                        <Select
                                            onChange={(e) => setStatusFilter(e)}
                                            defaultValue={statusFilter}
                                            style={{ height: "45px" }}
                                            className='contnet_select'
                                        >
                                            <Option key={''}><i className="fa-solid fa-list mr-2"></i> Barchasi holatlar</Option>
                                            <Option key={"approved"}><i className='fa-solid text-success fa-circle-check mr-2'></i> Tasdiqlangan</Option>

                                            <Option key={"moderation"}><i className='text-primary-emphasis fa-solid fa-circle-info mr-2'></i>  Moderatsiya</Option>

                                            <Option key={"cancelled"}> <i className='mr-2 fa-solid fa-circle-question text-danger'></i>
                                                Bekor qilingan</Option>
                                            <Option key={"offer"}> <i className='mr-2 fa-solid fa-circle-question text-warning'></i>
                                                Taklif qilingan</Option>

                                        </Select>
                                        {user?.role === "seller" && <button className='btn btn-success py-2  rounded-3'
                                            style={{ height: "43px" }}
                                            onClick={() => setIsModalOpen(true)} >
                                            <span >Baholash</span>
                                        </button>
                                        }
                                    </div>

                                    <span className="m-0 py-3 border  my-4 rounded-3 d-flex justify-content-center h4">
                                        {user?.role === "seller" ? `Sotilgan mahsulotlar soni: ${pageCount} ta` : `Sotib olingan mahsulotlar soni: ${pageCount} ta`}
                                    </span>

                                    <Table

                                        scroll={{ x: user?.role === "admin" ? 1700 : 1400 }}
                                        dataSource={data}
                                        columns={columns}
                                        pagination={false}
                                        loading={loading}
                                    />
                                    <Pagination
                                        className="mt-3"
                                        defaultCurrent={currPage || 1}
                                        total={pageCount}
                                        onChange={handlePagination}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <Modal
                title={(user?.role === "seller" && updatesView?.status === "offer") ? "Taklifni tasdiqlash" : "Mahsulotni rasmiylashtirish"}
                open={openUpdates}
                onOk={() => setOpenUpdates(true)}
                onCancel={() => setOpenUpdates(false)}
                footer={null}
                centered
            >
                {(user?.role === "seller" && updatesView?.status === "offer") ?

                    <div>
                        <p>{updatesView?.description}</p>
                        <div className='mt-4 d-flex justify-content-end align-items-center gap-4'>
                            <button onClick={() => updatesFunction({ status: "cancelled" })} className='btn btn-danger fs-4 px-4 rounded-3'>Bekor qilish</button>
                            <button onClick={() => updatesFunction({ status: "approved" })} className='btn btn-success fs-4 npx-4 rounded-3'>Tasdiqlash</button>
                        </div>
                    </div>
                    :
                    <Form
                        form={form}
                        onFinish={updatesFunction}
                        className="w-100 mt-4"
                        layout='vertical'
                    >
                        <Form.Item
                            label="Holat"
                            name={"status"}
                            className='mb-2'

                        >
                            <Select onChange={(e) => setStatus(e)} defaultValue={updatesView?.status} style={{ height: "45px" }}>
                                <Option key={"approved"}><i className='fa-solid text-success fa-circle-check mr-2'></i> Tasdiqlangan</Option>
                                <Option key={"moderation"}><i className='text-primary-emphasis fa-solid fa-circle-info mr-2'></i>  Moderatsiya</Option>
                                <Option key={"cancelled"}> <i className='mr-2 fa-solid fa-circle-question text-danger'></i>
                                    Bekor qilingan</Option>
                                <Option key={"offer"}> <i className='mr-2 fa-solid fa-envelope-open-text text-warning'></i>

                                    Taklif qilish</Option>
                            </Select>
                        </Form.Item>

                        {status === "offer" && <Form.Item
                            label={"Narx"}
                            name={"price"}
                            className='mb-2'

                        >
                            <InputNumber
                                style={{ height: "45px" }}
                                name='price'
                                placeholder="Narxi"
                                className='w-100 py-2'
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                                onKeyPress={(e) => {
                                    if (!/[0-9]/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                            />
                        </Form.Item>}


                        {(status === "cancelled" || status === "offer") && <Form.Item
                            label='Sabab'
                            name={"description"}
                            className='mb-2'
                        >
                            <TextArea rows={3} placeholder='Sabab' defaultValue={updatesView?.description} />
                        </Form.Item>
                        }

                        <Form.Item className='mt-4 mb-0'>
                            <Button htmlType='submit' style={{ height: "40px" }} type='default' className='bg-success text-white w-100'>Saqlash</Button>
                        </Form.Item>
                    </Form>}


            </Modal>


            <Modal

                open={openDetails}
                onOk={() => setOpenDetails(true)}
                onCancel={() => setOpenDetails(false)}
                width={1200}
                footer={null}

            >
                <div className="ps-container p-0">
                    {!loadingDetails ? (
                        <div className="ps-container p-0">

                            <div className="ps-product--detail ps-product--fullwidth m-0">
                                <Tabs
                                    centered={user?.role === "admin"}
                                    defaultActiveKey="1"
                                    items={items}
                                    className="bg-white selling_contnet"
                                />

                            </div>

                        </div>
                    ) : (
                        <div className="ps-container p-0">
                            <div
                                className="ps-product--detail ps-product--fullwidth"
                                style={{
                                    height: '690px',
                                    display: 'grid',
                                    placeContent: 'center',
                                }}>
                                <div
                                    className="spinner-border "
                                    role="status"
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                    }}>
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>


            </Modal>


            <Modal
                title={"Baholash uchun qidiruv"}
                open={isModalOpen}
                onOk={() => (setIsModalOpen(true), setEvaluation(null))}
                onCancel={() => (setIsModalOpen(false), setEvaluation(null))}
                footer={null}
                width={800}
            >

                <label
                    className={'rounded-3 mt-3  form-label border p-0 d-flex justify-content-between align-items-center'}
                    style={{
                        backgroundColor: '#F1F1F1',
                    }}>
                    <input
                        type="search"
                        value={search}
                        className="form-control rounded-3 px-4"
                        style={{ border: 'none', height: "43px" }}
                        placeholder="Qidiruv"
                        onChange={(e) => (setSearch(e.target.value), setEvaluation(null))}
                    />
                    <i className="fa-solid fa-search px-4 "></i>

                </label>

                <div style={{ height: "70vh" }} className='d-flex align-items-start justify-content-center '>
                    {loadingEval ?

                        <div
                            className="ps-product--detail ps-product--fullwidth"
                            style={{
                                height: '100%',
                                display: 'grid',
                                placeContent: 'center',
                            }}>
                            <div
                                className="spinner-border text-secondary "
                                role="status"
                                style={{
                                    width: '150px',
                                    height: '150px',
                                }}>
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        </div>
                        :
                        (evaluation ?
                            <div style={{ height: "100%", overflowY: "auto", width: "90%" }}>
                                {
                                    <div className='d-flex  flex-column gap-3 mx-auto' style={{ height: "100%" }} >

                                        <div className='d-flex rounded-3 align-items-center justify-content-between border p-3 w-100 my-4'>
                                            <span className='fw-bold text-secondary  fs-4 w-75 text-truncate'>{evaluation.document}:</span>
                                            <span className='fw-bold text-secondary  fs-4 w-25 text-end'>{(addPeriodToThousands(evaluation?.document_price))} so'm</span>
                                        </div>

                                        <div className='d-flex rounded-3 align-items-center justify-content-between border p-3 w-100'>
                                            <span className='fw-bold text-secondary  fs-4'>Taklif summasi:</span>
                                            <span className='fw-bold text-secondary  fs-4'>{addPeriodToThousands(evaluation?.total_amount)} so'm</span>
                                        </div>

                                        <div className='d-flex rounded-3 align-items-center justify-content-between border p-3 w-100'>
                                            <span className='fw-medium  text-secondary fs-4'>
                                                Kategoriyaga oid sotilgan mahsulotlar bo'yicha baholash:</span>
                                            <span className='fw-medium  text-secondary fs-4'>{addPeriodToThousands(evaluation?.amount_by_category)} so'm</span>
                                        </div>

                                        <div className='d-flex rounded-3 align-items-center justify-content-between border p-3 w-100'>
                                            <span className='fw-medium  text-secondary fs-4 '>Kategoriya bo'yicha baholash :</span>
                                            <span className='fw-medium  text-secondary fs-4 '> {addPeriodToThousands(evaluation?.amount_by_purchased_docs_in_category)} so'm</span>

                                        </div>

                                        <div className='d-flex rounded-3 align-items-center justify-content-between border p-3 w-100'>
                                            <span className='fw-medium  text-secondary fs-4 '>Tavsifi bo'yicha baholash :</span>
                                            <span className='fw-medium  text-secondary fs-4 '>{addPeriodToThousands(evaluation?.description_amount)} so'm</span>

                                        </div>

                                        <div className='d-flex rounded-3 align-items-center justify-content-between border p-3 w-100'>
                                            <span className='fw-medium  text-secondary fs-4'> Sotilganlar soni bo'yicha baholash:</span>
                                            <span className='fw-medium  text-secondary fs-4'>{addPeriodToThousands(evaluation?.price_purchase_count)} so'm</span>

                                        </div>

                                        <div className='d-flex rounded-3 align-items-center justify-content-between border p-3 w-100'>
                                            <span className='fw-medium  text-secondary fs-4'>Ko'rishlar soni bo'yicha baholash:</span>
                                            <span className='fw-medium  text-secondary fs-4'> {addPeriodToThousands(evaluation?.price_view_count)} so'm</span>

                                        </div>
                                        <div className='header_table_content'>
                                            <button style={{ height: "40px" }} className='btn btn-warning px-4 fs-4 w-100' onClick={() => setEvaluation(null)}>
                                                Qayta tanlash
                                            </button>

                                            <button style={{ height: "40px" }}
                                                onClick={() => (setOpenApplicationID(evaluation?.document_id), setOpenApplication(true))}

                                                className="btn btn-success fs-4 px-4 w-100">Ariza yuborish</button>
                                        </div>
                                    </div>


                                }
                            </div>
                            :
                            <div className={searchdata?.length > 0 ? 'd-flex flex-column gap-3 bg-white' : 'd-flex align-items-center justify-content-center'} style={{
                                maxHeight: "100%",
                                height: searchdata?.length > 0 ? "" : '100%',
                                overflowY: "auto",
                                width: '100%',
                                marginTop: "10px",
                            }}>
                                {
                                    searchdata?.length > 0 ? searchdata?.map((item) => (
                                        <div onClick={() => Evaluation(item?.slug)} className='d-flex
                                 justify-content-between
                                  align-items-center
                                  flex-wrap
                                   rounded-3 border p-3
                                    
                                   ' style={{ cursor: "pointer" }}>

                                            <span className='d-flex gap-3 align-items-center text-truncate w-75'>
                                                <i className="fa-solid fa-file text-success"></i>
                                                <span>{item.title}</span>
                                            </span>


                                            <span ><i className="fa-solid fa-coins text-warning mr-1"></i> {addPeriodToThousands(item.price)} so'm </span>
                                        </div>
                                    )) :

                                        <p className='fw-bold fs-3'>Ma'lumot topilmadi</p>

                                }
                            </div>

                        )


                    }
                </div>
            </Modal>

            <ModalDelete onSuccess={DeleteItemsProducts} />

            <Modal
                title={"Arizani tasdiqlash"}
                open={openApplication}
                onOk={() => (setOpenApplication(true))}
                onCancel={() => (setOpenApplication(false))}
                footer={null}
                width={500}
                centered
            >
                <div className="d-flex justify-content-center align-items-center">
                    <span
                        className="d-flex justify-content-center align-items-center"
                        style={{
                            width: '90px',
                            height: '90px',
                            borderRadius: '50px',
                            border: '6px solid #28a745',
                            color: '#28a745',
                        }}>
                        <i className="fa-solid fa-check fa-4x"></i>
                    </span>
                </div>
                <h2 className="fs-1 text-center pt-4">
                    Ishonchingiz komilmi?
                </h2>
                <div>
                    <p
                        className="text-center   fs-4"
                    >
                        Haqiqatan ham  tasdiqlamoqchimisiz?
                        Bu jarayonni ortga qaytarib bo‘lmaydi.
                    </p>
                </div>
                <div className="d-flex justify-content-center gap-5  pt-3">
                    <button
                        onClick={() => (setOpenApplication(false))}
                        className=" btn btn-secondary d-block w-25 py-2 ">
                        <span className="fs-3">Yopish</span>
                    </button>
                    <button
                        onClick={seelingApplication}
                        className="btn btn-success d-block px-4 py-2">
                        <span className="fs-3">Tasdiqlash</span>
                    </button>
                </div>
            </Modal>

        </section >
    );

}

export default SellingsLists;
