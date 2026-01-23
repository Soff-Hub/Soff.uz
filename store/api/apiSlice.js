import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { d_base_url, f_base_url } from '~/shared/api/base-url';
import Cookies from 'js-cookie';
import { logOut } from '~/store/auth/slice';
import { logout as profileLogout } from '~/store/profile/slice';

const getToken = () => {
    if (typeof window !== 'undefined') {
        const userLocal =
            typeof window !== 'undefined' ? localStorage.getItem('user') : null;
        return userLocal ? JSON.parse(userLocal)?.access : '';
    }
    return null;
};

// Retry function: only retry on server errors (5xx) or connection errors, not on 4xx errors
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

    return false;
};

// Custom base query wrapper to handle 403 errors
const baseQueryWithLogout = (baseQuery) => {
    return async (args, api, extraOptions) => {
        const result = await baseQuery(args, api, extraOptions);

        // Handle 403 Forbidden errors
        if (result.error && result.error.status === 403) {
            if (typeof window !== 'undefined') {
                localStorage.clear();
                Cookies.remove('token');
                api.dispatch(logOut());
                api.dispatch(profileLogout());

                // Navigate to login page if on a protected/account page
                const currentPath = window.location.pathname;
                if (
                    (currentPath.includes('/account') ||
                        currentPath.includes('/order') ||
                        currentPath.includes('/chat')) &&
                    !currentPath.includes('/auth/login') &&
                    !currentPath.includes('/auth/register') &&
                    !currentPath.includes('/auth/reset-password') &&
                    !currentPath.includes('/oauth')
                ) {
                    window.location.href = '/auth/login';
                }
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
