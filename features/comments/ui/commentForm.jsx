import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { baseURL } from '~/repositories/api';
import { message } from 'antd';
import { Rate } from 'antd';
import useResponsive from '~/shared/utilities/useResponsive';

export default function CommentForm({
    documentId,
    fComment,
    initialRating = 0,
    onSuccess,
    mode = 'default',
}) {
    const [text, setText] = useState('');
    const [rating, setRating] = useState(initialRating);
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
        setRating(initialRating);
    }, [initialRating]);

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
            setRating(0); // Rate reset
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
        <form onSubmit={handleSubmit} className={isModal ? '' : 'mb-5'}>
            <div
                style={{
                    background: '#fff',
                    padding: isModal ? 0 : undefined,
                }}
                className={isModal ? 'mb-0' : 'mb-4 p-5 rounded-3'}>
                <textarea
                    style={{
                        borderRadius: '10px',
                        border: isModal ? '1px solid #d9d9d9' : 'none',
                        background: '#fff',
                        width: '100%',
                        padding: isModal ? '12px' : undefined,
                    }}
                    className={isModal ? 'fs-4' : 'w-100 fs-4'}
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
                            style={{ fontSize: getRateFontSize() }}
                            allowHalf
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
