import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import CommentForm from './commentForm';
import axios from 'axios';
import { baseURL } from '~/repositories/api';
import { useSelector } from 'react-redux';

export default function CommentFormWrapper({ slug, id }) {
    const { t } = useTranslation('product-pages');
    const [canReview, setCanReview] = useState(false);
    const [hasFirstComment, setHasFirstComment] = useState(false);
    const [loading, setLoading] = useState(true);
    const { user } = useSelector((state) => state.auth);
    const token = user?.access;

    useEffect(() => {
        const checkPermission = async () => {
            try {
                if (token) {
                    const res = await axios.get(
                        `${baseURL}customer/can-review/${slug}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    setCanReview(res.data.can_review);
                    setHasFirstComment(res.data.has_first_comment);
                }
            } catch (err) {
                console.error('Ruxsat tekshirishda xatolik:', err);
            } finally {
                setLoading(false);
            }
        };

        if (slug) checkPermission();
    }, [slug, token]);

    if (loading) return <p>{t('productDetail.comments.checking')}</p>;

    if (canReview) {
        return (
            <div>
                <CommentForm documentId={id} fComment={hasFirstComment} />
            </div>
        );
    }

    return null;
}
