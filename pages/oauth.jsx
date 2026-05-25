import React, { useEffect } from 'react';
import { baseUrlProfie } from '~/reositoriy-admin/Repository';
import { useDispatch } from 'react-redux';
import { login } from '~/store/auth/slice';
import PageLoader from '~/shared/ui/common/PageLoader';
import Router from 'next/router';

function Oauth(props) {
    const dispatch = useDispatch();
    const data = { phone_or_email: props?.user?.user, role: 'customer' };
    const user = { ...props?.user };

    const config = {
        user,
        data,
    };

    useEffect(() => {
        if (user?.access) {
            dispatch(login(config));
            Router.push(props?.returnUrl || '/?tab=');
        } else {
            Router.push('/auth/login');
        }
    }, []);

    return (
        <div>
            <PageLoader />
        </div>
    );
}

export async function getServerSideProps(context) {
    const { query } = context;
    const { token, returnUrl } = query;

    if (!token) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        };
    }

    const response = await fetch(`${baseUrlProfie}auth/new-google-login/customer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id_token: token,
        }),
    });

    const data = await response.json();
    return {
        props: {
            returnUrl: returnUrl || '',
            user: data,
        },
    };
}

export default Oauth;
