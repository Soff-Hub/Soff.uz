import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { baseURL } from '~/repositories/api';
import { Button, message, Input, Rate, Form } from 'antd';
import useResponsive from '~/shared/utilities/useResponsive';
import { useQueryClient } from '@tanstack/react-query';
import { useAppSelector } from '~/app/store/hooks';

const { TextArea } = Input;

export default function CommentForm({
    documentId,
    slug,
    fComment,
    initialRating = 0,
    onSuccess,
    mode = 'default',
}) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { isMobile, isTablet } = useResponsive();
    const isModal = mode === 'modal';
    const queryClient = useQueryClient();
    const { user } = useAppSelector((state) => state.profile);

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

            // Update the query cache by adding new comment to the first page
            queryClient.invalidateQueries({
                queryKey: ['document-reviews'],
            });

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
            className={isModal ? '' : 'mb-3'}>
            <div
                style={{
                    background: '#fff',
                    padding: isModal ? 0 : undefined,
                }}
                className={isModal ? 'mb-0' : 'mb-3 p-3 rounded-3'}>
                <Form.Item
                    label={null}
                    name="commentText"
                    style={{ marginBottom: '12px' }}
                    rules={[
                        { required: true, message: 'Iltimos, izoh yozing!' },
                    ]}>
                    <TextArea
                        style={{
                            borderRadius: '8px',
                            border: isModal ? undefined : '1px solid #e2e8f0',
                            background: '#f8fafc',
                            width: '100%',
                            padding: isModal ? '10px' : '12px',
                        }}
                        className={isModal ? 'fs-5' : 'w-100 fs-5'}
                        rows="2"
                        placeholder="Izohingizni yozing..."
                    />
                </Form.Item>
                <div className="d-flex justify-content-between align-items-center">
                    {!fComment ? (
                        <Form.Item
                            name="rating"
                            style={{ marginBottom: 0 }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Iltimos, baho bering!',
                                },
                            ]}>
                            <Rate style={{ fontSize: isMobile ? 18 : 20 }} />
                        </Form.Item>
                    ) : (
                        <div></div>
                    )}
                    <Button
                        htmlType="submit"
                        type="primary"
                        loading={loading}
                        style={{ padding: '0 24px', height: '36px' }}
                        className="rounded-5">
                        {loading ? 'Yuborilmoqda...' : "Jo'natish"}
                    </Button>
                </div>
            </div>
        </Form>
    );
}
