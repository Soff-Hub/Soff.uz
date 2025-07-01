import { useState } from 'react';
import { Rating } from 'react-simple-star-rating'

export default function CommentForm() {
    const [text, setText] = useState('');
    const [rating, setRating] = useState(0)
    const [ratingKey, setRatingKey] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        console.log("Yuborilgan comment:", text);
        console.log("Yuborilgan rating:", rating);
        
        setText('');
        setRating(0);

        setRatingKey(prev => prev + 1)
    };

    const handleRating = (rate) => {
        setRating(rate)
    }

    return (
        <form onSubmit={handleSubmit} className="mb-5">
            <div style={{background: '#f0f0f0'}} className="mb-4 p-5 rounded-3">
                <textarea
                    style={{borderRadius:'10px', border:'none', background:'#f0f0f0'}}
                    className="w-100 fs-4 "
                    rows="5"
                    placeholder="Izohingizni yozing..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <div className='d-flex justify-content-between align-items-center'>
                    <Rating
                        key={ratingKey}
                        onClick={handleRating}
                        size={25}
                        ratingValue={rating}
                    />
                    <button type="submit" className="btn fs-2 rounded-5 py-2 px-5 btn-success">Jo'natish</button>
                </div>
            </div>
        </form>
    );
}
