import React, { useEffect, useState } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { useSelector } from 'react-redux';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import CreditCard from './CreditCard';
import { BeatLoader } from 'react-spinners';
import { Modal } from 'antd';

function Notifications() {
    const { accountLinks, user } = useSelector(state => state.auth);
    const [nameUpdate, setNameUpdate] = useState(null);
    const [lastUpdate, setLastUpdate] = useState(null);
    const [renderProfile, setRenderProfile] = useState(false);
    const [loading, setLoading] = useState(false);



    const data = {
        first_name: nameUpdate,
        last_name: lastUpdate
    }

    async function handleClickEdit(e) {
        e.preventDefault();
        setLoading(true)
        const ItemsData = await PatchRepository.getPatchProfile(data, user?.access);
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
                                    <form className='row g-3' onSubmit={handleClickEdit}>
                                        <div className='col-md-5'>
                                            <input type="text" required placeholder='Zufarbek' className='form-control rounded-3' onChange={(e) => setNameUpdate(e.target.value)} />
                                        </div>
                                        <div className='col-md-5'>
                                            <input type="text" required placeholder='Abdurahmonov' className='form-control rounded-3' onChange={(e) => setLastUpdate(e.target.value)} />
                                        </div>
                                        <button type='submit' className='btn btn-success py-3 px-4 col-md-2 mx-auto ' style={{ maxWidth: "470px" }}>
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
