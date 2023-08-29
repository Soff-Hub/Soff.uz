import React, { useEffect, useState } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { useSelector } from 'react-redux';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import CreditCard from './CreditCard';

function Notifications() {
  const { accountLinks , user} = useSelector(state => state.auth);
  const [nameUpdate, setNameUpdate] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);



  const data = {
    first_name: nameUpdate,
    last_name: lastUpdate
  }
  
  async function handleClickEdit(e){
    e.preventDefault();
    const ItemsData = await PatchRepository.getPatchProfile(data ,user?.access);
    
  }  
    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="row pb-5" style={{ alignItems: "flex-start" }}>
                    <div className="col-lg-4">
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} />
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting ">
                            <div className="ps-section__header mx-3 mt-4 mb-4">
                                    <h3>Sozlamalar</h3>
                                </div>
                                <div className="ps-section__content">
                                        <form className='row g-3'>
                                            <div className='col-md-5'>
                                            <input  type="text" placeholder='Ism ' className='form-control rounded-3' onChange={(e)=> setNameUpdate(e.target.value)}  />
                                            </div>
                                              <div className='col-md-5'>
                                            <input type="text" placeholder='Familiya ' className='form-control rounded-3' onChange={(e)=> setLastUpdate(e.target.value)} />
                                              </div>
                                            <button  onClick={handleClickEdit} className='btn btn-success py-3 px-4 col-md-2 mx-auto' style={{width:"325px"}}><span className='fs-4'>Saqlash</span></button>
                                        </form>
                            <div className='py-5'>
                            <CreditCard/>
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
