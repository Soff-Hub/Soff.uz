import { useState } from 'react';

export default function CommentForm() {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        console.log("Yuborilgan comment:", text); // Keyin API ga yuboriladi
        setText('');
    };

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
                <div>
                    <button type="submit" className="btn fs-2 rounded-5 py-2 px-5 btn-success">Jo'natish</button>
                    <select>
                        {[1,2,3,4,5].map(num => (
                            <option value={num}>{num}</option>
                        ))}
                    </select>
                </div>
            </div>
        </form>
    );
}