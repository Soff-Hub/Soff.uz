import { useEffect, useState } from 'react';
import CommentForm from './commentForm';
import Axios from 'axios';
import { baseURL } from '~/repositories/api';
import Cookies from 'js-cookie';


export default function CommentFormWrapper({ slug, id }) {
  const [canReview, setCanReview] = useState(false);
  const [hasFirstComment, setHasFirstComment] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get('token');

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const res = await Axios.get(`${baseURL}customer/can-review/${slug}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCanReview(res.data.can_review);
        setHasFirstComment(res.data.has_first_comment);
      } catch (err) {
        console.error('Ruxsat tekshirishda xatolik:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) checkPermission();
  }, [slug]);

  if (loading) return <p>Tekshirilmoqda...</p>;

  if (!canReview) {
    return (
      <div className="alert alert-warning fs-5">
        Bu mahsulotga faqat mahsulotni sotib olganlargina izoh yozoladi
      </div>
    );
  }

  return (
    <div>
        <CommentForm documentId={id} fComment={hasFirstComment}/>
    </div>
  );
}
