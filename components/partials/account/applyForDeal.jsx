import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, Modal } from 'antd';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { useRouter } from 'next/router';
import PostsRepository from '~/reositoriy-admin/PostsRepository';
import { useSelector } from 'react-redux';
const { TextArea } = Input;

export default function ApplyForDeal() {
    const [form] = Form.useForm();
    const { user } = useSelector((state) => state.auth);
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [lifetime, setDLifetime] = useState('');
    const [data, setData] = useState({});
    const { query } = useRouter();
    const [loading, setLoading] = useState(false);
    const id = query?.pid;
    const router = useRouter();

    function addPeriodToThousands(number) {
        const numStr = String(number);

        const [integerPart, decimalPart] = numStr.split('.');

        const formattedIntegerPart = integerPart.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ' '
        );

        const formattedNumber =
            decimalPart !== undefined
                ? `${formattedIntegerPart}`
                : formattedIntegerPart;

        return formattedNumber;
    }

    const handleChange = (date) => {
        if (date) {
            setDLifetime(date.format('YYYY-MM-DD'));
        } else {
            setDLifetime(null);
        }
    };


    async function GetItemsProducts() {
        setLoading(true)
        const ItemsData = await GetRepository.getOrdersDealLists(1, '', '', '', '', '', '', id);
        if (ItemsData) {
            setData(ItemsData);
        }
        setLoading(false)
    }


    async function postOrder() {
        form.resetFields();
        const data_form = {
            description: description,
            price: price,
            deadline_date: lifetime,
            deal: data?.id

        };
        const ItemsData = await PostsRepository.postDealAppliaction(data_form, user?.access);

        if (ItemsData?.status === 201) {
            router.push("/account/deal-applications")
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: `Arizangiz muvaffaqiyatli yuborildi!`,
            });
        } else {
            const modal = Modal.error({
                centered: true,
                title: 'Xatolik!',
                content: ItemsData?.status + ' ' + ItemsData?.statusText,
            });
        }

    }


    useEffect(() => {
        if (id) {
            GetItemsProducts();
        }
    }, [id]);




    return (

        <>
            {
                loading ?
                    <div className='container'>
                        <div
                            className=" "
                            style={{
                                height: '100vh',
                                display: 'grid',
                                placeContent: 'center',
                            }}>
                            <div
                                className="spinner-border "
                                role="status"
                                style={{ width: '150px', height: '150px' }}>
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        </div>
                    </div> :

                    <div className="container">
                        <div className="my-5 row">
                            <h4 className='mt-3' > Buyurtma tavsifi </h4>
                            <div className="border border-2 rounded-3 p-4 bg-white">
                                <h3 className="text-success fw-medium ">{data?.title ? data?.title : "Aniqlanmagan ma'lumot"}</h3>


                                <p
                                    style={{ width: "100%" }}
                                >
                                    {data?.description ? data?.description : "Buyurtma bo'yicha hech qanaqa ma'lumot topilmadi sahifani yangilang yokida qaytadan chiqib urinib ko'ring"}
                                </p>
                                <div>
                                    <div className="d-md-flex justify-content-between gap-4  ">
                                        <div className="d-flex align-items-center ">
                                            <img
                                                className="d-block"
                                                width={80}
                                                src="/static/img/docCopy.jpg"
                                                alt="sca"
                                            />
                                            <div>

                                                <div  >
                                                    {' '}
                                                    <span className="fw-medium text-success fs-5 ">Narxi:</span>{' '}
                                                    <span className="text-secondary fs-5 fw-medium ">
                                                        {data?.price ? addPeriodToThousands(data?.price) : 0} so'm
                                                    </span>
                                                </div>

                                                <div >
                                                    <span className="text-success fs-5 fw-medium">
                                                        Buyurtma turi:
                                                    </span>{' '}
                                                    <span className="fw-medium text-secondary fs-5">
                                                        {data?.type?.name ? data?.type?.name : "No Type"}
                                                    </span>
                                                </div>


                                                <div >
                                                    <span className="text-success fs-5 fw-medium">
                                                        Muddati:
                                                    </span>{' '}
                                                    <span className="fw-medium text-secondary fs-5">
                                                        {data?.deadline ? data?.deadline : "0"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {data?.application_count !== 0 ?
                                        <div className="text-start mb-md-0  d-md-flex gap-3 align-items-center">

                                            <span className="fw-medium d-flex gap-3 ">

                                                <span className='text-secondary fs-5'>
                                                    <span className='text-success'>Takliflar:</span> {data?.application_count}</span>

                                            </span>
                                        </div> : <></>
                                    }
                                </div>

                            </div>

                        </div>
                        <h4 className="mb-4">
                            {' '}
                            Buyurtma uchun taklif yuborish {' '}
                        </h4>

                        <Form
                            layout='vertical'
                            form={form}
                            onFinish={postOrder}
                            className="row  py-4 border border-3 rounded-3 px-4 mb-5 bg-white ">
                            <div >
                                <h4> Интегрировать платежную систему на сайт ларавел </h4>
                                <p>1.сайт интернет магазин чтобы показавилось на фронте как платежный метнод , также показала статус платежа</p>
                                <p>2.сайт интернет магазин чтобы показавилось на фронте как айт интернет магазин чтобы показавилось на фронте  платежный метнод , также показала статус платежа</p>
                                <p>3.сайт интернет магазин чтобы показавилось на фронте как платежный метнод , также показала статус платежа</p>
                                <p>4.сайт интернет магазин чтобы показавилось на фронте как айт интернет магазин чтобы показавилось на фронте  платежный метнод , также показала статус платежа</p>
                            </div>


                            <div className="col-md-6  p-0 pr-md-3">

                                <Form.Item
                                    label={"Bajarilish muddati"}
                                    name="orders"
                                    className='mb-2'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Buyurtma muddatini kiritish majburiy',
                                        },
                                    ]}

                                >
                                    <DatePicker
                                        className="w-100 py-3  rounded-3"
                                        onChange={handleChange}
                                        placeholder='Bajarilish muddati'
                                    />
                                </Form.Item>
                            </div>

                            <div className="col-md-6  p-0  pl-md-3">
                                <Form.Item
                                    label="Narxi"
                                    className='m-0 mb-2'
                                    name="title"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Buyurtma narxini kiritish majburiy',
                                        },
                                    ]}>
                                    <Input
                                        type='number'
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="Narxi" />
                                </Form.Item>
                            </div>
                            <div className="col-md-12 p-0  ">
                                <Form.Item
                                    label="Taklif"
                                    name={"description"}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Buyurtma taklifini kiritish majburiy',
                                        },
                                    ]}

                                >
                                    <TextArea
                                        rows={6}
                                        placeholder="Taklif"
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Form.Item>
                            </div>


                            <Form.Item className="col-md-12 d-flex justify-content-end ">
                                <Button
                                    // loading={loading}
                                    htmlType="submit"

                                    style={{
                                        width: '100%',
                                        height: '40px',
                                        padding: "1px 30px"
                                    }}
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
            }

        </>
    );
}
