import { Form, Input, Select } from 'antd';
import React from 'react';
import ImageCropper from '../fields/CropImage';


const FirstStep = () => {
    return (
        <div className='service_card row'>
            <div className="col-12 col-md-6">
                <div className='service_title'>
                    <h2>1</h2>
                    <h3>Asosiy ma'lumotlar</h3>
                </div>
                <div className='service_content'>
                    <Form.Item
                        label='Xizmat nomi'
                        name='serviceName'
                        rules={[{ required: true, message: 'Xizmat nomini kiriting!' }]}
                    >
                        <Input placeholder='Men Logotip ishlab chiqaman' />
                    </Form.Item>

                    <div className='row'>
                        <Form.Item
                            label="Kategoriya"
                            className='col-6'
                            name="category"
                            rules={[{ required: true, message: 'Kategoriya tanlang!' }]}
                        >
                            <Select />
                        </Form.Item>
                        <Form.Item
                            className='col-6'
                            name="subCategory"
                            rules={[{ required: true, message: 'Sub Kategoriyani tanlang!' }]}
                            label="Sub Kategoriya"
                        >
                            <Select />
                        </Form.Item>
                    </div>

                    <Form.Item 
                        name="poster" 
                        label="Rasmni tanlang"
                        rules={[{ required: true, message: 'Rasm yuklang!' }]}
                    >
                        <ImageCropper/>
                    </Form.Item>
                </div>
            </div>
        </div>
    );
};

export default FirstStep;