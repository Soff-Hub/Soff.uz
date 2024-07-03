import React, { useEffect, useState } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { Button, DatePicker, Form, Modal, Table, Input, Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import { Pagination } from 'antd';
import CalculateTimeDifference from './DateFormatter';
import useDebounce from '~/hooks/useDebounce';
import Link from 'next/link';
import PostsRepository from '~/reositoriy-admin/PostsRepository';
import ModalSellerBlock from './ModalBlock';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
const { TextArea } = Input;

function Notifications() {
    const { accountLinks, user } = useSelector((state) => state.auth);
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [search, setSerach] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    const searchDebounce = useDebounce(search, 1000);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sellerID, setSellerID] = useState(null);
    const date = new Date();

    console.log(sellerID);

    async function GetItems(page) {
        const ItemsData = await GetRepository.getShops(
            page,
            search,
            user?.access
        );
        if (ItemsData?.results) {
            setData([...ItemsData?.results]);
            setPageCount(ItemsData.count);
        }
    }

    const handlePagination = (pageNum) => {
        setCurrPage(pageNum);
        GetItems(pageNum, search);
    };


    useEffect(() => {
        GetItems(currPage, search);
    }, [searchDebounce]);

    async function postOrder(values) {
        form.resetFields();
        setLoading(true);

        const data = {
            reason: values?.description,
            to_date: values?.date?.format('YYYY-MM-DD'),
            user: sellerID
        }

        const ItemsData = await PostsRepository.postSellerBlock(data, user?.access);
        if (ItemsData?.status == 201) {
            const modal = Modal.warning({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: `${ItemsData?.data?.msg
                    ? ItemsData?.data?.msg
                    : "Siz Sotuvchini vaqtincha bloklab qo'ydingiz"
                    }  `,
            });
            modal.update;
            GetItems(currPage, search);
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

    async function handleClickView() {
        const data = {
            to_date: date,
        }
        const ItemsData = await PatchRepository.PatchCategorySeller(sellerID, data, user?.access);
        if (ItemsData?.status == 200) {
            const modal = Modal.warning({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: `${ItemsData?.data?.msg
                    ? ItemsData?.data?.msg
                    : "Siz Sotuvchini  blokdan chiqardingiz"
                    }  `,
            });
            modal.update;
            GetItems(currPage, search);
        } else {
            const modal = Modal.error({
                centered: true,
                title: 'Xato!',
                content: ItemsData?.status + ' ' + ItemsData?.statusText,
            });
            modal.update;
        }
    }



    const columns = [
        {
            title: 'Bloklash',
            dataIndex: 'data_spam',
            key: 'age',
            width: 50,
            render: (data_spam) => (
                <div className='d-flex align-items-center gap-3'>
                    {
                        data_spam?.has_blocked &&
                        <Tooltip
                            color='red'
                            overlayStyle={{
                                minWidth: '350px',
                            }} title={
                                <div className='d-flex flex-column '>
                                    <div className='d-flex gap-1'>
                                        <span>Bloklab qo'yilgan vaqti:</span>
                                        <CalculateTimeDifference targetDate={data_spam?.created_at} />
                                    </div>
                                    <div className='d-flex gap-1'>
                                        <span>Blokdan chiqish muddati:</span>
                                        <CalculateTimeDifference targetDate={data_spam?.to_date} />
                                    </div>


                                    <span>{data_spam?.reason}</span>
                                </div>

                            }>
                            <span style={{ cursor: 'pointer' }}>
                                <i className="fa-solid fa-circle-question text-danger"></i>{' '}
                            </span>
                        </Tooltip>
                    }

                    <span>
                        {
                            data_spam?.has_blocked ?

                                <a
                                    onClick={() => setSellerID(data_spam?.id)}
                                    data-bs-target="#exampleModalToggleSellerBlock"
                                    data-bs-toggle="modal">
                                    <i className="fa-solid fa-lock"></i>

                                </a>
                                :
                                <span style={{ cursor: "pointer" }} onClick={() => (setOpen(true), setSellerID(data_spam?.user_id))}>
                                    <i className="fa-solid fa-lock-open"></i>
                                </span>
                        }

                    </span>
                </div>
            ),
        },

        {
            title: 'Batafsil',
            dataIndex: 'id',
            key: 'age',
            width: 50,
            render: (id) => (
                <Link href={`/sellerAccount/${id}`}>
                    <a className="truncate whitespace-nowrap">
                        <i className="fa-solid fa-eye"></i>
                    </a>
                </Link>
            ),
        },
        {
            title: 'Avatar',
            dataIndex: 'image_url',
            key: 'name',
            render: (image) => (
                <div>
                    {image ? (
                        <img src={image} alt="soff.uz" className='profile__image-client' />
                    ) : (
                        <span className="fs-4">
                            <i className="  fa-2x fa-solid fa-circle-user"></i>
                        </span>
                    )}
                </div>
            ),
        },
        {
            title: 'Ism',
            dataIndex: 'full_name',
            key: 'age',
            render: (full_name) => (
                <span className="truncate whitespace-nowrap">
                    {full_name}
                </span>
            ),
        },
        {
            title: 'Telefon raqam yoki email',
            dataIndex: 'email_or_phone',
            key: 'address',
            width: 300,
            render: (email_or_phone) => (
                <div className="d-flex flex-column">
                    <span className="truncate whitespace-nowrap">
                        {' '}
                        {email_or_phone}
                    </span>
                </div>
            ),
        },
        {
            title: 'Mahsulotlar',
            dataIndex: 'total_product',
            key: 'address',
            render: (total_product) => (
                <span>
                    {' '}
                    <i className="fa-solid fa-boxes-stacked"></i>{' '}
                    {total_product}
                </span>
            ),
        },
        {
            title: 'Buyurtmalar',
            dataIndex: 'total_approved',
            key: 'address',
            render: (total_approved) => (
                <span>
                    {' '}
                    <i className="fa-solid fa-box"></i> {total_approved}
                </span>
            ),
        },
        {
            title: "Ro'yxatdan o'tgan sana",
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at) => (
                <span key={created_at}>
                    {' '}
                    <i className="fa-solid fa-clock text-info-emphasis"></i>{' '}
                    <CalculateTimeDifference targetDate={created_at} />
                </span>
            ),
        },
        {
            title: 'Hisob',
            dataIndex: 'wallet',
            key: 'wallet',
            render: (wallet) => <span key={wallet}> {wallet} so'm </span>,
        },
        {
            title: 'Holat',
            dataIndex: 'auth_status',
            key: 'address',
            render: (auth_status) => (
                <span>
                    {auth_status === 'code_verified' ? (
                        <span>
                            <i className="fa-solid text-success fa-circle-check"></i>{' '}
                            Faol
                        </span>
                    ) : (
                        <span>
                            <i className="fa-solid fa-circle-xmark text-danger"></i>{' '}
                            Faol emas
                        </span>
                    )}
                </span>
            ),
        },
    ];


    return (
        <section className="ps-my-account ps-page--account p-0">
            <div className="container">
                <div
                    className="row flex pb-5"
                    style={{ alignItems: 'flex-start' }}>
                    <div className="col-lg-4">
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} />
                        </div>
                    </div>
                    <div className="col-lg-8 pb-5">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div className="bg-white p-3">
                                    <span
                                        className="col-md-12 m-0 py-3 border d-flex bg-white justify-content-center rounded mb-2 h4"
                                        style={{ backgroundColor: 'GrayText' }}>
                                        Sotuvchilar soni: {pageCount} ta
                                    </span>
                                    <label
                                        className="form-label border w-100 d-flex justify-content-between align-items-center"
                                        style={{ backgroundColor: '#F1F1F1' }}>
                                        <input
                                            type="search"
                                            className="form-control"
                                            style={{ border: 'none' }}
                                            placeholder="Qidiruv"
                                            onInput={(e) =>
                                                setSerach(e.target.value)
                                            }
                                        />
                                        <span className="px-4">
                                            <i className="fa-solid fa-search "></i>
                                        </span>
                                    </label>
                                    <Table
                                        scroll={{ x: 1400 }}
                                        dataSource={data}
                                        columns={columns}
                                        pagination={false}
                                    />
                                    <Pagination
                                        className="mt-3"
                                        defaultCurrent={currPage || 1}
                                        total={pageCount}
                                        onChange={handlePagination}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    title="Bloklash"
                    width={550}
                    centered
                    open={open}
                    onOk={() => setOpen(false)}
                    okText="Yopish"
                    footer={null}
                    cancelButtonProps={{
                        style: {
                            display: 'none',
                        },
                    }}
                    okButtonProps={{
                        style: {
                            display: 'none',
                        },
                    }}

                    onCancel={() => setOpen(false)}>

                    <Form
                        form={form}
                        onFinish={postOrder}
                        className="row  pt-4 "
                        layout='vertical'
                    >


                        <Form.Item
                            label="Blokdan chiqish muddati"
                            className="col-md-12 mb-3 "
                            name="date"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Blokdan chiqish muddatini kiritish majburiy',
                                },
                            ]}>
                            <DatePicker
                                className='w-100 py-3' placeholder='Blokdan chiqish muddati' />
                        </Form.Item>

                        <Form.Item
                            label="Bloklash haqida sabab"
                            name="description"
                            className='col-md-12 mb-3'
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Bloklash haqida sababini kiritish majburiy',
                                },
                            ]}>
                            <TextArea
                                rows={4}
                                placeholder="Bloklash haqida sabab"

                            />
                        </Form.Item>

                        <Form.Item className="col-md-12 d-flex justify-content-end m-0  mt-3">
                            <Button
                                htmlType="submit"
                                loading={loading}
                                style={{
                                    width: '100%',
                                    height: '37px',
                                    padding: "1px 30px"
                                }}
                                className="btn-success btn-send-email">
                                <span
                                    style={{
                                        color: '#fff',
                                        fontSize:
                                            '16px',
                                    }}>
                                    Bloklash
                                </span>
                            </Button>
                        </Form.Item>

                    </Form>


                </Modal>

                <ModalSellerBlock onSuccess={handleClickView} />
            </div>
        </section>
    );
}
export default Notifications;
