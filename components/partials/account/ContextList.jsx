import React, { useEffect, useState } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { accountLinks } from './modules/AccountLinks';
import PostsRepository from '~/reositoriy-admin/PostsRepository';


function ContextLists() {

    const [data, setData] = useState({});

    async function GetItemsBanners() {
        const ItemsData = await PostsRepository.PostsBanner(data)
        setData(ItemsData)
    }

    useEffect(() => {
        GetItemsBanners()
    }, [])


    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} />
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div className="ps-section__header">
                                    <h3>Context</h3>
                                </div>
                                <div className="ps-section__content">
                                        <h3>Banner qo'shish</h3>
                                    <form >
                                        <div className='d-flex gap-3 py-4'>
                                        <input type="file" className='form-control pt-4 rounded-3 ' />
                                        <input type="url" className='form-control rounded-3 ' />
                                        </div>
                                        <button type='submit' className='btn btn-success w-25 py-3 '><span className='fs-4'> +Banner qo'shish</span></button>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default ContextLists;
