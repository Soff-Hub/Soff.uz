import React from 'react';
import Link from 'next/link';
import NextImageCard from '~/components/nextImagecard';

const FooterSecond = ({ classes }) => {


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
                            Soff.uz - Intellektual mulk marketi, Intellektual mahsulotlarini soting va xarid qiling.
                        </p>
                        <p>
                            <Link href={'/account/donat'}>
                                Loyiha rivoji uchun o'z hissangizni qo'shing - Donat
                            </Link>
                        </p>

                    </div>
                </div>
                <div className="ps-footer__copyright">
                    <p>
                        &copy; 2023 soff.uz | Barcha huquqlar himoyalangan.
                    </p>
                    <aside className="widget widget_footer widget_contact-us d-flex align-items-center" >
                        <p style={{
                            marginBottom: '0'
                        }} >Sayt ishlab chiqaruvchi : </p> <a href='https://soffhub.uz/'>
                            <NextImageCard
                                url="/static/img/soffhub.png"
                                className='footer-company-logo d-block ps-2 rounded'
                                width='80px'
                                height='60px'
                                loader='unoptimized'
                            />
                        </a>
                    </aside>
                </div>
            </div>
        </footer>
    );
};

export default FooterSecond;
