import { useQuery } from '@tanstack/react-query';
import { Button, Modal } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useCreateChat from '~/components/freeleance/chat/api/useCreateChat';
import CalculateTimeDifference from '~/components/partials/account/DateFormatter';
import { getDate, getStatus, getTimeAgo } from '~/utilities/calculateTime';

export default function SellerShortInfo({ sellerInfo }) {
    const [nameModal, setNameModal] = useState(false);
    const [fullName, setFullName] = useState(false);
    const [surName, setSurname] = useState(false);
    const { mutate: createChat } = useCreateChat();
    const { isLoggedIn } = useSelector(state => state.auth);
    const { push } = useRouter();
    const { data: servicesCat, isLoading } = useQuery({
        queryKey: ['seller_services', sellerInfo?.id],
        queryFn: () =>
            fetch(
                `${process.env.NEXT_PUBLIC_FREELEANCE_URL}/api/v1/customer/top-categories/${sellerInfo?.id}`
            ).then(res => res.json()),
        enabled: !!sellerInfo?.id,
    });

    function handleChange(params) {
        setFullName(params);
        setSurname(!countTogle);
    }

    const handleChat = () => {
        if (isLoggedIn) {
            createChat(sellerInfo?.id);
        } else {
            push('/auth/login');
        }
    };

    return (
        <div className="sellerInfo">
            <div className="aboutSeller">
                <img
                    className="sellerAvatar"
                    src={
                        sellerInfo?.image || '/static/img/user_without_img.png'
                    }
                    alt="seller-image"
                />
                <div className=" sellerNameContainer d-flex flex-column ">
                    <p className="sellerName m-0">{sellerInfo?.full_name}</p>
                    <p className=" m-0">{sellerInfo?.position || ''}</p>
                    <p style={{ color: '#312F30' }}>
                        Oxirgi faollik:{' '}
                        {0 < Number(getStatus(sellerInfo?.last_login)) < 5 ? (
                            <span className=" text-success">Online</span>
                        ) : (
                            <span>getStatus(sellerInfo?.last_login)</span>
                        )}
                    </p>
                </div>
            </div>

            <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-center gap-4">
                    <i className="fa-solid fa-clipboard-list fs-2"></i>
                    <p className="m-0">Freelance xizmatlari uchun ochiq</p>
                </div>
                {sellerInfo?.position && (
                    <div className="d-flex align-items-center gap-3">
                        <i className="fa-solid fa-circle-info fs-2"></i>
                        <p className="m-0">{sellerInfo?.position}</p>
                    </div>
                )}
                <div className="d-flex align-items-center gap-3">
                    <i className="fa-solid fa-globe fs-2"></i>
                    <p className="m-0">
                        {sellerInfo?.location || 'Tashkent, Uzbekistan'}
                    </p>
                </div>
            </div>
            <div className="d-flex flex-column gap-3">
                <button
                    onClick={handleChat}
                    style={{
                        background: '#00A44F',
                        color: 'white',
                        fontSize: '16px',
                    }}
                    className="btn ">
                    <i className="fa-solid fa-comment-dots"></i> Xabar yuborish
                </button>
                <button
                    onClick={() => push('#services')}
                    style={{
                        background: '#00A44F1A',
                        borderColor: '#00A44F80',
                        color: '#00A44F',
                        fontSize: '16px',
                    }}
                    className="btn">
                    <i className="fa-solid fa-calendar"></i> Buyurtma berish
                </button>
            </div>

            <div className="VerifiedInformation">
                <p className="VerifiedInformationTitle">
                    Tasdiqlangan ma'lumotlar
                </p>
                <ul className="VerifiedInformationInfoWrap">
                    <li className="VerifiedInformationInfo between  ">
                        <p className="titleInfo m-0 p-0">Telefon raqami</p>
                        <img
                            src={
                                sellerInfo?.phone
                                    ? '/static/img/checked.png'
                                    : '/static/img/unchecked.png'
                            }
                            alt=""
                        />
                    </li>
                    <li className="VerifiedInformationInfo between">
                        <p className="titleInfo m-0 p-0">Email manzil</p>
                        <img
                            src={
                                sellerInfo?.email
                                    ? '/static/img/checked.png'
                                    : '/static/img/unchecked.png'
                            }
                            alt=""
                        />
                    </li>
                </ul>
            </div>

            <div className="d-flex flex-column gap-3">
                <h4
                    style={{
                        fontWeight: 500,
                        fontSize: '16px',
                        marginBottom: 0,
                    }}>
                    Statistikalar
                </h4>
                <div className="d-flex justify-content-between align-items-center">
                    <span>Mahsulotlari soni</span>
                    <span style={{ fontWeight: 500 }}>
                        {sellerInfo?.total_products_count}
                    </span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <span>Sotilgan mahsulotlar</span>
                    <span style={{ fontWeight: 500 }}>
                        {sellerInfo?.total_sold_documents}
                    </span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <span>Jarayondagi ishlar</span>
                    <span style={{ fontWeight: 500 }}>
                        {sellerInfo?.progress_jobs_count}
                    </span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <span>Muvaffaqiyatsiz tugatilgan</span>
                    <span style={{ fontWeight: 500 }}>
                        {sellerInfo?.unsuccessful_jobs_count}
                    </span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <span>Muvaffaqiyatli tugatilgan</span>
                    <span style={{ fontWeight: 500 }}>
                        {sellerInfo?.successful_jobs_count}
                    </span>
                </div>
            </div>
            {sellerInfo?.bio && (
                <div className="d-flex flex-column gap-3">
                    <h4
                        style={{
                            fontWeight: 500,
                            fontSize: '16px',
                            marginBottom: 0,
                        }}>
                        Muallif haqida
                    </h4>
                    <p
                        style={{ fontWeight: 300, fontSize: '13px' }}
                        className="m-0">
                        {sellerInfo?.bio}
                    </p>
                </div>
            )}

            <div className="d-flex flex-column gap-3">
                <h4
                    style={{
                        fontWeight: 500,
                        fontSize: '16px',
                        marginBottom: 0,
                    }}>
                    Xizmatlar
                </h4>
                <ul>
                    {servicesCat?.map(cat => (
                        <li
                            style={{ fontWeight: 300, fontSize: '14px' }}
                            className="m-0">
                            {cat?.title}
                        </li>
                    ))}
                </ul>
            </div>

            <ul className="p-0 rowgap_16">
                <li className=" between mt-3 ">
                    <p className="titleInfo">Ro'yhatdan o'tgan</p>
                    <p className="sellerName m-0">
                        {getDate(sellerInfo?.created_at)}
                    </p>
                </li>
            </ul>

            <Modal
                title={"Profil ma'lumotlarni tahrirlash"}
                open={nameModal}
                onCancel={() => setNameModal(false)}
                footer={null}
                className={'mobile'}>
                <form>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Ismingiz"
                            className="form-control"
                            aria-describedby="emailHelp"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Familiyangiz"
                            className="form-control"
                        />
                    </div>
                    <div className="d-flex gap-3 justify-content-end">
                        {' '}
                        <button
                            className="btn p-2 fs-5 btn-danger"
                            onClick={() => setNameModal(false)}>
                            Yopish
                        </button>
                        <button className="btn p-2 fs-5 btn-success">
                            Saqlash
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
