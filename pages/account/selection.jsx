import React from 'react';
import Link from 'next/link';
import PageContainer from '~/components/layouts/PageContainer';
import { useSelector } from 'react-redux';
import Page404 from '../page/page-404';

const Selection = () => {
    const { user } = useSelector((state) => state.auth);
    return user?.access ? (
        <Page404 />
    ) : (
        <PageContainer>
            <div className="ps-checkout ps-section--shopping">
                <div className="container">
                    <div className="ps-form--account d-flex justify-content-around register-choose-button-parent ">
                        <div className='register-choose-button-parent_div' >
                            <Link
                                // className="ps-btn ps-btn--fullwidth "
                                href="/account/register-user">
                                <a className="register-choose-button">
                                    <div>
                                    <i class="fa-solid fa-user-tie fa-2xl"></i>
                                    </div>
                                    <h3> Foydalanuvchi</h3>
                                </a>
                            </Link>
                        </div>
                        <div className='register-choose-button-parent_div' >
                            <Link
                                // className="ps-btn ps-btn--fullwidth "
                                href="/account/register">
                                <a className="register-choose-button">
                                    <div>
                                    <i class="fa-solid fa-user-pen fa-2xl"></i>
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
