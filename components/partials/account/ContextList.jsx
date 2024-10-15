import React, { useEffect, useState } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { useSelector } from 'react-redux';
import GetRepository from '~/reositoriy-admin/GetRepository';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import { Modal, Table } from 'antd';
import NextImageCard from '~/components/nextImagecard';
import SidebarLayout from '../SidebarLayout';



function ContextLists() {

    const [data, setData] = useState([]);
    const [dataUrl, setDataUrl] = useState(null);
    const [dataUrlFile, setDataUrlFile] = useState(null);
    const { accountLinks, user } = useSelector(state => state.auth)


    async function GetItemsBanners() {
        const ItemsData = await GetRepository.getBannerLists(user?.access)
        if (ItemsData?.results) {

            setData(ItemsData?.results)
        }


    }
    async function handleClickID(ID) {

        if (dataUrlFile || dataUrl) {
            const formData = new FormData();
            if (dataUrlFile) {
                formData.append("image", dataUrlFile);

            }
            if (dataUrl) {
                formData.append("url", dataUrl);
            }
            const ItemsData = await PatchRepository.getBannersPatch(formData, ID, user?.access);
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: "Siz  malumotlarni o'zgartirdingiz ",
            });
            GetItemsBanners()
            setDataUrlFile(null)
            setDataUrl(null)

        }
        else {
            const modal = Modal.info({
                centered: true,
                title: "Qayta urinib ko'ring",
                content: "O'zgartirish uchun malumot kiritilmadi ",
            });
        }

    }

    useEffect(() => {
        GetItemsBanners()
    }, [])

    const columns = [
        {
            title: 'Rasm',
            dataIndex: 'image',
            key: 'address',
            render: (image) => (
                <div>
                    {
                        image ?
                            <NextImageCard url={image} className='rounded-3 mb-2' width='74px' height='46px' />
                            :
                            <i className="fa-solid fa-image fa-2x"></i>
                    }
                </div>
            ),
        },
        {
            title: "Rasmlar ro'yxati",
            dataIndex: 'image',
            key: 'address',
            render: () => (
                <label htmlFor="file" className='w-100 ' style={{ border: "1px solid #dddddd", boxShadow: "0 0 0 #000", borderRadius: "5px", padding: "13px 12px", cursor: "pointer" }}>
                    Rasm tanlash uchun bosing <i className="fa-regular fa-hand-pointer"></i>
                    <input required type="file" name='file' id='file' style={{ display: "none" }} className='form-control pt-4 rounded-3 fileUpload' onChange={(e) => setDataUrlFile(e.target.files[0])} />
                </label>
            )
        },
        {
            title: 'Havolalar',
            dataIndex: 'url',
            key: 'address',
            render: (url) => (
                <input type="url" className='form-control rounded-3 ' defaultValue={url} onChange={(e) => setDataUrl(e.target.value)} />

            )
        },
        {
            title: 'Harakatlar',
            dataIndex: 'id',
            key: 'address',
            render: (id) => (
                <button className='btn btn-success ' style={{ padding: "12px 12px" }} onClick={() => handleClickID(id)}><span className='fs-4 d-flex gap-2 ' >
                    Saqlash
                </span></button>
            )
        },
    ];

    return (
        <section className="ps-my-account ps-page--account p-0">
            <div className="container pb-5">
                <div className="row">
                    <SidebarLayout accountLinks={accountLinks}>
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div>
                                    <Table scroll={{ x: 750 }} pagination={false} dataSource={data} columns={columns} />
                                </div>
                            </div>
                        </div>
                    </SidebarLayout>
                </div>
            </div>
        </section>
    );
}
export default ContextLists;
