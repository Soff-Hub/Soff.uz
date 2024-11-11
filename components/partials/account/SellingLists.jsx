import React, { useEffect } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { Form, Modal, Pagination, Select, Table, Tabs, Input, Button, Tooltip, InputNumber, Radio, DatePicker, Checkbox } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import useDebounce from '~/hooks/useDebounce';
import CalculateTimeDifference from './DateFormatter';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { addPeriodToThousands } from './ProductsLists';
import { orginalApi, orginalUrl } from '~/reositoriy-admin/Repository';
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
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import SidebarLayout from '../SidebarLayout';
// import 'dayjs/locale/uz';

dayjs.extend(customParseFormat);
// dayjs.locale('uz');
const dateFormat = 'YYYY-MM-DD HH:mm';

export const startDate = dayjs().add(2, 'day').hour(9).minute(0).format('YYYY-MM-DD HH:mm');
export const endDate = dayjs().add(10, 'day').hour(18).minute(0).format(dateFormat);

const disabledDate = (current) => {
    return current && (current < dayjs(startDate, dateFormat) || current > dayjs(endDate, dateFormat));
};


function SellingsLists() {
    // const locale = require('antd/es/date-picker/locale/uz_UZ')
    // const uzLotinLocale = {
    //     ...locale,
    //     lang: {
    //         ...locale.lang,
    //         locale: 'uz',
    //         months: [
    //             'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
    //             'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr',
    //         ],
    //         weekdays: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba', 'Yakshanba'],
    //         shortWeekdays: ['Du', 'Se', 'Cho', 'Pa', 'Ju', 'Sha', 'Yak'],
    //     },
    // };

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
    const [price, setPrice] = useState('')
    const [sellMethod, setSellMethod] = useState('simple')
    const [auctionDate, setAuctionDate] = useState(startDate)
    const [confirm, setConfirm] = useState(false)
    const [accept, setAccept] = useState(false)
    const { query } = useRouter()


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

    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);

    useEffect(() => {
        if (isModalOpen) {
            GetProductsSearch()
        }
    }, [debunce, isModalOpen, user?.access])

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
        if (openApplicationID && price) {
            setLoading(true)
            try {
                const endPoint = "auctions/doc_sale_applications/create/";
                await orginalApi.post(orginalUrl + endPoint, {
                    'document': openApplicationID.id,
                    price,
                    type: sellMethod,
                    deadline: sellMethod === 'simple' ? nextYear.toISOString() : auctionDate
                }, {
                    headers: {
                        'Authorization': `Bearer ${user?.access}`,
                        'Content-Type': 'application/json'
                    }
                });
                Modal.success({
                    centered: true,
                    title: 'Muvaffaqiyatli!',
                    content: <div>
                        <p>
                            Mahsulotingiz birja savdosiga chiqarildi
                        </p>

                        <a className='text-success' style={{ textDecoration: 'underline' }} href={`https://birja.soff.uz/product/${openApplicationID?.slug}`} target='_blank'>
                            Mahsulotingizni birjada ko'rish uchun bosing.
                        </a>
                    </div>,
                    onOk: () => Router.push('/account/selling'),
                    onClose: () => Router.push('/account/selling'),
                    onCancel: () => Router.push('/account/selling'),
                });
                GetItems();
                setIsModalOpen(false)
                setOpenApplication(false)
                setEvaluation(null)

            } catch (error) {
                throw Modal.error({
                    centered: true,
                    title: 'Xatolik!',
                    content: error?.response?.data?.document?.[0] || error?.response?.data?.msg || error.message,
                });

            }
            setLoading(false)
        } else {
            throw Modal.error({
                centered: true,
                title: 'Xatolik!',
                content: 'Sotish narxini kirting',
            });

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
                    {document_data?.image ? (
                        <NextImageCard
                            url={document_data?.image?.poster_url}
                            className="rounded-3 mb-2"
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
            title: 'Holati',
            dataIndex: 'active',
            key: 'active',
            render: (created_at) => (
                <span key={created_at}>
                    {' '}
                    {created_at ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-warning"></i>}{' '}
                    {created_at ? "Aktiv" : "Aktiv emas"}
                </span>
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

    useEffect(() => {
        if (!evaluation) {
            setAuctionDate('')
            setPrice('')
            setSellMethod('simple')
        } else {
            setAuctionDate(startDate)
        }
    }, [evaluation])

    useEffect(() => {
        setSearch(query?.title)
        if (query?.title) {
            setIsModalOpen(true)
        }
    }, [query?.title])


    return (
        <section className="ps-my-account ps-page--account ">
            <div className="container">
                <div className="row " style={{ alignItems: 'flex-start' }}>
                    <SidebarLayout accountLinks={accountLinks}>
                        <div className={`col-12 mb-4  p-4 d-flex flex-column justify-content-between mobileImage `}
                            style={{
                                borderRadius: "10px",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundImage: "url(/static/img/bagImage.avif)",
                                backgroundPosition: 'center'
                            }} >

                            <div className="d-flex justify-content-between text-white fw-bold " >
                                <Link href={"https://birja.soff.uz/"}>
                                    <a className='iconsmar' target='_blank'>
                                        <img src="/static/img/soffbirja-dark-logo.png" alt="birjalogo"
                                            width={140}
                                            height={30}
                                        />
                                    </a>
                                </Link>
                            </div>
                            <Link href={"https://birja.soff.uz/"}>
                                <a className='btn  fs-4 text-white fw-medium '
                                    target='_blank'
                                    style={{
                                        borderRadius: "30px", padding: "6px 0", width: "190px",
                                        opacity: "0.9",
                                        backgroundColor: "#151526"
                                    }} >
                                    Birjada savdo qilish
                                    <i className="fa-solid fa-angle-right ml-2"></i></a>
                            </Link>

                        </div>
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div className="ps-section__content">

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
                                        {user?.role === "seller" && <button className='btn btn-success py-2 px-0  rounded-3'
                                            style={{ height: "43px" }}
                                            onClick={() => setIsModalOpen(true)} >
                                            <span>Mahsulot tanlash</span>
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
                    </SidebarLayout>
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
                            label='Izoh'
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
                title={<div className='d-flex align-items-center gap-2'>
                    <div onClick={() => (setEvaluation(null), setPrice(''), setAccept(false), setConfirm(false))} style={{ cursor: 'pointer' }}>
                        <i className="fa-solid fa-arrow-left mr-2"></i>
                    </div>
                    Mahsulotni birjaga sotuvga chiqarish
                </div>}
                open={isModalOpen}
                onOk={() => (setIsModalOpen(true), setEvaluation(null))}
                onCancel={() => (setIsModalOpen(false), setEvaluation(null))}
                footer={null}
                width={600}
            >

                {/* {!evaluation && <p className='fs-4 mt-4 text-primary-emphasis'>
                    <i className='fa-solid fa-circle-info me-2 mb-3'></i>
                    Buyerda description bo'lishi kerak
                </p>} */}

                {!evaluation && <label
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

                </label>}

                <div style={{ height: "auto" }} className='d-flex align-items-start justify-content-center'>
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
                                    Yuklanmoqda...
                                </span>
                            </div>
                        </div>
                        :
                        (evaluation ?
                            <div style={{ height: "100%", overflowY: "auto", width: "100%" }}>
                                {
                                    <div className='d-flex  flex-column gap-3 mx-auto' style={{ height: "100%" }} >

                                        <Radio.Group
                                            onChange={e => setSellMethod(e.target.value)}
                                            className='d-flex flex-column mt-3 gap-3'
                                            value={sellMethod}
                                        >
                                            <p className='m-0 fs-4'>Sotish turini tanlang</p>
                                            <div className='d-flex align-items-center'>
                                                <Radio value={'simple'} style={{ maxWidth: '150px', width: '100%' }}>
                                                    Bittada sotish
                                                </Radio>
                                                <Tooltip
                                                    className="toltip"
                                                    title={"Agar siz mahsulotingizni bittada sotmoqchi bo'lsangiz \n mahsulotingizni siz belgilagan narxda boshqa foydalanuvchi sotib olishi mumkin"}
                                                    color="rgb(31 41 55)">
                                                    <i
                                                        style={{
                                                            cursor: 'pointer',
                                                            fontSize: '18px',
                                                        }}
                                                        className="fa-regular fa-circle-question px-4"></i>
                                                </Tooltip>
                                            </div>
                                            <div className='d-flex align-items-center'>
                                                <Radio value={'auction'} style={{ maxWidth: '150px', width: '100%' }}>Auksionda sotish</Radio>
                                                <Tooltip
                                                    className="toltip"
                                                    title={"Agar siz mahsulotingizni auksionda sotmoqchi bo'lsangiz \n mahsulotingizga belgilangan vaqt ichida, taklif berilgan narxlardan istalgan biriga sotishingiz mumkin"}
                                                    color="rgb(31 41 55)">
                                                    <i
                                                        style={{
                                                            cursor: 'pointer',
                                                            fontSize: '18px',
                                                        }}
                                                        className="fa-regular fa-circle-question px-4"></i>
                                                </Tooltip>
                                            </div>

                                            {sellMethod !== 'simple' ? <div className='mt-3'>
                                                <div className='d-flex align-items-center'>
                                                    <p className='m-0 fs-4'>{`${sellMethod === 'simple' ? 'Sotuv' : 'Auksion'} tugash sanasini kiriting`}</p>
                                                    <Tooltip
                                                        className="toltip"
                                                        title={"Agar mahsulotingiz belgilangan vaqt davomida sotilmasa birjadan o'chiriladi va mahsulotlaringiz ro'yxatiga qaytariladi"}
                                                        color="rgb(31 41 55)">
                                                        <i
                                                            style={{
                                                                cursor: 'pointer',
                                                                fontSize: '18px',
                                                            }}
                                                            className="fa-regular fa-circle-question px-4"></i>
                                                    </Tooltip>
                                                </div>
                                                <DatePicker
                                                    showNow={false}
                                                    showTime={{ format: 'HH:mm', defaultValue: dayjs('09:00', 'HH:mm') }}
                                                    placeholder={`${sellMethod === 'simple' ? 'Sotuv' : 'Auksion'} tugash sanasini kiriting`}
                                                    size='large'
                                                    className='w-100'
                                                    defaultValue={dayjs(startDate, dateFormat)}
                                                    showSecond={false}
                                                    minuteStep={60}
                                                    onChange={(e, v) => setAuctionDate(v)}
                                                    disabledDate={disabledDate}
                                                />
                                            </div> : ''}
                                        </Radio.Group>

                                        <div className=''>
                                            <input value={price} onChange={e => setPrice(e.target.value)} className='d-flex rounded-3 align-items-center justify-content-between border p-3 w-100 my-4' placeholder={`${sellMethod === 'simple' ? 'Sotuv' : 'Auksion'} narxini kiriting`} />
                                        </div>

                                        <div className='d-flex align-items-center gap-2 mb-3'>
                                            <Checkbox checked={accept} onClick={() => setConfirm(!confirm)} />
                                            <p className='m-0' onClick={() => setConfirm(true)} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Birja.soff.uz platformasidan foydalanish qonun-qoidalari</p>
                                        </div>

                                        <div className='header_table_content'>
                                            {/* <button style={{ height: "40px" }} className='btn btn-warning px-4 fs-4 w-100 d-flex align-items-center justify-content-center'>
                                                <i className="fa-solid fa-arrow-left mr-2"></i>
                                                Boshqa mahsulot tanlash
                                            </button> */}

                                            <button disabled={!accept} style={{ height: "40px" }}
                                                onClick={() => (setOpenApplicationID(evaluation), setOpenApplication(true))}

                                                className="btn btn-success fs-4 px-4 w-100">Davom etish</button>
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
                                        <div onClick={() => (setEvaluation(item), setOpenApplicationID(item))} className='d-flex
                                 justify-content-between
                                  align-items-center
                                  flex-wrap
                                   rounded-3 border p-3
                                    
                                   ' style={{ cursor: "pointer" }}>

                                            <span className='d-flex gap-3 align-items-center text-truncate w-75'>
                                                <i className="fa-solid fa-file text-success"></i>
                                                <span>{item.title}</span>
                                            </span>


                                            <span ><i className="fa-solid fa-coins text-warning mr-1"></i> {addPeriodToThousands(item.discount_price)} so'm </span>
                                        </div>
                                    )) :

                                        <div className='text-center w-100'>
                                            <p className='fw-medium fs-4'>Ayni paytda sizning muallifligingiz ostida hech qanday mahsulot mavjud emas!</p>
                                            <a className='text-success' style={{ textDecoration: 'underline' }} href={`/account/myproducts/product-selection`}>
                                                Yangi mahsulut yuklash uchun shuyerga bosing
                                            </a>
                                            {/* <div className='d-flex flex-column gap-1 pt-1 pl-3'>
                                <p className='fs-4 m-0'>- mahsulotingiz tasdiqlanganiga 20 kundan oshgan bo'lishi</p>
                                <p className='fs-4 m-0'>- mahsulotingiz kamida 2 marta sotilgan bo'lishi</p>
                            </div> */}
                                        </div>

                                }
                            </div>

                        )


                    }
                </div>
            </Modal>

            <ModalDelete onSuccess={DeleteItemsProducts} />

            <Modal
                title={""}
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
                        disabled={loading}
                        onClick={seelingApplication}
                        className="btn btn-success d-block px-4 py-2">
                        <span className="fs-3">Tasdiqlash</span>
                    </button>
                </div>
            </Modal>

            <Modal
                title={""}
                open={confirm}
                onOk={() => (setAccept(true), setConfirm(false))}
                footer={null}
                width={800}
                onCancel={() => (setConfirm(false))}
                centered
            >
                <div className="modal-dating">
                    <h3>
                        Birja.soff.uz platformasidan foydalanish qonun-qoidalari
                    </h3>
                    <h4>1. Umumiy qoidalar</h4>
                    <p>
                        1.1. Siz birja.soff.uz platformasiga tashrif buyurar ekansiz, quyida belgilangan qonun-qoidalar va shartlarga rozilik bildirgan hisoblanasiz.
                    </p>
                    <p>
                        1.2. Birja.soff.uz platformasida (keyingi o‘rinlarda «Platforma» deb yuritiladi) taqdim etilayotgan xizmatlar, biznes rejalar, ma’lumotlar, qo’llanmalar, referatlar, prezentatsiyalar va boshqalar shartli ravishda mahsulot deb nomlanadi va ularning barchasi faqat Soff.uz qidiruv tizimida mavjud bo’lgan mahsulotlar bo’la oladi. Ularga Platmormada faqatgina egalik huquqlarini amlashishi imkoniyatlarini yaratib beriladi.
                    </p>
                    <h4>2. Sotuvchi bo’lib ro’yxatdan o’tish</h4>
                    <p>
                        2.1. Platformada Soff.uzdagi o’z mahsulotlarini egalik huqularini sotish yoki aksincha boshqa sotuvchilarga tegishli bo’lgan mahsulotlarning egalik huquqlarini sotib olish orqali daromad qilish va boshqalarni amalga oshirish uchun Platformadan «Sotuvchi» bo’lib ro’yxatdan o’tish lozim. Ro’yxatdan o’tish davomida sotuvchi barcha ma’lumotlar haqqoniy va to’g’ri to’ldirilishiga javobgar hisoblanadi.
                    </p>
                    <h4>3. Sotuvchi mahsulotlarini birja.soff.uz birjasiga sotuvga chiqarish shartlari</h4>
                    <p>
                        3.1. Sotuvchi mahsulotlarining egalik huqularini birja.soff.uz birjasiga sotuvga chiqarar ekan, mahsulot o‘z muallifligi ostida bo‘lishi shart.
                    </p>
                    <p>
                        3.2. Sotuvchi Platformada mahsulotining faqat egalik huquqini sota oladi, mualliflik huquqi esa saqlanib qoladi.
                    </p>
                    <p>
                        3.3. Sotuvchi o’z mahsulotining egalik huquqini Platformada sotib yuborar ekan, Soff.uz’dan aynan o’sha mahsulotdan kelgusida keladigan daromadlarini ham butunlay egalik huquqi bilan birga o'tkazadi. Shuning uchun sotuvchilarga mahsulotlarining egalik huquqini sotishdan oldin diqqat bilan qaror qabul qilish tavsiya etiladi. Yuqorida takidlaganimizdek mahsulotning faqat egalik huquqi va kelgusi barcha daromadlari o’tadi lekin mualliflik doimiy saqlanib qoladi.
                    </p>
                    <p>
                        3.4 Mahsulotning egalik huquqi miqdori muallifning hohishi bilan belgilanadi va mahsulotning ayni paytdagi narxidan bir necha barobar katta bo'lishi ham mumkin.
                    </p>
                    <p>
                        3.5 Muallif o’z mahsulotining egalik huquqini sotganidan so’ng, kelgusida yana shu mahsulotning egalik huquqlari boshqa bir sotuvchiga o’tgan vaqtda, mahsulotning egalik huquqi miqdori sumasidan 5% mahsulot muallifiga o'tadi va bu holat doimiy ravishda takrorlanib boradi.
                    </p>
                    <h4>
                        4. Mahsulotning egalik huquqini sotish shakllari
                    </h4>
                    <p>
                        4.1. Mahsulotlarni egalik huqulari birja.soff.uz birjasida ikki xil shaklda sotish mumkin: «Bittada sotish» yoki «Auksionda sotish».
                    </p>
                    <p>
                        4.2 Bittada Sotish: Sotuvchi mahsulotning egalik huquqi uchun ma’lum bir narx belgilaydi va sotish jarayoni shu narxda amalga oshiriladi. Belgilangan vaqt ichida mahsulotning egalik huquqi sotilmasa, u qayta sotuvchining o’zida qoladi. Sotuvchi o’z hohshiga qarab qayta va qayta birja.soff.uz birjasiga mahsulotining egalik huquqini sotuvga chiqarishi mumkin bo‘ladi.
                    </p>
                    <p>
                        4.3. Auksionda Sotish: Sotuvchi mahsulotning egalik huquqi uchun boshlang‘ich narx belgilaydi va boshqa sotuvchilar ushbu mahsulotning egalik huquqi uchun o‘z takliflarini berishadi. Vaqt tugaganidan so‘ng eng yuqori taklif beruvchiga mahsulotning egalik huquqi o‘tkaziladi.
                    </p>
                    <h4>
                        5. Sotuvchilarning huquq va majburiyatlari
                    </h4>
                    <h5>
                        5.1. Huquqlar:
                    </h5>
                    <p>
                        5.1.1. Platforma tizimida erkin ro’yxatdan o’tish;
                    </p>
                    <p>
                        5.1.2. Platforma tomonidan taqdim etilayotgan xizmatlarga o’z muallifligi ostidagi mahsulotlarini qo’shish;
                    </p>
                    <p>
                        5.1.3. Xarid qilingan mahsulotlarning egalik huquqidan erkin foydalanish (mahsulotlardan tijorat hamda foyda olish maqsadida Soff.uz’dan boshqa saytlardan foydalanish taqiqlanadi);
                    </p>
                    <p>
                        5.1.4. Sotuvchi tomonidan xarid qilingan mahsulotning egalik huquqi, kelgusida Soff.uz qidiruv tizimida bu mahsulotdan kelgan daromadning barchasiga egalik qilishi.
                    </p>
                    <p>
                        5.1.5. Muallif sotib yuborgan mahsulotning egalik huquqidan so’ng, kelgusida bu mahsulotning egalik huquqi har safar almashilgandagi pul miqdorning 5% qismiga sherik bo’lishi(4.5 bandga ko’ra).
                    </p>
                    <p>
                        5.1.6. Sotuvchi o’z hohshiga qarab Platformaga xarid qilgan mahsulotlarining egalik huquqini qayta sotuvga chiqarish mumkin.
                    </p>
                    <p>
                        5.1.7. Xarid qilingan mahsulotlarning egalik huquqi bo’yicha xabarnomalarni ro’yxatdan o’tish davomida sotuvchi tomonidan kiritilgan elektron pochta (e-mail) orqali qabul qilib olish yoki o’zining shaxsiy profilidagi «Mahsulotlar» sahifasiga kirish orqali qabul qilib olish;
                    </p>
                    <p>
                        5.1.8. Sotuvchining sotilgan har bir mahsulotning egalik huquqi bo’yicha xabarnomalarni ro’yxatdan o’tish davomida sotuvchi tomonidan kiritilgan elektron pochta (e-mail) orqali qabul qilib olish yoki o’zining shaxsiy profilidagi «Mahsulotlar» sahifasiga kirish orqali qabul qilib olish;
                    </p>
                    <p>
                        5.1.9. Sotuvchining sotilgan mahsulotlarining egalik huquqi yig’indisidan platforma ulushining (sotilgan mahsulotning egalik huquqi 5% i) qiymatini ayirgan holatda hosil bo’lgan summani o’z kartalariga tashlab olish;
                    </p>
                    <p>
                        5.1.10. Platforma ma’muriyatiga murojaat qilish huquqlariga ega.
                    </p>
                    <h5>5.2. Majburiyatlar:</h5>
                    <p>
                        5.2.1. Sotuvchi yoki muallif sotib yuborgan mahsulotning egalik huquqidan so’ng, kelgusida Soff.uz qidiruv tizimida bu mahsulotdan kelgan daromadga egalik qila olmasligi.
                    </p>
                    <p>
                        5.2.2. Sotuvchi Platforma tizimida ro’yxatdan o’tish davmida so’ralgan ma’lumotlarni to’g’ri kiritishi shart;
                    </p>
                    <p>
                        5.2.3. Platforma sotuvchilari o’zaro aloqalar davomida beadab, haqoratli va behurmat qiladigan jumlalardan foydalanish hamda O’zbekiston Respublikasining amaldagi qonunchiligida taqiqlangan boshqa ma’lumotlarni o’z ichiga oluvchi xabarlarni jo’natish taqiqlanadi.
                    </p>
                    <p>
                        5.2.4. Ro’yxatdan o’tish jarayonida amalda mavjud bo’lgan, ishlaydigan elektron manzil (e-mail) kiritish shart;
                    </p>
                    <p>
                        5.2.5. Sotuvchining yig’ilgan summasini kartasiga tashlab olish jarayonidan uning miqdori 10 ming so’mdan kam bo’lmasligi shart.
                    </p>
                    <p>
                        5.2.6. Sotuvchi platformada sotilgan har bir mahsulotning egalik huquqi 5% ini platforma ma’muriyati olib qolishi shart.
                    </p>
                    <p>
                        5.2.7. Sotuvchi Platformaning foydalanish qonun-qoidalarida belgilangan talablarni to’liq bajarishi shart.
                    </p>
                    <h4>6. Javobgarlik</h4>
                    <p>
                        6.1. Platforma ma’muriyati sotuvchilarning noto’g’ri ma’lumot kiritishi va amallarni bajarishi sababli xarid qilish jarayonida yuzaga kelgan zarar, ziyon yoki xarajatlar uchun javobgar emas
                    </p>
                    <p>
                        6.2. Sotuvchi tomonidan xarid qilingan mahsulotning egalik huquqi sotuvchining Platformadagi o’z shaxsiy kabinetiga joylashtiriladi hamda elektron manziliga xabarnoma yuboriladi. Taqdim etilgan mahsulotning egalik huquqi sotuvchi tomonidan yuklab olinish, olinmasligi va boshqa har qanday holatlardan qat’iy nazar, mahsulotning egalik huquqi sotuvchi tomonidan xarid qilingan va Platforma tizimida yetkazib berildi deya belgilanadi hamda amalga oshirilgan summa qaytarilmaydi. Shu sababli, ro’yxatdan o’tish davrida amalda mavjud bo’lgan, ishlaydigan elektron manzil (e-mail) kiritish va to’lovni muvaffaqiyatli amalga oshirganingizdan so’ng e-mailingizni ham tekshirib turish zarur.
                    </p>
                    <p>
                        6.3. Platformada ro’yxatdan o’tish davomida kiritilgan ma’lumotlar haqqoniyligi uchun butun javobgarlik foydalanuvchi va sotuvchining o’z bo’ynida bo’ladi.
                    </p>
                    <p>
                        6.4. Platforma ma’muriyati to’lovni amalga oshirish jarayonida yuzaga kelgan zarar uchun javobgar emas.
                    </p>
                    <h4>7. Sotuvchining shaxsiy ma’lumotlarning daxlsizligi</h4>
                    <p>
                        7.1. Sotuvchining shaxsiy ma’lumotlarining daxlsizligi biz uchun juda muhim.
                    </p>
                    <p>
                        7.2. Biz quyidagi ma’lumotlarni statistik ko’rsatgichlarni aniqlash maqsadida to’playmiz va saqlaymiz:
                    </p>
                    <div>
                        <ul className='ms-4'>
                            <li>Sotuvchining Platformaga kirish uchun foydalangan IP-manzili;</li>
                            <li>Platformaga kirish uchun sotuvchi tomonidan ishlatilgan brauzer va operatsion tizim turi;</li>
                            <li>Platformaga kirish muddatlari;</li>
                            <li>Sotuvchi ko’rib chiqqan sahifalar va havolalar.</li>
                        </ul>
                    </div>
                    <p>
                        7.3. Biz ushbu manzillardan foydalanuvchining shaxsini aniqlash maqsadida foydalanmaymiz, saytga qilingan hujumlar bundan mustasno.
                    </p>
                </div>

                <button onClick={() => (setAccept(true), setConfirm(false))} style={{ height: "40px" }} className="btn btn-success fs-4 px-4 w-100 mt-3">Tanishib chiqdim</button>
            </Modal>

        </section >
    );

}

export default SellingsLists;
