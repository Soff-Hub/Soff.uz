import React, { Component } from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import categories from '../../../public/static/data/static-categories.json';
import ProductRepository from '~/repositories/ProductRepository';
import { useEffect } from 'react';
import { useState } from 'react';
import Router from 'next/router';

const { SubMenu } = Menu;

function PanelCategories({
    setMenuDrawer,
    setCartDrawer,
    setCategoriesDrawer,
    setSearchDrawer,
}) {
    const [data, setData] = useState([]);
    const { slug } = Router.query;
    const [openkey, setOpenKey] = useState({
        openKeys: ['sub1'],
    });

    const getCategiries = async () => {
        const respons = await ProductRepository.getRecords();
        setData(respons?.results);
    };

    let rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    const onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find((key) =>
            setOpenKey(openKeys.indexOf(key) === -1)
        );
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKey({ openKeys });
        } else {
            setOpenKey({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    const handleDrawerClose = () => {
        setMenuDrawer(false);
        setCartDrawer(false);
        setCategoriesDrawer(false);
        setSearchDrawer(false);
    };

    useEffect(() => {
        getCategiries();
    }, []);

    return (
        <div>
            <ul
                style={{
                    listStyle: 'none',
                    margin: '12px 0',
                    padding: 'none',
                }}
                mode="inline"
                openKeys={() => setOpenKey(openkey)}
                onOpenChange={onOpenChange}>
                {data.map((item, i) => (
                    <li
                        style={{
                            border: '1px solid #ccc',
                            padding: '7px 5px',
                        }}
                        key={item.id}
                        className={item.id === Number(slug) ? 'active' : ''}>
                        {item.children !== null ? (
                            <div
                                className="accordion accordion-flush"
                                id="accordionFlushExample">
                                <div
                                    className="accordion-item"
                                    style={{
                                        backgroundColor: '#fffcfced',
                                    }}>
                                    <h2
                                        className="accordion-header"
                                        id="flush-headingOne">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#flush-collapseOne-${i}`}
                                            aria-expanded="false"
                                            aria-controls={`flush-collapseOne-${i}`}>
                                            {item.name}
                                        </button>
                                    </h2>
                                    <div
                                        id={`flush-collapseOne-${i}`}
                                        className="accordion-collapse collapse"
                                        aria-labelledby="flush-headingOne"
                                        data-bs-parent="#accordionFlushExample">
                                        {item?.children?.map((item, i) => {
                                            return (
                                                <div
                                                className='acc-li'
                                                    onClick={handleDrawerClose}>
                                                    <Link
                                                        href={`/category/${item.id}`}>
                                                        <a
                                                            className={
                                                                item.id ===
                                                                Number(slug)
                                                                    ? 'active'
                                                                    : ''
                                                            }>
                                                            {item.name}
                                                        </a>
                                                    </Link>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div onClick={handleDrawerClose}>
                                <Link href={`/category/${item.id}`}>
                                    <a className="category-list-item">
                                        {item.name}
                                    </a>
                                </Link>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PanelCategories;
