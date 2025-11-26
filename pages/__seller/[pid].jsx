import React, { useEffect } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/widgets/layouts/PageContainer';
import { baseUrl } from '~/repositories/Repository';
import Meta from '~/components/shared/headers/Meta';
import { Modal } from 'antd';
import { useState } from 'react';
import { Image } from 'antd';
import { useRouter } from 'next/router';
import ProductRepository from '~/repositories/ProductRepository';
import SellerProducts from '~/components/partials/seller/SellerProducts';
import SellerDonateForm from '~/components/partials/seller/SellerDonateForm';
import CalculateTimeDifference from '~/components/partials/account/DateFormatter';
import { addPeriodToThousands } from '~/components/partials/account/price-formatter';
import { useMediaQuery } from 'react-responsive';

const SellerPage = ({ seller, sellerr }) => {
    const isBigScreen = useMediaQuery({ query: '(max-width: 430px)' });
    const [data, setData] = useState(seller);
    const [page, setPage] = useState(1);
    const router = useRouter();
    if (!router.isReady) return null;
    const { pid } = router.query;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenDonate, setIsModalOpenDonate] = useState(false);
    const [tab, setTab] = useState('tab-1');
    const [typeSelect, setTypeSelect] = useState('file');
    const [search, setSearch] = useState('');
    const [productType, setProductType] = useState(null);
    const [dateTime, setDateTime] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleOkDonate = () => {
        setIsModalOpenDonate(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
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
        if (respons?.status === 200) {
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

    function checkIfUserIsOnline(lastVisit) {
        const currentTime = new Date();
        const lastVisitTime = new Date(lastVisit);
        const fiveMinutesAgo = new Date(
            currentTime.getTime() - lastVisitTime?.getTime()
        );

        if (300000 >= fiveMinutesAgo) {
            return setDateTime(true);
        } else {
            return setDateTime(false);
        }
    }

    useEffect(() => {
        checkIfUserIsOnline(sellerr?.seller?.last_login);
    }, [sellerr?.seller?.last_login]);

    return (
        <PageContainer>
            <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
            <Meta
                title={`${sellerr?.seller?.full_name}  `}
                description={`Soff.uz sayti sotuvchisi - ${sellerr?.seller?.full_name} ning barcha mahsulotlarini shu yerda ko'rishingiz mumkin`}
            />
            <Modal
                title="Buyurtma berish "
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { backgroundColor: '#00A44F' } }}>
                <p>Tez kunda!</p>
                <p>
                    Xurmatli Soff.uz foyalanuvchisi, siz bu yerda Sotuvchiga
                    mahsulot yoki xizmat buyurtmasini berishingiz mumkin
                    bo'ladi.
                </p>
            </Modal>
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
                                    backgroundImage: `url(${
                                        (isBigScreen
                                            ? sellerr?.seller
                                                  ?.mobile_background_image
                                            : sellerr?.seller
                                                  ?.background_image) ||
                                        '/static/img/orqafon1.avif'
                                    })`,
                                }}>
                                <div className="profile_images_card">
                                    <Image.PreviewGroup>
                                        <Image
                                            width={200}
                                            src={`${
                                                sellerr?.seller?.image
                                                    ? sellerr?.seller?.image
                                                    : '/static/img/ozodbek.png'
                                            }`}
                                        />
                                    </Image.PreviewGroup>
                                    <i
                                        className={`fa-solid fa-circle iconOnlayn text-${
                                            dateTime ? 'success' : 'secondary'
                                        }`}></i>
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
                                            {dateTime ? (
                                                <p className="text-success fw-bold">
                                                    Onlayn
                                                </p>
                                            ) : (
                                                sellerr?.seller?.last_login && (
                                                    <p>
                                                        Oxirgi marta:{' '}
                                                        <CalculateTimeDifference
                                                            targetDate={
                                                                sellerr?.seller
                                                                    ?.last_login
                                                            }
                                                        />
                                                    </p>
                                                )
                                            )}
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
                                                    className={`text-white ps-btn w-100 text-center pb-4 pt-4 ${
                                                        tab === 'tab-1'
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
                                                    className={`text-white ps-btn w-100 mt-3 mt-xl-0 mt-lg-0 mt-md-0 mt-sm-0 ${
                                                        tab === 'tab-2'
                                                            ? 'donate-color-btn'
                                                            : ''
                                                    }`}
                                                    onClick={showModal}>
                                                    {' '}
                                                    <i className="fa-regular fa-pen-to-square"></i>{' '}
                                                    Buyurtma berish
                                                </button>
                                                <button
                                                    className={`text-white ps-btn w-100 mt-3 mt-xl-0 mt-lg-0 mt-md-0 mt-sm-0 ${
                                                        tab === 'tab-3'
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
                                            <option
                                                value={e.type}
                                                selected={
                                                    e?.type === typeSelect
                                                }
                                                key={e?.type}>
                                                {e?.type === 'audio'
                                                    ? 'Audio materiallar'
                                                    : e?.type === 'video'
                                                    ? 'Video materiallar'
                                                    : e?.type === 'template'
                                                    ? 'Shablon materiallar'
                                                    : 'Hujjat materiallar'}
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
    const response = await fetch(baseUrl + `customer/top-sellers/${query.pid}`);

    // Agar topilmasa yoki status 404 bo‘lsa
    if (!response.ok) {
        return {
            notFound: true,
        };
    }

    const sellerr = await response.json();

    // Agar JSON bo‘lsa ham lekin seller topilmagan bo‘lsa:
    if (!sellerr?.seller) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            seller: {},
            sellerr,
        },
    };
}

export default SellerPage;
