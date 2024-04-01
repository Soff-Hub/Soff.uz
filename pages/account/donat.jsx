import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import PageContainer from '~/components/layouts/PageContainer';
import PostsRepository from '~/reositoriy-admin/PostsRepository';

const Donat = () => {
    const [InputText, setInputText] = useState({
        price: '',
        emailPhone: '',
        text: '',
    });
    const [formattedCardNumber, setFormattedCardNumber] = useState('');
    const [numberDate, setNumberDate] = useState('');
    const [open, setOpen] = useState(false);
    const [time, setTime] = useState(120);
    const [code, setCode] = useState(null);
    const [resData, setResData] = useState(null);
    const [resDataCode, setResDataCode] = useState(null);
    const [buttonOk, setButtonOk] = useState(false)
    const [buttonCode, setButtonCode] = useState(false)

    function handleInputChange(e) {
        setInputText((ov) => ({ ...ov, [e.target.name]: e.target.value }));
    }
    function handleClickModalSubmit(e) {
        e.preventDefault();
        if (InputText.price) {
            setOpen(true);
        }
    }
    const handleCardNumberChange = (e) => {
        const inputValue = e.target.value.replace(/\D/g, ''); // Raqam va probilni olib tashlash
        let formattedValue = '';

        if (inputValue.length <= 16) {
            for (let i = 0; i < inputValue.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' '; // Raqamlarni probil bilan ajratish
                }
                formattedValue += inputValue[i];
            }
        }

        setFormattedCardNumber(formattedValue);
    };

    const handleCardNumberDate = (e) => {
        const inputValue = e.target.value.replace(/\D/g, ''); // Raqam va probilni olib tashlash
        let formattedValue = '';

        if (inputValue.length <= 4) {
            for (let i = 0; i < inputValue.length; i++) {
                if (i > 0 && i % 2 === 0) {
                    formattedValue += '/'; // Raqamlarni probil bilan ajratish
                }
                formattedValue += inputValue[i];
            }
        }

        setNumberDate(formattedValue);
    };

    async function handleSubmit() {
        setResDataCode(null);
        setButtonOk(true)

        if (formattedCardNumber?.length === 19) {
            const data = {
                amount: InputText.price,
                sponsor_info: InputText.emailPhone,
                description: InputText.text ? InputText.text : '',
                card_number: formattedCardNumber.replaceAll(' ', ''),
                expire_date: numberDate.replaceAll('/', ''),
            };
            const dataNews = await PostsRepository.getDonatLists(data);
            if (dataNews) {
                setResData(dataNews);
                setButtonOk(false)
            }
            if (dataNews?.status !== 201) {
                const modal = Modal.error({
                    centered: true,
                    title: 'Xatolik!',
                    content: `${dataNews?.data?.msg}`,
                });
            }
        } else {
            const modal = Modal.error({
                centered: true,
                title: 'Xatolik!',
                content: `Karta raqamingiz to'g'ri kiritilmagan!`,
            });
        }
    }

    async function handleSubmitCode() {
        setButtonCode(true)
        const data = {
            code: code,
            order: resData?.data?.order,
        };

        const dataNews = await PostsRepository.getDonatListsCode(data);
        if (dataNews) {
            setResDataCode(dataNews);
            setButtonCode(false)
        }
        if (
            dataNews?.status !== 200 &&
            dataNews?.data?.msg?.[0] !== 'Parol xato'
        ) {
            setOpen(false);
            const modal = Modal.error({
                centered: true,
                title: 'Xatolik!',
                content: `${dataNews?.data?.msg}`,
            });
            setTimeout(() => {
                setResData(null);
            }, 2000);
        }
        if (dataNews?.status === 200) {
            setOpen(false);
            const modal = Modal.success({
                centered: true,
                title: 'Muffaqiyatli!',
                content: `${dataNews?.data?.msg}`,
            });
        }
    }

    useEffect(() => {
        if (resData?.status === 201) {
            setTime(120);
            const timerID = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime <= 0 || resDataCode?.status === 200) {
                        clearInterval(timerID);
                        setResData(null);

                        return 0;
                    } else {
                        return prevTime - 1;
                    }
                });
            }, 1000);
        }
    }, [resData, resDataCode]);

    function handleCancale() {
        setOpen(false);
        setResData(null);
    }

    const formattedTime = new Date(time * 1000).toISOString().substr(14, 5);

    return (
        <PageContainer>
            <div className="container my-5 ">
                <h2 className="text-center">
                    Sayt rivoji uchun o'z hissangizni qo'shing
                </h2>
                <div className="row g-4 p-3 align-items-center">
                    <img
                        src="/static/img/support.jpg"
                        className="col-md-7 mb-4"
                        alt="support"
                        style={{ objectFit: 'cover' }}
                        srcset=""
                    />
                    <form
                        className="col-md-5  p-5"
                        onSubmit={handleClickModalSubmit}>
                        <div className="mb-3">
                            <input
                                onChange={handleInputChange}
                                value={InputText?.emailPhone}
                                type="text"
                                name="emailPhone"
                                className="form-control rounded-3"
                                placeholder="Telefon raqam yoki Email"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                onChange={handleInputChange}
                                type="number"
                                value={InputText?.price}
                                name="price"
                                className="form-control rounded-3"
                                placeholder="Summa"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <textarea
                                onChange={handleInputChange}
                                name="text"
                                value={InputText?.text}
                                className="form-control rounded-3 px-4 py-3"
                                rows={4}
                                placeholder="Tavsif..."></textarea>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-success  w-100 p-3">
                            <span className="fs-4">
                                Davom etish{' '}
                                <i className="fa-solid fa-arrow-right"></i>
                            </span>
                        </button>
                    </form>
                </div>

                <Modal
                    width={500}
                    title={
                        resData?.status !== 201
                            ? 'Karta raqamingizni kiriting!'
                            : 'Kodni kiriting!'
                    }
                    centered
                    open={open}
                    onOk={
                        resData?.status !== 201
                            ? handleSubmit
                            : handleSubmitCode
                    }
                    onCancel={handleCancale}
                    okButtonProps={{ style: { backgroundColor: 'green', color: 'white' } }}
                    okText={buttonOk || buttonCode ?  <BeatLoader color="#fff" /> : "Yuborish" } 
                    cancelText="Orqaga"
                    >
                    {resData?.status === 201 ? (
                        <>
                            <p>
                                Kod quyidagi raqamga yuborildi:
                                {resData?.data?.phone_number}
                            </p>
                            <input
                                onChange={(e) => setCode(e.target.value)}
                                type="tel"
                                placeholder="000000"
                                maxLength={6}
                                className="form-control text-center rounded-3 fs-3"
                            />
                            <strong className="text-danger">
                                {formattedTime}
                            </strong>
                            <p className="text-danger">
                                {resDataCode?.data?.msg?.[0] == 'Parol xato' &&
                                    resDataCode?.data?.msg}
                            </p>
                        </>
                    ) : (
                        <div className="mb-3 d-flex gap-3">
                            <input
                                inputMode="numeric"
                                pattern="[0-9\s]{13,19}"
                                autoComplete="cc-number"
                                maxLength={19}
                                placeholder="XXXX XXXX XXXX XXXX"
                                value={formattedCardNumber}
                                onChange={handleCardNumberChange}
                                name="numbrere"
                                className="form-control rounded-3 col-8 resInput"
                            />
                            <input
                                style={{ maxWidth: '137px' }}
                                onChange={handleCardNumberDate}
                                type="tel"
                                value={numberDate}
                                maxLength={5}
                                className="form-control rounded-3 resInput"
                                placeholder="MM/YY"
                            />
                        </div>
                    )}
                </Modal>
            </div>
        </PageContainer>
    );
};

export default Donat;
