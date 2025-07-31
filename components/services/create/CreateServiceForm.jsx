import { Form, message } from 'antd'
import React, { useState } from 'react'
import FirstStep from './formComponents/FirstStep'
import SecondStep from './formComponents/SecondStep'
import ThirdStep from './formComponents/ThirdStep'
import FourthStep from './formComponents/FourthStep'
import FifthStep from './formComponents/FifthStep'

const CreateServiceForm = () => {
    const [current, setCurrent] = useState(1)
    const [description, setDescription] = useState('')
    const [form] = Form.useForm()

    const handleNext = async () => {
        try {
            // await form.validateFields();
            if (current < steps.length - 1) {
                setCurrent((prev) => prev + 1);
            } else {
                const values = form.getFieldsValue();
                console.log('Form values:', values);
                message.success('Forma muvaffaqiyatli yuborildi!');
            }
        } catch (error) {
            message.error('Iltimos, barcha maydonlarni to‘ldiring!');
        }
    };
    const steps = [
        {
            id: 1,
            content: <FirstStep />
        },
        {
            id: 2,
            content: <SecondStep setDescription={setDescription}/>
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
            content: <FifthStep />
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
        </Form>
    )
}

export default CreateServiceForm