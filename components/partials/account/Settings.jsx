import React, { useEffect, useState } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { useSelector } from 'react-redux';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import CreditCard from './CreditCard';
import { Modal } from 'antd';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { Image } from 'antd';
import ModalDeletePostEdit from './ModalPostEdit';
import PostsRepository from '~/reositoriy-admin/PostsRepository';
import { BeatLoader } from 'react-spinners';

function Notifications() {
    const { accountLinks, user } = useSelector((state) => state.auth);
    const [profileData, setProfileData] = useState({});
    const [renderProfile, setRenderProfile] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [profile, setProfile] = useState(null);
    const [image, setImage] = useState('');
    const [imageBag, setImageBag] = useState('');
    const [profilePassword, setProfilePassword] = useState(null);
    const [profilePassword1, setProfilePassword2] = useState(null);


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



    async function ProfileUsers() {
        setLoading(false)
        const ItemsData = await GetRepository.getProfile(user?.access);
        if (ItemsData.id) {
            setProfile(ItemsData);
        }
        setLoading(true)
    }

    useEffect(() => {
        ProfileUsers();
    }, [renderProfile]);

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
        const ItemsData = await PatchRepository.getPatchProfile(
            formData,
            user?.access
        );
        setRenderProfile(!renderProfile);
        if (ItemsData) {
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: `Sizning ma'lumotlaringiz o'zgartirildi`,
            });
            modal.update;
        }
    }

    async function handleClickEditUserProfile() {

        try {
            setLoading2(true)
            const formData = new FormData();
            if (image) {
                formData.append('image', image);
            }

            if (imageBag) {
                formData.append('background_image', imageBag);
            }

            await PatchRepository.getPatchProfile(
                formData,
                user?.access
            );
            setRenderProfile(!renderProfile);
            setImageBag(null)
            setImage(null)


            Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: `Sizning ma'lumotlaringiz o'zgartirildi`,
            });
        } catch (error) {
            Modal.error({
                centered: true,
                title: 'Xatolik!',
                content: error && (error?.background_image?.[0] || error?.image?.[0]),
            });
        }
        setLoading2(false)

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
                        <div className="user_profile_container">
                            <div className="user_profile_card" style={{ backgroundImage: `url(${loading2 ? "/static/img/orqafon1.avif" : (profile?.background_image ? profile?.background_image : "/static/img/orqafon1.avif")})` }}>
                                {loading2 ? <h2 className='text-center text-white loading_h2'>Yuklanmoqda...</h2> : <></>}
                                <div className="profile_images_card"  >
                                    <Image.PreviewGroup >
                                        <Image
                                            width={200}
                                            src={`${profile?.image ? profile?.image : "/static/img/ozodbek.png"}`}
                                        />
                                    </Image.PreviewGroup>
                                </div>
                                <div className="image_icon" >
                                    <a data-bs-target="#exampleModalMyProductsUserProfile"
                                        data-bs-toggle="modal">
                                        <i className="fa-solid fa-camera-retro"></i>
                                    </a>
                                </div>

                            </div>
                            <div className='user_profile_body'>
                                <>
                                    {
                                        loading ?
                                            <>
                                                <h1>{profile?.first_name}  {profile?.last_name}
                                                    <a style={{ cursor: "pointer" }} data-bs-target="#exampleModalMyProductsUserProfileName"
                                                        data-bs-toggle="modal">
                                                        <i class="fa-solid fa-pen fs-4 mx-3 text-primary"></i>
                                                    </a></h1>
                                                {
                                                    profile?.email &&
                                                    <p>{profile?.email}</p>
                                                }
                                            </>
                                            :
                                            <>
                                                <h1 style={{ opacity: "0" }}> Ozodbek Abdisamato
                                                    <a style={{ cursor: "pointer" }}
                                                        data-bs-toggle="modal">
                                                        <i class="fa-solid fa-pen fs-4 mx-3 text-primary"></i>
                                                    </a></h1>

                                                <p style={{ opacity: "0" }} >abdisamatovozodbek003@gmail.com</p>
                                            </>
                                    }

                                </>
                                {
                                    user?.role === 'seller' ?
                                        <>
                                            <CreditCard />
                                            <div className="border p-4 rounded mt-4 " style={{transform:"translateX(-7px)"}}>
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

                                        :
                                        <></>
                                }

                            </div>
                        </div>
                    </div>
                </div>


                <ModalDeletePostEdit formID={"user-modal-profile"}
                    dataBsTarget="exampleModalMyProductsUserProfile"
                    onSubmited={handleClickEditUserProfile}
                >
                    <label htmlFor="file">
                        Orqa fon rasmi
                        <input type="file" className='form-control py-4 rounded' id='file' name='file' accept='.png, .jpeg, .jpg, .heic' onChange={(e) => setImageBag(e.target.files[0])} />
                    </label>
                    <label htmlFor="files">
                        Profle rasmi
                        <input type="file" className='form-control py-4 rounded' id='files' name='files' accept='.png, .jpeg, .jpg, .heic' onChange={(e) => setImage(e.target.files[0])} />
                    </label>

                </ModalDeletePostEdit>

                <ModalDeletePostEdit formID={"user-modal-profile-name"}
                    dataBsTarget="exampleModalMyProductsUserProfileName"
                    onSubmited={handleClickEdit}
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
                </ModalDeletePostEdit>

            </div>
        </section >
    );
}
export default Notifications;
