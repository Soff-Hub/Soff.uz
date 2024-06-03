import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, Modal } from 'antd';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { useRouter } from 'next/router';
import CalculateTimeDifference from './DateFormatter';
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
    const id = query?.pid
    const router = useRouter()

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

        const ItemsData = await GetRepository.getOrdersDealLists(1, '', '', '', '', id);
        if (ItemsData) {
            setData(ItemsData);
        }
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
        if (ItemsData?.status == 201) {
            router.push("/account/deal-applications")
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: ` ${ItemsData?.data?.msg
                    ? ItemsData?.data?.msg
                    : 'Sizning arizangiz yuborildi'
                    } `,
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
    }


    useEffect(() => {
        if (id) {
            GetItemsProducts();
        }
    }, [id]);




    return (
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

                                    <div className="text-start" >
                                        {' '}
                                        <span className="fw-medium text-success fs-5 ">Narxi:</span>{' '}
                                        <span className="text-success fs-4 fw-medium ">
                                            {data?.price ? addPeriodToThousands(data?.price) : 0} so'm
                                        </span>
                                    </div>

                                    <div className="text-start">
                                        <span className="text-success fs-5 fw-medium">
                                            Kategriyasi:
                                        </span>{' '}
                                        <span className="fw-medium ">
                                            {data?.type?.name ? data?.type?.name : "No Type"}
                                        </span>
                                    </div>


                                    <div className="text-start">
                                        <span className="text-success fs-5 fw-medium">
                                            Muddati:
                                        </span>{' '}
                                        <span className="fw-medium ">
                                            {data?.deadline ? data?.deadline : "0"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-3 
                                    d-md-flex justify-content-between 
                                    align-items-center'>
                            <div className="text-start mb-md-0 mb-3 d-md-flex gap-3 align-items-center">
                                <span className="text-success fs-5 fw-medium ">
                                    Yaratilgan vaqti:
                                </span>{' '}
                                <span className="fw-medium d-flex gap-3 ">
                                    <CalculateTimeDifference targetDate={data?.created_at} />
                                    <span>Takliflar: {data?.application_count}</span>

                                </span>
                            </div>

                        </div>
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


                <div className="col-md-6  pl-0">

                    <Form.Item
                        label={"Bajarilish muddati"}
                        name="orders"
                        rules={[
                            {
                                required: true,
                                message: 'Buyurtma Muddatini kiritish majburiy',
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

                <div className="col-md-6   pr-0 ">
                    <Form.Item
                        label="Narxi"
                        className='m-0'
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Buyurtma narxini kiritish majburiy',
                            },
                        ]}>
                        <Input
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Narxi"></Input>
                    </Form.Item>
                </div>
                <div className="col-md-12 p-0  ">
                    <Form.Item
                        label="Taklif"
                        name={"description"}
                        rules={[
                            {
                                required: true,
                                message: 'Buyurtma Muddatini kiritish majburiy',
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
    );
}
