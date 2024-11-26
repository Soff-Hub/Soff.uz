import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function TemplateProductThumbnail({ data, posterUrl }) {
    const [poster, setPoster] = useState(posterUrl)

    useEffect(() => {
        setPoster(posterUrl)
    }, [posterUrl])

    return (
        <div className=''>
            <div className='px-2' style={{ borderRadius: '10px', backgroundColor: '#F6F5F2', position: 'relative' }}>
                <Image
                    height={600}
                    width={1000}
                    priority={false}
                    src={poster?.url || 'https://placehold.co/600x400'}
                    alt={"product?.title"}
                    objectFit='contain'
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: '14px',
                        display: 'block !important',
                        verticalAlign: 'middle !important'
                    }}
                    layout='responsive'
                />
            </div>

            <div className='d-flex align-items-center gap-2 mt-2 px-2'>
                {
                    data ? (
                        data?.map((_) => (
                            <div style={{ cursor: 'pointer', height: '60px', width: '100px', borderRadius: '5px', backgroundColor: '#F6F5F2', }} onClick={() => setPoster(_)} className={`${_?.id === poster?.id ? 'active-thumb' : 'noactive-thumb'}`}>
                                <Image
                                    key={_?.id}
                                    height={60}
                                    width={100}
                                    priority={false}
                                    src={_?.url || 'https://placehold.co/600x400'}
                                    alt={"product?.title"}
                                    objectFit='contain'
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: '4px',
                                        display: 'block !important',
                                        verticalAlign: 'middle !important'
                                    }}
                                    layout='responsive'
                                />
                            </div>
                        ))
                    ) : (
                        [1, 2]?.map((_) => (
                            <div style={{ cursor: 'pointer', height: '60px', width: '100px', borderRadius: '5px', backgroundColor: '#F6F5F2', }} onClick={() => setPoster(_)} className={`${_?.id === poster?.id ? 'active-thumb' : 'noactive-thumb'}`}>
                                <Image
                                    key={_?.id}
                                    height={60}
                                    width={100}
                                    src={_?.url || 'https://placehold.co/600x400'}
                                    alt={"product?.title"}
                                    objectFit='contain'
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: '4px',
                                        display: 'block !important',
                                        verticalAlign: 'middle !important'
                                    }}
                                    layout='responsive'
                                />
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    );
}
