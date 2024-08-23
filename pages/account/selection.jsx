import React from 'react';
import Link from 'next/link';
import PageContainer from '~/components/layouts/PageContainer';
import { useSelector } from 'react-redux';
import Page404 from '../page/page-404';
import { useRouter } from 'next/router';

const Selection = () => {
    const { user } = useSelector((state) => state.auth);
    const router = useRouter()
    const { deal, id } = router?.query



    return user?.access ? (
        <Page404 />
    ) : (
        <PageContainer>
            <div className="ps-checkout ps-section--shopping d-flex align-items-center" style={{ height: '70vh' }} >
                <div className="container">
                    <div className="ps-form--account_selection selection-user d-flex justify-content-around register-choose-button-parent ">
                        <div className='register-choose-button-parent_div' >
                            <Link

                                href={id ? `/account/login?role=customer&id=${id}` :
                                    deal ? `/account/login?role=customer&deal=${deal}` :
                                        `/account/register`}>
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
                                href={id ? `/account/login?role=seller&id=${id}` :
                                    deal ? `/account/login?role=seller&deal=${deal}` :
                                        `/account/register`}>

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
