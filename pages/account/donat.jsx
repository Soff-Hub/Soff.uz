import { Button, Form, Input, Modal } from 'antd'
const { TextArea } = Input;
import React, { useEffect, useState } from 'react'
import PageContainer from '~/components/layouts/PageContainer'
import PostsRepository from '~/reositoriy-admin/PostsRepository';

const Donat = () => {
    const [InputText, setInputText] = useState({ price: '', emailPhone: '', text: '' });
    const [formattedCardNumber, setFormattedCardNumber] = useState('');
    const [numberDate, setNumberDate] = useState('');
    const [open, setOpen] = useState(false);
    const [time, setTime] = useState(120);
    const [code, setCode] = useState(null);
    const [resData, setResData] = useState(null);
    const [resDataCode, setResDataCode] = useState(null);
    const [form] = Form.useForm()

    function handleInputChange(e) {
        setInputText(ov => ({ ...ov, [e.target.name]: e.target.value }))
    }

    async function handleSubmit() {
        form.resetFields();
        setNumberDate('');
        setFormattedCardNumber('');
        
        const data = {
            amount: InputText.price,
            sponsor_info: InputText.emailPhone,
            description: InputText.text ? InputText.text : '',
            card_number: formattedCardNumber.replaceAll(' ', ''),
            expire_date: numberDate.replaceAll('/', '')
        }

        const dataNews = await PostsRepository.getDonatLists(data)
        if (dataNews) {
            setResData(dataNews);
        }
        if (dataNews?.status !== 200) {
            const modal = Modal.error({
                centered: true,
                title: 'Xatolik!',
                content: `${dataNews?.data?.msg}`,
            });
        }


    }

    async function handleSubmitCode() {
        const data = {
            code: code,
            order: resData?.data?.order
        }

        const dataNews = await PostsRepository.getDonatListsCode(data)
        if (dataNews) {
            setOpen(false)
            setResDataCode(dataNews)
        }
        if (resDataCode?.status !== 200) {
            const modal = Modal.error({
                centered: true,
                title: 'Xatolik!',
                content: `${resDataCode?.data?.msg}`,
            });
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
                    formattedValue += "/"; // Raqamlarni probil bilan ajratish
                }
                formattedValue += inputValue[i];
            }
        }

        setNumberDate(formattedValue);
    };

    useEffect(() => {
        if (resData?.status === 200) {
            const timerID = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime === 0) {
                        clearInterval(timerID); // Taymer to'xtatiladi
                        return prevTime; // Vaqt sonini o'zgartirmaymiz
                    } else {
                        return prevTime - 1; // Vaqtni 1 sekund bilan kamaytiramiz
                    }
                });

            }, 1000);
            if (timerID === 0) {
                setOpen(false)
            }
            // Taymer bekor qilinishi
            return () => clearInterval(timerID);
        }
    }, []);

    const formattedTime = new Date(time * 1000).toISOString().substr(14, 5);


    function handleCancale() {
        setOpen(false)
    }

console.log(code);

    return (
        <PageContainer >
            <div className="container my-5 ">
                <h2 className='text-center'>Sayt rivoji uchun o'z hissangizni qo'shing</h2>
                <div className="row g-4 p-3">
                    <img src="/static/img/support.jpg" className='col-md-7 mb-4' alt="support" style={{ objectFit: "cover" }} srcset="" />
                    <Form form={form} onFinish={handleSubmit} className='d-flex flex-column border p-5 col-md-4 rounded-4 m-auto' >
                        <Form.Item
                            name="price"

                            rules={[
                                {
                                    required: true,
                                    message: 'Iltimos, summangizni  kiriting!',
                                },
                            ]}>
                            <Input type='number' name="price" value={InputText.price} onChange={handleInputChange} placeholder='Summa' />
                        </Form.Item>

                        <Form.Item className=' rounded-4'>
                            <Input
                                inputMode="numeric"
                                pattern="[0-9\s]{13,19}"
                                autoComplete="cc-number"
                                maxLength={19}
                                placeholder="XXXX XXXX XXXX XXXX"
                                value={formattedCardNumber}
                                onChange={handleCardNumberChange}
                                name='numbrere'
                                className='col-8'
                            />
                            <Input onChange={handleCardNumberDate} className='col-3 ml-4 ' type='tel' value={numberDate} maxLength={5} placeholder='MM/YY' />
                        </Form.Item>
                        <Form.Item
                            name="emailPhone">
                            <Input name="emailPhone" value={InputText.emailPhone} onChange={handleInputChange} placeholder='Telefon raqam yoki Pochta manzil' />
                        </Form.Item>
                        <Form.Item
                            name="text"
                        >
                            <TextArea name="text" value={InputText.text} onChange={handleInputChange} rows={5} placeholder="Tavsif..." />
                        </Form.Item>
                        {
                            !InputText.price || formattedCardNumber?.length !== 19 || numberDate?.length !== 5 ?
                                <Button disabled htmlType="submit" style={{ height: "40px" }}>
                                    Yuborish
                                </Button>
                                :
                                <Button onClick={() => setOpen(true)} htmlType="submit" className='bg-success text-white' style={{ height: "40px" }}>
                                    Yuborish
                                </Button>
                        }
                    </Form>
                </div>
                <Modal width={300} title="Kodni kiriting!" centered open={resData?.status === 200 ? !open : ""} onOk={handleSubmitCode} onCancel={handleCancale}>
                    <p>Kod quyidagi raqamga yuborildi:{resData?.data?.phone_number}</p>
                    <input onClick={(e)=>setCode(e.target.value)} type="tel" placeholder='000000' maxLength={6} className='form-control text-center rounded-3 fs-3' />
                    <strong className='text-danger'>{formattedTime}</strong>
                </Modal>
            </div>
        </PageContainer>
    )
}

export default Donat
