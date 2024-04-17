import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import SiteDonateForm from '~/components/partials/seller/SiteDonateForm';

const Donat = () => {


    return (
        <PageContainer>
            <div className="container my-5 ">
                <h2 className="text-center">
                    Sayt rivoji uchun o'z hissangizni qo'shing
                </h2>

                <SiteDonateForm/>

                {/* <div className="row g-4 p-3 align-items-center">
                    <img
                        src="/static/img/support.jpg"
                        className="col-md-7 mb-4"
                        alt="support"
                        style={{ objectFit: 'cover' }}
                        srcset=""
                    />
                    <form
                        className="col-md-5  p-5"
                        onSubmit={handleClickModalSubmit}>
                        <div className="mb-3">
                            <input
                                onChange={handleInputChange}
                                value={InputText?.emailPhone}
                                type="text"
                                name="emailPhone"
                                className="form-control rounded-3"
                                placeholder="Telefon raqam yoki Email"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                onChange={handleInputChange}
                                type="number"
                                value={InputText?.price}
                                name="price"
                                className="form-control rounded-3"
                                placeholder="Summa"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <textarea
                                onChange={handleInputChange}
                                name="text"
                                value={InputText?.text}
                                className="form-control rounded-3 px-4 py-3"
                                rows={4}
                                placeholder="Tavsif..."></textarea>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-success  w-100 p-3">
                            <span className="fs-4">
                                Davom etish{' '}
                                <i className="fa-solid fa-arrow-right"></i>
                            </span>
                        </button>
                    </form>
                </div> */}
            </div>
        </PageContainer>
    );
};

export default Donat;
