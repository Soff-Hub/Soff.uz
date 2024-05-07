import Router from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function DefaultVideo({ product, class_products, isPlay, setIsPlay }) {
    const { user } = useSelector((state) => state.auth);
    const router = Router.asPath

    useEffect(() => {
        const player = document.getElementById(`videoPlayer-${product.id}`)
        if (player && isPlay === product.id) {
            player.play()
        } else {
            player.pause()
        }
    }, [product, isPlay])



    return (

        <video
            // controlsList='nodownload'
            id={`videoPlayer-${product.id}`}
            className={class_products ? "border w-100" : "video_iframe"}
            width="100%"
            height="auto"
            style={{
                background: class_products ? 'unset' : "",
                maxHeight: class_products ? "" : '380px',
                objectFit: "cover",

            }}
            onPlay={(e) => setIsPlay(product?.id)}
            controls={true}
            preload='none'
            poster={product?.poster_url ? product?.poster_url : product?.poster}
            src={((user?.role === 'admin' || user?.role === "seller") && (router === "/account/products?page=1" || router === "/account/myproducts")) ? product?.document?.file_url : product?.document?.short_content_url}
        >
            Your browser does not support the video tag.
        </video>

    );
}
