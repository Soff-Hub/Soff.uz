import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import CollectionRepository from '~/repositories/CollectionRepository';

const FooterSecond = ({ classes }) => {


    let vaqt = new Date();

    return (
        <footer className={`ps-footer ps-footer--2 ${classes}`}>
            <div className="container">
                <div className="row d-flex justify-content-between">
                    <div className="col-xl-7 col-lg-7  col-md-6 col-sm-12 col-xs-12">
                        <aside className="widget widget_footer widget_contact-us">
                            <div className="footer-icon-parent-div">
                                <Link href="#">
                                    <a className="footer-left-a">
                                        <i className="fa-solid fa-location-dot fs-1"></i>
                                    </a>
                                </Link>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        flexDirection: 'column',
                                    }}>
                                    <p
                                        style={{
                                            padding: '0',
                                            margin: '0',
                                        }}>
                                        8/1 Bunyodkor Avenue
                                    </p>
                                    <h4
                                        style={{
                                            margin: '0',
                                        }}>
                                        Toshkent
                                    </h4>
                                </div>
                            </div>
                        </aside>
                        <aside className="widget widget_footer widget_contact-us">
                            <div className="footer-icon-parent-div">
                                <Link href="#">
                                    <a className="footer-left-a">
                                        <i className="fa-solid fa-phone fs-1"></i>
                                    </a>
                                </Link>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        flexDirection: 'column',
                                    }}>
                                    <h4
                                        style={{
                                            margin: '0',
                                        }}>
                                        +998 (91) 008 67 89
                                    </h4>
                                </div>
                            </div>
                        </aside>
                        <aside className="widget widget_footer widget_contact-us">
                            <div className="footer-icon-parent-div">
                                <Link href="#">
                                    <a className="footer-left-a">
                                        <i className="fa-solid fa-envelope fs-1"></i>
                                    </a>
                                </Link>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        flexDirection: 'column',
                                    }}>
                                    <h4
                                        style={{
                                            margin: '0',
                                        }}>
                                       support@soff.uz
                                    </h4>
                                </div>
                            </div>
                        </aside>
                    </div>

                    <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12 col-xs-12 ">
                        <aside className="widget widget_footer widget_contact-us">
                            <h4>Soff.uz</h4>
                        </aside>
                        <p>
                            Soff.uz platformasi orqali har qanday soha egasi o'z ishlab chiqgan yoki yig'gan materialarini turli xil formatda yuklash orqali katta daromad topishlari mumkin. Foydalanuvchilar esa har qanday yo'nalishda o'zlariga kerak bo'lgan materiallarga ega bo'ladi. {' '}
                        </p>
                        <aside className="widget widget_footer widget_contact-us">
                            <ul
                                style={{
                                    margin: '0',
                                    padding: '0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                }}
                                className="footer-right-ul-social">
                                <li>
                                    <Link href="#">
                                        <a
                                            target="_blank"
                                            className="footer-left-a">
                                            <i className="fa-brands fa-facebook fs-1"></i>
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#">
                                        <a
                                            target="_blank"
                                            className="footer-left-a">
                                            <i className="fa-brands fa-square-instagram fs-1"></i>
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#">
                                        <a
                                            target="_blank"
                                            className="footer-left-a">
                                            <i className="fa-brands fa-telegram fs-1"></i>
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#">
                                        <a
                                            target="_blank"
                                            className="footer-left-a">
                                            <i className="fa-brands fa-square-x-twitter fs-1"></i>
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </aside>
                        <aside className="widget widget_footer widget_contact-us">
                            <img
                                src="/static/img/payment-method/click_logo.png"
                                alt="martfury"
                                style={{ height: '35px', marginRight: '20px' }}
                            />
                            <img
                                src="/static/img/payment-method/payme_logo.png"
                                alt="martfury"
                                style={{ height: '25px' }}
                            />
                        </aside>
                    </div>
                </div>
                <div className="ps-footer__copyright">
                    <p>
                        &copy; {vaqt.getFullYear()} soff.uz | Barcha huquqlar himoyalangan.
                    </p>
                    <aside className="widget widget_footer widget_contact-us d-flex align-items-center" >
                        <p style={{
                            marginBottom: '0'
                        }} >Sayt ishlab chiqaruvchi : </p> <a href='https://soffhub.uz/'><img className='footer-company-logo d-block ps-2' src="/static/img/soffhub.jpeg" alt="soff hub logo" /></a>
                    </aside>
                </div>
            </div>
        </footer>
    );
};

export default FooterSecond;
