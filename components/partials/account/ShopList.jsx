import React, { Component, useEffect, useState } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { Modal, Table } from 'antd';
import ModalDeletePostEdit from './ModalPostEdit';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import { useSelector } from 'react-redux';

function Notifications() {
    const { accountLinks, user } = useSelector(state => state.auth)

    const [data, setData] = useState([]);
    const [search, setSerach] = useState([]);
    const [deleteIdEditSellers, setDeleteIdEditSellers] = useState(null);

    const [selectValSellers, setSelectValSellers] = useState({});;
    async function GetItems(page) {
        if (page === 1) {
            setData([])
        }
        const ItemsData = await GetRepository.getShops(page, user?.access);
         if (ItemsData?.results) {
            setData((prev) => [...prev, ...ItemsData.results]);
            setSerach((prev) => [...prev, ...ItemsData.results]);
            if (ItemsData.next) {
                GetItems(page + 1)
            }
         }
    }

    function handleClick(e) {
        const text = e.target.value;
        const filterSearch = search.filter(item => (
            item.first_name.toLowerCase().includes(text.toLowerCase())
        ))
        setData(filterSearch)
    }
    async function handleItemsEditSellers() {
        const patchItemsSellers = await PatchRepository.getShopsPatch({ auth_status: selectValSellers }, deleteIdEditSellers?.id, user?.access)
        setData([])
        GetItems(1)
        const modal = Modal.success({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: `Siz malumotlarni o'zgartirdingiz`,
        });
    }

    useEffect(() => {
        GetItems(1)
    }, [])
    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'image',
            key: 'name',
            render: (image) => (
                <div>
                    {
                        image ?
                            <img src={image} width={54} height={54} />
                            :
                            <span className='fs-4'><i className="  fa-2x fa-solid fa-circle-user"></i></span>
                    }
                </div>
            ),
        },
        {
            title: 'Ism',
            dataIndex: 'first_name',
            key: 'age',
            render: (first_name) => (
                <span className="truncate whitespace-nowrap"><i className=" text-primary-emphasis fa-solid fa-user-tie"></i> {first_name}</span>

            ),
        },
        {
            title: 'Mahsulotlar',
            dataIndex: 'total_product',
            key: 'address',
            render: (total_product) => (
                <span> <i className="fa-solid fa-boxes-stacked"></i> {total_product}</span>
            ),
        },
        {
            title: 'Buyurtmalar',
            dataIndex: 'total_approved',
            key: 'address',
            render: (total_approved) => (
                <span> <i className="fa-solid fa-box"></i> {total_approved}</span>
            ),
        },
        {
            title: 'Holat',
            dataIndex: 'auth_status',
            key: 'address',
            render: (auth_status) => (
                <span>{auth_status === 'code_verified' ? (<span><i className="fa-solid text-success fa-circle-check"></i> Faol</span>) : (<span><i class="fa-solid fa-circle-xmark text-danger"></i> Faol emas</span>)}</span>
            )

        },
        {
            title: 'Harakatlar',
            dataIndex: 'id',
            key: 'address',
            render: (id) => <>
                {
                    data.some(el => el.id == id && el.auth_status === 'new') ? <a data-bs-target="#exampleModalToggleEditSellers" data-bs-toggle="modal" ><i className="fa-solid fa-pen-to-square mx-4 text-success-emphasis" onClick={() => setDeleteIdEditSellers(data.find(item => item.id === id))} ></i></a>

                        : <a style={{opacity:0.6 , cursor:"not-allowed"}} ><i className="fa-solid fa-pen-to-square mx-4 text-success-emphasis" ></i></a>
                }
            </>
        }
    ];
    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className=" w-100 mx-auto p-5 mb-5 rounded row  g-3" style={{ backgroundColor: "#fff", boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)" }}>
                    <div className='col-md-5'>
                    <h3 className='m-0'>Sotuvchilar</h3>
                    </div>
                  <div className='col-md-7'>
                    <input type='search' className='form-control rounded' placeholder="Qidiruv" onInput={handleClick} />
                  </div>
                </div>
                <div className="row flex pb-5" style={{ alignItems: "flex-start" }}>
                    <div className="col-lg-4 pb-5" >
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} />
                        </div>
                    </div>
                    <div className="col-lg-8 pb-5">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div>
                                    <Table scroll={{ x: 750 }} dataSource={data} columns={columns}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ModalDeletePostEdit dataBsTarget="exampleModalToggleEditSellers" onSubmited={handleItemsEditSellers} formID="sellers-edit" >
                    <select className='form-select fs-3 py-3' onChange={(e) => setSelectValSellers(e.target.value)}>
                        <option className='fs-3' selected disabled value="new">Holatni tanlang</option>
                        <option className='fs-3' value="new">Faol emas</option>
                        <option className='fs-3' value="code_verified">Faol</option>
                    </select>
                </ModalDeletePostEdit >
            </div>
        </section>
    );

}
export default Notifications;
