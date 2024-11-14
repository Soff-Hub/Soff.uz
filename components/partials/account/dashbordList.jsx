import React from 'react';
import { useSelector } from 'react-redux';
import Example from './Chart';
import SidebarLayout from '../SidebarLayout';
import AdminStats from './AdminStats';
import SellerStart from './SellerStart';
import DashboardStatsList from '../dashboard/DashboardStatsList';
import DashboardFilter from '../dashboard/DashboardFilter';
import DashboardLastOrdersTabs from '../dashboard/DashboardLastOrdersTab';
import DashboardSecondTabs from '../dashboard/DashboardSecondTabs';

function DashbordList() {
    const { accountLinks, user } = useSelector((state) => state.auth);
    const { profile } = useSelector((state) => state.ecomerce);

    return (
        <section className="ps-my-account ps-page--account pt-0">
            <p className="step-0 m-0"></p>
            <div className="container py-3">
                <DashboardStatsList />

                <div
                    className="row pb-5"
                    style={{ alignItems: 'flex-start' }}>
                    <SidebarLayout accountLinks={accountLinks}>
                        {profile?.have_document || profile?.is_superuser ? <DashboardFilter /> : ''}

                        {
                            user?.role === 'admin' ? <AdminStats /> : ''
                        }

                        {(!profile?.have_document && profile?.role === 'seller') ? '' : (
                            <div className="dashboard-div">
                                <Example />
                            </div>
                        )}

                        {
                            (!profile?.have_sale && profile?.role === 'seller') ? <SellerStart /> : ''
                        }

                        {profile?.have_document || profile?.role === 'admin' ? <div className="my-4 py-2">
                            <DashboardLastOrdersTabs />
                        </div> : ''}

                        <DashboardSecondTabs />
                    </SidebarLayout>
                </div>
            </div>
        </section>
    );
}

export default DashbordList;
