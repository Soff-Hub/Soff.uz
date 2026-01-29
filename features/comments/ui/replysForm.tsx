import { FormEvent, useState } from 'react';
import Cookies from 'js-cookie';
import { message, Input, Button } from 'antd';
import { baseURL } from '~/repositories/api';
import Axios from 'axios';
import styles from './commentList.module.scss';
import { useAppSelector } from '~/app/store/hooks';

interface ReplyFormProps {
    commentId: number;
    documentId: string;
    onSuccess?: (newReply: any) => void;
    onCancel?: () => void;
}

export default function ReplyForm({
    commentId,
    documentId,
    onSuccess,
    onCancel,
}: ReplyFormProps) {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useAppSelector((state) => state.profile);

    const handleReply = async (e: FormEvent) => {
        e.preventDefault();

        if (!text.trim()) return;
        const token = Cookies.get('token');
        if (!token) {
            message.error('Token topilmadi');
            return;
        }

        try {
            setLoading(true);
            await Axios.post(
                `${baseURL}seller/document-review/${documentId}`,
                {
                    text,
                    rating: 0,
                    replied_to: commentId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            message.success('Javob yuborildi');

            // Construct the reply object manually since API only returns success message
            const newReply = {
                id: Date.now(), // Temporary ID until refetch
                replied_to: commentId,
                rating: 0,
                text: text.trim(),
                user: {
                    id: user?.id,
                    first_name: user?.first_name,
                    last_name: user?.last_name,
                    image_url: user?.image,
                },
                created_at: new Date().toISOString(),
            };

            setText('');
            if (onSuccess) onSuccess(newReply);
        } catch (err) {
            message.error('Javob yuborilmadi');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleReply} className={styles.replyForm}>
            <div className={styles.inputContainer}>
                <Input.TextArea
                    autoSize={{ minRows: 2, maxRows: 6 }}
                    className={styles.textArea}
                    placeholder="Javob yozing..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <div className={styles.formActions}>
                    {onCancel && (
                        <Button
                            className={styles.formButton}
                            onClick={onCancel}
                            shape="round">
                            Bekor qilish
                        </Button>
                    )}
                    <Button
                        type="primary"
                        htmlType="submit"
                        className={styles.formButton}
                        loading={loading}
                        disabled={!text.trim()}
                        shape="round">
                        Javob berish
                    </Button>
                </div>
            </div>
        </form>
    );
}
