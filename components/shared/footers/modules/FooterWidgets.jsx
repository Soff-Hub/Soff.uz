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
            <aside className="widget widget_footer widget_contact-us">
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
            </aside>
            <aside className="widget widget_footer">
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
            </aside>
        </div>
    );
};


export default FooterWidgets;
