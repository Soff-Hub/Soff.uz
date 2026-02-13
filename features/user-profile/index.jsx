import React from 'react';
import UserShortInfo from './ui/user-short-info';
import UserTabs from './ui/user-tabs';
import { useViewportContext } from '~/shared/hooks/useViewportContext';

import styles from './styles/user-profile.module.scss';

const UserProfile = ({ seller }) => {
    const { headerHeight } = useViewportContext();

    return (
        <div
            className={styles.userProfileGrid}
            style={{ '--header-height': (headerHeight || 80) + 16 + 'px' }}>
            <div className={styles.sidebarWrapper}>
                <UserShortInfo seller={seller} />
            </div>
            <div className={styles.contentWrapper}>
                <UserTabs seller={seller} />
            </div>
        </div>
    );
};

export default UserProfile;
