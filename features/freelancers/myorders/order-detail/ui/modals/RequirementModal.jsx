import React, { useState } from 'react';
import { Modal, Button, Upload, Input, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import useSendReq from '../../api/useSendReq';

const ORDER_FILE_MAX_SIZE = 500 * 1024 * 1024; // 500 MB
const ORDER_FILE_ALLOWED_EXTENSIONS = [
    'pdf', 'docx', 'doc', 'txt', 'zip', 'rar',
    'png', 'jpg', 'jpeg', 'gif', 'mp4', 'mov',
    'xlsx', 'csv', 'pptx', 'webp', 'mp3', 'wav',
    'ai', 'psd', 'fig', 'sketch',
];

const RequirementModal = ({ visible, onClose, orderId }) => {
    const [fileList, setFileList] = useState([]);
    const [content, setContent] = useState('');

    const sendReq = useSendReq();

    const validateOrderFile = (file) => {
        const ext = file.name.split('.').pop()?.toLowerCase() || '';
        const isAllowedExt = ORDER_FILE_ALLOWED_EXTENSIONS.includes(ext);
        if (!isAllowedExt) {
            message.error(`Ruxsat etilmagan fayl turi: .${ext}`);
            return Upload.LIST_IGNORE;
        }
        if (file.size > ORDER_FILE_MAX_SIZE) {
            message.error('Fayl hajmi juda katta. Maksimal hajm: 500MB');
            return Upload.LIST_IGNORE;
        }
        return true;
    };

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
            message.error("Fayl yoki matn kiritishingiz kerak!");
            return;
        }

        sendReq.mutate(
            {
                id: orderId,
                content: content.trim() || null,
                file: fileList.length ? fileList[0].originFileObj : null
            },
        );

        onClose();
        setFileList([]);
        setContent('');
    };

    return (
        <Modal
            title="Buyurtma talablari"
            open={visible}
            onCancel={onClose}
            onOk={handleOk}
            okText="Jo'natish"
            cancelText="Bekor qilish"
            confirmLoading={sendReq.isLoading}
        >
            <p>
                Buyurtma talablarini to'liq yuboring
            </p>

            <Upload
                className='w-100'
                beforeUpload={validateOrderFile}
                fileList={fileList}
                onChange={handleFileChange}
                maxCount={1}    
                multiple={false}  
            >
                <Button className='w-100' icon={<UploadOutlined />} >
                    Fayl yuklash
                </Button>
            </Upload>

            <Input.TextArea
                rows={4}
                placeholder="Buyurtma bo‘yicha talablaringizni yozing..."
                value={content}
                onChange={handleContentChange}
                style={{ marginTop: 16 }}
            />
        </Modal>
    );
};

export default RequirementModal;
