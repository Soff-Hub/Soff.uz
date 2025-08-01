import { Form, message } from 'antd'
import React, { useState } from 'react'
import FirstStep from './formComponents/FirstStep'
import SecondStep from './formComponents/SecondStep'
import ThirdStep from './formComponents/ThirdStep'
import FourthStep from './formComponents/FourthStep'
import FifthStep from './formComponents/FifthStep'

const CreateServiceForm = ({ childCategory }) => {
    const [current, setCurrent] = useState(1)
    const [description, setDescription] = useState('')
    const [faqs, setFaqs] = useState([]);
    const [form] = Form.useForm()

    const handleNext = async () => {
        try {
            await form.validateFields();
            if (current < steps.length) {
                setCurrent((prev) => prev + 1);
            } else {
                const formData = new FormData();
                const values = form.getFieldsValue();
                let obj = { ...values, description };

                for (const [key, value] of Object.entries(obj)) {
                    formData.append(key, value);
                }
                console.log('Form Data:', Object.fromEntries(formData.entries()));
                message.success('Forma muvaffaqiyatli yuborildi!');
            }
        } catch (error) {
            message.error('Iltimos, barcha maydonlarni to‘ldiring!');
        }
    };
    const steps = [
        {
            id: 1,
            content: <FirstStep form={form} childCategory={childCategory} />
        },
        {
            id: 2,
            content: <SecondStep setDescription={setDescription} />
        },
        {
            id: 3,
            content: <ThirdStep />
        },
        {
            id: 4,
            content: <FourthStep />
        },
        {
            id: 5,
            content: <FifthStep faqs={faqs} setFaqs={setFaqs} />
        }
    ]

    const newSteps = [
        {
            id: 2,
            title: 'Tavsif',
        },
        {
            id: 3,
            title: 'Talablar',
        },
        {
            id: 4,
            title: 'Qo‘shimcha Fayllar',
        },
        {
            id: 5,
            title: 'Ko‘p beriladigan savollar',
        }
    ]

    return (
        <Form form={form} layout='vertical' className='create_service_form'>
            <div>
                {steps.slice(0, current).map((step, index) => (
                    <div span={12} key={index}>
                        {step.content}
                    </div>
                ))}
            </div>
            <div className='service_form_buttons'>
                <button className='service_form_next_btn' onClick={handleNext}>Next</button>
            </div>
            <div style={{ marginTop: '20px' }}>
                {newSteps.map((step) => (
                    <div key={step.id} className='next_service_card'>
                        <div className='col-12 col-md-8'>
                            <div className='next_steps_title'>
                                <h2>{step.id}</h2>
                                <h3>{step.title}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Form>
    )
}

export default CreateServiceForm