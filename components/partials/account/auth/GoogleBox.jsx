import Router from 'next/router';
import React from 'react';
import useAuth from '~/hooks/useAuth';

export default function GoogleBox({ loading, params }) {
    const { registerGoogleUser } = useAuth();

    const handleGoogleClick = async () => {
        window.location = 'https://api.soff.uz/auth/social/login/customer';
        try {
            const user = await registerGoogleUser(params, 'customer');
            console.log(user.data);
        } catch (err) {
            // const modal = Modal.error({
            //     centered: true,
            //     title: 'Xatolik',
            //     content: err?.response?.data?.msg[0],
            // });
            // modal.update
            console.log(err);
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center gap-3 mt-2 mb-5">
            <div
                onClick={() =>
                    Router.push({
                        query: { ...Router.query },
                        pathname: '/auth/telegram',
                    })
                }
                style={{
                    border: '1px solid #24A1DE',
                    borderRadius: '10px',
                    cursor: 'pointer',
                }}
                className="py-2 px-3 d-flex align-items-center gap-2 w-100 justify-content-center">
                <img src="/static/img/telegram.png" alt="" height={20} />
                <span>Orqali kirish</span>
            </div>

            <div
                onClick={handleGoogleClick}
                style={{
                    border: '1px solid #DB4437',
                    borderRadius: '10px',
                    cursor: 'pointer',
                }}
                className="py-2 px-3 d-flex align-items-center gap-2 w-100 justify-content-center">
                <img src="/static/img/google.png" alt="" height={20} />
                <span>Orqali kirish</span>
            </div>
        </div>
    );
}
