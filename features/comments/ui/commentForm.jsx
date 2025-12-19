import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { baseURL } from '~/repositories/api';
import { Button, message, Input, Rate, Form } from 'antd';
import useResponsive from '~/shared/utilities/useResponsive';

const { TextArea } = Input;
export default function CommentForm({
    documentId,
    fComment,
    initialRating = 0,
    onSuccess,
    mode = 'default',
}) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { isMobile, isTablet } = useResponsive();
    const isModal = mode === 'modal';

    // Responsive font size for Rate component
    const getRateFontSize = () => {
        if (isMobile) return 18;
        if (isTablet) return 22;
        return 25;
    };

    useEffect(() => {
        form.setFieldsValue({ rating: initialRating });
    }, [initialRating, form]);

    const handleSubmit = async (values) => {
        const { commentText: text, rating } = values;

        const token = Cookies.get('token');
        if (!token) {
            message.error('Token topilmadi. Iltimos, tizimga kiring.');
            return;
        }

        try {
            setLoading(true);
            await axios.post(
                `${baseURL}seller/document-review/${documentId}`,
                {
                    text,
                    rating,
                    replied_to: null,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            form.resetFields();
            form.setFieldsValue({ rating: 0 });
            message.success('Izoh muvaffaqiyatli yuborildi!');
            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            message.error('Izoh yuborilmadi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            form={form}
            onFinish={handleSubmit}
            className={isModal ? '' : 'mb-5'}>
            <div
                style={{
                    background: '#fff',
                    padding: isModal ? 0 : undefined,
                }}
                className={isModal ? 'mb-0' : 'mb-4 p-5 rounded-3'}>
                <Form.Item
                    label={null}
                    name="commentText"
                    rules={[
                        { required: true, message: 'Iltimos, izoh yozing!' },
                    ]}>
                    <TextArea
                        style={{
                            borderRadius: '10px',
                            border: isModal ? undefined : 'none',
                            background: '#fff',
                            width: '100%',
                            padding: isModal ? '12px' : undefined,
                        }}
                        className={isModal ? 'fs-4' : 'w-100 fs-4'}
                        rows="5"
                        placeholder="Izohingizni yozing..."
                    />
                </Form.Item>
                <div className="d-flex justify-content-between align-items-center mt-3">
                    {!fComment ? (
                        <Form.Item
                            name="rating"
                            rules={[
                                {
                                    required: true,
                                    message: 'Iltimos, baho bering!',
                                },
                            ]}>
                            <Rate style={{ fontSize: getRateFontSize() }} />
                        </Form.Item>
                    ) : (
                        <div></div>
                    )}
                    <Button
                        htmlType="submit"
                        type="primary"
                        variant="primary"
                        loading={loading}
                        className="rounded-5">
                        {loading ? 'Yuborilmoqda...' : "Jo'natish"}
                    </Button>
                </div>
            </div>
        </Form>
    );
}
