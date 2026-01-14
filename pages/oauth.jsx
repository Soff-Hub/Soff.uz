import React, { useEffect } from 'react';
import { baseUrlProfie } from '~/reositoriy-admin/Repository';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { login } from '~/store/auth/slice';
import PageLoader from '~/shared/ui/common/PageLoader';
import Router from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function Oauth(props) {
    const dispatch = useDispatch();
    const data = { phone_or_email: props?.user?.user, role: 'customer' };
    const user = { ...props?.user };

    const config = {
        user,
        data,
    };

    useEffect(() => {
        if (config) {
            dispatch(login(config));
            Router.push(props?.returnUrl || '/?tab=');
        }
    }, [config]);

    return (
        <div>
            <PageLoader />
        </div>
    );
}

export async function getServerSideProps(context) {
    const { query, locale } = context;
    const { token, returnUrl } = query;
    const response = await fetch(`${baseUrlProfie}auth/google-login/customer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: jwtDecode(token)?.email,
        }),
    });

    const data = await response.json();
    return {
        props: {
            returnUrl: returnUrl || '',
            user: data,
            ...(await serverSideTranslations(locale, [
                'header',
                'footer',
                'common',
                'modals',
            ])),
        },
    };
}

export default Oauth;
