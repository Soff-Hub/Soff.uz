import React, { useEffect, useState } from 'react';
import DealsSidebar from './modules/DealsSidebar';
import DealsList from './DealsList';
import { Dropdown, Menu, Modal, Pagination, Space, Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import GetRepository from '~/reositoriy-admin/GetRepository';
import useDebounce from '~/hooks/useDebounce';
import ModalDelete from './Modal';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import DealsListUpdate from './DealsListUpdate';
import TextDescription from '~/components/progress/textDescription';



export default function MyOrders() {
    const { user } = useSelector((state) => state.auth);
    const [data, setData] = useState([]);
    const [dataDetails, setDataDtails] = useState({});
    const [currPage, setCurrPage] = useState(1);
    const [productsId, setProductsId] = useState('');
    const [productsIdUpdate, setProductsIdUpdate] = useState('');
    const [pageCount, setPageCount] = useState(0);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [keyword, setKeyword] = useState('');
    const debouncedSearchTerm = useDebounce(keyword, 300);
    const [category, setCategory] = useState(null)
    const [loading, setloading] = useState(false);
    const [loadingUpdate, setloadingUpdate] = useState(false);


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


    async function GetItemsProducts() {
        setloading(true)
        const token = user?.access
        const ItemsData = await GetRepository.getOrdersMYDealLists(currPage, debouncedSearchTerm, '', category, token);
        if (ItemsData?.results) {
            setPageCount(ItemsData.count);
            setData(ItemsData.results);
        }
        setDataDtails(ItemsData)
        setloading(false)
    }

    async function GetItemsProductsUpdates() {
        setloadingUpdate(true)
        const token = user?.access
        const ItemsData = await GetRepository.getOrdersMYDealListsUpdate(productsIdUpdate, token);
        setDataDtails(ItemsData);
        setloadingUpdate(false)

    }


    async function DeleteItemsProducts() {
        const ItemsData = await PatchRepository.getMyDealsDelete(
            productsId,
            user?.access
        );
        if (ItemsData?.status === 204) {
            GetItemsProducts(currPage, '', '', '', user?.access)
            const modal = Modal.error({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: `Siz malumotlarni o'chirdingiz`,
            });
        } else {
            const modal = Modal.error({
                centered: true,
                title: 'Xatolik!',
                content: ItemsData?.status === 404 ? "O'chirish imkoniyati mavjud emas!" : ItemsData?.status + ' ' + ItemsData?.statusText,
            });
        }
    }

    function handleClickUpdate(id) {
        if (id) {
            setProductsIdUpdate(id)
            setOpenUpdate(true)
        }
    }


    const handlePagination = (pageNum) => {
        setCurrPage(pageNum);
    };

    useEffect(() => {
        if (user?.access) {
            GetItemsProducts();
        }
    }, [currPage, debouncedSearchTerm, open, open2, category, user?.access]);


    useEffect(() => {
        if (user?.access) {
            GetItemsProductsUpdates()
        }
    }, [productsIdUpdate, openUpdate]);



    return (
        <div className={`container row mx-auto p-0  d-flex align-items-start mt-5`}>

            <div className='col-md-3'>
                <DealsSidebar />
            </div>

            <div className={"col-md-9 mb-4"}>
                <div className='d-flex justify-content-between gap-3 mb-2  row px-4'>
                    <div className={'ps-form__input d-flex align-items-center position-relative p-0'} style={{ flex: 1 }}>
                        <input
                            className={"form-control input2 bg-white rounded-3  "}
                            type="text"
                            placeholder="Qidiruv..."
                            onChange={(e) => (setKeyword(e.target.value))}
                            style={{ minHeight: "42px" }}
                        />
                        <span className="ps-form__action position-absolute" style={{ right: '15px' }}>
                            <i className='fa-solid fa-search button_search_icon text-success' ></i>
                        </span>
                    </div>

                    <select
                        className="form-select col-md-3 fs-3 py-3 rounded-3"
                        onChange={(e) =>
                            setCategory(
                                e.target
                                    .value
                            )
                        }>
                        <option
                            className="fs-3"
                            selected
                            value="">
                            Barcha
                            holatlar
                        </option>
                        <option
                            className="fs-3"
                            value="new">
                            Moderatsiya
                        </option>
                        <option
                            className="fs-3"
                            value="active">
                            Tasdiqlangan
                        </option>
                        <option
                            className="fs-3"
                            value="cancelled">
                            Bekor
                            qilingan
                        </option>
                    </select>

                    <button className='col-md-3  btn btn-success rounded-3 fs-4 py-3'
                        onClick={() => setOpen(true)} >
                        <i class="fa-solid fa-plus"></i>   Buyurtma yaratish
                    </button>
                </div>
                <div className='mb-2'>
                    <span className='text-secondary'>Mening  buyurtmalarim soni {data?.length} ta </span>
                </div>

                <div className='d-flex flex-column gap-3'>
                    {
                        loading ?

                            <div
                                className=" "
                                style={{
                                    height: '70vh',
                                    display: 'grid',
                                    placeContent: 'center',
                                }}>
                                <div
                                    className="spinner-border "
                                    role="status"
                                    style={{ width: '150px', height: '150px' }}>
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                            </div>
                            :

                            <>
                                {
                                    data?.map(item => (
                                        <div key={item?.id} className="border border-2 rounded-3 p-4 bg-white">
                                            <div className='d-flex justify-content-between gap-4 align-items-start'>
                                                <h3 className="text-success fw-medium ">{item?.title}</h3>

                                                {
                                                    item?.status !== 'active' ?
                                                        <Dropdown
                                                            overlay={(
                                                                <Menu>
                                                                    <Menu.Item key="0">
                                                                        <span style={{ cursor: "pointer" }} onClick={() => handleClickUpdate(item?.id)} >
                                                                            Tahrirlash
                                                                            <i className="fa-solid fa-pen-to-square mx-3 text-success-emphasis"></i>
                                                                        </span>
                                                                    </Menu.Item>
                                                                    <Menu.Item key="1">
                                                                        <a data-bs-target="#exampleModalToggle" data-bs-toggle="modal">
                                                                            O'chirish
                                                                            <i
                                                                                className="fa-solid fa-trash-can text-danger mx-2"
                                                                                onClick={() => setProductsId(item?.id)}
                                                                            ></i>
                                                                        </a>
                                                                    </Menu.Item>
                                                                </Menu>
                                                            )}
                                                            trigger={['click']}
                                                        >
                                                            <a className='d-flex justify-content-center' style={{
                                                                cursor: "pointer",
                                                                minWidth: "20px"

                                                            }} onClick={(e) => e.preventDefault()}>
                                                                <Space>
                                                                    <i onClick={() => setProductsId(item?.id)} className="fa-solid fa-ellipsis-vertical"></i>
                                                                </Space>
                                                            </a>

                                                        </Dropdown>
                                                        : <></>
                                                }

                                            </div>
                                            <TextDescription text={item?.description} />

                                            <div>
                                                <div className="d-flex justify-content-between gap-4 align-items-center ">
                                                    <div className="d-flex align-items-center ">
                                                        <img
                                                            className="d-block"
                                                            width={50}
                                                            src="/static/img/docCopy.jpg"
                                                            alt="sca"
                                                        />
                                                        <div>

                                                            <div>
                                                                {' '}
                                                                <span className="fw-medium text-success fs-5 ">Narxi:</span>{' '}
                                                                <span className="text-secondary fs-5 fw-medium ">
                                                                    {addPeriodToThousands(item?.price)} so'm
                                                                </span>
                                                            </div>

                                                            <div>
                                                                <span className="text-success fs-5 fw-medium">
                                                                    Buyurtma sohasi:
                                                                </span>{' '}
                                                                <span className="fw-medium text-secondary fs-5">
                                                                    {item?.type?.name}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <span className="text-success fs-5 fw-medium">
                                                                    Aloqa:
                                                                </span>{' '}
                                                                <span className="fw-medium text-secondary fs-5">
                                                                    {item?.contact_info}
                                                                </span>
                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='mt-3 d-flex justify-content-between'>
                                                    <div>
                                                        <span className="text-success fs-5 fw-medium">
                                                            Topshirish sanasi:
                                                        </span>{' '}
                                                        <span className="fw-medium fs-5">
                                                            {item?.deadline_date}
                                                        </span>
                                                    </div>

                                                    {
                                                        item?.status === 'new' ? (
                                                            <span>
                                                                <i className="text-primary-emphasis fa-solid fa-circle-info"></i>{' '}
                                                                Moderatsiya
                                                            </span>
                                                        ) : item?.status === 'active' ? (
                                                            <span>
                                                                <i className="fa-solid text-success fa-circle-check"></i>{' '}
                                                                Tasdiqlangan
                                                            </span>
                                                        ) : (
                                                            <Tooltip title={item?.reason}>
                                                                <span style={{ cursor: 'pointer' }}>
                                                                    <i className="fa-solid fa-circle-question text-danger"></i>{' '}
                                                                    Bekor qilingan{' '}
                                                                </span>
                                                            </Tooltip>
                                                        )
                                                    }
                                                </div>
                                            </div>

                                        </div>
                                    ))

                                }
                                <div className='d-flex justify-content-center my-4 '>
                                    <Pagination
                                        className="mt-3"
                                        total={pageCount}
                                        defaultCurrent={currPage}
                                        onChange={handlePagination}
                                    />
                                </div>
                            </>
                    }
                </div>


            </div>


            <Modal
                title="Buyurtma yaratish"
                width={550}
                centered
                open={open}
                onOk={() => setOpen(false)}
                okText="Yopish"
                cancelButtonProps={{
                    style: {
                        display: 'none',
                    },
                }}
                okButtonProps={{
                    style: {
                        display: 'none',
                    },
                }}

                onCancel={() => setOpen(false)}>

                <DealsList setOpen={setOpen} />
            </Modal>

            <Modal
                title="Buyurtmani tahrirlash"
                width={550}
                centered
                open={openUpdate}
                onOk={() => setOpenUpdate(false)}
                okText="Yopish"
                cancelButtonProps={{
                    style: {
                        display: 'none',
                    },
                }}
                okButtonProps={{
                    style: {
                        display: 'none',
                    },
                }}

                onCancel={() => setOpenUpdate(false)}>

                {
                    loadingUpdate ?

                        <div
                            className=" "
                            style={{
                                height: '100vh',
                                display: 'grid',
                                placeContent: 'center',
                            }}>
                            <div
                                className="spinner-border "
                                role="status"
                                style={{ width: '150px', height: '150px' }}>
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        </div>
                        :
                        <DealsListUpdate setOpenUpdate={setOpenUpdate} dataDetails={dataDetails} setOpen2={setOpen2} />
                }

            </Modal>


            <ModalDelete onSuccess={DeleteItemsProducts} />

        </div >
    );
}
