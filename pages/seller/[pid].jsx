'use client';

import React, { useEffect, useState } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import { baseUrl } from '~/repositories/Repository';
import Meta from '~/components/shared/headers/Meta';
import { Modal } from 'antd';
import { Image } from 'antd';
import { useRouter } from 'next/router';
import ProductRepository from '~/repositories/ProductRepository';
import SellerProducts from '~/components/partials/seller/SellerProducts';
import SellerDonateForm from '~/components/partials/seller/SellerDonateForm';
import CalculateTimeDifference from '~/components/partials/account/DateFormatter';
import { addPeriodToThousands } from '~/components/partials/account/price-formatter';
import { useMediaQuery } from 'react-responsive';
import FooterComponents from '~/components/blocks/footer/FooterComponents';

const SellerPage = ({ seller, sellerr }) => {
    const isBigScreen = useMediaQuery({ query: '(max-width: 430px)' });
    const [data, setData] = useState(seller);
    const [page, setPage] = useState(1);
    const router = useRouter();
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

    const getSellerProduct = async slug => {
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

    const getSellerDocumentType = async slug => {
        const respons = await ProductRepository.getSellerProductNameSlug(slug);
        if (respons?.status === 200) {
            setProductType(respons?.data);
        }
    };

    const handlePagination = async e => {
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

    function checkIfUserIsOnline (lastVisit) {
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

    if (!router.isReady) return null;

    return (
        <PageContainer>
            {/* <BreadCrumb breacrumb={breadCrumb} layout='fullwidth' /> */}
            <Meta
                title={`${sellerr?.seller?.full_name}  `}
                description={`Soff.uz sayti sotuvchisi - ${sellerr?.seller?.full_name} ning barcha mahsulotlarini shu yerda ko'rishingiz mumkin`}
            />
            <Modal
                title='Buyurtma berish '
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

            <div className='container p-xl-0'>
                <div className=' d-flex justify-content-between'>
                    <div className='w-25 bg-info h-screen'>
                        <div className=''></div>
                    </div>
                    <div className='w-75 bg-info h-screen'>
                        <div className=''></div>
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
            <FooterComponents />
        </PageContainer>
    );
};

export async function getServerSideProps({ query }) {
    const resquest = await fetch(
        baseUrl + `customer/top-sellers/${query.pid}`
    );

    const sellerr = await resquest.json();

    return {
        props: {
            seller: {},
            sellerr
        },
    };
}

export default SellerPage;
