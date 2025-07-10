import { useEffect, useState } from 'react';
import Axios from 'axios';
import { baseURL } from '~/repositories/api';
import Cookies from 'js-cookie';
import Comment_Form from './comment-from';

export default function Comment_FormWrapper ({ slug, id }) {
    const [canReview, setCanReview] = useState(false);
    const [hasFirstComment, setHasFirstComment] = useState(false);
    const [loading, setLoading] = useState(true);
    const token = Cookies.get('token');

    useEffect(() => {
        const checkPermission = async () => {
            try {
                if (token) {
                    const res = await Axios.get(
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
    }, [slug]);

    if (canReview) {
        return (
            <div>
                

                <Comment_Form documentId={id} fComment={hasFirstComment} />
            </div>
        );
    }

    return <div></div>;
}
