import Router from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

export default function DefaultVideo({ product, class_products }) {
    const { user } = useSelector((state) => state.auth);
    const router = Router.asPath



    return (

        <video
            id='videoPlayer'
            className={class_products ? "border w-100" : "video_iframe"}
            width="100%"
            height="auto"
            style={{
                background: class_products ? 'unset' : "",
                maxHeight: class_products ? "" : '380px',
                objectFit: "cover",
             
            }}
            controls={true}
            preload='none'
            poster={product?.poster_url ? product?.poster_url : product?.poster}
            src={((user?.role === 'admin' || user?.role === "seller") && (router === "/account/products?page=1" || router === "/account/myproducts")) ? product?.document?.file_url : product?.document?.short_content_url}
        >
            Your browser does not support the video tag.
        </video>

    );
}
