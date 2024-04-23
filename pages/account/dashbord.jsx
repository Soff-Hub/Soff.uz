import React, { useEffect, useState } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import DashbordList from '~/components/partials/account/dashbordList';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import { useSelector } from 'react-redux';
import Page404 from '../page/page-404';
import Selection from './selection';
import Meta from '~/components/shared/headers/Meta';
import Joyride from 'react-joyride';

const MyAccountPage = () => {
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: 'Bosh panel',
        },
    ];

    const { user } = useSelector(state => state.auth)
    const [run, setRun] = useState(false)

    const steps = [
        {
            target: '.step-0',
            content: "Saytdan foydalanish shartlari va qollanmalari bilan tanishib chiqing!",
        },
        {
            target: '.step-1',
            content: "Umumiy, oxirgi 30 kun, bugungi daromadlaringiz hisobi va jami buyurtmalaringiz soni",
        },
        {
            target: '.step-2',
            content: "Shaxsiy malumotlaringiz (F.I.SH, telefon raqam yoki email)",
        },
        {
            target: '.step-3',
            content: "O'z balansingiz, taklif qilingan foydalanuvchilar va taklif orqali topgan daromadingiz",
        },
        {
            target: '.step-4',
            content: "Umumiy daromadlaringiz hisobi va eng so'ngi buyutmalaringiz ko'rish sahifasi",
        },
        {
            target: '.step-5',
            content: "Sotuv uchun yuklagan barcha mahsulotlaringiz sahifasi",
        },
        {
            target: '.step-6',
            content: 'Sotib olgan mahsulotlaringiz sahifasi',
        },
        {
            target: '.step-7',
            content: "Sotish uchun yangi mahsulot yuklash sahifasi",
        },
        {
            target: '.step-8',
            content: "Tez kunda: Buyurtmachilardan ma'lum biror mahsulot tayyorlash uchun buyurtma olishingiz mumkin bo'ladi",
        },
        {
            target: '.step-9',
            content: "Barcha sotilgan mahsulotlar ma'lumotlari sahifasi",
        },
        {
            target: '.step-10',
            content: "Kelib tushdan donatlar ma'lumotlari sahifasi",
        },
        {
            target: '.step-11',
            content: "Balansdan pul yechish va Sayt rivoji uchun taklif va murojaatlar sahifasi",
        },
        {
            target: '.step-12',
            content: "Shaxsiy ma'lumotlar va kartalaringizni boshqarish sahifasi",
        },
    ]

    const callback = (data) => {
        if (data.action === 'reset') {
            // localStorage.removeItem('tour')
            window.scrollTo(0, 0);
            setRun(false)
        }
    };

    useEffect(() => {
        if (window.innerWidth > 1000 && localStorage.getItem('tour') && localStorage.getItem('tour') === "true") {
            setRun(true);
        }
    }, [])


    return (
        user?.role === 'admin' || user?.role === 'seller' ? <PageContainer footer={<FooterDefault />} title="Address">
            <div className="ps-page--my-account">
                <Meta
                    title={"Soff | Bosh panel"}
                />
                <BreadCrumb breacrumb={breadCrumb} />
                <Joyride
                    steps={steps}
                    run={run}
                    continuous
                    floaterProps={{
                        autoOpen: true,
                        placement: 'bottom',
                        offset: 0
                    }}
                    styles={{
                        options: {
                            arrowColor: '#e3ffeb',
                            primaryColor: '#00A44F',
                            textColor: '#004a14',
                            padding: 0
                        },
                    }}
                    disableOverlayClose
                    hideCloseButton
                    callback={callback}
                    locale={{
                        back: "Oldingi",
                        last: "Tugatish",
                        close: "Yopish",
                        next: "Keyingi",
                        open: "Ochish",
                        skip: "O'tkazib yuborish"
                    }}
                />
                <DashbordList />
            </div>
        </PageContainer> : user?.access ? <Page404 /> : <Selection />
    );
};

export default MyAccountPage;
