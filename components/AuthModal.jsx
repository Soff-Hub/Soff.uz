import React, { useState } from 'react';
import { Modal } from 'antd';
import LoginForm from '~/components/partials/account/auth/LoginForm.jsx';
import CodeVerifyModal from '~/components/CodeVerifyModal';

const AuthModal = ({ open, onClose }) => {
    const [codeModalOpen, setCodeModalOpen] = useState(false);
    const [authCode, setCode] = useState();

    const closeAllModals = () => {
        setCodeModalOpen(false);
        onClose(); // AuthModal ham yopiladi
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
                authCode={authCode}
                open={codeModalOpen}
                onClose={closeAllModals} // 👉 bu yerga
            />
        </>
    );
};

export default AuthModal;