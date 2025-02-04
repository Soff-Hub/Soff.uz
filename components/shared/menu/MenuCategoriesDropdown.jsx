import Link from 'next/link';
import React from 'react';

const MenuCategoriesDropdown = () => {
    return (
        <div className="menu--product-categories">
            <div className="menu__toggle menu__toggle__drop_down_item">
                    <a className='fs-3 font-weight-lighter'>
                        <i class="fa-solid fa-angle-down mr-2"></i>
                        Ko‘rib chiqing
                    </a>
                <div className="menu__toggle__drop_down">
                    <div className="menu__item">
                        <Link href={'https://t.me/soff_uz'}>
                            <a className='fs-3' target="_blank">
                                Soff Hamjamiyati
                                <p className='menu__item__description font-weight-lighter'>Telegram kanallarimizda yangiliklar va imkoniyatlarni kuzatib boring.</p>
                            </a>
                        </Link>
                    </div>
                    <div className="menu__item">
                        <Link href={'/page/video-list'}>
                            <a className='fs-3'>
                                Qo'llanmalar
                                <p className='menu__item__description font-weight-lighter'>Foydalanish bo‘yicha foydali qo‘llanmalar va maslahatlar.</p>
                            </a>
                        </Link>
                    </div>
                    <div className="menu__item">
                        <Link href={'/page/oferta'}>
                            <a className='fs-3'>
                                Oferta
                                <p className='menu__item__description font-weight-lighter'>Xizmatlardan foydalanish shartlari va qoidalari.</p>
                            </a>
                        </Link>
                    </div>
                    <div className="menu__item">
                        <Link href={'/page/faq'}>
                            <a className='fs-3'>
                                Ko'p beriladigan savollar
                                <p className='menu__item__description font-weight-lighter'>Eng ko‘p so‘raladigan savollarga javoblar.</p>
                            </a>
                        </Link>
                    </div>
                    <div className="menu__item">
                        <Link href="tel:+998910086789">
                            <a className='fs-3'>
                                Yordam
                                <p className='menu__item__description font-weight-lighter'>+998 (91) 008 67 89</p>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="menu__toggle">
                <Link href={'https://seller.soff.uz/'}>
                    <a className='fs-3' target="_blank">
                        Sotuvchi bo'lish
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default MenuCategoriesDropdown;
