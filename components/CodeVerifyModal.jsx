import React from 'react';
import { Modal } from 'antd';
import CodeVerifyForm from '~/components/partials/account/auth/CodeVerifyForm.jsx';

const CodeVerifyModal = ({ open, onClose, authCode, slug }) => {
    return (
        <Modal className="custom-auth-modal" open={open}  onCancel={onClose} footer={null} centered>
            <CodeVerifyForm slug={slug} onClose={onClose} authCode={authCode}/>
        </Modal>
    );
};

export default CodeVerifyModal;
