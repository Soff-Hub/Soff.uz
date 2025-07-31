import { Button, Form, Input, Tooltip, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import Editor from '../fields/Editor';
import { UploadOutlined } from '@ant-design/icons';

const SecondStep = ({ setDescription }) => {
    const [editorLoaded, setEditorLoaded] = useState(false)
    useEffect(() => {
        setEditorLoaded(true)
    }, [])
    return (
        <div className='service_card'>
            <div className='col-12 col-md-6'>
                <div className='service_title'>
                    <h2>2</h2>
                    <h3>Tavsif</h3>
                </div>
                <div className='service_content'>
                    <div className='col-12 p-0'>
                        <div className="d-flex p-0">
                            <p>Xizmatning to’liq tavsifi: </p>{' '}
                            <Tooltip title="Mijozlarga xizmatingiz haqidagi to’liq ma’lumotni bering. Bu mijozlaringiz xizmatni sotib olishda ularning ishonchini yanada oshirish uchun xizmat qiladi.">
                                <i
                                    style={{ cursor: 'pointer' }}
                                    className="fa-regular fa-circle-question px-4 mt-2"></i>
                            </Tooltip>
                        </div>
                        <div className="p-0 rounded-3 mb-3">
                            <Editor
                                name="description"
                                onChange={(value) => {
                                    setDescription(value)
                                }}
                                editorLoaded={editorLoaded}
                                placeholder={"Xizmatning to’liq tavsifini yozing..."}
                            />
                        </div>
                    </div>
                    <Form.Item
                        label='Xizmat talablari'
                        name='requirements'
                        rules={[{ required: true, message: 'Xizmat talablari kiriting!' }]}
                    >
                        <Input.TextArea rows={5} />
                    </Form.Item>
                    <Form.Item
                        label='Qo’shimcha Fayllar'
                        name='file'
                        style={{ width: '100%' }}
                    >
                        <Upload style={{ width: '100%' }}>
                            <Button
                                icon={<UploadOutlined />}
                                style={{ width: '100%' }} // Button to‘liq kenglikni egallasin
                            >
                                Fayl yuklash
                            </Button>
                        </Upload>
                    </Form.Item>
                </div>
            </div>
        </div>
    )
}

export default SecondStep