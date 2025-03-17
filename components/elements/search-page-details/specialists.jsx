import { Breadcrumb } from 'antd';
import React from 'react';

export default function Search_Results_Specialists () {
    const data = [
        {
            img: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            status: 'Ritsar',
            statusImg: 'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            job: 'Grafik dizayner',
        },
        {
            img: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            status: 'Ritsar',
            statusImg: 'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            job: 'Grafik dizayner',
        },
        {
            img: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            status: 'Ritsar',
            statusImg: 'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            job: 'Grafik dizayner',
        },
        {
            img: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            status: 'Ritsar',
            statusImg: 'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            job: 'Grafik dizayner',
        },
        {
            img: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            status: 'Ritsar',
            statusImg: 'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            job: 'Grafik dizayner',
        },
        {
            img: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            status: 'Ritsar',
            statusImg: 'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            job: 'Grafik dizayner',
        },
        {
            img: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            status: 'Ritsar',
            statusImg: 'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            job: 'Grafik dizayner',
        },
        {
            img: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            status: 'Ritsar',
            statusImg: 'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            job: 'Grafik dizayner',
        },
        {
            img: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            status: 'Ritsar',
            statusImg: 'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            job: 'Grafik dizayner',
        },
        {
            img: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            status: 'Ritsar',
            statusImg: 'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            job: 'Grafik dizayner',
        },
        {
            img: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            status: 'Ritsar',
            statusImg: 'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            job: 'Grafik dizayner',
        },
        {
            img: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            status: 'Ritsar',
            statusImg: 'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            job: 'Grafik dizayner',
        },
    ];
    return (
        <div>
            <div className='Search_Results_Specialists_form_box'>
                <p className='countSpecialist'>{data.length} ta mutaxassis</p>
                <form action='' className='Search_Results_Specialists_form'>
                    <div className='Search_Results_Specialists_form_inputBox'>
                        <input type='text' placeholder='Mutaxassisni izlash' />
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='12'
                            height='13'
                            viewBox='0 0 12 13'
                            fill='none'>
                            <path
                                d='M9.47006 9.13465L12 11.6646L11.1646 12.5L8.63465 9.97006C7.72497 10.6978 6.57133 11.1332 5.31661 11.1332C2.38184 11.1332 0 8.75138 0 5.81661C0 2.88184 2.38184 0.5 5.31661 0.5C8.25138 0.5 10.6332 2.88184 10.6332 5.81661C10.6332 7.07133 10.1978 8.22497 9.47006 9.13465ZM8.28487 8.69632C9.00722 7.95188 9.45175 6.93641 9.45175 5.81661C9.45175 3.53194 7.60127 1.68147 5.31661 1.68147C3.03194 1.68147 1.18147 3.53194 1.18147 5.81661C1.18147 8.10127 3.03194 9.95175 5.31661 9.95175C6.43641 9.95175 7.45188 9.50722 8.19632 8.78487L8.28487 8.69632Z'
                                fill='#7B7B7B'
                            />
                        </svg>{' '}
                    </div>
                    <select name='' id=''>
                        <option value=''>Kasb</option>
                    </select>
                    <select name='' id=''>
                        <option value=''>Reytingi yuqori</option>
                    </select>
                </form>
            </div>

            <div className='Search_Results_Specialists'>
                <div className='Search_Results_Specialists_Wrap'>
                    {data.map((e, i) => (
                        <div
                            key={i}
                            className='Search_Results_Specialists_Card'>
                            <img
                                className='Search_Results_Specialists_Card_img'
                                src={e.img}
                                alt=''
                            />
                            <div className='Search_Results_Specialists_Card_status_box'>
                                <img
                                    className='Search_Results_Specialists_Card_status_img'
                                    src={e.statusImg}
                                    alt=''
                                />
                                <p className='Search_Results_Specialists_Card_status'>
                                    {e.status}
                                </p>
                            </div>
                            <p className='Search_Results_Specialists_Card_isName'>
                                {e.isName}
                            </p>
                            <p className='Search_Results_Specialists_Card_job'>
                                {e.job}
                            </p>
                        </div>
                    ))}
                </div>
                <div className='forAdds'></div>
            </div>
        </div>
    );
}
