import { Form, Input, Select } from 'antd';
import React from 'react';
import ImageCropper from '../fields/CropImage';
import { useRouter } from 'next/router';


const FirstStep = ({childCategory, form}) => {
    const router = useRouter();
    const { category } = router.query;
    return (
        <div className='service_card row'>
            <div className="col-12 col-md-8">
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


                    <Form.Item
                        label="Kategoriya"
                        name="category"
                        rules={[{ required: true, message: 'Kategoriya tanlang!' }]}
                    >
                        <Select
                            options={[
                                { value: '1', label: 'Ilmiy va Akademik Xizmatlar' },
                                { value: '3', label: 'Grafik Dizayn va Shablonlar' },
                            ]}
                            onChange={(val) => {
                                router.push({
                                    pathname: router.pathname,
                                    query: { ...router.query, category: val }
                                })
                            }}
                        />
                    </Form.Item>

                    {category && childCategory &&
                        <Form.Item
                            name="subCategory"
                            rules={[{ required: true, message: 'Sub Kategoriyani tanlang!' }]}
                            label="Sub Kategoriya"
                        >
                            <Select 
                                options={childCategory?.map((item) => ({
                                value: item.id,
                                label: item.title
                            }))}
                            />
                        </Form.Item>
                    }


                    <Form.Item
                        name="poster"
                        label="Rasmni tanlang"
                        rules={[{ required: true, message: 'Rasm yuklang!' }]}
                        className='w-100'
                    >
                        <ImageCropper form={form} />
                    </Form.Item>
                </div>
            </div>
        </div>
    );
};

export default FirstStep;