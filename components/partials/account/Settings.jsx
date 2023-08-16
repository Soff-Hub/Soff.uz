import React, { Component } from 'react';
import Link from 'next/link';
import { Form, Input, Radio, DatePicker } from 'antd';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import TableNotifications from './modules/TableNotifications';
import { actionChannel } from 'redux-saga/effects';
import { actionTypes } from '~/store/ecomerce/action';
import { accountLinks } from './modules/AccountLinks';

class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <section className="ps-my-account ps-page--account">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="ps-page__left">
                                <AccountMenuSidebar data={accountLinks} />
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="ps-page__content">
                                <div className="ps-section--account-setting">
                                    <div className="ps-section__header">
                                        <h3>Sozlamalar</h3>
                                    </div>
                                    <div className="ps-section__content">
                                        <TableNotifications />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
export default Notifications;
