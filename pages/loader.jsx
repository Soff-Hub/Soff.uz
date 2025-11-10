import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PacmanLoader } from 'react-spinners';
import { begin, login } from '~/store/auth/slice';
import { isReturnUrlEmpty } from '~/shared/utilities/return-url';

const Loader = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const Router = useRouter();
    const { asPath } = Router;

    useEffect(() => {
        let returnUrl = null;
        const googleRedirectOnSuccess = localStorage.getItem(
            'google_redirect_url'
        );
        if (asPath.split('').length > 10) {
            const urlParams = new URLSearchParams(asPath.split('?')[1] || '');
            const firstId = urlParams.get('first');
            const token = urlParams.get('token')?.slice(0, -12);

            returnUrl =
                urlParams.get('redirect_url') ||
                urlParams.get('redirectUrl') ||
                urlParams.get('returnUrl');

            localStorage.setItem('token', token);

            const data = {
                access: token,
                role: 'customer',
            };

            dispatch(login({ user: data, data: data }));
            dispatch(begin({ id: firstId }));
        }

        if (googleRedirectOnSuccess) {
            returnUrl = googleRedirectOnSuccess;
            localStorage.removeItem('google_redirect_url');
        }

        const decodedUrl = decodeURIComponent(returnUrl || '');

        if (user?.role === 'admin') {
            localStorage.setItem('is_seller', '1');
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
