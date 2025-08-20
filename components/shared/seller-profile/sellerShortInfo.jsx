import { Modal } from 'antd';
import React, { useState } from 'react';
import CalculateTimeDifference from '~/components/partials/account/DateFormatter';
import { getDate, getStatus, getTimeAgo } from '~/utilities/calculateTime';

export default function SellerShortInfo({ sellerInfo }) {
    const [nameModal, setNameModal] = useState(false);
    const [fullName, setFullName] = useState(false);
    const [surName, setSurname] = useState(false);

    function handleChange(params) {
        setFullName(params);
        setSurname(!countTogle);
    }

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
                </div>
            </div>
            <ul className="p-0 rowgap_16">
                <li className=" between mt-3 ">
                    <p className="titleInfo">Ro'yhatdan o'tgan</p>
                    <p className="sellerName m-0">
                        {getDate(sellerInfo?.created_at)}
                    </p>
                </li>
                <li className=" between mt-3">
                    <p className="titleInfo">Oxirgi faollik</p>
                    <p className="">{getStatus(sellerInfo?.last_login)}</p>
                </li>
            </ul>
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
            <Modal
                title={"Profil ma'lumotlarni tahrirlash"}
                open={nameModal}
                onCancel={() => setNameModal(false)}
                footer={null}
                className={'mobile'}>
                <form>
                    <div class="form-group">
                        <input
                            type="text"
                            placeholder="Ismingiz"
                            class="form-control"
                            aria-describedby="emailHelp"
                        />
                    </div>
                    <div class="form-group">
                        <input
                            type="text"
                            placeholder="Familiyangiz"
                            class="form-control"
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
