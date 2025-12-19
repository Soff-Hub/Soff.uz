import React, { useState } from 'react';
import { Modal } from 'antd';
import LoginForm from '~/features/account/ui/auth/LoginForm.jsx';
import CodeVerifyModal from '~/features/auth/ui/code-verify-modal';
import TelegramCodeVerifyModal from '~/features/auth/ui/telegram-code-verify-modal';

const AuthModal = ({
    open,
    onClose,
    slug,
    onSuccess,
    onGoogleSuccessNavigateTo,
}) => {
    const [codeModalOpen, setCodeModalOpen] = useState(false);
    const [telegramCodeModalOpen, setTelegramCodeModalOpen] = useState(false);
    const [authCode, setCode] = useState();

    const closeAllModals = () => {
        setCodeModalOpen(false);
        setTelegramCodeModalOpen(false);
        onClose();
    };

    const handleSuccessOnTelegram = () => {
        setTelegramCodeModalOpen(false);
        onClose();
        onSuccess();
    };

    return (
        <>
            <Modal
                className="custom-auth-modal"
                open={open && !codeModalOpen && !telegramCodeModalOpen}
                onCancel={onClose}
                footer={null}
                centered>
                <LoginForm
                    setCode={setCode}
                    openTelegram={() => {
                        setTelegramCodeModalOpen(true);
                    }}
                    onSuccess={() => setCodeModalOpen(true)}
                    onGoogleSuccessNavigateTo={onGoogleSuccessNavigateTo}
                    isModal={true}
                />
            </Modal>

            <CodeVerifyModal
                onSuccess={onSuccess}
                authCode={authCode}
                open={codeModalOpen}
                onClose={closeAllModals}
                slug={slug}
            />
            <TelegramCodeVerifyModal
                onSuccess={handleSuccessOnTelegram}
                open={telegramCodeModalOpen}
                onClose={closeAllModals}
            />
        </>
    );
};

export default AuthModal;
