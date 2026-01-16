import { useState } from 'react';
import Cookies from 'js-cookie';
import { message, Input, Button } from 'antd'; // Imported Button
import { baseURL } from '~/repositories/api';
import Axios from 'axios';
import styles from './commentList.module.scss';

interface ReplyFormProps {
    commentId: number;
    documentId: string;
    onSuccess?: () => void;
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

    const handleReply = async (e: any) => {
        // Prevent default if called from form submit
        if (e && e.preventDefault) {
            e.preventDefault();
        }

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
            setText('');
            if (onSuccess) onSuccess();
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
