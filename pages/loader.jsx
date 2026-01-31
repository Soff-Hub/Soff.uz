import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PacmanLoader } from 'react-spinners';
import { login } from '~/store/auth/slice';
import { isReturnUrlEmpty } from '~/shared/utilities/return-url';
import { safeLocalStorage } from '~/shared/utilities/safe-local-storage';

const Loader = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const Router = useRouter();
    const { asPath } = Router;

    useEffect(() => {
        let returnUrl = null;
        const googleRedirectOnSuccess = safeLocalStorage.getItem(
            'google_redirect_url'
        );
        if (asPath.split('').length > 10) {
            const urlParams = new URLSearchParams(asPath.split('?')[1] || '');
            const firstId = urlParams.get('first');
            const token = urlParams.get('token');

            returnUrl =
                urlParams.get('redirect_url') ||
                urlParams.get('redirectUrl') ||
                urlParams.get('returnUrl');

            safeLocalStorage.setItem('token', token);

            const data = {
                access: token,
                role: 'customer',
            };

            dispatch(login({ user: data, data: data }));
        }

        if (googleRedirectOnSuccess) {
            returnUrl = googleRedirectOnSuccess;
            safeLocalStorage.removeItem('google_redirect_url');
        }

        const decodedUrl = decodeURIComponent(returnUrl || '');

        if (user?.role === 'admin') {
            safeLocalStorage.setItem('is_seller', '1');
        }

        if (decodedUrl && !isReturnUrlEmpty(decodedUrl)) {
            Router.push(decodedUrl);
        } else {
            Router.push('/account/sellerproducts');
        }
    }, [user?.role]);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20%',
            }}>
            <PacmanLoader color="#00A44F" />
        </div>
    );
};

export default Loader;
