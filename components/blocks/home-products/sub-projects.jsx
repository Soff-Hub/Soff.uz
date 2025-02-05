import React from 'react'

export default function SubProjects() {

    const projecs = [
        {
            logo: '/static/img/soff/logo-dark.png',
            link: 'https://soff.uz',
            linkMask: 'SOFF.UZ - Intellektual mulk marketi',
        },
        {
            logo: 'https://soffstudy.uz/assets/imgs/page/logo/Soff%20Study%20dark%20logo.png',
            link: 'https://soffstudy.uz',
            linkMask: 'SOFF STUDY - Zamonaviy kasblarni o\'qitish markazi',
        },
        {
            logo: 'https://soffhub.uz/assets/imgs/page/about/soffhub-removebg-preview.png',
            link: 'https://soffhub.uz',
            linkMask: 'SOFFHUB - Biznes uchun raqamli yechimlar',
        },
        {
            logo: 'https://birja.soff.uz/images/soffbirja-dark-logo.png',
            link: 'https://birja.soff.uz',
            linkMask: 'SOFF BIRJA - Intellektual mulk birjasi',
        },
        {
            logo: 'https://soffcrm.uz/_next/image?url=%2Fassets%2Fimages%2Flogo.jpg&w=256&q=75',
            link: 'https://soffcrm.uz',
            linkMask: 'SOFFCRM - O\'quv markazlar uchun crm tizim',
        },
        {
            logo: '',
            link: '#',
            linkMask: 'Biz rivojalishda davom etamiz!',
            title: "SOFF Jamoasi",
            last: true
        }
    ]

    return (
        <div>
            <div className="system">
                <div className="container">
                    <h2 className='text-center my-5'>Soff — faqatgina intellektual mulk bozori emas</h2>
                    <div className="system-inner">
                        {
                            projecs.map(el => (
                                <div className='system-card'>
                                    <div className="system-card-inner">
                                        {el?.last ? <h2 className='sdsdsd'>{el?.title}</h2> : <img src={el?.logo} alt='' height={40} />}
                                        <span className='system-text'>{el?.linkMask}</span>
                                        <a className='system-link' href={el?.link} target={el?.last ? '' : '_blank'}>.</a>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
