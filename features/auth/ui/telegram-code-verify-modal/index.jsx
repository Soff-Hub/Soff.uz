import React from 'react';
import { Modal } from 'antd';
import TelegramConfirmForm from '~/features/account/ui/auth/TelegramConfirmForm.jsx';

const CodeVerifyModal = ({ open, onClose, onSuccess }) => {
    return (
        <Modal
            className="custom-auth-modal"
            open={open}
            onCancel={onClose}
            footer={null}
            centered>
            <TelegramConfirmForm isModal={true} onSuccess={onSuccess} />
        </Modal>
    );
};

export default CodeVerifyModal;
