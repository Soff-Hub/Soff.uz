import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { d_base_url, f_base_url } from '~/shared/api/base-url';
import { logout as profileLogout } from '~/store/profile/slice';
import { safeLocalStorage } from '~/shared/utilities/safe-local-storage';
import {
    handleExpiredAuthSession,
    isAuthErrorStatus,
    isRateLimitStatus,
} from '~/shared/utilities/auth-session';

const getToken = () => {
    if (typeof window !== 'undefined') {
        const userLocal =
            typeof window !== 'undefined'
                ? safeLocalStorage.getItem('user')
                : null;
        return userLocal ? JSON.parse(userLocal)?.access : '';
    }
    return null;
};

// Retry function: retry on server errors (5xx), connection errors, or rate limit (429)
const retryLogic = (failureCount, error) => {
    if (failureCount >= 3) {
        return false;
    }

    if (!error.status) {
        return true;
    }

    if (error.status >= 500) {
        return true;
    }

    if (error.status === 429) {
        return true;
    }

    return false;
};

// Custom base query wrapper to handle expired/invalid auth errors
const baseQueryWithLogout = (baseQuery) => {
    return async (args, api, extraOptions) => {
        const result = await baseQuery(args, api, extraOptions);

        if (result.error && isAuthErrorStatus(result.error.status)) {
            if (typeof window !== 'undefined') {
                api.dispatch(profileLogout());
                handleExpiredAuthSession();
            }
        } else if (result.error && isRateLimitStatus(result.error.status)) {
            const detail = result.error?.data?.detail;
            if (detail && typeof window !== 'undefined') {
                try {
                    const { message } = await import('antd');
                    message.error(detail);
                } catch {}
            }
        }

        return result;
    };
};

export const apiSoffSlice = createApi({
    reducerPath: 'apiSoff',
    baseQuery: baseQueryWithLogout(
        fetchBaseQuery({
            baseUrl: d_base_url,
            prepareHeaders: (headers) => {
                const token = getToken();
                headers.set('Accept-Language', 'uz');

                if (token) {
                    headers.set('authorization', `Bearer ${token}`);
                }
                return headers;
            },
        })
    ),
    tagTypes: ['Profile'],
    endpoints: () => ({}),
});

// Configure retry logic globally for all endpoints
apiSoffSlice.enhanceEndpoints({
    addTagTypes: ['Profile'],
    endpoints: {
        '*': {
            retry: retryLogic,
        },
    },
});

export const apiFreelanceSlice = createApi({
    reducerPath: 'apiFreelance',
    baseQuery: baseQueryWithLogout(
        fetchBaseQuery({
            baseUrl: f_base_url,
            prepareHeaders: (headers) => {
                const token = getToken();
                headers.set('Accept-Language', 'uz');

                if (token) {
                    headers.set('authorization', `Bearer ${token}`);
                }
                return headers;
            },
        })
    ),
    tagTypes: ['Directions'],
    endpoints: () => ({}),
});

// Configure retry logic globally for all endpoints
apiFreelanceSlice.enhanceEndpoints({
    addTagTypes: ['Directions'],
    endpoints: {
        '*': {
            retry: retryLogic,
        },
    },
});
