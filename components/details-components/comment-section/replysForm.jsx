import { useState } from 'react';
import Cookies from 'js-cookie';
import { message } from 'antd';
import { baseURL } from '~/repositories/api';
import Axios from 'axios';

export default function ReplyForm({ commentId, documentId, onSuccess }) {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleReply = async (e) => {
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
            setText('');
            if (onSuccess) onSuccess();
        } catch (err) {
            message.error('Javob yuborilmadi');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleReply} className="mt-3 ms-5">
            <textarea
                style={{
                    borderRadius: '10px',
                    border: 'none',
                    background: '#f0f0f0',
                }}
                className="form-control mb-2"
                rows="2"
                placeholder="Javob yozing..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button
                type="submit"
                className="btn btn-success btn fs-3  px-4"
                disabled={loading}>
                {loading ? 'Yuborilmoqda...' : 'Yuborish'}
            </button>
        </form>
    );
}
