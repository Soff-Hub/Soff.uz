import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
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
    const { t } = useTranslation('modals');
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { isMobile, isTablet } = useResponsive();
    const isModal = mode === 'modal';

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
            message.error(t('comments.form.tokenNotFound'));
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
            message.success(t('comments.form.success'));
            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            message.error(t('comments.form.error'));
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
                        {
                            required: true,
                            message: t('comments.form.required'),
                        },
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
                        placeholder={t('comments.form.placeholder')}
                    />
                </Form.Item>
                <div className="d-flex justify-content-between align-items-center mt-3">
                    {!fComment ? (
                        <Form.Item
                            name="rating"
                            rules={[
                                {
                                    required: true,
                                    message: t('comments.form.ratingRequired'),
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
                        {loading
                            ? t('comments.form.submitting')
                            : t('comments.form.submit')}
                    </Button>
                </div>
            </div>
        </Form>
    );
}
