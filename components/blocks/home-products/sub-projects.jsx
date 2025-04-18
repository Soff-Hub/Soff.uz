import React from 'react';

export default function SubProjects() {
    const projecs = [
        {
            logoImg: '/static/img/soff.svg',
            imgAlt: "Soff uz logo",
            link: 'https://soff.uz',
            linkMask: 'SOFF.UZ - raqamli xizmatlar bozori!',
        },
        {
            logoImg: '',
            imgAlt: "Soff Jamoasi",
            link: '#',
            title: 'Soff Jamoasi',
            linkMask: 'Biz rivojalishda davom etamiz!',
            bgColor: 'rgba(0, 164, 79, 1)',
            textColor: '#fff',
            last: true,
        },
        {
            logoImg: '/static/img/soffcrm.svg',
            imgAlt: "Soff CRM logo",
            link: 'https://soffcrm.uz',
            linkMask: "SOFFCRM - O'quv markazlar uchun crm tizim",
        },
        {
            logoImg: '/static/img/_Soff_.svg',
            imgAlt: "Soff Hub logo",
            link: 'https://soffhub.uz',
            linkMask: 'SOFFHUB - Biznes uchun raqamli yechimlar',
        },
        {
            logoImg: '/static/img/soffBIrja.png',
            imgAlt: "Soff Birja logo",
            link: 'https://birja.soff.uz',
            linkMask: 'SOFF BIRJA - Intellektual mulk birjasi',
        },
        {
            logoImg: '/static/img/soff-study.png',
            imgAlt: "Soff Study logo",
            link: 'https://soffstudy.uz',
            linkMask: "SOFF STUDY - Zamonaviy kasblarni o'qitish markazi",
        },
    ];

    return (
            <div className='container mt-4'>
                <h2 className='product-list-title'>
                    Soff — faqatgina intellektual mulk bozori emas
                </h2>
                <div className='system-inner'>
                    {projecs.map((el, index) => (
                        <div className='system-card' key={index}>
                            <div
                                className='system-card-inner p-4'
                                style={{
                                    background:
                                        el?.bgColor || 'defaultColor',
                                }}>
                                {el?.last ? (
                                    <div className='d-flex gap-3'>
                                        {el?.logoImg && (
                                            <img src={el.logoImg} alt={el.imgAlt}/>
                                        )}
                                        <h2
                                            className='sdsdsd'
                                            style={{
                                                color:
                                                    el?.textColor ||
                                                    'defaultColor',
                                            }}>
                                            {el?.title}
                                        </h2>
                                    </div>
                                ) : (
                                    <>
                                        {el?.logoImg && (
                                            <img
                                                src={el.logoImg}
                                                alt={el.imgAlt}
                                            />
                                        )}
                                        <h2>{el?.title}</h2>
                                    </>
                                )}
                                <span
                                    className='system-text'
                                    style={{
                                        color:
                                            el?.textColor || 'defaultColor',
                                    }}>
                                    {el?.linkMask}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    );
}
