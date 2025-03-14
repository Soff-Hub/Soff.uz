import React from 'react';

const footerMenu = {
    soff: {
        logoImg: '/static/img/soff.svg',
        title: 'Intellektual mulk marketi',
        path: '#',
    },
    companies: {
        title: 'Kompaniya',
        links: [
            'Biz haqimizda',
            'Soff Study',
            'Soff CRM',
            'Soff HUB',
            'Soff Birja',
        ],
        path: [
            '#',
            'https://soffstudy.uz/',
            'https://soffcrm.uz/',
            'https://soffhub.uz/',
            'https://birja.soff.uz/',
        ],
    },
    services: {
        title: 'Xizmatlar katalogi',
        links: [
            'Ilmiy ishlar',
            '3D modellar',
            'Dizayn shablonlari',
            'Veb saytlar',
            'Video darsliklar',
        ],
        path: ['#', '#', '#', '#', '#'],
    },
    sociols: {
        title: 'Ijtimoiy tarmoqlarimiz',
        icons: [
            '/static/img/youtube.svg',
            '/static/img/telegram.svg',
            '/static/img/instagram.svg',
            '/static/img/linkedin.svg',
        ],
        links: ['@soffuz', 't.me/soff_uz', 'soffuz_', 'Soff Hub'],
        path: [
            'https://www.youtube.com/@soffuz',
            'https://t.me/Soffstudyuz',
            'https://www.instagram.com/soffuz_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
            'https://www.linkedin.com/company/soffhub/posts/?feedView=all',
        ],
    },
    contact: {
        title: 'Biz bilan bog’lanish',
        icons: [
            '/static/img/linkPhone.png',
            '/static/img/linkTelegram.png',
            '/static/img/linkEmail.png',
        ],
        links: ['+998 (91) 008 67 89', '@soffuz_support', 'soffuz@gmail.com'],
        path: [
            'tel:+998910086789',
            'https://t.me/soffuzsupport_bot',
            'soffuz@gmail.com',
        ],
    },
};

export default function FooterComponents () {
    return (
        <div
            className='bg-white'
            style={{
                // marginTop: '116.52px',
                marginTop: '20px',
                padding: '57px 0 64px',
                borderBottom: '1px solid rgba(0, 164, 79, 1)',
            }}>
            <footer className=' bg-white container p-lg-0 d-flex  justify-content-between align-items-start flex-wrap '>
                <div className='logo col-xl-2 col-lg-3 col-md-6 col-sm-12 col-12'>
                    <img
                        src='/static/img/soff/logo-dark.png'
                        alt='logo'
                        className='mb-5'
                        style={{ width: '192px' }}
                    />
                    <a
                        href={footerMenu.soff.path}
                        className='fs-2 text-dark fw-bold text-decoration-none d-block'>
                        {footerMenu.soff.title}
                    </a>
                </div>

                <div className='company col-xl-2 col-lg-3 col-md-6 col-sm-12 col-12'>
                    <h5 className='fw-semibold fs-2 mb-5'>
                        {footerMenu.companies.title}
                    </h5>
                    {footerMenu.companies.links.map((link, i) => (
                        <a
                            target='_blank'
                            key={i}
                            href={footerMenu.companies.path[i]}
                            className='footer-link d-block hover:text-success fs-4 mb-3'>
                            {link}
                        </a>
                    ))}
                </div>

                {/* Xizmatlar bo‘limi */}
                <div className='col-xl-2 col-lg-3 col-md-6 col-sm-12 col-12'>
                    <h5 className='fw-semibold fs-2 mb-5'>
                        {footerMenu.services.title}
                    </h5>
                    {footerMenu.services.links.map((link, i) => (
                        <a
                            target='_blank'
                            key={i}
                            href={footerMenu.services.path[i]}
                            className='footer-link d-block fs-4 mb-3'>
                            {link}
                        </a>
                    ))}
                </div>

                {/* Ijtimoiy tarmoqlar */}
                <div className='col-xl-2 col-lg-3 col-md-6 col-sm-12 col-12'>
                    <h5 className='fw-semibold fs-2 mb-5'>
                        {footerMenu.sociols.title}
                    </h5>
                    {footerMenu.sociols.links.map((link, i) => (
                        <a
                            target='_blank'
                            key={i}
                            href={footerMenu.sociols.path[i]}
                            className='d-flex align-items-center gap-3 footer-link fs-4 mb-3'>
                            <img
                                src={footerMenu.sociols.icons[i]}
                                alt={link}
                                className='me-2'
                                style={{ width: '20px' }}
                            />
                            {link}
                        </a>
                    ))}
                </div>

                {/* Bog‘lanish bo‘limi */}
                <div className='col-xl-2 col-lg-3 col-md-6 col-sm-12 col-12 '>
                    <h5 className='fw-semibold fs-2 mb-5'>
                        {footerMenu.contact.title}
                    </h5>
                    {footerMenu.contact.links.map((link, i) => (
                        <a
                            target='_blank'
                            key={i}
                            href={footerMenu.contact.path[i]}
                            className='d-flex align-items-center footer-link gap-3 footer-link fs-4 mb-3'>
                            <img
                                src={footerMenu.contact.icons[i]}
                                alt={link}
                                className='me-2'
                                style={{ width: '20px' }}
                            />
                            {link}
                        </a>
                    ))}
                </div>
            </footer>
        </div>
    );
}
