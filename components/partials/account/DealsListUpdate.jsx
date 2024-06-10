import { Button, Form, Input, InputNumber, Modal, Select } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { useEffect } from 'react';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
const { TextArea } = Input;


export default function DealsListUpdate({ setOpenUpdate, dataDetails, setOpen2 }) {
    const [form] = Form.useForm();
    const { user } = useSelector((state) => state.auth);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [lifetime, setLifetime] = useState('');
    const [type, setType] = useState('');
    const [loading, setLoading] = useState(false);
    const [dealType, setDealType] = useState(null);



    async function postOrder() {
        form.resetFields();
        setLoading(true);
        const data = {
            title: name ? name : dataDetails?.title,
            description: description ? description : dataDetails?.description,
            price: price ? price : Number(dataDetails?.price),
            deadline_date: lifetime ? lifetime : dataDetails?.deadline_date,
            type: type ? type : dataDetails?.type?.id,

        };
        const ItemsData = await PatchRepository.patchDealUpdate(dataDetails?.id, data, user?.access);
        if (ItemsData?.status === 200) {
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: `Buyurtma ma'lumotlari o'zgartirildi`,
            });
        } else {
            const modal = Modal.error({
                centered: true,
                title: 'Xatolik!',
                content: ItemsData?.status + ' ' + ItemsData?.statusText,
            });
        }
        setOpenUpdate(false)
        setOpen2(true)
        setLoading(false);
    }


    async function getDealType(token) {
        const data = await GetRepository.getDealType(token);
        if (data?.results) {
            setDealType(data?.results);
        }
    }

    useEffect(() => {
        if (user?.access) {
            getDealType(user?.access);
        }
    }, []);


    const optionType = dealType?.map((e) => ({
        label: e?.name,
        value: e?.id,
    }));


    return (
        <div className="row " style={{ alignItems: 'flex-start' }}>
            <div className="col-lg-12  mx-auto">
                <div className="ps-page__content">
                    <div className=" bg-white">
                        <div>
                            <p>
                                Lorem ipsum dolor sit amet
                                consectetur, adipisicing elit.
                                Itaque nisi, qui optio eum quo
                                perferendis ipsa debitis quod
                                veritatis reiciendis?
                            </p>

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
                                        name={dataDetails?.title}
                                    >
                                        <Input
                                            defaultValue={dataDetails?.title}
                                            onChange={(e) =>
                                                setName(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Buyurtma nomi" />
                                    </Form.Item>
                                    <Form.Item
                                        className="col-md-12 mb-3"
                                        name={dataDetails?.price}
                                        label="Narxi"
                                    >
                                        <InputNumber
                                            defaultValue={Number(dataDetails?.price)}
                                            placeholder="Narxi"
                                            className='w-100 py-2'
                                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                                            onChange={(e) => setPrice(e)}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Tugash muddati"
                                        className="col-md-12 mb-3 "
                                        name={dataDetails?.deadline_date}
                                    >
                                        <Input type='date' onChange={(e) => setLifetime(e.target.value)}
                                            defaultValue={dataDetails?.deadline_date} />
                                    </Form.Item>
                                    <Form.Item
                                        className="col-md-12 mb-3"
                                        name={dataDetails?.type}
                                        label="Buyurtma turi"
                                    >
                                        <Select
                                            defaultValue={dataDetails?.type?.name}
                                            onChange={(e) =>
                                                setType(e)
                                            }
                                            style={{
                                                width: '100%',
                                                height: '45px',
                                            }}
                                            placeholder="Buyurtma turi"
                                            options={
                                                optionType
                                            }></Select>

                                    </Form.Item>


                                    <Form.Item
                                        label="Buyurtma uchun tavsif"
                                        name={dataDetails?.description}
                                        className='col-md-12 mb-3'
                                    >
                                        <TextArea

                                            rows={8}
                                            placeholder="Buyurtma uchun tavsif"
                                            onChange={(e) =>
                                                setDescription(
                                                    e.target.value
                                                )
                                            }
                                            defaultValue={dataDetails?.description}
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
                                                Saqlash
                                            </span>
                                        </Button>
                                    </Form.Item>

                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
