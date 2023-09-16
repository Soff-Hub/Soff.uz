import React, { useEffect, useState } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { useSelector } from 'react-redux';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import CreditCard from './CreditCard';
import { BeatLoader } from 'react-spinners';
import { Modal } from 'antd';
import GetRepository from '~/reositoriy-admin/GetRepository';

function Notifications() {
    const { accountLinks, user } = useSelector(state => state.auth);
    const [profileData, setProfileData] = useState({});
    const [renderProfile, setRenderProfile] = useState(false);
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState(null);

    async function ProfileUsers() {
        const ItemsData = await GetRepository.getProfile(user?.access);
        setProfile(ItemsData)
    }

    useEffect(() => (
        ProfileUsers()
    ), [renderProfile])


    async function handleClickEdit(e) {
        e.preventDefault();
        setLoading(true)
        const ItemsData = await PatchRepository.getPatchProfile(profileData, user?.access);
        setRenderProfile(!renderProfile)
        e.target.reset()
        setLoading(false)
        const modal = Modal.success({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: `Sizning ismingiz va familiyangiz o'zgartirildi`,

        });
        modal.update;
    }

    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="row pb-5" style={{ alignItems: "flex-start" }}>
                    <div className="col-lg-4">
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} renderProfile={renderProfile} />
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting ">
                                <div className="ps-section__header mx-3 mt-4 mb-4">
                                    <h3>Sozlamalar</h3>
                                </div>
                                <div className="ps-section__content">
                                    <form className='row gap-4 row-gap-3 mx-auto ' onSubmit={handleClickEdit} >
                                            <input type="text" defaultValue={profile?.first_name} required placeholder='Ismingiz' className='form-control rounded-3 col-md-4' onChange={(e) => setProfileData((prev) => ({ ...prev, first_name: e.target.value }))} />
                                            <input type="text" required defaultValue={profile?.last_name} placeholder='Familiyangiz' className='form-control rounded-3 col-md-4' onChange={(e) => setProfileData((prev) => ({ ...prev, last_name: e.target.value }))} />

                                        <button type='submit' className='btn btn-success py-3 col-md-2  ' >
                                            {
                                                loading ?
                                                    <BeatLoader size={10} color="#fff" /> :
                                                    <span className='fs-3'>Saqlash</span>

                                            }
                                        </button>
                                    </form>
                                    <div className='py-5'>
                                        {
                                            user?.role === "seller" ?
                                                <CreditCard />
                                                :
                                                <></>
                                        }
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
