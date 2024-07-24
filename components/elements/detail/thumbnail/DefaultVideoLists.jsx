import React, { useEffect } from 'react';

export default function DefaultVideoLists({
    product,
    minWidth,
    height,
    style = {},
}) {



    const url = product?.document?.file_url
        ? product?.document?.file_url
        : product?.document?.short_content_url



    return (
        <div style={{ backgroundSize: 'cover', borderRadius: '4px', backgroundImage: `url("${product?.poster_url}")`, }}>
            <video
                id={`videoPlayer-${product.id}`}
                className={'video_iframe'}
                width={'100%'}
                height="100%"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: height,
                    minWidth: minWidth,
                    objectFit: 'cover',
                    borderRadius: "10px",
                    ...style
                }}
                controls={false}
                onContextMenu={(e) => e.preventDefault()}
                disablePictureInPicture
                controlsList="nodownload"
                poster={product?.poster_url ? product?.poster_url : product?.poster}
            >
                <source src={url} />
            </video>
        </div>
    );
}
