import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PacmanLoader } from 'react-spinners';
import { login } from '~/store/auth/slice';

const TgLoader = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const Router = useRouter();
    const { asPath } = Router;

    useEffect(() => {
        if (asPath && asPath.includes('token=')) {
            try {
                const urlParams = new URLSearchParams(
                    asPath.split('?')[1] || ''
                );
                const token = urlParams.get('token');
                const returnUrl = urlParams.get('returnUrl');
                if (token) {
                    localStorage.setItem('token', token);

                    const userData = {
                        access: token,
                        role: 'customer',
                        telegramWebApp: true,
                    };

                    dispatch(login({ user: userData, data: userData }));

                    if (returnUrl) {
                        Router.replace(decodeURIComponent(returnUrl));
                    } else {
                        Router.replace('/account/sellerproducts');
                    }
                    return;
                }
            } catch (error) {
                console.error('Error processing OAuth token:', error);
                if (asPath.split('').length > 10) {
                    const tokenArr = asPath.split('token=');
                    const tokenPart = tokenArr[1];

                    if (tokenPart) {
                        const token = tokenPart.split('&')[0];
                        localStorage.setItem('token', token);

                        const data = {
                            access: token,
                            role: 'customer',
                        };

                        dispatch(login({ user: data, data: data }));
                    }
                }
            }
        }

        if (user?.role === 'admin') {
            localStorage.setItem('is_seller', '1');
        }

        if (!asPath.includes('token=') && user?.role) {
            Router.push('/account/sellerproducts');
        }
    }, [user?.role, asPath]);

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

export default TgLoader;
