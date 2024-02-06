import React, { useEffect, useState } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { useSelector } from 'react-redux';
import { Button, Form, Modal, Select, Input } from 'antd';
import PostsRepository from '~/reositoriy-admin/PostsRepository';
import CKEditor from './CKeditor';
import GetRepository from '~/reositoriy-admin/GetRepository';
// const { Option } = Select;

const EmailLists = () => {
    const { accountLinks, user } = useSelector((state) => state.auth);
    const [form] = Form.useForm();

    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState(null);
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState(null);
    const [option, setOption] = useState([]);
    const [userRole, setUserRole] = useState(null)
    const [subject, setSubject] = useState(null)

    const OnChangeSelect = (event) => {
        console.log(event);
        setEmail(event);
    };

    async function GetItemsEmail() {
        if (text) {
            form.resetFields();
            setLoading(true);
            setEmail(null);
            setText(null);
            setSubject(null);
            setUserRole(email?.find((el) => (el === "customer" || el === "seller" || el === '0') ? el : null))

            const data = {
                user_role: email?.find((el) => (el === "customer" || el === "seller" || el === '0') ? el : null),
                email: email,
                subject,
                text: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Soff.uz | Pochta xabari</title>
            <style>
                @import url(https://fonts.googleapis.com/css2?family=Roboto:wght@100;200;300;400;500;600;800;900&display=swap);
        
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Roboto', sans-serif;
                }
        
                .container {
                    max-width: 700px;
                    width: 100%;
                    margin: 0 auto;
                    padding: 0 10px;
                }
        
                .header {
                    background-color: #022335;
                    display: flex;
                    align-items: center;
                    color: #fff;
                    gap: 10px;
                    padding: 15px 30px;
                }
        
                .header-text span {
                    padding: 0 5px;
                }
        
                main {
                    padding: 15px 30px;
                }
        
                .message {
                    font-size: 22px;
                    margin: 5px 0;
                    padding: 20px 0;
                }
        
                .table {
                    padding: 10px;
                    font-size: 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
        
                footer {
                    width: 100%;
                    background-color: #00A44F;
                    padding: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    color: #fff;
                }
        
                footer div {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
        
                a {
                    display: flex;
                    align-items: center;
                    gap: 2px;
                    padding: 5px;
                    background-color: #022335;
                    color: #fff;
                    text-transform: uppercase;
                    text-align: center;
                    max-width: 160px;
                    justify-content: center;
                    margin: 5px auto;
                    text-decoration: none;
        
                }
        
                @media only screen and (max-width: 576px) {
                    .container {
                        padding: 0;
                    }
        
                    .message {
                        font-size: 19px;
                    }
        
                    .table {
                        font-size: 17px;
                    }
        
                    footer {
                        padding: 20px;
                    }
                }
        
                @media only screen and (max-width: 420px) {
                    .message {
                        font-size: 17px;
                    }
        
                    .table {
                        font-size: 15px;
                    }
        
                    .header {
                        font-size: 14px;
                    }
        
                    .logo {
                        width: 70px;
                    }
        
                    .table {
                        gap: 10px;
                    }
        
                    footer {
                        flex-direction: column;
                        align-items: center;
                        gap: 5px;
                        padding: 10px 20px;
                    }
        
                    footer div {
                        gap: 6px;
                    }
                }
            </style>
        
        </head>
        
        <body>
            <div class="container">
                <header class="header">
                    <img src="https://soff.uz/static/img/soff/soff_green_white.png" alt="logo" class="logo" width="100">
                    <div class="header-text"><span>|</span> Intellektual Mulk bozori</div>
                </header>
                <main>
                    <div class="message " style="padding:0 8px">
                   ${text} 
                    </div>
        
                    <a href="https://soff.uz" target="_blank" style="text-align:center;" > saytga kirish
                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path opacity="0.5"
                                    d="M5.46967 17.4697C5.17678 17.7626 5.17678 18.2374 5.46967 18.5303C5.76256 18.8232 6.23744 18.8232 6.53033 18.5303L5.46967 17.4697ZM6.53033 18.5303L18.5303 6.53033L17.4697 5.46967L5.46967 17.4697L6.53033 18.5303Z"
                                    fill="#ffffff"></path>
                                <path d="M9 6H18V15" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                            </g>
                        </svg>
                    </a>
                </main>
                <footer >
                    <div>
                        <p>soff.uz</p>
                        <p>|</p>
                        <p>2024</p>
                    </div>
                    <p>Barcha huquqlar himoyalangan</p>
                </footer>
            </div>
        </body>
        </html>`,
            };
            const ItemsData = await PostsRepository.EmailSend(
                data,
                user?.access
            );
            if (ItemsData?.status == 200) {
                const modal = Modal.success({
                    centered: true,
                    title: 'Muvaffaqqiyatli!',
                    content: `Sizning xabaringiz yuborildi`,
                });
                modal.update;
            } else {
                const modal = Modal.error({
                    centered: true,
                    title: 'Xato!',
                    content: `Nimadir xato ketdi `,
                });
                modal.update;
            }
        } else {
            const modal = Modal.error({
                centered: true,
                title: 'Xato!',
                content: `Malumot to'g'ri kiritilmadi`,
            });
            modal.update;
        }
        setLoading(false);
    }
    const validateEmail = (rule, value) => {
        if (!email || !value) {
            return Promise.reject(
                'Iltimos, birorini tanlang yoki matn kiriting'
            );
        }
        return Promise.resolve();
    };

    async function GetAllUsers() {
        if (user?.access) {
            const ItemsData = await GetRepository.getAllUserLists(user?.access);
            if (ItemsData) {
                setData(ItemsData);
            }
        }
    }

    useEffect(() => {
        setEditorLoaded(true);
        if (user?.access) {
            GetAllUsers();
        }
    }, []);

    useEffect(() => {
        if (data?.length > 0) {
            setOption(
                data?.map((el) => ({
                    label:
                        el?.data?.name +
                        ' | ' +
                        el?.data?.role +
                        ' | ' +
                        el?.data?.email,
                    value: el?.data?.email,
                }))
            );
        }
    }, [data]);

    // console.log('option', [ {
    //   label:' Barcha Foydalanuvchilar',
    //   value : '0'
    // },
    // {
    //   label:'Barcha Sotuvchilar',
    //   value : 'seller'
    // },
    // {
    //   label:'Barcha Xaridorlar',
    //   value : 'customer'
    // }, ...option]);

    return (
        <section className="ps-my-account ps-page--account pb-5 p-0">
            <div className="container">
                <div className="row" style={{ alignItems: 'flex-start' }}>
                    <div className="col-lg-4">
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} />
                        </div>
                    </div>
                    <div
                        className="col-lg-8 bg-white"
                        style={{ padding: '20px' }}>
                        <Form
                            form={form}
                            onFinish={GetItemsEmail}
                            className="row  p-4 border-2 border">
                            <Form.Item
                                className="col-md-8 p-0"
                                name="subject"
                                rules={[{ required: true, message: "Xabar mavzusini kiritish majburiy" }]}>
                                <Input
                                    onChange={(e) => setSubject(e.target.value)}
                                    placeholder="Xabar mavzusi">
                                </Input>
                            </Form.Item>
                            <div className="col-md-12 p-0 mb-3">
                                <CKEditor
                                    name="description"
                                    onChange={(data) => {
                                        setText(data);
                                    }}
                                    editorLoaded={editorLoaded}
                                    value={text || ''}
                                />
                            </div>

                            <Form.Item
                                className="col-md-8 p-0"
                                name="email"
                                rules={[{ validator: validateEmail }]}>
                                <Select
                                    showSearch
                                    onChange={OnChangeSelect}
                                    style={{ width: '100%' }}
                                    placeholder="Pochtaga Xabar Yuborish"
                                    mode="multiple"
                                    allowClear
                                    options={[
                                        {
                                            label: ' Barcha Foydalanuvchilar',
                                            value: '0',
                                        },
                                        {
                                            label: 'Barcha Sotuvchilar',
                                            value: 'seller',
                                        },
                                        {
                                            label: 'Barcha Xaridorlar',
                                            value: 'customer',
                                        },
                                        ...option,
                                    ]}></Select>
                            </Form.Item>

                            <Form.Item
                                className="col-md-3 p-0"
                                style={{ marginLeft: '15px' }}>
                                <Button
                                    loading={loading}
                                    htmlType="submit"
                                    style={{ width: '200px', height: '45px' }}
                                    className="btn-success">
                                    <span
                                        style={{
                                            color: '#fff',
                                            fontSize: '16px',
                                        }}>
                                        Yuborish
                                    </span>
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EmailLists;
