import React, { useState } from 'react';
import FaqsAccardion from './FaqsAccardion';

const FaqsContent = () => {
    const [data, setData] = useState(null)

    const handleClick = () => {
        console.log('ishladi');
    }

    return (
        <div>
            <div className="faqs-category">
                <h3>Kategoriyalar bo'yicha savollar</h3>
                <div className="row ">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 my-3" onClick={() => handleClick()}>
                        <div className="faqs-category__card">
                            <i class="fa-regular fa-address-book faq-icon"></i>
                            <span className="faq-category-name">
                                Tizimdan ro'yxatdan o'tish
                            </span>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 my-3">
                        <div className="faqs-category__card">
                            <i class="fa-regular fa-address-book faq-icon"></i>
                            <span className="faq-category-name">
                                Tizimdan ro'yxatdan o'tish
                            </span>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 my-3">
                        <div className="faqs-category__card">
                            <i class="fa-regular fa-address-book faq-icon"></i>
                            <span className="faq-category-name">
                                Tizimdan ro'yxatdan o'tish
                            </span>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 my-3">
                        <div className="faqs-category__card">
                            <i class="fa-regular fa-address-book faq-icon"></i>
                            <span className="faq-category-name">
                                Tizimdan ro'yxatdan o'tish
                            </span>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 my-3">
                        <div className="faqs-category__card">
                            <i class="fa-regular fa-address-book faq-icon"></i>
                            <span className="faq-category-name">
                                Tizimdan ro'yxatdan o'tish
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <FaqsAccardion />
        </div>
    );
};

export default FaqsContent;
