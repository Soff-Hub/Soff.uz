import React, { useEffect, memo, useRef } from 'react';
import { useNetworkStatus } from '~/shared/hooks/useNetworkStatus';

function NetworkStatus() {
    const { contextHolder } = useNetworkStatus();
    return contextHolder;
}

export default memo(NetworkStatus);
