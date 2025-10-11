import React from 'react';
import UserShortInfo from './ui/user-short-info';
import UserTabs from './ui/user-tabs';
import { cn, useRcn } from '~/shared/utilities/cn';

const UserProfile = ({ seller }) => {
    const gridClass = useRcn({
        mobile: 'grid-cols-1',
        tablet: 'grid-cols-1',
        desktop: 'grid-cols-4',
    });

    const gapClass = useRcn({
        mobile: 'gap-y-4',
        tablet: 'gap-y-4',
        desktop: 'gap-x-4',
    });

    const marginClass = useRcn({
        mobile: 'my-1',
        tablet: 'mb-2',
        desktop: 'my-4',
    });

    return (
        <div
            className={cn(
                'grid',
                'user-profile-grid',
                gapClass,
                gridClass,
                marginClass,
                'items-start',
                'relative'
            )}>
            <div className={cn('col-span-1', 'user-profile-sticky')}>
                <UserShortInfo seller={seller} />
            </div>
            <div className={cn('col-span-3', 'h-full')}>
                <UserTabs seller={seller} />
            </div>
        </div>
    );
};

export default UserProfile;
