import React from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import Payment from '~/pages/account/payment';
import { useSelector } from 'react-redux';

function Notifications() {
    const { accountLinks } = useSelector(state => state.auth)

    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="row pb-5" style={{ alignItems: "flex-start" }}>
                    <div className="col-lg-4">
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} />
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div className="ps-section__content">
                                    <Payment />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Notifications;
