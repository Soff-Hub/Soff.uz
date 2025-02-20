import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Image as AntImage, Space } from 'antd';

export default function TemplateProductThumbnail({ data }) {
    const [poster, setPoster] = useState({})
    const [visible, setVisible] = useState(null);
    const [preview, setPreview] = useState({});


    const handleHover = () => {
        const overlay = document.querySelector('.thumbnail-overlay')
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'
    }
    const handleUnHover = () => {
        const overlay = document.querySelector('.thumbnail-overlay')
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)'
    }

    useEffect(() => {
        setPoster(data?.[0])
        setPreview(data?.[0])
    }, [data])


    return (
        <div className=''>
            <div className='px-2' style={{ borderRadius: '10px', backgroundColor: '#F6F5F2', position: 'relative' }} onMouseEnter={handleHover} onMouseLeave={handleUnHover}>
                <Image
                    height={600}
                    width={1000}
                    src={poster?.url}
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
                <div
                    className='thumbnail-overlay d-flex align-items-center justify-content-center'
                    style={{
                        position: 'absolute',
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        top: 0, left: 0,
                        right: 0, bottom: 0,
                        margin: 'auto',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                    onClick={() => setVisible(poster?.url)}
                >
                    <i class="fa-solid fa-up-right-and-down-left-from-center text-white fs-1"></i>
                </div>
                <AntImage
                    width={200}
                    style={{
                        display: 'none',
                    }}
                    src={preview?.url}
                    preview={{
                        visible,
                        src: preview?.url,
                        onVisibleChange: (value) => {
                            setVisible(value);
                        },
                        toolbarRender: (
                            _,
                            {
                                actions: {
                                    onZoomOut,
                                    onZoomIn,
                                },
                            },
                        ) => (
                            <Space size={12} className="toolbar-wrapper bg-white p-2">
                                <div className="p-1" style={{ cursor: 'pointer' }}>
                                    <i class="fa-solid fa-arrow-left-long fs-1 text-black" onClick={() => data?.some(el => el.id === preview?.id - 1) ? setPreview(data[preview?.id - 1]) : setPreview(data[data?.length - 1])} ></i>
                                </div>
                                <div className="p-1" style={{ cursor: 'pointer' }}>
                                    <i class="fa-solid fa-arrow-right-long fs-1 text-black" onClick={() => data?.some(el => el.id === preview?.id + 1) ? setPreview(data[preview?.id + 1]) : setPreview(data[0])}></i>
                                </div>
                                <div className="p-1" style={{ cursor: 'pointer' }}>
                                    <i class="fa-solid fa-magnifying-glass-minus fs-1 text-black" onClick={onZoomOut}></i>
                                </div>
                                <div className="p-1" style={{ cursor: 'pointer' }}>
                                    <i class="fa-solid fa-magnifying-glass-plus fs-1 text-black" onClick={onZoomIn}></i>
                                </div>
                            </Space>
                        )
                    }}
                />
            </div>

            <div className='d-flex align-items-center gap-2 mt-2 px-2'>
                {
                    data?.map((item) => (
                        item?.url && <div style={{ cursor: 'pointer', height: '60px', width: '100px', borderRadius: '5px', backgroundColor: '#F6F5F2', }} onClick={() => (setPoster(item), setPreview(item))} className={`${item?.id === poster?.id ? 'active-thumb' : 'noactive-thumb'}`}>
                            <Image
                                key={item?.id}
                                height={60}
                                width={100}
                                src={item?.url}
                                priority={false}
                                alt={"slow network"}
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

