import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Drawer } from 'antd';
import PanelMenu from '../panel/PanelMenu';
import PanelCartMobile from '../panel/PanelCartMobile';
import PanelSearch from '../panel/PanelSearch';
import PanelCategories from '../panel/PanelCategories';
import { useState } from 'react';

function NavigationList() {

    const [menuDrawer, setMenuDrawer] = useState(false);
    const [cartDrawer, setCartDrawer] = useState(false);
    const [searchDrawer, setSearchDrawer] = useState(false);
    const [categoriesDrawer, setCategoriesDrawer] = useState(false);

    const handleDrawerClose = () => {
        setMenuDrawer(false);
        setCartDrawer(false);
        setSearchDrawer(false);
        setCategoriesDrawer(false);
    };

    const handleShowMenuDrawer = () => {
        setMenuDrawer(!menuDrawer);
        setCartDrawer(false);
        setSearchDrawer(false);
        setCategoriesDrawer(false);
    };

    const handleShowCartDrawer = () => {
        setMenuDrawer(false);
        setCartDrawer(!cartDrawer);
        setSearchDrawer(false);
        setCategoriesDrawer(false);
    };
    const handleShowSearchDrawer = () => {
        setMenuDrawer(false);
        setCartDrawer(false);
        setSearchDrawer(!searchDrawer);
        setCategoriesDrawer(false);
    };
    const handleShowCategoriesDrawer = () => {
        setMenuDrawer(false);
        setCartDrawer(false);
        setSearchDrawer(false);
        setCategoriesDrawer(!categoriesDrawer);
    };

    return (
        <div className="navigation--list">
            <Drawer
                className="ps-panel--mobile"
                placement="right"
                closable={false}
                onClose={handleDrawerClose}
                open={menuDrawer}>
                <div className="ps-panel--wrapper">
                    <div className="ps-panel__header">
                        <h3>Menu</h3>
                        <span
                            className="ps-panel__close"
                            onClick={handleDrawerClose}>
                            <i className="icon-cross"></i>
                        </span>
                    </div>
                    <div className="ps-panel__content">
                        <PanelMenu />
                    </div>
                </div>
            </Drawer>
            <Drawer
                className="ps-panel--mobile"
                placement="right"
                closable={false}
                onClose={handleDrawerClose}
                open={cartDrawer}>
                <div className="ps-panel--wrapper">
                    <div className="ps-panel__header">
                        <h3>Xarid savati</h3>
                        <span
                            className="ps-panel__close"
                            onClick={handleDrawerClose}>
                            <i className="icon-cross"></i>
                        </span>
                    </div>
                    <div className="ps-panel__content">
                        <PanelCartMobile
                            setMenuDrawer={setMenuDrawer}
                            setCartDrawer={setCartDrawer}
                            setCategoriesDrawer={setCategoriesDrawer}
                            setSearchDrawer={setSearchDrawer}
                        />
                    </div>
                </div>
            </Drawer>
            <Drawer
                className="ps-panel--mobile"
                placement="right"
                closable={false}
                onClose={handleDrawerClose}
                open={searchDrawer}>
                <div className="ps-panel--wrapper">
                    <div className="ps-panel__header">
                        <h3>Qidiruv</h3>
                        <span
                            className="ps-panel__close"
                            onClick={handleDrawerClose}>
                            <i className="icon-cross"></i>
                        </span>
                    </div>
                    <div className="ps-panel__content">
                        <PanelSearch
                            setMenuDrawer={setMenuDrawer}
                            setCartDrawer={setCartDrawer}
                            setCategoriesDrawer={setCategoriesDrawer}
                            setSearchDrawer={setSearchDrawer}
                        />
                    </div>
                </div>
            </Drawer>
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
                            setMenuDrawer={setMenuDrawer}
                            setCartDrawer={setCartDrawer}
                            setCategoriesDrawer={setCategoriesDrawer}
                            setSearchDrawer={setSearchDrawer}
                        />
                    </div>
                </div>
            </Drawer>
            <div className="navigation__content">
                <a
                    className={`navigation__item ${
                        categoriesDrawer === true ? 'active' : ''
                    }`}
                    onClick={handleShowCategoriesDrawer}>
                    <i className="icon-list4"></i>
                    <span> Kategoriya</span>
                </a>
                <a
                    className={`navigation__item ${
                        searchDrawer === true ? 'active' : ''
                    }`}
                    onClick={handleShowSearchDrawer}>
                    <i className="icon-magnifier"></i>
                    <span> Qidiruv</span>
                </a>

                <a
                    className={`navigation__item ${
                        cartDrawer === true ? 'active' : ''
                    }`}
                    onClick={handleShowCartDrawer}>
                    <i className="icon-bag2"></i>
                    <span> Savat</span>
                </a>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return state.setting;
};

export default connect(mapStateToProps)(NavigationList);
