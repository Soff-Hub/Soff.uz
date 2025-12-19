import { Skeleton } from 'antd';
import React from 'react';

function searchResultsLoading() {
    return (
        <Skeleton.Button
            active={true}
            style={{ width: '100%', height: '140px' }}
        />
    );
}

export default searchResultsLoading;
