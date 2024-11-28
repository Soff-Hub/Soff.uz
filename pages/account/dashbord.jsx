import React, { useEffect, useState } from 'react';
import DashbordList from '~/components/partials/account/dashbordList';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import { useSelector } from 'react-redux';
import Page404 from '../page/page-404';
import Selection from './selection';
import Meta from '~/components/shared/headers/Meta';
import Joyride from 'react-joyride';
import { Modal, Segmented } from 'antd';
import BirjaDashbordList from '~/components/partials/account/BirjaDashbordList';
import { BdCrumb } from '~/components/elements/BreadCrumb';
import Router from 'next/router';

const MyAccountPage = () => {

    const { user } = useSelector(state => state.auth)
    const [run, setRun] = useState(false)
    const [step, setStep] = useState(null)
    const [open, setOpen] = useState(false)
    const [segmentValue, setSegmentValue] = useState('soff');

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
        {
            target: '.step-5',
            content: "Yuklagan mahsulotlarimni qayerdan ko'rsam bo'ladi?",
        },
        {
            target: '.step-6',
            content: "Mahsulot sotib oldim, lekin uni topa olmayapman. Qayerdan ko'ra olaman?",
        },
        {
            target: '.step-9',
            content: "Yuklagan mahsulotlarimni nechtasi sotilganini qayerdan ko'rsam bo'ladi?",
        },
        {
            target: '.step-11',
            content: "Balansimdagi pulni kartamga qanday o'tkazishim mumkin?",
        },
        {
            target: '.step-11',
            content: "Taklif yoki shikoyatlarim bor, qanday qilib sizlarga uni yuborishim mumkin?",
        },
        {
            target: '.step-12',
            content: "Profil va kartalarim ma'lumotlarini qayerdan o'zgartirishim mumkin?",
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
        // doc.id = ""
        const item = steps.findIndex(el => el.target === step.target)
        setStep(item)
    };

    useEffect(() => {
        if (window.innerWidth > 1000 && localStorage.getItem('tour') && localStorage.getItem('tour') === "true") {
            setRun(true);
        }
    }, [])

    useEffect(() => {
        if (user?.role === 'admin' && !user?.is_superuser) {
            Router.push('/account/shops')
        }
    }, [user])


    const handleSegmentChange = (value) => {
        setSegmentValue(value)
    };


    return (
        (user?.role === 'admin' || user?.role === 'seller') ? <PageContainer footer={<FooterDefault />} title="Address">
            <div className="ps-page--my-account">
                <Meta
                    title={"Bosh panel"}
                />
                <BdCrumb title={'Boshqaruv paneli'} />
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
                                    {index + 1}. {ask.content}
                                </p>
                            ))
                        }
                    </div>
                </Modal>

                {user?.role === "admin" &&
                    <div className="pt-4 pb-2" style={{ backgroundColor: "#f1f1f1" }} >
                        <div className='container' style={{ maxWidth: '1400px' }}>
                            {user?.role === "admin" && <Segmented
                                options={[
                                    {
                                        label: 'Soff.uz statistikasi',
                                        value: 'soff',
                                    },
                                    {
                                        label: 'Birja statistikasi',
                                        value: 'birja',
                                    },
                                ]}
                                block
                                style={{ height: "50px", backgroundColor: "#dedede" }}
                                onChange={handleSegmentChange} // OnChange qo'shilgan
                            />}
                        </div>
                    </div>
                }

                {
                    segmentValue === "birja" ? <BirjaDashbordList /> :
                        <DashbordList setOpen={setOpen} />
                }
            </div>
        </PageContainer> : user?.access ? <Page404 /> : <Selection />
    );
};

export default MyAccountPage;
