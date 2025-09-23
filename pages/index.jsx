import React from 'react';
import HomePage from '~/components/freeleance/home/HomePage';
import PageLayout from '~/components/layouts/PageLayout';
import Meta from '~/components/shared/headers/Meta';
import { TelegramLink } from '~/components/shared/telegramLink';

function NewHomePage() {
    return (
        <PageLayout>
            <Meta
                title="Raqamli mahsulotlar va onlayn xizmatlar bozori – Soff.uz"
                description={'Soff.uz - tayyor materiallar, ilmiy ishlar, 3D dizaynlar, veb saytlar, dizayn shablonlari va turli xizmatlar bozori. Hozir xarid qiling yoki soting!'}
                keywords={[
                    { name: "raqamli mahsulotlar" },
                    { name: "onlayn xizmatlar" },
                    { name: "tayyor materiallar" },
                    { name: "ilmiy ishlar" },
                    { name: "3D dizayn" },
                    { name: "dizayn shablonlari" },
                    { name: "veb saytlar" },
                    { name: "grafik dizayn" },
                    { name: "akademik xizmatlar" },
                    { name: "Soff.uz" },
                ]}
                author='Soff.uz'
                image='c'
            />
            <HomePage />
            <TelegramLink />
        </PageLayout>
    );
}

export default NewHomePage;
