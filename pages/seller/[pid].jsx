import React, { useEffect } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import { baseUrl } from '~/repositories/Repository';
import Product from '~/components/elements/products/Product';
import Meta from '~/components/shared/headers/Meta';
import { Modal, Pagination } from 'antd';
import { useState } from 'react';
import { useRouter } from 'next/router';
import ProductRepository from '~/repositories/ProductRepository';

const SellerPage = ({ seller }) => {
    const [data, setData] = useState(seller);
    const [sellerr, setSellerr] = useState(seller);
    const [page, setPage] = useState(1);
    const router = useRouter();
    const { pid } = router.query;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenDonate, setIsModalOpenDonate] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const showModalDonate = () => {
        setIsModalOpenDonate(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleOkDonate = () => {
        setIsModalOpenDonate(false);
    };

    const getSellerProduct = async (slug) => {
        const respons = await ProductRepository.getSellerProductSlug(
            slug,
            page
        );
        if (respons) {
            setData(respons.data);
        }
    };
    const getSellerUser = async (slug) => {
        const respons = await ProductRepository.getSellerProfileSlug(slug);
        if (respons) {
            setSellerr(respons?.data);
        }
    };

    const handlePagination = async (e) => {
        setPage(e);
        console.log(e);
        const respons = await ProductRepository.getSellerProductSlug(pid, e);
        if (respons) {
            console.log(respons.data);
            setData(respons.data);
        }
    };

    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: sellerr?.seller?.full_name
                ? sellerr?.seller?.full_name
                : 'Loading...',
        },
    ];

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
        if (pid) {
            getSellerProduct(pid);
            getSellerUser(pid);
        }
    }, [pid]);
    console.log('data', sellerr);
    // let productView = <SkeletonProductDetail />;
    return (
        <PageContainer>
            <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
            <Meta
                title={`Soff | Sotuvchi ${sellerr?.seller?.full_name}  `}
                description={`Saytimizga o'z mahsulotlarini sotuvga qo'yayotgan ${sellerr?.seller?.full_name} ning barcha mahsulotlarini ko'rishingiz mumkin`}
            />
            <Modal
                title="Buyurtma"
                open={isModalOpen}
                onOk={handleOk}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { backgroundColor: '#00A44F' } }}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
            <Modal
                title="Qo'llab quvvatlash"
                open={isModalOpenDonate}
                onOk={handleOkDonate}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { backgroundColor: '#c5ab35' } }}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
            <div className="ps-product-list mb-5">
                <div className="seller-account-page">
                    <div className="container">
                        <div className="document-seller-about my-5 row">
                            <div className="text-center col-12 col-md-4">
                                {sellerr?.seller?.image ? (
                                    <img
                                        alt="soff"
                                        src={`${sellerr?.seller?.image}`}
                                        className="profile__image"
                                    />
                                ) : (
                                    <img
                                        alt="soff"
                                        src={`/static/img/user-none.jpg`}
                                        className="profile__image"
                                    />
                                )}
                            </div>
                            <div className="col-12 col-md-8">
                                <p className="my-4 text-center text-md-left h1">
                                    {sellerr?.seller?.full_name}
                                </p>
                                <div className="row justify-content-center">
                                    <div className="col-10 col-sm-6 col-md-4 my-3">
                                        <div className="d-flex align-items-center">
                                            <i class="fa-regular fa-hard-drive fa-2x mr-4"></i>
                                            <div>
                                                <p className="h1">
                                                    {
                                                        sellerr?.total_approved_documents
                                                    }{' '}
                                                    ta
                                                </p>
                                                <p className="h4">
                                                    Jami mahsulotlar soni
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-10 col-sm-6 col-md-4 my-3">
                                        <div className="d-flex align-items-center">
                                            <i class="fa-regular fa-handshake fa-2x mr-4"></i>
                                            <div>
                                                <p className="h1">
                                                    {
                                                        sellerr?.total_sold_documents
                                                    }{' '}
                                                    ta
                                                </p>
                                                <p className="h4">
                                                    Sotilgan mahsulotlari soni
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-10 col-sm-6 col-md-4 my-3">
                                        <div className="d-flex align-items-center">
                                            <i class="fa-regular fa-gem fa-2x mr-4"></i>
                                            <div>
                                                <p className="h1">
                                                    {addPeriodToThousands(
                                                        sellerr?.total_income
                                                    )}{' '}
                                                    so'm
                                                </p>
                                                <p className="h4">Daromad</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-xl-flex d-lg-flex d-md-flex d-sm-flex justify-content-center align-items-center gap-5 py-4 ">
                                    <button
                                        className="text-white ps-btn w-100"
                                        onClick={showModal}>
                                        Buyurtma
                                        {' '}
                                        <i class="fa-regular fa-pen-to-square"></i>{' '}
                                    </button>
                                    <button
                                        className="text-white ps-btn w-100 donate-color-btn mt-3 mt-xl-0 mt-lg-0 mt-md-0 mt-sm-0"
                                        onClick={showModalDonate}>
                                        Qo'llab quvvatlash
                                        {' '}
                                        <i class="fa-solid fa-hand-holding-medical"></i>{" "}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container" style={{ marginTop: '30px' }}>
                    <div className="row">
                        {data?.results?.map((item) => (
                            <div
                                className="home-card col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-3 col-6"
                                key={item.id}>
                                <Product product={item} />{' '}
                            </div>
                        ))}
                    </div>
                    {data?.count >= 40 && (
                        <div className="text-center my-4">
                            <Pagination
                                total={data?.count}
                                pageSize={40}
                                responsive={true}
                                showSizeChanger={false}
                                current={page}
                                showTotal={(total, range) =>
                                    `${total} ta dan ${range[0]}-${range[1]} oralig'i `
                                }
                                onChange={(e) => handlePagination(e)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </PageContainer>
    );
};

export async function getServerSideProps({ query }) {
    const resquest = await fetch(
        baseUrl + `customer/documents/?seller__id=${query.pid}`
    );
    const seller = await resquest.json();

    return {
        props: {
            seller,
        },
    };
}

export default SellerPage;
