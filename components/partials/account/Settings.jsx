import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import CreditCard from './CreditCard';
import { Button, Modal } from 'antd';
import { Image } from 'antd';
import PostsRepository from '~/reositoriy-admin/PostsRepository';
import { BeatLoader } from 'react-spinners';
import GetRepository from '~/reositoriy-admin/GetRepository';
import SidebarLayout from '../SidebarLayout';
import { setSavedPrfileData } from '~/rtk-store/ecomerce';

function Notifications() {
    const { accountLinks, user } = useSelector((state) => state.auth);
    const { profile } = useSelector((state) => state.ecomerce);
    const dispatch = useDispatch();
    const [profileData, setProfileData] = useState({});
    const [loading2, setLoading2] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [image, setImage] = useState('');
    const [profilePassword, setProfilePassword] = useState(null);
    const [profilePassword1, setProfilePassword2] = useState(null);
    const [open, setOpen] = useState(false);
    const [nameModal, setNameModal] = useState(false)



    async function handleClickEditChangePassword(e) {
        e.preventDefault();
        setLoading1(true);
        const ItemsData = await PostsRepository.ChangePassword(
            { old_password: profilePassword, new_password: profilePassword1 },
            user?.access
        );
        e.target.reset();
        if (user?.access) {
            const ItemsDataProfile = await GetRepository.getProfile(user?.access);
            dispatch(setSavedPrfileData(ItemsDataProfile))
        }

        setLoading1(false);
        if (ItemsData.status === 200) {
            const modal = Modal.success({
                centered: true,
                maskClosable: true,
                title: 'Muvaffaqqiyatli!',
                content: ItemsData?.data?.msg,
            });
            modal.update;
        } else {
            const modal = Modal.error({
                centered: true,
                maskClosable: true,
                title: 'Muvaffaqqiyatli!',
                content: ItemsData?.data?.msg,
            });
            modal.update;
        }
    }


    async function handleClickEdit() {
        const formData = new FormData();
        formData.append(
            'first_name',
            profileData?.first_name
                ? profileData?.first_name
                : profile?.first_name
        );
        formData.append(
            'last_name',
            profileData?.last_name ? profileData?.last_name : profile?.last_name
        );
        try {
            await PatchRepository.getPatchProfile(
                formData,
                user?.access
            );
            const modal = Modal.success({
                centered: true,
                maskClosable: true,
                title: 'Muvaffaqqiyatli!',
                content: `Sizning ma'lumotlaringiz o'zgartirildi`,
            });
            modal.update;
            setNameModal(false)
        } catch (err) {
            const modal = Modal.error({
                centered: true,
                maskClosable: true,
                title: 'Xatolik!',
                content: err?.msg,
            });
            modal.update;
            return
        }


        if (user?.access) {
            const ItemsDataProfile = await GetRepository.getProfile(user?.access);
            dispatch(setSavedPrfileData(ItemsDataProfile))
        }
    }

    async function handleClickEditUserProfile() {

        try {
            setLoading2(true)
            const formData = new FormData();
            if (image) {
                formData.append('image', image);
            }

            await PatchRepository.getPatchProfile(
                formData,
                user?.access
            );
            if (user?.access) {
                const ItemsDataProfile = await GetRepository.getProfile(user?.access);
                dispatch(setSavedPrfileData(ItemsDataProfile))
            }
            setImage(null)


            Modal.success({
                centered: true,
                maskClosable: true,
                title: 'Muvaffaqqiyatli!',
                content: `Sizning ma'lumotlaringiz o'zgartirildi`,
            });
        } catch (error) {
            Modal.error({
                centered: true,
                maskClosable: true,
                title: 'Xatolik!',
                content: error && (error?.image?.[0]),
            });
        }
        setLoading2(false)
        setOpen(false)

    }


    return (
        <section className="ps-my-account ps-page--account ">
            <div className="container">
                <div className="row pb-5" style={{ alignItems: 'flex-start' }}>
                    <SidebarLayout accountLinks={accountLinks}>
                        <div className="user_profile_container">
                            <div className="user_profile_card" style={{ backgroundImage: `url(/static/img/orqafon1.avif)` }}>
                                <div className="profile_images_card"  >
                                    <Image.PreviewGroup >
                                        <Image
                                            width={200}
                                            src={`${profile?.image ? profile?.image : "/static/img/ozodbek.png"}`}
                                        />
                                    </Image.PreviewGroup>
                                </div>
                                <div className="image_icon" >
                                    <a onClick={() => setOpen(true)}>
                                        <i className="fa-solid fa-camera-retro"></i>
                                    </a>
                                </div>

                            </div>
                            <div className='user_profile_body'>
                                <>

                                    <h1>{profile?.first_name}  {profile?.last_name}
                                        <span style={{ cursor: "pointer" }} onClick={() => setNameModal(true)} >
                                            <i className="fa-solid fa-pen fs-4 mx-3 text-primary"></i>
                                        </span></h1>
                                    {
                                        profile?.email &&
                                        <p>{profile?.email}</p>
                                    }
                                    {
                                        profile?.phone &&
                                        <p>{profile?.phone}</p>
                                    }


                                </>
                                {
                                    user?.role === 'seller' ?
                                        <>
                                            <CreditCard />
                                            <div className="border p-4 rounded mt-4 ">
                                                <h4>Parolni o'zgartirish</h4>
                                                <form
                                                    className="row gap-4 row-gap-3 mx-auto "
                                                    onSubmit={
                                                        handleClickEditChangePassword
                                                    }>
                                                    <input
                                                        type="password"
                                                        required
                                                        placeholder="Eski parolni kiriting"
                                                        className="form-control rounded-3 col-md-4"
                                                        onChange={(e) =>
                                                            setProfilePassword(
                                                                e.target.value
                                                            )
                                                        }
                                                        style={{ height: "35px" }}
                                                    />
                                                    <input
                                                        type="password"
                                                        required
                                                        placeholder="Yangi parol kiriting"
                                                        className="form-control rounded-3 col-md-4"
                                                        onChange={(e) =>
                                                            setProfilePassword2(
                                                                e.target.value
                                                            )
                                                        }
                                                        style={{ height: "35px" }}
                                                    />

                                                    <button
                                                        type="submit"
                                                        disabled={loading1}
                                                        style={{ height: "35px" }}
                                                        className="btn btn-success col-md-2  ">
                                                        {loading1 ? (
                                                            <BeatLoader
                                                                size={10}
                                                                color="#fff"
                                                            />
                                                        ) : (
                                                            <span className="fs-4">
                                                                O'zgartirish
                                                            </span>
                                                        )}
                                                    </button>
                                                </form>
                                            </div>
                                        </>

                                        :
                                        <></>
                                }

                            </div>
                        </div>
                    </SidebarLayout>
                </div>

                <Modal
                    title="Rasm yuklash (Profil)"
                    open={open}
                    onCancel={() => setOpen(false)}
                    footer={null}
                >
                    <label htmlFor="files" className='w-100 mt-4'>
                        Profil rasmi
                    </label>
                    <input
                        type="file"
                        className='form-control py-4 rounded'
                        id='files'
                        name='files'
                        accept='.png, .jpeg, .jpg, .heic'
                        onChange={(e) => setImage(e.target.files[0])}
                    />

                    <div className='d-flex justify-content-end gap-3 mt-3'>
                        <Button className='bg-secondary text-white fs-4 px-4' onClick={() => setOpen(false)}>Yopish</Button>
                        <Button className='bg-success text-white fs-4 px-4' onClick={handleClickEditUserProfile}
                            disabled={loading2} loading={loading2} >
                            <span className='ml-2'> Saqlash</span>
                        </Button>
                    </div>

                </Modal>

                {/* Profil ism va familiyasini o'zgartirish */}
                <Modal
                    title={"Profil ma'lumotlarni tahrirlash"}
                    open={nameModal}
                    onCancel={() => setNameModal(false)}
                    footer={null}
                    className={"mobile"}
                >
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleClickEdit()
                        }}
                        className='d-flex flex-column gap-3 mt-5'
                        id='edit-profile-form'
                    >
                        <input
                            type="text"
                            defaultValue={
                                profile?.first_name
                            }
                            required
                            placeholder="Ismingiz"
                            className="form-control rounded-3"
                            onChange={(e) =>
                                setProfileData((prev) => ({ ...prev, first_name: e.target.value, }))}
                        />
                        <input
                            type="text"
                            required
                            defaultValue={
                                profile?.last_name
                            }
                            placeholder="Familiyangiz"
                            className="form-control rounded-3"
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

                        <div className="d-flex justify-content-end gap-3 pt-3">
                            <button
                                className=" btn btn-secondary d-block w-25  fs-4 "
                                type="button"
                                onClick={() => {
                                    document.getElementById('edit-profile-form').reset()
                                    setNameModal(false)
                                }}
                            >
                                <span className="fs-3">Yopish</span>
                            </button>
                            <button
                                type="submit"
                                className="btn btn-success d-block w-25 fs-4 "
                            >
                                <span className="fs-3">Saqlash</span>
                            </button>
                        </div>
                    </form>
                </Modal>


            </div>
        </section >
    );
}
export default Notifications;
