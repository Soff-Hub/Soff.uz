import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Form, Input } from 'antd';
import Image from 'next/image';

class FormCheckoutInformation extends Component {
    constructor(props) {
        super(props);
    }

    handleLoginSubmit = () => {
        Router.push('/account/shipping');
    };

    render() {
        return (
            <div className='tolov-usullari'>
            <div className='payme-logo'>
                <img src="/static/img/payme2.png" alt="payme"  width='100%' height='100%' />
                 <p style={{display: 'inline-block'}} className="ps-btn"> <i class="fa-solid fa-angles-left fa-fade me-2"></i> To'lov qilish </p> 

            </div>
            </div>
        );
    }
}

export default FormCheckoutInformation;
