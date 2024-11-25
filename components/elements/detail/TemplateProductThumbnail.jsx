import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Image as AntImage, Space } from 'antd';

export default function TemplateProductThumbnail({ data }) {
    const [poster, setPoster] = useState({})
    const [visible, setVisible] = useState(null);

    const handleHover = () => {
        const overlay = document.querySelector('.thumbnail-overlay')
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'
    }
    const handleUnHover = () => {
        const overlay = document.querySelector('.thumbnail-overlay')
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)'
    }

    useEffect(() => {
        setPoster(data[0])
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
                    src={poster?.url}
                    preview={{
                        visible,
                        src: poster?.url,
                        onVisibleChange: (value) => {
                            setVisible(value);
                        },
                        toolbarRender: (
                            _,
                            {
                                actions: {
                                    onActive,
                                    onZoomOut,
                                    onZoomIn,
                                },
                            },
                        ) => (
                            <Space size={12} className="toolbar-wrapper">
                                <div className="p-1" style={{ cursor: 'pointer' }}>
                                    <i class="fa-solid fa-arrow-left-long fs-1" onClick={() => data?.some(el => el.id === poster?.id - 1) ? setPoster(data[poster?.id - 1]) : setPoster(data[data?.length - 1])} ></i>
                                </div>
                                <div className="p-1" style={{ cursor: 'pointer' }}>
                                    <i class="fa-solid fa-arrow-right-long fs-1" onClick={() => data?.some(el => el.id === poster?.id + 1) ? setPoster(data[poster?.id + 1]) : setPoster(data[0])}></i>
                                </div>
                                <div className="p-1" style={{ cursor: 'pointer' }}>
                                    <i class="fa-solid fa-magnifying-glass-minus fs-1" onClick={onZoomOut}></i>
                                </div>
                                <div className="p-1" style={{ cursor: 'pointer' }}>
                                    <i class="fa-solid fa-magnifying-glass-plus fs-1" onClick={onZoomIn}></i>
                                </div>
                            </Space>
                        )
                    }}
                />
            </div>

            <div className='d-flex align-items-center gap-2 mt-2 px-2'>
                {
                    data.map((_) => (
                        <div style={{ cursor: 'pointer', height: '60px', width: '100px', borderRadius: '5px', backgroundColor: '#F6F5F2', }} onClick={() => setPoster(_)} className={`${_?.id === poster?.id ? 'active-thumb' : 'noactive-thumb'}`}>
                            <Image
                                key={_?.id}
                                height={60}
                                width={100}
                                src={_?.url}
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

