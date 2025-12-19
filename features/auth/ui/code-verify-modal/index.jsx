import React from 'react';
import { Modal } from 'antd';
import CodeVerifyForm from '~/features/account/ui/auth/CodeVerifyForm.jsx';

const CodeVerifyModal = ({ open, onClose, authCode, slug, onSuccess }) => {
    return (
        <Modal className="custom-auth-modal" open={open}  onCancel={onClose} footer={null} centered>
            <CodeVerifyForm slug={slug} onClose={onClose} authCode={authCode} onSuccess={onSuccess}/>
        </Modal>
    );
};

export default CodeVerifyModal;
