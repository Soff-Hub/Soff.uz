import Script from 'next/script';
import React, { useEffect, useRef } from 'react';

const ThumbnailDefault = ({ product, views }) => {
    // console.log("product -> ", product);
    
    // product?.document?.images?.sort((a, b) => a?.id - b?.id)

    const wrapperRef = useRef(null);


    useEffect(() => {
        if (wrapperRef.current) {
            wrapperRef.current.scrollTop = 0;

            if (
                wrapperRef.current.scrollTop + wrapperRef.current.clientHeight >=
                wrapperRef.current.scrollHeight
            ) {
                wrapperRef.current.scrollTop = 0;
            }
        }

    }, [product]);

    return (
        <>
            <div>
                <figure
                    style={{
                        // boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        position: 'relative'
                    }}>
                    <div className="ps-wrapper d-block p-4 border" ref={wrapperRef}>
                        {product?.document?.images?.length > 0
                            ? product?.document?.images?.map((item, i) => (
                                <img
                                    src={item?.image_url}
                                    className="border mb-3 w-100 mx-auto"
                                    // width="100%"
                                    // height={['.docx', '.doc', '.pdf'].includes(type) ? '800px' : '400px'}
                                    // style={{ objectFit: 'contain' }}
                                    key={i}
                                    detail={true}
                                    style={{ display: 'flex', width: '90%', maxWidth: '60%' }}
                                />
                            ))
                            : ''}
                    </div>
                    <div className="views">
                        {' '}
                        <i className="fa-solid fa-eye"></i> <span>{views}</span>
                    </div>
                </figure>
            </div>
        </>
    );
};

export default ThumbnailDefault;
