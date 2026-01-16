import React, { useState } from 'react';
import { Modal, Button, Upload, Input, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import useSendReq from '../../api/useSendReq';
import { useTranslation } from 'next-i18next';

const RequirementModal = ({ visible, onClose, orderId }) => {
    const [fileList, setFileList] = useState([]);
    const [content, setContent] = useState('');
    const { t } = useTranslation('order-detail');

    const sendReq = useSendReq();

    const handleFileChange = ({ fileList: newFileList }) => {
        // Faqat bitta fayl qoldiramiz
        const limitedList = newFileList.slice(-1);
        setFileList(limitedList);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleOk = () => {
        if (!fileList.length && !content.trim()) {
            message.error(t('error_file_or_text'));
            return;
        }

        sendReq.mutate({
            id: orderId,
            content: content.trim() || null,
            file: fileList.length ? fileList[0].originFileObj : null,
        });

        onClose();
        setFileList([]);
        setContent('');
    };

    return (
        <Modal
            title={t('order_requirements')}
            open={visible}
            onCancel={onClose}
            onOk={handleOk}
            okText={t('send')}
            cancelText={t('cancel')}
            confirmLoading={sendReq.isLoading}>
            <p>{t('req_modal_desc')}</p>

            <Upload
                className="w-100"
                beforeUpload={() => false}
                fileList={fileList}
                onChange={handleFileChange}
                maxCount={1}
                multiple={false}>
                <Button className="w-100" icon={<UploadOutlined />}>
                    {t('upload_file')}
                </Button>
            </Upload>

            <Input.TextArea
                rows={4}
                placeholder={t('req_placeholder')}
                value={content}
                onChange={handleContentChange}
                style={{ marginTop: 16 }}
            />
        </Modal>
    );
};

export default RequirementModal;
