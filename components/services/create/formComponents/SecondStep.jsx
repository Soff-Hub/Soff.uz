import { Button, Form, Input, Tooltip, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import Editor from '../fields/Editor';
import { UploadOutlined } from '@ant-design/icons';

const SecondStep = ({ setDescription, setRequirements }) => {
    const [editorLoaded, setEditorLoaded] = useState(false)
    useEffect(() => {
        setEditorLoaded(true)
    }, [])
    return (
        <div className='service_card row'>
            <div className='col-12 col-md-8'>
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
                    <div className='col-12 p-0'>
                        <div className="d-flex p-0">
                            <p>Xizmat talablari: </p>{' '}
                            <Tooltip title="Xizmat talablari mijoz sizdan nimani kutishini tushunishi uchun yoziladi. Aniq, qisqa va tushunarli qilib yozing — masalan, qanday fayllar kerak, formatlari, o‘lchamlar yoki boshqa talablar. Bu noaniqliklarning oldini oladi.">
                                <i
                                    style={{ cursor: 'pointer' }}
                                    className="fa-regular fa-circle-question px-4 mt-2"></i>
                            </Tooltip>
                        </div>
                        <div className="p-0 rounded-3 mb-3">
                            <Editor
                                name="description"
                                onChange={(value) => {
                                    setRequirements(value)
                                }}
                                editorLoaded={editorLoaded}
                                placeholder={"Xizmat talablarini yozing..."}
                            />
                        </div>
                    </div>
                    <Form.Item
                        label={
                            <span>
                                Qo‘shimcha Fayllar:{' '}
                                <Tooltip title="Agar mijozlarga yordam beradigan, loyihangizni yaxshiroq tushunishga yordam beradigan qo‘shimcha fayllar (masalan, eskizlar, misollar, texnik hujjatlar) bo‘lsa, shu yerga yuklang.">
                                    <i
                                        style={{ cursor: 'pointer' }}
                                        className="fa-regular fa-circle-question px-2"
                                    ></i>
                                </Tooltip>
                            </span>
                        }
                        name="file"
                        style={{ width: '100%' }}
                    >
                        <Upload style={{ width: '100%' }}>
                            <Button
                                icon={<UploadOutlined />}
                                style={{ width: '100%' }}
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