import React, { useContext } from 'react';
import { Drawer } from 'antd';
import PanelMenu from '../panel/PanelMenu';
import PanelCartMobile from '../panel/PanelCartMobile';
import PanelSearch from '../panel/PanelSearch';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { AudioContext } from '~/hooks/AudioContext';


function NavigationList() {
    const [menuDrawer, setMenuDrawer] = useState(false);
    const [cartDrawer, setCartDrawer] = useState(false);
    const [searchDrawer, setSearchDrawer] = useState(false);
    const { pathname } = useRouter()
    const { playerVisible } = useContext(AudioContext)

    const handleDrawerClose = () => {
        setMenuDrawer(false);
        setCartDrawer(false);
        setSearchDrawer(false);
        setCategoriesDrawer(false);
    };


    return (
        <div className={`navigation--list ${pathname.startsWith('/account') && playerVisible ? 'navigation--list__mobile' : ''}`}>
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
                            setSearchDrawer={setSearchDrawer}
                        />
                    </div>
                </div>
            </Drawer>
        </div>
    );
}

export default NavigationList
