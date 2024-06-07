import React from 'react';
import Link from 'next/link';
import PageContainer from '~/components/layouts/PageContainer';
import { useSelector } from 'react-redux';
import Page404 from '../page/page-404';
import { useRouter } from 'next/router';

const Selection = () => {
    const { user } = useSelector((state) => state.auth);
    const router = useRouter()
    const {select} = router.query
    console.log(select);

    return user?.access ? (
        <Page404 />
    ) : (
        <PageContainer>
            <div className="ps-checkout ps-section--shopping" style={{height:'70vh'}} >
                <div className="container">
                    <div className="ps-form--account selection-user d-flex justify-content-around register-choose-button-parent ">
                        <div className='register-choose-button-parent_div' >
                            <Link
                                // className="ps-btn ps-btn--fullwidth "
                                // /account/login?role=customer
                                href={`${select ?  `/account/login?role=customer&deal=deal` : `/account/register-user`}`}>
                                <a className="register-choose-button">
                                    <div>
                                    <i className="fa-solid fa-user-tie fa-2xl"></i>
                                    </div>
                                    <h3> Foydalanuvchi</h3>
                                </a>
                            </Link>
                        </div>
                        <div className='register-choose-button-parent_div' >
                            <Link
                                // className="ps-btn ps-btn--fullwidth "
                                href={`${select ? `/account/login?role=seller&deal=deal` : '/account/register'}`}>
                                <a className="register-choose-button">
                                    <div>
                                    <i className="fa-solid fa-user-pen fa-2xl"></i>
                                    </div>
                                    <h3> Sotuvchi</h3>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default Selection;
