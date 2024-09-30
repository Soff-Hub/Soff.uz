import { Modal } from 'antd';
import React from 'react'
import useAuth from '~/hooks/useAuth';

export default function GoogleBox({ loading }) {
    const { registerGoogleUser } = useAuth();

    const handleGoogleClick = async () => {
        window.location = 'http://api.soff.uz/auth/social/login/customer'
        try {
            const user = await registerGoogleUser('', 'customer');
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
        <div className="google_account d-flex align-items-center justify-content-center">
            {!loading ? (
                <div
                    onClick={handleGoogleClick}
                    className="ps-btn ps-btn--fullwidth d-flex align-items-center justify-content-center pb-0">
                    Google orqali kirish
                </div>
            ) : (
                <button
                    disabled={true}
                    type="submit"
                    className="ps-btn ps-btn--fullwidth">
                    <BeatLoader color="#fff" />
                </button>
            )}
        </div>
    )
}
