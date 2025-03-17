import React from 'react';

export default function Search_Results_Services () {
    const data = [
        {
            img: 'https://picsum.photos/400',
            avatar: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            statusImg:
                'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            title: 'Graphic, Logo, Packaging and brand design',
            price: '898 520',
        },
        {
            img: 'https://picsum.photos/400',
            avatar: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            statusImg:
                'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            title: 'Graphic, Logo, Packaging and brand design',
            price: '898 520',
        },
        {
            img: 'https://picsum.photos/400',
            avatar: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            statusImg:
                'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            title: 'Graphic, Logo, Packaging and brand design',
            price: '898 520',
        },
        {
            img: 'https://picsum.photos/400',
            avatar: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            statusImg:
                'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            title: 'Graphic, Logo, Packaging and brand design',
            price: '898 520',
        },
        {
            img: 'https://picsum.photos/400',
            avatar: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            statusImg:
                'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            title: 'Graphic, Logo, Packaging and brand design',
            price: '898 520',
        },
        {
            img: 'https://picsum.photos/400',
            avatar: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            statusImg:
                'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            title: 'Graphic, Logo, Packaging and brand design',
            price: '898 520',
        },
        {
            img: 'https://picsum.photos/400',
            avatar: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            statusImg:
                'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            title: 'Graphic, Logo, Packaging and brand design',
            price: '898 520',
        },
    ];
    return (
        <div className='Search_Results_Services'>
            <div className='Search_Results_Services_form_box'>
                <p className='countServices'>{data.length} ta xizmat</p>
                <form action='' className='Search_Results_Services_form'>
                    <div className='Search_Results_Services_form_inputBox'>
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
                        <option value=''>Kategoriya</option>
                    </select>
                    <select name='' id=''>
                        <option value=''>Sub kategoriya</option>
                    </select>
                    <select name='' id=''>
                        <option value=''>Budjet</option>
                    </select>
                    <select name='' id=''>
                        <option value=''>Reytingi yuqori</option>
                    </select>
                </form>
            </div>
            <div className='Search_Results_Services_product'>
                <div className='Search_Results_Services_wrap'>
                    {data.map((e, i) => (
                        <div className='Search_Results_Services_card'>
                            <img
                                className='Search_Results_Services_card_img'
                                src={e.img}
                                alt=''
                            />
                            <svg
                                className='likeBtn'
                                xmlns='http://www.w3.org/2000/svg'
                                width='25'
                                height='25'
                                viewBox='0 0 25 25'
                                fill='none'>
                                <rect
                                    x='0.1875'
                                    y='0.176758'
                                    width='24.4023'
                                    height='24.4023'
                                    rx='12.2011'
                                    fill='white'
                                />
                                <path
                                    d='M19.3134 7.70788C18.5464 6.94285 17.5077 6.51263 16.4245 6.51131C15.3412 6.50999 14.3015 6.93767 13.5326 7.70082L12.6097 8.55819L11.686 7.698C10.9173 6.93153 9.87569 6.50178 8.79021 6.5033C7.70473 6.50482 6.66431 6.93749 5.89783 7.70612C5.13135 8.47475 4.70161 9.51638 4.70313 10.6019C4.70465 11.6873 5.13732 12.7278 5.90595 13.4942L12.211 19.8917C12.2635 19.945 12.3261 19.9874 12.3952 20.0163C12.4642 20.0452 12.5383 20.0601 12.6132 20.0601C12.688 20.0601 12.7622 20.0452 12.8312 20.0163C12.9003 19.9874 12.9629 19.945 13.0154 19.8917L19.3134 13.4942C20.0804 12.7268 20.5112 11.6861 20.5112 10.6011C20.5112 9.51601 20.0804 8.47536 19.3134 7.70788ZM18.5124 12.7011L12.6097 18.6878L6.70333 12.6954C6.1475 12.1396 5.83523 11.3857 5.83523 10.5996C5.83523 9.81358 6.1475 9.0597 6.70333 8.50386C7.25917 7.94802 8.01305 7.63575 8.79912 7.63575C9.5852 7.63575 10.3391 7.94802 10.8949 8.50386L10.909 8.51797L12.2251 9.74228C12.3295 9.8395 12.4669 9.89354 12.6097 9.89354C12.7524 9.89354 12.8898 9.8395 12.9942 9.74228L14.3103 8.51797L14.3244 8.50386C14.8806 7.94839 15.6347 7.63664 16.4208 7.63716C17.2068 7.63769 17.9605 7.95047 18.516 8.50668C19.0714 9.06289 19.3832 9.81698 19.3827 10.6031C19.3821 11.3891 19.0694 12.1428 18.5131 12.6983L18.5124 12.7011Z'
                                    fill='#00A44F'
                                />
                            </svg>
                            <div className='Search_Results_Services_card_body'>
                                <div className='Search_Results_Services_card_infoPerson'>
                                    <img
                                        className='Search_Results_Services_card_infoPerson_avatar'
                                        src={e.avatar}
                                        alt=''
                                    />
                                    <p className='Search_Results_Services_card_infoPerson_isname'>
                                        {e.isName}
                                    </p>
                                    <img
                                        className='Search_Results_Services_card_infoPerson_status'
                                        src={e.statusImg}
                                        alt=''
                                    />
                                </div>
                                <p className='Search_Results_Services_card_title'>
                                    {e.title}
                                </p>
                                <p className='Search_Results_Services_card_price'>
                                    {e.price} so'm
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='forAdds'></div>
            </div>
        </div>
    );
}
