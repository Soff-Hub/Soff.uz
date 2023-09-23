import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import CollectionRepository from '~/repositories/CollectionRepository';

const FooterWidgets = () => {
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

    return (
        <div className="ps-footer__widgets">
            {/* <aside className="widget widget_footer widget_contact-us">
                <h4 className="widget-title">Aloqa</h4>
                <div className="widget_content">
                    <p>Aloqadan foydalanish 24/7</p>
                    <h3>90 000 00 00</h3>
                    <p>
                        8/1 Bunyodkor Avenue, Tashkent 100115 <br />
                    </p>
                    <ul className="ps-list--social">
                        <li>
                            <a className="facebook" href="#">
                                <i className="fa fa-facebook"></i>
                            </a>
                        </li>
                        <li>
                            <a className="twitter" href="#">
                                <i className="fa fa-twitter"></i>
                            </a>
                        </li>
                        <li>
                            <a className="google-plus" href="#">
                                <i className="fa fa-google-plus"></i>
                            </a>
                        </li>
                        <li>
                            <a className="instagram" href="#">
                                <i className="fa fa-instagram"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside> */}
            <div className="row d-flex justify-content-between">
                <div className="col-xl-7 col-lg-7">
                    <aside className="widget widget_footer widget_contact-us">
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}>
                            <span
                                style={{
                                    border: '1px solid #000',
                                    borderRadius: '50%',
                                    padding: '10px',
                                    height: '40px',
                                    width: '40px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                {' '}
                                <i class="fa-solid fa-location-dot fs-1"></i>
                            </span>
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
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}>
                            <span
                                style={{
                                    border: '1px solid #000',
                                    borderRadius: '50%',
                                    padding: '10px',
                                    height: '40px',
                                    width: '40px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                {' '}
                                <i class="fa-solid fa-phone fs-1"></i>
                            </span>
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
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}>
                            <span
                                style={{
                                    border: '1px solid #000',
                                    borderRadius: '50%',
                                    padding: '10px',
                                    height: '40px',
                                    width: '40px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                {' '}
                                <i class="fa-solid fa-envelope fs-1"></i>
                            </span>
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

                <div className="col-xl-5 col-lg-5">
                    <aside className="widget widget_footer widget_contact-us">
                        <h4>Sayt haqida</h4>
                    </aside>
                    <p>
                            {' '}
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Officiis incidunt, cum consequuntur fugit
                            rerum maiores. Lorem ipsum, dolor sit amet
                            consectetur adipisicing elit. Ad, corrupti.{' '}
                        </p>
                    <aside className="widget widget_footer widget_contact-us">
                        <ul 
                        style={{
                            margin:'0',
                            padding:'0',
                            display:'flex',
                            alignItems:'center',
                            gap:'10px'
                        }}
                        >
                            <li>
                                <Link href="#">
                                    <a
                                        target="_blank"
                                        style={{
                                            border: '1px solid #000',
                                            borderRadius: '50%',
                                            padding: '10px',
                                            height: '40px',
                                            width: '40px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <i class="fa-brands fa-facebook fs-1"></i>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <a
                                        target="_blank"
                                        style={{
                                            border: '1px solid #000',
                                            borderRadius: '50%',
                                            padding: '10px',
                                            height: '40px',
                                            width: '40px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <i class="fa-brands fa-square-instagram fs-1"></i>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <a
                                        target="_blank"
                                        style={{
                                            border: '1px solid #000',
                                            borderRadius: '50%',
                                            padding: '10px',
                                            height: '40px',
                                            width: '40px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                       <i class="fa-brands fa-telegram fs-1"></i>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <a
                                        target="_blank"
                                        style={{
                                            border: '1px solid #000',
                                            borderRadius: '50%',
                                            padding: '10px',
                                            height: '40px',
                                            width: '40px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                       <i class="fa-brands fa-square-x-twitter fs-1"></i>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </aside>
                </div>
            </div>

            {/* <aside className="widget widget_footer">
                <ul className="ps-list--link">
                    {categoryList?.slice(0, 4).length > 0 &&
                        categoryList.slice(0, 4).map((item, i) => (
                            <li key={i}>
                                <Link href="/page/blank">
                                    <a>{item.name}</a>
                                </Link>
                            </li>
                        ))}
                </ul>
            </aside>
            <aside className="widget widget_footer">
                <ul className="ps-list--link">
                    {categoryList?.slice(3, 7).length > 0 &&
                        categoryList.slice(4, 8).map((item, i) => (
                            <li key={i}>
                                <Link href="/page/blank">
                                    <a>{item.name}</a>
                                </Link>
                            </li>
                        ))}
                </ul>
            </aside>
            <aside className="widget widget_footer">
                <ul className="ps-list--link">
                    {categoryList?.slice(8, 12).length > 0 &&
                        categoryList.slice(8, 12).map((item, i) => (
                            <li key={i}>
                                <Link href="/page/blank">
                                    <a>{item.name}</a>
                                </Link>
                            </li>
                        ))}
                </ul>
            </aside>
            <aside className="widget widget_footer">
                <ul className="ps-list--link">
                    {categoryList?.slice(12, 16).length > 0 &&
                        categoryList.slice(12, 16).map((item, i) => (
                            <li key={i}>
                                <Link href="/page/blank">
                                    <a>{item.name}</a>
                                </Link>
                            </li>
                        ))}
                </ul>
            </aside> */}
        </div>
    );
};

export default FooterWidgets;
