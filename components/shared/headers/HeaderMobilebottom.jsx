import React, { useEffect } from 'react';
import { Drawer } from 'antd';
import PanelCategories from '../panel/PanelCategories';
import { useState } from 'react';
import SearchHeader from './modules/SearchHeader';



function HeaderMobileBottom() {
    const [categoriesDrawer, setCategoriesDrawer] = useState(false);
    const [search, setSearch] = useState('');
    const [scroll, setScroll] = useState(0);

    const handleShowCategoriesDrawer = () => {
        setCategoriesDrawer(!categoriesDrawer);
    };

    const handleDrawerClose = () => {
        setCategoriesDrawer(false);
    };


    useEffect(() => {
        
        document.addEventListener("scroll", () => {
            const scrollCheck = window.scrollY > 100;
            if (scrollCheck !== scroll) {
                setScroll(scrollCheck);
            }
        });
    }, []);



    return (
        <header className={scroll ? "header--mobile2" : "header--mobile"} style={{ borderTop: "0.5px solid grey" }} >
            <div className='navigation--mobile px-4 d-flex gap-3 align-items-center'>

                <div className={search === '' ? 'navigation__left' : "d-none"}>
                    <a
                        className={`navigation__item `}
                        onClick={handleShowCategoriesDrawer}>
                        <i className="icon-list4 text-white fa-2x" style={{ fontSize: "35px" }}></i>
                    </a>
                </div>
                <SearchHeader setSearch={setSearch} />
                <Drawer
                    className="ps-panel--mobile"
                    placement="right"
                    closable={false}
                    onClose={handleDrawerClose}
                    open={categoriesDrawer}>
                    <div className="ps-panel--wrapper">
                        <div className="ps-panel__header">
                            <h3>Kategoriya</h3>
                            <span
                                className="ps-panel__close"
                                onClick={handleDrawerClose}>
                                <i className="icon-cross"></i>
                            </span>
                        </div>
                        <div className="ps-panel__content">
                            <PanelCategories
                                setCategoriesDrawer={setCategoriesDrawer}
                            />
                        </div>
                    </div>
                </Drawer>
            </div>
        </header>
    );
}


export default HeaderMobileBottom;
