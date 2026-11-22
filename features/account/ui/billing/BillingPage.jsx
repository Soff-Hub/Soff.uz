import React from 'react';
import SidebarLayout from '~/widgets/sidebar/SidebarLayout';
import { BillingCards } from '~/features/platform-subscription';
import styles from '../profile/profile.module.scss';

// Saved cards for the Soff.uz subscription, on their own page instead of under the profile.
// SoffX AI keeps its own billing at /labs/app/billing.
export default function BillingPage() {
    return (
        <div className="ps-whishlist">
            <div className="container mb-5">
                <h1 className="page-title mt-5">To'lov ma'lumotlari</h1>
                <SidebarLayout>
                    <div className={styles.pageContent}>
                        <div className={styles.sectionCard}>
                            <h3 className={styles.sectionTitle}>Saqlangan kartalar</h3>
                            <div className={styles.sectionBody}>
                                <BillingCards />
                            </div>
                        </div>
                    </div>
                </SidebarLayout>
            </div>
        </div>
    );
}
