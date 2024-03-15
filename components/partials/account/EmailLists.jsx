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
    const [userRole, setUserRole] = useState(null);
    const [subject, setSubject] = useState(null);

    const OnChangeSelect = (event) => {
        console.log('event',);
        setEmail(event);
    };

    async function GetItemsEmail() {
        if (text) {
            form.resetFields();
            setLoading(true);
            setEmail(null);
            setText(null);
            setSubject(null);

            const data = {
                user_role: userRole,
                users_id: email ? email : [],
                subject,
                text: `<div style="padding: 0; background-color: #fff; max-width: 600px; margin: 0 auto;">

                <div style="text-align: center; background-color: #055160; color: #fff; padding: 5px 15px; display: flex; align-items: center; gap: 15px; justify-content: space-between;">
                    <img src="https://soff.uz/static/img/soff/soff_green_white.png" alt="Soff.uz Logo" width="100">
                    <div>
                        <ul style="list-style-type: none; display: flex; align-items: center; gap: 15px; font-size: 14px;">
                            <li style="display: inline-block; margin-right: 10px;"><a href="https://soff.uz" target="_blank" style="text-decoration: none; color: #fff;">Bosh sahifa</a></li>
                            <li style="display: inline-block;"><a href="https://soff.uz/account/dashbord" target="_blank" style="text-decoration: none; color: #fff;">Profil</a></li>
                        </ul>
                    </div>
                </div>
        
                <div style="padding: 10px 30px; text-align: start;">
                    <div style="margin-bottom: 30px; margin-left: 30px;">
                        <h1 style="color: #333; font-size: 24px; margin-bottom: 10px;">Assalomu alaykum!</h1>
                        <div style="text-align: start;">
                            <p style="color: #333; font-size: 16px; line-height: 1.6;">
                                ${text} <br/> 
                            </p>
                        </div>
                    </div>
                </div>
        
                <div style="margin-top: 20px; text-align: center; color: #fff; background-color: #055160; padding: 15px; font-size: 12px; display: flex; align-items: center; justify-content: space-between;">
                    <p style="color: #ffffff">&copy; 2023 | "Soff.uz Jamoasi"</p>
                    <p style="margin-left: auto; color: #ffffff">Barcha huquqlar himoyalangan</p>
                </div>
            </div>`,
                text_site: text,
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
        if (!userRole) {
            if (!email || !value) {
                return Promise.reject(
                    'Iltimos, birorini tanlang yoki matn kiriting'
                );
            }
        }
        return Promise.resolve();
    };

    const OnChangeSelectFull = (event) => {
        setUserRole(event);
    };

    async function GetAllUsers() {
        if (user?.access) {
            const ItemsData = await GetRepository.getAllUserLists(user?.access);
            const dataArr = []
            if (ItemsData) {
                for (const iterator of ItemsData) {
                    if (iterator?.data) {
                        dataArr.push(iterator)
                    }
                }
            }
            setData(dataArr);
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
            console.log('data', data);
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
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Xabar mavzusini kiritish majburiy',
                                    },
                                ]}>
                                <Input
                                    onChange={(e) => setSubject(e.target.value)}
                                    placeholder="Xabar mavzusi"></Input>
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
                                className="col-md-3 p-0"
                                name="userRole"
                                >
                                <Select
                                    onChange={OnChangeSelectFull}
                                    style={{ width: '100%', height: '45px'}}
                                    placeholder="Barchasini tanlash"
                                    options={[
                                        {
                                            label: ' Barcha Foydalanuvchilar',
                                            value: '1',
                                        },
                                        {
                                            label: 'Barcha Sotuvchilar',
                                            value: 'seller',
                                        },
                                        {
                                            label: 'Barcha Xaridorlar',
                                            value: 'customer',
                                        },
                                    ]}></Select>
                            </Form.Item>
                            <Form.Item
                                className="col-md-6 p-0 mx-xxs-3 mx-lg-3 mx-md-3 mx-xs-0 mx-0"
                                name="email"
                                rules={[{ validator: validateEmail }]}>
                                <Select
                                    showSearch
                                    onChange={OnChangeSelect}
                                    style={{ width: '100%' }}
                                    placeholder="Umumiy foydalanuvchilar"
                                    mode="multiple"
                                    allowClear
                                    options={option}>

                                    </Select>
                            </Form.Item>

                            <Form.Item
                                className="col-md-2 p-0"
                               >
                                <Button
                                    loading={loading}
                                    htmlType="submit"
                                    style={{ width: '100%', height: '45px' }}
                                    className="btn-success btn-send-email">
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
