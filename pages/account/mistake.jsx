import Link from 'next/link';
import React from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';

export default function Mistake() {
    return (
        <PageContainer footer={<FooterDefault />} title="Login">
            <div className="site-content pb-5">
                <div className="ps-page--404">
                    <div className="container">
                        <div className="ps-section__content">
                            <figure>
                                <img style={{ maxWidth: '300px', width: '100%' }} src="/static/img/9787138.png" alt="" />
                                <h3 style={{ lineHeight: '48px', fontWeight: 500 }}>
                                    Afsuski siz o'zingizni taklif qilolmaysiz <br /> yoki siz allaqachon ro'yxatdan o'tgansiz
                                </h3>
                                <p>
                                    <Link href="/">
                                        <a> Bosh sahifaga qayting</a>
                                    </Link>
                                </p>
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}
