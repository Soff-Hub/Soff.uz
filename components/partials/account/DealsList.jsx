import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { useEffect } from 'react';
import PostsRepository from '~/reositoriy-admin/PostsRepository';
import { useRouter } from 'next/router';
const { TextArea } = Input;



export default function DealsList({ setOpen }) {
    const router = useRouter()


    const [form] = Form.useForm();
    const { user } = useSelector((state) => state.auth);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [contacInfo, setContacInfo] = useState('');
    const [lifetime, setLifetime] = useState('');
    const [type, setType] = useState('');
    const [loading, setLoading] = useState(false);
    const [dealType, setDealType] = useState(null);
    const [keyword, setKeyword] = useState('');

    const handleChange = (date) => {
        if (date) {
            setLifetime(date.format('YYYY-MM-DD'));
        } else {
            setLifetime(null);
        }
    };



    const onSearch = async (value) => {
        setKeyword(value)
    };

    function handleChangeCategory(value) {
        for (let i = 0; i < dealType.length; i++) {
            if (dealType[i].name === value) {
                setType(dealType[i].id);
            }
        }
    }



    async function postOrder() {
        form.resetFields();
        setLoading(true);

        const data = {
            title: name,
            description: description,
            price: price,
            deadline_date: lifetime,
            type: type,
            contact_info: contacInfo,
        };
        const ItemsData = await PostsRepository.postDeal(data, user?.access);
        if (ItemsData?.status == 201) {
            router.push("/account/my-orders")
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: `${ItemsData?.data?.msg
                    ? ItemsData?.data?.msg
                    : "Sizning buyurtmangiz muvaffaqqiyatli yuborildi! 24 soat ichida adminlar tomonidan  buyurtmangiz 'Tasdiqlangan' dan so'ng Barcha buyurtmalarda ko'rishingiz mumkin yoki 'Bekor' qilishinishi ham mumkin"
                    }  `,
            });
            modal.update;
        } else {
            const modal = Modal.error({
                centered: true,
                title: 'Xato!',
                content: ItemsData?.status + ' ' + ItemsData?.statusText,
            });
            modal.update;
        }
        setOpen(false)
        setLoading(false);
    }

    async function getDealType() {
        const data = await GetRepository.getDealType(keyword);
        if (data?.results) {
            setDealType(data?.results);
        }
    }

    useEffect(() => {
        getDealType();
    }, [keyword]);



    return (
        <div className="row " style={{ alignItems: 'flex-start' }}>
            <div className="col-lg-12  mx-auto">

                <div className="ps-page__content">
                    <div className=" bg-white">

                        <div>
                            <Form

                                form={form}
                                onFinish={postOrder}
                                className="row  pt-4 "
                                layout='vertical'
                            >
                                <Form.Item
                                    label="Buyurtma nomi"
                                    className="col-md-12   mx-auto mb-3"
                                    name="title"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Buyurtma nomini kirtish majburiy',
                                        },
                                    ]}>
                                    <Input
                                        onChange={(e) =>
                                            setName(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Buyurtma nomi"></Input>
                                </Form.Item>
                                <Form.Item
                                    className="col-md-12 mb-3"
                                    name="price"
                                    label="Narxi"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Buyurtma narxini kiritish majburiy',
                                        },
                                    ]}>

                                    <InputNumber
                                        placeholder="Narxi"
                                        className='w-100 py-2'
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                                        onChange={(e) => setPrice(e)}
                                        onKeyPress={(e) => {
                                            if (!/[0-9]/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                    />

                                </Form.Item>

                                <Form.Item
                                    label="Topshirish sanasi"
                                    className="col-md-12 mb-3 "
                                    name="userRole"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Buyurtma muddatini kiritish majburiy',
                                        },
                                    ]}>
                                    <DatePicker
                                        onChange={handleChange}
                                        className='w-100 py-3' placeholder='Topshirish sanasi' />
                                </Form.Item>

                                <Form.Item
                                    className="col-md-12 mb-3"
                                    name="type"
                                    label="Buyurtma sohasi"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Buyurtma sohasi kiritish majburiy',
                                        },
                                    ]}>

                                    <Select
                                        mode="single"
                                        showSearch
                                        className='p-0 '
                                        allowClear
                                        style={{ height: "45px" }}
                                        placeholder="Barcha turlar"
                                        onSearch={onSearch}
                                        onChange={handleChangeCategory}
                                    >
                                        <Option key={""} value={""}>Barcha turlar</Option>
                                        {dealType?.map(item => (
                                            <Option key={item.id} value={item.name} >{item.name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>



                                <Form.Item
                                    label="Bog'lanish uchun ma'lumot"
                                    className="col-md-12   mx-auto mb-3"
                                    name="contac_info"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Bog'lanish uchun ma'lumot kirtish majburiy",
                                        },
                                    ]}>
                                    <Input
                                        onChange={(e) =>
                                            setContacInfo(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Telefon, Elektron pochta, telegram username"></Input>
                                </Form.Item>


                                <Form.Item
                                    label="Buyurtmaning to'liq tavsifi"
                                    name="description"
                                    className='col-md-12 mb-3'
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Buyurtma tavsifini kiritish majburiy',
                                        },
                                    ]}>
                                    <TextArea

                                        rows={8}
                                        placeholder="Buyurtmaning to'liq tavsifi"
                                        onChange={(e) =>
                                            setDescription(
                                                e.target.value
                                            )
                                        }
                                    />
                                </Form.Item>

                                <Form.Item className="col-md-12 d-flex justify-content-end m-0  mt-3">
                                    <Button
                                        loading={loading}
                                        htmlType="submit"
                                        style={{
                                            width: '100%',
                                            height: '37px',
                                            padding: "1px 30px"
                                        }}
                                        className="btn-primary btn-send-email">
                                        <span
                                            style={{
                                                color: '#fff',
                                                fontSize:
                                                    '16px',
                                            }}>
                                            Yaratish
                                        </span>
                                    </Button>
                                </Form.Item>

                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
