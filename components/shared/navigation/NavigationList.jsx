import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Drawer } from 'antd';
import PanelMenu from '../panel/PanelMenu';
import PanelCartMobile from '../panel/PanelCartMobile';
import PanelSearch from '../panel/PanelSearch';
import PanelCategories from '../panel/PanelCategories';
// import { withCookies } from 'react-cookie';

class NavigationList extends Component {
    constructor(props) {
        super(props);
        // const { cookies } = this.props;
        this.state = {
            menuDrawer: false,
            cartDrawer: false,
            searchDrawer: false,
            categoriesDrawer: false,
            // cart: cookies.get('cart') || [],
        };
    }

    handleDrawerClose = () => {
        this.setState({
            menuDrawer: false,
            cartDrawer: false,
            searchDrawer: false,
            categoriesDrawer: false,
        });
    };

    handleShowMenuDrawer = () => {
        this.setState({
            menuDrawer: !this.state.menuDrawer,
            cartDrawer: false,
            searchDrawer: false,
            categoriesDrawer: false,
        });
    };

    handleShowCartDrawer = () => {
        this.setState({
            menuDrawer: false,
            cartDrawer: !this.state.cartDrawer,
            searchDrawer: false,
            categoriesDrawer: false,
        });
    };
    handleShowSearchDrawer = () => {
        this.setState({
            menuDrawer: false,
            cartDrawer: false,
            searchDrawer: !this.state.searchDrawer,
            categoriesDrawer: false,
        });
    };
    handleShowCategoriesDrawer = () => {
        this.setState({
            menuDrawer: false,
            cartDrawer: false,
            searchDrawer: false,
            categoriesDrawer: !this.state.categoriesDrawer,
        });
    };

    render() {
        const { menuDrawer, searchDrawer, cartDrawer, categoriesDrawer } =
            this.state;
        return (
            <div className="navigation--list">
                <Drawer
                    className="ps-panel--mobile"
                    placement="right"
                    closable={false}
                    onClose={this.handleDrawerClose}
                    open={this.state.menuDrawer}>
                    <div className="ps-panel--wrapper">
                        <div className="ps-panel__header">
                            <h3>Menu</h3>
                            <span
                                className="ps-panel__close"
                                onClick={this.handleDrawerClose}>
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
                    onClose={this.handleDrawerClose}
                    open={this.state.cartDrawer}>
                    <div className="ps-panel--wrapper">
                        <div className="ps-panel__header">
                            <h3>Xarid savati</h3>
                            <span
                                className="ps-panel__close"
                                onClick={this.handleDrawerClose}>
                                <i className="icon-cross"></i>
                            </span>
                        </div>
                        <div className="ps-panel__content">
                            <PanelCartMobile />
                        </div>
                    </div>
                </Drawer>
                <Drawer
                    className="ps-panel--mobile"
                    placement="right"
                    closable={false}
                    onClose={this.handleDrawerClose}
                    open={this.state.searchDrawer}>
                    <div className="ps-panel--wrapper">
                        <div className="ps-panel__header">
                            <h3>Qidiruv</h3>
                            <span
                                className="ps-panel__close"
                                onClick={this.handleDrawerClose}>
                                <i className="icon-cross"></i>
                            </span>
                        </div>
                        <div className="ps-panel__content">
                            <PanelSearch />
                        </div>
                    </div>
                </Drawer>
                <Drawer
                    className="ps-panel--mobile"
                    placement="right"
                    closable={false}
                    onClose={this.handleDrawerClose}
                    open={this.state.categoriesDrawer}>
                    <div className="ps-panel--wrapper">
                        <div className="ps-panel__header">
                            <h3>Kategoriya</h3>
                            <span
                                className="ps-panel__close"
                                onClick={this.handleDrawerClose}>
                                <i className="icon-cross"></i>
                            </span>
                        </div>
                        <div className="ps-panel__content">
                            <PanelCategories />
                        </div>
                    </div>
                </Drawer>
                <div className="navigation__content">
                    <a
                        className={`navigation__item ${
                            categoriesDrawer === true ? 'active' : ''
                        }`}
                        onClick={this.handleShowCategoriesDrawer}>
                        <i className="icon-list4"></i>
                        <span> Kategoriya</span>
                    </a>
                    <a
                        className={`navigation__item ${
                            searchDrawer === true ? 'active' : ''
                        }`}
                        onClick={this.handleShowSearchDrawer}>
                        <i className="icon-magnifier"></i>
                        <span> Qidiruv</span>

                    </a>
            
                    <a
                        className={`navigation__item ${
                            cartDrawer === true ? 'active' : ''
                        }`}
                        onClick={this.handleShowCartDrawer}>
                        <i className="icon-bag2"></i>
                        <span> Savat</span>
                    </a>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state.setting;
};
export default connect(mapStateToProps)(NavigationList);
