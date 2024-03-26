import React, { useEffect, useState } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { useSelector } from 'react-redux';
import { Button, Form, Modal, Select, Input, DatePicker, Table } from 'antd';
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
    const [title, setSubject] = useState(null);
    const [date, setDate] = useState(null);
    const [notification, setNotification] = useState(null);
    const OnChangeSelect = (event) => {
        console.log('event', event);
        setEmail(event);
    };

    const { RangePicker } = DatePicker;
    const dateFormat0 = date
        ? `${date[0]?.$y}-${
              `${date[0].$M + 1}`.length === 1
                  ? `0${date[0].$M + 1}`
                  : date[0].$M + 1
          }-${date[0].$D}`
        : '';
    const dateFormat1 = date
        ? `${date[1]?.$y}-${
              `${date[1].$M + 1}`.length === 1
                  ? `0${date[1].$M + 1}`
                  : date[1].$M + 1
          }-${date[1].$D}`
        : '';
    const dataFormat = date ? `${dateFormat0}&to_date=${dateFormat1}` : '';

    // console.log('date', dataFormat);

    async function GetItemsEmail() {
        if (text) {
            form.resetFields();
            setLoading(true);
            setEmail(null);
            setText(null);
            setSubject(null);

            if (userRole) {
                const data = {
                    user_type: userRole,
                    title: title,
                    body: `<div style="padding: 0; background-color: #fff; max-width: 600px; margin: 0 auto;">
    
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
                    // text_site: text,
                };
                const ItemsData = await PostsRepository.EmailSend(
                    data,
                    user?.access,
                    dataFormat
                );
                if (ItemsData?.status == 201) {
                    console.log('datar', ItemsData);
                    const modal = Modal.success({
                        centered: true,
                        title: 'Muvaffaqqiyatli!',
                        content: ` ${
                            ItemsData?.data?.msg
                                ? ItemsData?.data?.msg
                                : 'Sizning xabaringiz yuborildi'
                        } `,
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
                const data = {
                    users: email ? email : [],
                    title: title,
                    body: `<div style="padding: 0; background-color: #fff; max-width: 600px; margin: 0 auto;">
    
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
                };
                const ItemsData = await PostsRepository.EmailSend(
                    data,
                    user?.access,
                    dataFormat
                );
                if (ItemsData?.status == 201) {
                    console.log('data', ItemsData);
                    const modal = Modal.success({
                        centered: true,
                        title: 'Muvaffaqqiyatli!',
                        content: ` ${
                            ItemsData?.data?.msg
                                ? ItemsData?.data?.msg
                                : 'Sizning xabaringiz yuborildi'
                        } `,
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
            const dataArr = [];
            if (ItemsData) {
                for (const iterator of ItemsData) {
                    if (iterator?.data) {
                        dataArr.push(iterator);
                    }
                }
            }
            setData(dataArr);
        }
    }

    const getNotifications = async () => {
        const ItemsData = await GetRepository.getNotificationList();
        if (ItemsData) {
            setNotification(ItemsData.results);
            console.log('ItemsData', ItemsData.results);
        }
    };

    useEffect(() => {
        getNotifications();
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
                    value: el?.data?.id,
                }))
            );
        }
    }, [data]);

    const columns = [
        {
            title: 'Nomi',
            dataIndex: 'title',
            key: 'title',
            render: (title) => (
                <span className="truncate whitespace-nowrap "> {title}</span>
            ),
        },
        {
            title: 'Qabul qiluvchi',
            dataIndex: 'receivers',
            key: 'user',
            render: (receivers) => (
                <span className="truncate whitespace-nowrap ">
                    {' '}
                    {receivers}
                </span>
            ),
        },
        {
            title: 'Yuborilgan sana',
            dataIndex: 'created_at',
            key: 'address',
            render: (created_at) => (
                <span>
                    {' '}
                    <i className=" text-primary-emphasis fa-solid fa-layer-group"></i>{' '}
                    {created_at}
                </span>
            ),
        },
        {
            title: 'Sotuvchi',
            dataIndex: 'seller',
            key: 'address',
            render: (body) => (
                <div className="d-flex flex-column">
                    <span> {body}</span>
                </div>
            ),
        },
    ];

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
                                name="title"
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
                            <RangePicker
                                className="w-100 py-3 col-md-12 my-3 rounded-3"
                                onChange={(e) => setDate(e)}
                            />

                            <Form.Item className="col-md-3 p-0" name="userRole">
                                <Select
                                    onChange={OnChangeSelectFull}
                                    style={{ width: '100%', height: '45px' }}
                                    placeholder="Barchasini tanlash"
                                    options={[
                                        {
                                            label: ' Barcha Foydalanuvchilar',
                                            value: 'all',
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
                                    optionFilterProp="label"
                                    showSearch
                                    onChange={OnChangeSelect}
                                    style={{ width: '100%' }}
                                    placeholder="Umumiy foydalanuvchilar"
                                    mode="multiple"
                                    allowClear
                                    options={option}></Select>
                            </Form.Item>

                            <Form.Item className="col-md-2 p-0">
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
                        <Table
                            className="my-5"
                            scroll={{ x: 1000 }}
                            dataSource={notification}
                            columns={columns}
                            pagination={false}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EmailLists;
