import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import CollectionRepository from '~/repositories/CollectionRepository';

const FooterSecond = ({ classes }) => {
    const [categoryList, setCategoryList] = useState([]);

    const getCatgeoryListData = async () => {
        const response = await CollectionRepository.getCategoryData(
            `customer/category-list/`
        );
        if (response) {
            setCategoryList(response);
        }
    };

    useEffect(() => {
        getCatgeoryListData();
    }, []);

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
                                        <i class="fa-solid fa-location-dot fs-1"></i>
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
                                        <i class="fa-solid fa-phone fs-1"></i>
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
                                        <i class="fa-solid fa-envelope fs-1"></i>
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
                            <h4>Sayt haqida</h4>
                        </aside>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Officiis incidunt, cum consequuntur fugit
                            rerum maiores. Lorem ipsum, dolor sit amet
                            consectetur adipisicing elit. Ad, corrupti.{' '}
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
                                            <i class="fa-brands fa-facebook fs-1"></i>
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#">
                                        <a
                                            target="_blank"
                                            className="footer-left-a">
                                            <i class="fa-brands fa-square-instagram fs-1"></i>
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#">
                                        <a
                                            target="_blank"
                                            className="footer-left-a">
                                            <i class="fa-brands fa-telegram fs-1"></i>
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#">
                                        <a
                                            target="_blank"
                                            className="footer-left-a">
                                            <i class="fa-brands fa-square-x-twitter fs-1"></i>
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </aside>
                    </div>
                </div>
                <div className="ps-footer__copyright">
                    <p>
                        &copy; {vaqt.getFullYear()} alldata. Barcha huquqlar
                        himoyalangan
                    </p>
                    <p>
                        <span> Biz xavfsiz to'lovdan foydalanamiz:</span>
                        <Link href="#">
                            <a>
                                <img
                                    src="/static/img/payment-method/click_logo.png"
                                    alt="martfury"
                                    style={{ height: '35px' }}
                                />
                            </a>
                        </Link>
                        <Link href="#">
                            <a>
                                <img
                                    src="/static/img/payment-method/payme_logo.png"
                                    alt="martfury"
                                    style={{ height: '25px' }}
                                />
                            </a>
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default FooterSecond;
