import React from 'react';
import { connect } from 'react-redux';
import { Drawer } from 'antd';
import PanelMenu from '../panel/PanelMenu';
import { useState } from 'react';
import UserMenuPanel from '../panel/UserMenuPanel';
import Router from 'next/router';

function NavigationListAdmin() {

    const [menuDrawer, setMenuDrawer] = useState(false);
    const [categoriesDrawer, setCategoriesDrawer] = useState(false);

    const handleDrawerClose = () => {
        setMenuDrawer(false);
        setCategoriesDrawer(false);
    };


    const handleShowSettingsDrawer = () => {
        setMenuDrawer(false);
        Router.push('/account/settings')
    };

    const handleShowTagsDrawer = () => {
        setMenuDrawer(false);
        Router.push('/account/tegs')
    };

    const handleShowApplicationDrawer = () => {
        setMenuDrawer(false);
        Router.push('/account/Application')
    };

    const handleShowCategoriesDrawer = () => {
        setMenuDrawer(false);
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
                open={categoriesDrawer}>
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
                        <UserMenuPanel
                            setMenuDrawer={setMenuDrawer}
                            setCategoriesDrawer={setCategoriesDrawer}
                        />
                    </div>
                </div>
            </Drawer>
            <div className="navigation__content">
                <a
                    className={`navigation__item`}
                    onClick={handleShowCategoriesDrawer}>
                    <i className="icon-list4"></i>
                    <span>Menu</span>
                </a>
                <a
                    className={`navigation__item`}
                    onClick={handleShowSettingsDrawer}>
                    <i className="fa-solid fa-gear"></i>
                    <span>Sozlamalar</span>
                </a>

                <a
                    className={`navigation__item`}
                    onClick={handleShowTagsDrawer}>
                    <i className="fa-solid fa-tags"></i>
                    <span>Teglar</span>
                </a>

                <a
                    className={`navigation__item`}
                    onClick={handleShowApplicationDrawer}>
                    <i className="fa-solid fa-file-signature"></i>
                    <span>Arizalar</span>
                </a>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return state.setting;
};

export default connect(mapStateToProps)(NavigationListAdmin);
