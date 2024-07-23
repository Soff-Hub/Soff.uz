import React from 'react';

export default function PlaylistVideo({
    product
}) {


    return (
        <div className='video_iframe-2' style={{ backgroundSize: 'cover', borderRadius: '14px', backgroundImage: `url("${product?.image}")`, padding: '0', maxHeight: '450px', position: 'relative' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                padding: '0 7px',
                borderRadius: '6px',
                height: '30px',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                fontWeight: 'bold',
                color: 'white',
            }}>
                <i class="fa-solid fa-list-check"></i>
                {23} ta video
            </div>

            <div style={{
                height: '12px',
                width: '89%',
                backgroundColor: 'rgb(140, 140, 140)',
                position: 'absolute',
                top: '-12px',
                transform: 'translateX(-50%)',
                left: '50%',
                borderTopRightRadius: '60px',
                borderTopLeftRadius: '60px',
                border: '1px solid',
                zIndex: '0',
            }} className='ov-1'></div>

            <div style={{
                height: '13px',
                width: '93%',
                backgroundColor: 'rgb(147, 118, 128)',
                border: '1px solid',
                position: 'absolute',
                top: '-10px',
                transform: 'translateX(-50%) rotateX(60deg)',
                left: '50%',
                borderTopRightRadius: '60px',
                borderTopLeftRadius: '60px',
            }} className='ov-2'></div>

            <div
                style={{ maxHeight: '450px', backgroundColor: 'rgba(0, 0, 0, 0.3)', height: '100%', borderTop: '1px solid', width: '100%', borderRadius: '14px' }}
            >
            </div>
        </div>
    );
}
