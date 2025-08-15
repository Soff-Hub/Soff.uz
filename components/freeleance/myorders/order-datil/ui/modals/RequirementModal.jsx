import React, { useState } from 'react';
import { Modal, Button, Upload, Input, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import useSendReq from '../../api/useSendReq';

const RequirementModal = ({ visible, onClose, orderId }) => {
    const [fileList, setFileList] = useState([]);
    const [content, setContent] = useState('');

    const sendReq = useSendReq();

    const handleFileChange = ({ fileList: newFileList }) => {
        // Faqat bitta fayl qoldiramiz
        const limitedList = newFileList.slice(-1);
        setFileList(limitedList);
        if (limitedList.length > 0) {
            setContent('');
        }
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
        if (e.target.value.trim() !== '') {
            setFileList([]);
        }
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
                Fayl yoki matn yuborishingiz mumkin, lekin ikkalasini bir vaqtda yuborib bo‘lmaydi.
                Agar birini tanlasangiz, boshqasi avtomatik o‘chirib qo‘yiladi.
            </p>

            <Upload
                className='w-100'
                beforeUpload={() => false}
                fileList={fileList}
                onChange={handleFileChange}
                disabled={content.trim() !== ''}
                maxCount={1}         // faqat bitta fayl
                multiple={false}     // ko‘p yuklash o‘chiriladi
            >
                <Button className='w-100' icon={<UploadOutlined />} disabled={content.trim() !== ''}>
                    Fayl yuklash
                </Button>
            </Upload>

            <Input.TextArea
                rows={4}
                placeholder="Buyurtma bo‘yicha talablaringizni yozing..."
                value={content}
                onChange={handleContentChange}
                style={{ marginTop: 16 }}
                disabled={fileList.length > 0}
            />
        </Modal>
    );
};

export default RequirementModal;
