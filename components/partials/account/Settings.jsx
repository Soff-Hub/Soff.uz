import React, { useEffect, useRef, useState } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { useSelector } from 'react-redux';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import CreditCard from './CreditCard';
import { Modal } from 'antd';
import GetRepository from '~/reositoriy-admin/GetRepository';
import PostsRepository from '~/reositoriy-admin/PostsRepository';
import { BeatLoader } from 'react-spinners';

function Notifications() {
    const { accountLinks, user } = useSelector((state) => state.auth);
    const [profileData, setProfileData] = useState({});
    const [renderProfile, setRenderProfile] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [profile, setProfile] = useState(null);
    const [profilePassword, setProfilePassword] = useState(null);
    const [profilePassword1, setProfilePassword2] = useState(null);
    const divRef = useRef(null);
    const [copyIcon, setCopyIcon] = useState('fa-regular fa-copy')
    const handleCopyClick = () => {
        if (divRef.current) {
            const textToCopy = divRef.current.innerText;
            const tempInput = document.createElement('input');
            document.body.appendChild(tempInput);
            tempInput.value = textToCopy;
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            if (document.execCommand('copy')) {
                setCopyIcon("fa-solid fa-check fa-beat")
            }
        }
    };

    async function ProfileUsers() {
        const ItemsData = await GetRepository.getProfile(user?.access);
        if (ItemsData.id) {
            setProfile(ItemsData);
        }
    }

    useEffect(() => ProfileUsers(), [renderProfile]);

    async function handleClickEdit(e) {
        e.preventDefault();
        setLoading(true);
        const ItemsData = await PatchRepository.getPatchProfile(
            profileData,
            user?.access
        );
        setRenderProfile(!renderProfile);
        e.target.reset();
        setLoading(false);
        const modal = Modal.success({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: `Sizning ismingiz va familiyangiz o'zgartirildi`,
        });
        modal.update;
    }
    async function handleClickEditChangePassword(e) {
        e.preventDefault();
        setLoading1(true);
        const ItemsData = await PostsRepository.ChangePassword(
            { old_password: profilePassword, new_password: profilePassword1 },
            user?.access
        );
        setRenderProfile(!renderProfile);
        e.target.reset();
        setLoading1(false);
        if (ItemsData.status === 200) {
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: ItemsData?.data?.msg,
            });
            modal.update;
        } else {
            const modal = Modal.error({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: ItemsData?.data?.msg,
            });
            modal.update;
        }
    }

    return (
        <section className="ps-my-account ps-page--account p-0">
            <div className="container">
                <div className="row pb-5" style={{ alignItems: 'flex-start' }}>
                    <div className="col-lg-4">
                        <div className="ps-page__left">
                            <AccountMenuSidebar
                                data={accountLinks}
                                renderProfile={renderProfile}
                            />
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting ">
                                <div className="ps-section__content">
                                    {user?.role === 'admin' ||
                                    user?.role === 'customer' ? (
                                        <>
                                            <div className="p-4 border rounded">
                                                <h4>F.I.O ni o'zgartirish</h4>
                                                <form
                                                    className="row gap-4 row-gap-3 mx-auto "
                                                    onSubmit={handleClickEdit}>
                                                    <input
                                                        type="text"
                                                        defaultValue={
                                                            profile?.first_name
                                                        }
                                                        required
                                                        placeholder="Ismingiz"
                                                        className="form-control rounded-3 col-md-4"
                                                        onChange={(e) =>
                                                            setProfileData(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    first_name:
                                                                        e.target
                                                                            .value,
                                                                })
                                                            )
                                                        }
                                                    />
                                                    <input
                                                        type="text"
                                                        required
                                                        defaultValue={
                                                            profile?.last_name
                                                        }
                                                        placeholder="Familiyangiz"
                                                        className="form-control rounded-3 col-md-4"
                                                        onChange={(e) =>
                                                            setProfileData(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    last_name:
                                                                        e.target
                                                                            .value,
                                                                })
                                                            )
                                                        }
                                                    />

                                                    <button
                                                        type="submit"
                                                        className="btn btn-success py-3 col-md-2  ">
                                                        {loading ? (
                                                            <BeatLoader
                                                                size={10}
                                                                color="#fff"
                                                            />
                                                        ) : (
                                                            <span className="fs-3">
                                                                Saqlash
                                                            </span>
                                                        )}
                                                    </button>
                                                </form>
                                            </div>
                                            <div className="border p-4 rounded mt-4">
                                                <h4>Parolni o'zgartirish</h4>
                                                <form
                                                    className="row gap-4 row-gap-3 mx-auto "
                                                    onSubmit={
                                                        handleClickEditChangePassword
                                                    }>
                                                    <input
                                                        type="text"
                                                        required
                                                        placeholder="Eski parolni kiriting"
                                                        className="form-control rounded-3 col-md-4"
                                                        onChange={(e) =>
                                                            setProfilePassword(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <input
                                                        type="text"
                                                        required
                                                        placeholder="Yangi parol kiriting"
                                                        className="form-control rounded-3 col-md-4"
                                                        onChange={(e) =>
                                                            setProfilePassword2(
                                                                e.target.value
                                                            )
                                                        }
                                                    />

                                                    <button
                                                        type="submit"
                                                        className="btn btn-success py-3 col-md-2  ">
                                                        {loading1 ? (
                                                            <BeatLoader
                                                                size={10}
                                                                color="#fff"
                                                            />
                                                        ) : (
                                                            <span className="fs-3">
                                                                O'zgartirish
                                                            </span>
                                                        )}
                                                    </button>
                                                </form>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div
                                                className="accordion accordion-flush "
                                                id="accordionFlushExample">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button
                                                            className="accordion-button collapsed border px-4 "
                                                            type="button"
                                                            data-bs-toggle="collapse"
                                                            data-bs-target="#flush-collapseOne"
                                                            aria-expanded="false"
                                                            aria-controls="flush-collapseOne">
                                                            <h4 className="m-0 py-2">
                                                                Malumotlaringiz
                                                            </h4>
                                                        </button>
                                                    </h2>
                                                    <div
                                                        id="flush-collapseOne"
                                                        className="accordion-collapse collapse"
                                                        data-bs-parent="#accordionFlushExample">
                                                        <div className="accordion-body">
                                                            <div className="p-4 border rounded">
                                                                <h4>
                                                                    F.I.O ni
                                                                    o'zgartirish
                                                                </h4>
                                                                <form
                                                                    className="row gap-4 row-gap-3 mx-auto "
                                                                    onSubmit={
                                                                        handleClickEdit
                                                                    }>
                                                                    <input
                                                                        type="text"
                                                                        defaultValue={
                                                                            profile?.first_name
                                                                        }
                                                                        required
                                                                        placeholder="Ismingiz"
                                                                        className="form-control rounded-3 col-md-4"
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setProfileData(
                                                                                (
                                                                                    prev
                                                                                ) => ({
                                                                                    ...prev,
                                                                                    first_name:
                                                                                        e
                                                                                            .target
                                                                                            .value,
                                                                                })
                                                                            )
                                                                        }
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        required
                                                                        defaultValue={
                                                                            profile?.last_name
                                                                        }
                                                                        placeholder="Familiyangiz"
                                                                        className="form-control rounded-3 col-md-4"
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setProfileData(
                                                                                (
                                                                                    prev
                                                                                ) => ({
                                                                                    ...prev,
                                                                                    last_name:
                                                                                        e
                                                                                            .target
                                                                                            .value,
                                                                                })
                                                                            )
                                                                        }
                                                                    />

                                                                    <button
                                                                        type="submit"
                                                                        className="btn btn-success py-3 col-md-2  ">
                                                                        {loading ? (
                                                                            <BeatLoader
                                                                                size={
                                                                                    10
                                                                                }
                                                                                color="#fff"
                                                                            />
                                                                        ) : (
                                                                            <span className="fs-3">
                                                                                Saqlash
                                                                            </span>
                                                                        )}
                                                                    </button>
                                                                </form>
                                                            </div>
                                                            <div className="border p-4 rounded mt-4">
                                                                <h4>
                                                                    Parolni
                                                                    o'zgartirish
                                                                </h4>
                                                                <form
                                                                    className="row gap-4 row-gap-3 mx-auto "
                                                                    onSubmit={
                                                                        handleClickEditChangePassword
                                                                    }>
                                                                    <input
                                                                        type="text"
                                                                        required
                                                                        placeholder="Eski parolni kiriting"
                                                                        className="form-control rounded-3 col-md-4"
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setProfilePassword(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        required
                                                                        placeholder="Yangi parol kiriting"
                                                                        className="form-control rounded-3 col-md-4"
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setProfilePassword2(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />

                                                                    <button
                                                                        type="submit"
                                                                        className="btn btn-success py-3 col-md-2  ">
                                                                        {loading1 ? (
                                                                            <BeatLoader
                                                                                size={
                                                                                    10
                                                                                }
                                                                                color="#fff"
                                                                            />
                                                                        ) : (
                                                                            <span className="fs-3">
                                                                                O'zgartirish
                                                                            </span>
                                                                        )}
                                                                    </button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border p-3 mt-3">
                                                <h5 className="fs-3">
                                                    Taklif uchun xavola
                                                </h5>
                                                <div className=" mt-3 taklif-div">
                                                    <div
                                                    className='link'
                                                        ref={
                                                            divRef
                                                        }>{`https://soff.uz/account/register/${
                                                        profile !== null
                                                            ? profile?.code
                                                            : ''
                                                    }`}</div>
                                                    <button
                                                        className="border-none btn-success"
                                                        style={{
                                                            border: 'none',
                                                        }}
                                                        onClick={
                                                            handleCopyClick
                                                        }>
                                                        <i class={`${copyIcon}`}></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    <div className="py-5">
                                        {user?.role === 'seller' ? (
                                            <CreditCard />
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Notifications;
