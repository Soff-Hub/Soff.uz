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
                <div className="ps-footer__content">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="row">
                                <div className="col-md-3 col-sm-6 text-center">
                                    <aside className="widget widget_footer">
                                        <ul className="ps-list--link">
                                            {categoryList?.slice(0, 4).length >
                                                0 &&
                                                categoryList
                                                    .slice(0, 4)
                                                    .map((item, i) => (
                                                        <li key={i}>
                                                            <Link href="#">
                                                                <a>
                                                                    {item.name}
                                                                </a>
                                                            </Link>
                                                        </li>
                                                    ))}
                                        </ul>
                                    </aside>
                                </div>
                                <div className="col-md-3 col-sm-6 text-center">
                                    <aside className="widget widget_footer">
                                        <ul className="ps-list--link">
                                            {categoryList?.slice(3, 7).length >
                                                0 &&
                                                categoryList
                                                    .slice(4, 8)
                                                    .map((item, i) => (
                                                        <li key={i}>
                                                            <Link href="#">
                                                                <a>
                                                                    {item.name}
                                                                </a>
                                                            </Link>
                                                        </li>
                                                    ))}
                                        </ul>
                                    </aside>
                                </div>
                                <div className="col-md-3 col-sm-6 text-center">
                                    <aside className="widget widget_footer">
                                        <ul className="ps-list--link">
                                            {categoryList?.slice(8, 12).length >
                                                0 &&
                                                categoryList
                                                    .slice(8, 12)
                                                    .map((item, i) => (
                                                        <li key={i}>
                                                            <Link href="#">
                                                                <a>
                                                                    {item.name}
                                                                </a>
                                                            </Link>
                                                        </li>
                                                    ))}
                                        </ul>
                                    </aside>
                                </div>
                                <div className="col-md-3 col-sm-6 text-center">
                                    <aside className="widget widget_footer">
                                        <ul className="ps-list--link">
                                            {categoryList?.slice(12, 16)
                                                .length > 0 &&
                                                categoryList
                                                    .slice(12, 16)
                                                    .map((item, i) => (
                                                        <li key={i}>
                                                            <Link href="#">
                                                                <a>
                                                                    {item.name}
                                                                </a>
                                                            </Link>
                                                        </li>
                                                    ))}
                                        </ul>
                                    </aside>
                                </div>
                            </div>
                        </div>
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
