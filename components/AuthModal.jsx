import React, { useState } from 'react';
import { Modal } from 'antd';
import LoginForm from '~/components/partials/account/auth/LoginForm.jsx';
import CodeVerifyModal from '~/components/CodeVerifyModal';

const AuthModal = ({ open, onClose, slug, onSuccess }) => {
    const [codeModalOpen, setCodeModalOpen] = useState(false);
    const [authCode, setCode] = useState();

    const closeAllModals = () => {
        setCodeModalOpen(false);
        onClose();
    };

    return (
        <>
            <Modal
                className="custom-auth-modal"
                open={open && !codeModalOpen}
                onCancel={onClose}
                footer={null}
                centered
            >
                <LoginForm setCode={setCode} onSuccess={() => setCodeModalOpen(true)} />
            </Modal>

            <CodeVerifyModal
                onSuccess={onSuccess}
                authCode={authCode}
                open={codeModalOpen}
                onClose={closeAllModals} 
                slug={slug}
            />
        </>
    );
};

export default AuthModal;