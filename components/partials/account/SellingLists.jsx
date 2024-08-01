import React, { useEffect } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { Modal, Pagination, Table } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import useDebounce from '~/hooks/useDebounce';
import CalculateTimeDifference from './DateFormatter';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { addPeriodToThousands } from './ProductsLists';




function SellingsLists() {
    const { accountLinks, user } = useSelector((state) => state.auth);
    const [data, setData] = useState([]);
    const [evaluation, setEvaluation] = useState(null);
    const [searchdata, setSearchData] = useState([]);
    const [search, setSearch] = useState('');
    const [searchProducts, setSearchProducts] = useState('');
    const debunce = useDebounce(search, 800)
    const debunceProducts = useDebounce(searchProducts, 800)
    const [pageCount, setPageCount] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [loadingEval, setLoadingEval] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);


    async function GetItems(page) {
        setLoading(true)
        const ItemsData = await GetRepository.getShopsListsEval(
            page,
            debunceProducts,
            user?.access
        );
        if (ItemsData?.results) {
            setData([...ItemsData?.results]);
            setPageCount(ItemsData.count);
        }
        setLoading(false)
    }

    async function GetProductsSearch() {
        const ItemsData = await GetRepository.getSellingLists(debunce, user?.access);
        if (ItemsData?.results) {
            setSearchData(ItemsData?.results);
        }
    }

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

    const handlePagination = (pageNum) => {
        setCurrPage(pageNum);
        GetItems(pageNum, debunceProducts);
    };

    useEffect(() => {
        if (isModalOpen) {
            GetProductsSearch()
        }
    }, [debunce, isModalOpen, user?.access])

    useEffect(() => {
        GetItems()
    }, [debunceProducts, user?.access])



    const columns = [
        {
            title: 'Rasm',
            dataIndex: 'image',
            key: 'image',
            render: (image) => (
                <div>
                    {image?.poster_url ? (
                        <NextImageCard
                            url={image?.poster_url}
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
            dataIndex: 'name',
            key: 'age',
            width: 300,
            render: (name) => (
                <span className="truncate whitespace-nowrap">
                    {' '}
                    {name?.title}
                </span>
            ),
        },
        {
            title: 'Kategoriya',
            dataIndex: 'category',
            key: 'address',
            width: 350,
            render: (category) => (
                <span key={category.id}>
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
                <span key={price}>
                    {' '}
                    <i className="fa-solid fa-coins text-warning"></i>{' '}
                    {+price == 0 ? 'Bepul' : addPeriodToThousands(price)}
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

                                    <div className='row px-3 gap-3 mb-4 align-items-start'>
                                        <label
                                            className={'rounded-3  col-md-9  form-label border p-0 d-flex justify-content-between align-items-center'}
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
                                        <button className='btn btn-success py-2  rounded-3 col-md-2 '
                                            style={{ height: "43px" }}
                                            onClick={() => setIsModalOpen(true)} >
                                            <span className='fs-4'>Baholash</span>
                                        </button>
                                    </div>



                                    <Table

                                        scroll={{ x: 1200 }}
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
                            <div style={{ height: "100%", overflowY: "auto",width: "90%" }}>
                                {
                                    <div className='d-flex  flex-column gap-3 mx-auto' style={{ height: "100%" }} >

                                        <div className='d-flex align-items-center justify-content-between border p-3 w-100 my-4'>
                                            <span className='fw-bold text-secondary  fs-4 w-75 text-truncate'>{evaluation.document}:</span>
                                            <span className='fw-bold text-secondary  fs-4 w-25 text-end'>{(addPeriodToThousands(evaluation?.document_price))} so'm</span>
                                        </div>

                                        <div className='d-flex align-items-center justify-content-between border p-3 w-100'>
                                            <span className='fw-bold text-secondary  fs-4'>Taklif summasi:</span>
                                            <span className='fw-bold text-secondary  fs-4'>{addPeriodToThousands(evaluation?.total_amount)} so'm</span>
                                        </div>
                                        <div className='d-flex align-items-center justify-content-between border p-3 w-100'>
                                            <span className='fw-medium  text-secondary fs-4'>Kategoriya bo'yicha baholash :</span>
                                            <span className='fw-medium  text-secondary fs-4'>{addPeriodToThousands(evaluation?.amount_by_category)} so'm</span>
                                        </div>
                                        <div className='d-flex align-items-center justify-content-between border p-3 w-100'>
                                            <span className='fw-medium  text-secondary fs-4 '>Kategoriya bo'yicha baholash :</span>
                                            <span className='fw-medium  text-secondary fs-4 '> {addPeriodToThousands(evaluation?.amount_by_purchased_docs_in_category)} so'm</span>

                                        </div>
                                        <div className='d-flex align-items-center justify-content-between border p-3 w-100'>
                                            <span className='fw-medium  text-secondary fs-4 '>Tavsifi bo'yicha baholash :</span>
                                            <span className='fw-medium  text-secondary fs-4 '>{addPeriodToThousands(evaluation?.description_amount)} so'm</span>

                                        </div>
                                        <div className='d-flex align-items-center justify-content-between border p-3 w-100'>
                                            <span className='fw-medium  text-secondary fs-4'> Sotilganlar soni bo'yicha baholash:</span>
                                            <span className='fw-medium  text-secondary fs-4'>{addPeriodToThousands(evaluation?.price_purchase_count)} so'm</span>

                                        </div>
                                        <div className='d-flex align-items-center justify-content-between border p-3 w-100'>
                                            <span className='fw-medium  text-secondary fs-4'>Ko'rishlar soni bo'yicha baholash:</span>
                                            <span className='fw-medium  text-secondary fs-4'> {addPeriodToThousands(evaluation?.price_view_count)} so'm</span>

                                        </div>
                                        <button className="btn btn-success fs-4 px-4">Ariza yuborish</button>
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

                                            <span>
                                                {item.title}
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

        </section >
    );
}

export default SellingsLists;
