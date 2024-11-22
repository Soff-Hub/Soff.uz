import Image from 'next/image';
import React, { useState } from 'react';

export default function TemplateProductThumbnail() {
    const [thumb, setThumb] = useState(1);

    return (
        <div className=''>
            <div className='bg-white px-2' style={{ borderRadius: '10px' }}>
                <Image
                    height={600}
                    width={1000}
                    src={'https://eu2.contabostorage.com/20ddac7ab90d4d188d1ca104120b91ed:soffuz/media/poster/photo_2024-06-09_01-18-42.jpg'}
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
                    Array(7).fill(0).map((_, el) => (
                        <div style={{ cursor: 'pointer', height: '60px', width: '100px', borderRadius: '5px', }} onClick={() => setThumb(el)} className={`${el === thumb ? 'active-thumb' : 'noactive-thumb'}`}>
                            <Image
                                key={el}
                                height={60}
                                width={100}
                                src={'https://eu2.contabostorage.com/20ddac7ab90d4d188d1ca104120b91ed:soffuz/media/poster/photo_2024-06-09_01-18-42.jpg'}
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
                }
            </div>
        </div>
    );
}

