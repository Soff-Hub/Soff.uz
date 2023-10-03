import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import CollectionRepository from '~/repositories/CollectionRepository';

const FooterWidgets = () => {
  
    let vaqt = new Date();
    return (
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
                            soff@gmail.uz
                        </h4>
                    </div>
                </div>
            </aside>
        </div>

        <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12 col-xs-12 ">
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
        </div>
    </div>
    );
};

export default FooterWidgets;
