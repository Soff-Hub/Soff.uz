import { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { baseURL } from '~/repositories/api';
import { message } from 'antd';
import { Rate } from 'antd';

export default function Comment_Form({ documentId, fComment }) {
    const [text, setText] = useState('');
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

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

            setText('');
            setRating(0);
            message.success('Izoh muvaffaqiyatli yuborildi!');
        } catch (err) {
            message.error('Izoh yuborilmadi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-5">
            <div style={{ background: '#fff' }} className="mb-4 p-5 rounded-3">
                <textarea
                    style={{
                        borderRadius: '10px',
                        border: 'none',
                        background: '#fff',
                    }}
                    className="w-100 fs-4 "
                    rows="5"
                    placeholder="Izohingizni yozing..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="d-flex justify-content-between align-items-center mt-3">
                    {!fComment ? (
                        <Rate
                            value={rating}
                            onChange={(value) => setRating(value)}
                            style={{ fontSize: 24 }}
                        />
                    ) : (
                        <div></div>
                    )}
                    <button
                        type="submit"
                        className="btn fs-4 rounded-5 py-2 px-5 btn-success"
                        disabled={loading}>
                        {loading ? 'Yuborilmoqda...' : "Jo'natish"}
                    </button>
                </div>
            </div>
        </form>
    );
}
