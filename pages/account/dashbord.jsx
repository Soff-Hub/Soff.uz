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
import { Modal } from 'antd';

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
    const [step, setStep] = useState(null)
    const [open, setOpen] = useState(false)

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
            content: "Barcha sotilgan mahsulotlaringiz ma'lumotlari sahifasi",
        },
        {
            target: '.step-10',
            content: "Kelib tushgan donatlar ma'lumotlari sahifasi",
        },
        {
            target: '.step-11',
            content: "Balansingizdan pul yechish va sayt rivoji uchun taklif va murojaatlar yuborish sahifasi",
        },
        {
            target: '.step-12',
            content: "Shaxsiy ma'lumotlaringiz va kartalaringizni boshqarish sahifasi",
        },
    ]

    const questions = [
        // {
        //     target: '.step-1',
        //     content: "Barcha daromadlarim hisobini qayerdan olaman",
        // },
        // {
        //     target: '.step-3',
        //     content: "Balansim va taklif qilgan foydalanuvchilarim haqidagi ma'lumotlar qayerda",
        // },
        {
            target: '.step-5',
            content: "Men o'zim yuklagan mahsulotlarimni qayerdan topaman",
        },
        {
            target: '.step-6',
            content: 'Mahsulot sotib oldim lekin uni topa olmayapman, qayerda',
        },
        // {
        //     target: '.step-7',
        //     content: "Yangi mahsulotni qanday yuklasam bo'ladi",
        // },
        {
            target: '.step-9',
            content: "Mendan sotib olingan mahsulotlarni qayerda ko'rsam bo'ladi",
        },
        // {
        //     target: '.step-10',
        //     content: "Menga donat qilganlar ma'lumotni ko'ra olmayapman",
        // },
        {
            target: '.step-11',
            content: "Balansimdagi pulni kartamga qanday o'tkazaman",
        },
        {
            target: '.step-11',
            content: "Mening sayt haqida taklif yoki shikoyatim bor, qayerga yozay",
        },
        {
            target: '.step-12',
            content: "Profilim ma'lumotlarini va kartalarimni o'zgartira olamanmi",
        },
    ]

    const callback = (data) => {
        if (data.action === 'reset') {
            localStorage.removeItem('tour')
            window.scrollTo(0, 0);
            setRun(false)
        }
    };


    const callbackSingle = (data) => {
        if (data.action === 'next' || data.action === 'reset' || data.action === 'finish') {
            // window.scrollTo(0, 0);
            const doc = document.querySelector('.headerSticky')
            doc.id = "headerSticky"
            setStep(null)
        }
    };

    const setSingleStep = (step) => {
        setOpen(false)
        const doc = document.querySelector('.headerSticky')
        doc.id = ""
        const item = steps.findIndex(el => el.target === step.target)
        setStep(item)
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
                {user?.role === 'seller' && <Joyride
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
                    // hideCloseButton
                    callback={callback}
                    locale={{
                        back: "Oldingi",
                        last: "Tugatish",
                        close: "Yopish",
                        next: "Keyingi",
                        open: "Ochish",
                        skip: "O'tkazib yuborish"
                    }}
                />}
                {step && user?.role === 'seller' && <Joyride
                    steps={steps}
                    run
                    continuous
                    floaterProps={{
                        autoOpen: true,
                        placement: 'right-start',
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
                    callback={callbackSingle}
                    stepIndex={step}
                    disableCloseOnEsc
                    locale={{
                        back: "",
                        last: "Tushundim",
                        close: "Yopish",
                        next: "Tushundim",
                        open: "Ochish",
                    }}
                />}

                <Modal
                    title="Eng ko'p beriladigan savollar"
                    open={open}
                    onOk={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                    okText="Yopish"
                    cancelButtonProps={{ style: { display: 'none' } }}
                    okButtonProps={{ style: { backgroundColor: '#00A44F' } }}>
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px', gap: '6px' }}>
                        {
                            questions.map((ask, index) => (
                                <p key={index} onClick={() => setSingleStep(ask)} style={{ color: '#004a14', cursor: 'pointer' }}>
                                    <i className='fa-solid fa-question fa-sm'></i>. {ask.content}
                                </p>
                            ))
                        }
                    </div>
                </Modal>


                <DashbordList setOpen={setOpen} />
            </div>
        </PageContainer> : user?.access ? <Page404 /> : <Selection />
    );
};

export default MyAccountPage;
