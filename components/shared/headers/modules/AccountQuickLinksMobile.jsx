import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { logOut } from '../../../../store/auth/action';
import { Dropdown, Menu } from 'antd';
import { accountLinks } from '~/components/partials/account/modules/AccountLinks';
class AccountQuickLinks extends Component {
    constructor(props) {
        super(props);
    }

    handleLogout = e => {
        e.preventDefault();
        this.props.dispatch(logOut());
    };

    render() {
        const menu = (
            <Menu>
                {accountLinks.map(link => (
                    <Menu.Item key={link.url}>
                        <Link href={link.url}>
                            <a>{link.text}</a>
                        </Link>
                    </Menu.Item>
                ))}

                <Menu.Item>
                    <a href="#" onClick={this.handleLogout.bind(this)}>
                        Logout
                    </a>
                </Menu.Item>
            </Menu>
        );

        return (
            <Dropdown overlay={menu} placement="bottomLeft">
                <a href="#" className="header__extra ps-user--mobile">
                    <i className="icon-user"></i>
                </a>
            </Dropdown>
        );
    }
}
const mapStateToProps = state => {
    return state;
};
export default connect(mapStateToProps)(AccountQuickLinks);
