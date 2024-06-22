import React, { useEffect } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import { baseUrl } from '~/repositories/Repository';
import Meta from '~/components/shared/headers/Meta';
import { Modal } from 'antd';
import { useState } from 'react';
import { Image } from 'antd';
import Router, { useRouter } from 'next/router';
import ProductRepository from '~/repositories/ProductRepository';
import SellerProducts from '~/components/partials/seller/SellerProducts';
import SellerDonateForm from '~/components/partials/seller/SellerDonateForm';

const SellerPage = ({ seller, sellerr }) => {
    const [data, setData] = useState(seller);
    const [page, setPage] = useState(1);
    const router = useRouter();
    const { pid } = router.query;
    const [isModalOpenDonate, setIsModalOpenDonate] = useState(false);
    const [tab, setTab] = useState('tab-1');
    const [typeSelect, setTypeSelect] = useState('file');
    const [search, setSearch] = useState('');
    const [productType, setProductType] = useState(null);

    const handleOkDonate = () => {
        setIsModalOpenDonate(false);
    };

    const handleCancelDonate = () => {
        setIsModalOpenDonate(false);
    };

    const getSellerProduct = async (slug) => {
        const respons = await ProductRepository.getSellerProductSlugProducts(
            slug,
            page,
            typeSelect,
            search
        );
        if (respons) {
            setData(respons.data);
        }
    };


    const getSellerDocumentType = async (slug) => {
        const respons = await ProductRepository.getSellerProductNameSlug(slug);
        if (respons) {
            setProductType(respons?.data);
        }
    };


    const handlePagination = async (e) => {
        setPage(e);
        const respons = await ProductRepository.getSellerProductSlugProducts(
            pid,
            e,
            typeSelect,
            search
        );
        if (respons) {
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
                ? `${formattedIntegerPart}`
                : formattedIntegerPart;

        return formattedNumber;
    }


    useEffect(() => {
        if (pid) {
            getSellerDocumentType(pid);
        }
    }, [pid]);


    useEffect(() => {
        if (pid) {
            getSellerProduct(pid);
        }
    }, [pid, typeSelect, search]);


    return (
        <PageContainer>
            <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
            <Meta
                title={`${sellerr?.seller?.full_name}  `}
                description={`Soff.uz sayti sotuvchisi - ${sellerr?.seller?.full_name} ning barcha mahsulotlarini shu yerda ko'rishingiz mumkin`}
            />
            <Modal
                title="Qo'llab quvvatlash"
                open={isModalOpenDonate}
                onOk={handleOkDonate}
                onCancel={handleCancelDonate}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { backgroundColor: '#c5ab35' } }}>
                <p>Tez kunda!</p>
                <p>
                    Xurmatli Soff.uz foyalanuvchisi, siz bu yerda Sotuvchiga
                    O'zingizni Anonim yoki ismingizni kiritgan holda xabar
                    yo'llashingiz va ular uchun donat summasini o'tkazishingiz
                    mumkin bo'ladi. Sotuvchiga siz ko‘rsatgan summa to‘liq
                    o‘tkazilib beriladi. Hamda qo'llab quvvatlash maqsadida
                    biror bir mahsulotini sotib olishingiz mumkin.
                </p>
            </Modal>

            <div className="ps-product-list mb-5">
                <div className="seller-account-page">
                    <div className="container">
                        <div className="user_profile_container mt-5">
                            <div
                                className="user_profile_card"
                                style={{
                                    backgroundImage: `url(${sellerr?.seller?.background_image
                                        ? sellerr?.seller?.background_image
                                        : '/static/img/orqafon1.avif'
                                        })`,
                                }}>
                                <div className="profile_images_card">
                                    <Image.PreviewGroup>
                                        <Image
                                            width={200}
                                            src={`${sellerr?.seller?.image
                                                ? sellerr?.seller?.image
                                                : '/static/img/ozodbek.png'
                                                }`}
                                        />
                                    </Image.PreviewGroup>

                                </div>
                            </div>
                            <div className="user_profile_body usr_bodyy">
                                {sellerr?.seller && (
                                    <div className="d-flex justify-content-between user_titleCard ">
                                        <div>
                                            <h1>
                                                {sellerr?.seller?.full_name}{' '}
                                            </h1>

                                            <p>
                                                Ro'yxatdan o'tgan sana:{' '}
                                                {sellerr?.created_at}{' '}
                                            </p>
                                        </div>
                                        <div className="col-12 col-md-9 user_cardss">
                                            <div className="row justify-content-center">
                                                <div className="col-10 col-sm-6 col-md-4 mt-3">
                                                    <div className="d-flex align-items-center">
                                                        <i className="fa-regular fa-hard-drive fa-2x mr-4"></i>
                                                        <div>
                                                            <p className="h1">
                                                                {
                                                                    sellerr?.total_approved_documents
                                                                }{' '}
                                                                ta
                                                            </p>
                                                            <p className="h4">
                                                                Jami mahsulotlar
                                                                soni
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-10 col-sm-6 col-md-4 my-3">
                                                    <div className="d-flex align-items-center">
                                                        <i className="fa-regular fa-handshake fa-2x mr-4"></i>
                                                        <div>
                                                            <p className="h1">
                                                                {
                                                                    sellerr?.total_sold_documents
                                                                }{' '}
                                                                ta
                                                            </p>
                                                            <p className="h4">
                                                                Sotilgan
                                                                mahsulotlari
                                                                soni
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-10 col-sm-6 col-md-4 my-3">
                                                    <div className="d-flex align-items-center">
                                                        <i className="fa-regular fa-gem fa-2x mr-4"></i>
                                                        <div>
                                                            <p className="h1">
                                                                {addPeriodToThousands(
                                                                    sellerr?.total_income
                                                                )}{' '}
                                                                so'm
                                                            </p>
                                                            <p className="h4">
                                                                Daromad
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-xl-flex d-lg-flex d-md-flex d-sm-flex justify-content-center align-items-center gap-5 py-4 ">
                                                <a
                                                    href="#products"
                                                    className={`text-white ps-btn w-100 text-center pb-4 pt-4 ${tab === 'tab-1'
                                                        ? 'donate-color-btn'
                                                        : ''
                                                        }`}
                                                    style={{
                                                        textDecoration: 'none',
                                                    }}
                                                    onClick={() =>
                                                        setTab('tab-1')
                                                    }>
                                                    {' '}
                                                    <i className="fa-regular fa-pen-to-square"></i>{' '}
                                                    Mahsulotlari
                                                </a>
                                                <button
                                                    className={`text-white ps-btn w-100 mt-3 mt-xl-0 mt-lg-0 mt-md-0 mt-sm-0 ${tab === 'tab-2'
                                                        ? 'donate-color-btn'
                                                        : ''
                                                        }`}
                                                    onClick={() => Router.push("/account/all-orders?show=modal")}

                                                >
                                                    {' '}
                                                    <i className="fa-regular fa-pen-to-square"></i>{' '}
                                                    Buyurtma berish
                                                </button>
                                                <button
                                                    className={`text-white ps-btn w-100 mt-3 mt-xl-0 mt-lg-0 mt-md-0 mt-sm-0 ${tab === 'tab-3'
                                                        ? 'donate-color-btn'
                                                        : ''
                                                        }`}
                                                    // onClick={showModalDonate}
                                                    onClick={() =>
                                                        setTab('tab-3')
                                                    }>
                                                    {' '}
                                                    <i className="fa-solid fa-hand-holding-medical"></i>{' '}
                                                    Qo'llab quvvatlash
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="seller_contaoner2">
                                <select

                                    onChange={(e) =>
                                        setTypeSelect(e.target.value)
                                    }
                                    className="form-control seller_filter rounded-3">
                                    {productType?.map((e) => {
                                        return (
                                            <option value={e.type} selected={e?.type === typeSelect} >
                                                {

                                                    e?.type === 'audio' ? "Audio materiallar" :
                                                        e?.type === 'video' ? "Video materiallar" :
                                                            e?.type === 'template' ? "Shablon materiallar" : "Hujjat materiallar"


                                                }
                                                {e?.count !== 0
                                                    ? `- ${e?.count} ta`
                                                    : ''}
                                            </option>
                                        );
                                    })}
                                </select>
                                <input
                                    type="text"
                                    placeholder="Qidiruv..."
                                    onInput={(e) => setSearch(e.target.value)}
                                    className="form-control  rounded-3 seller_filter_option"
                                />

                            </div>
                        </div>
                    </div>
                </div>
                {tab === 'tab-1' ? (
                    <SellerProducts
                        data={data}
                        page={page}
                        handlePagination={handlePagination}
                    />
                ) : tab === 'tab-2' ? (
                    <SellerProducts
                        data={data}
                        page={page}
                        handlePagination={handlePagination}
                    />
                ) : (
                    <SellerDonateForm />
                )}
            </div>
        </PageContainer>
    );
};

export async function getServerSideProps({ query }) {
    const resquest_boolen = await fetch(
        baseUrl + `customer/documents/?seller__id=${query.pid}`
    );
    const resquest = await fetch(
        baseUrl + `customer/top-sellers/${query.pid}`
    );
    const seller = await resquest_boolen?.json();

    const sellerr = await resquest.json();

    return {
        props: {
            seller,
            sellerr
        },
    };
}

export default SellerPage;
