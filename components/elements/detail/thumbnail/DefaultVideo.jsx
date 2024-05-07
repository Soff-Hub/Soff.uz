import Router from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

export default function DefaultVideo({ product }) {
    const { user } = useSelector((state) => state.auth);
    const router = Router.asPath



    return (
        <div className="video_container">
            <div className="video_content">
                <video
                    id='videoPlayer'
                    className="video_iframe"
                    width="100%"
                    height="auto"
                    style={{ maxHeight: '380px' }}
                    controls
                    preload='none'
                    poster={product?.poster_url ? product?.poster_url : product?.poster}
                    src={((user?.role === 'admin' || user?.role === "seller") && (router==="/account/products?page=1" || router==="/account/myproducts")) ? product?.document?.file_url : product?.document?.short_content_url}
                >
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
}
