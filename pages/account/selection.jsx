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
                    <div className="ps-form--account d-flex justify-content-around">
                        <Link
                            className="ps-btn ps-btn--fullwidth "
                            href="/account/register-user">
                            <a className="register-choose-button">
                                <i className="fa-solid fa-user me-3"></i>{' '}
                                <span> Foydalanuvchi</span>
                            </a>
                        </Link>
                        <Link
                            className="ps-btn ps-btn--fullwidth register-choose-button"
                            href={`/account/register`}>
                            <a className="register-choose-button">
                                <i className="fa-solid fa-user-plus me-3"></i>{' '}
                                <span>Sotuvchi</span>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default Selection;
