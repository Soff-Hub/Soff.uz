import React from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { Modal, Select, Space, Collapse, Switch } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';
import ModalDelete from './Modal';
import DeleteRepository from '~/reositoriy-admin/DeleteRepository';
import ModalDeletePostEdit from './ModalPostEdit';
import PostsRepository from '~/reositoriy-admin/PostsRepository';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import { useSelector } from 'react-redux';
import NextImageCard from '~/components/nextImagecard';
import useDebounce from '~/hooks/useDebounce';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

function CategoryLists() {
    const [search, setSerach] = useState('');
    const [tagItems, setTagItems] = useState([]);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteIdEdit, setDeleteIdEdit] = useState(null);
    const [file, setFile] = useState(null);
    const [tagName, setTagName] = useState([]);
    const [tagNameIcon, setTagNameIcon] = useState(null);
    const [tagNameUser, setTagNameUsers] = useState(null);
    const [tagNameTop, setTagNameTop] = useState(null);
    const { accountLinks, user } = useSelector((state) => state.auth);
    const [pageCount, setPageCount] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    const [isHomeVal, setIsHomeVal] = useState(false);
    const searchVal = useDebounce(search, 1000);
    const [categoryData, setCategoryData] = useState(null);
    const [allParents, setAllParents] = useState(false);
    const [chaild, setchaild] = useState(null)
    const [chaildId, setChaildId] = useState(null)

    // async function GetItemsProducts(page, search, id) {
    //     setCurrPage(page);
    //     const ItemsData = await GetRepository.getCategory(
    //         page,
    //         search,
    //         id,
    //         user?.access
    //     );
    //     if (ItemsData?.results) {
    //         setPageCount(ItemsData.count);
    //         setData([...ItemsData.results]);
    //     }
    // }
    async function GetItemsProductsList(search, id) {
        const ItemsData = await GetRepository.getCategoryParentList(
            search,
            id,
            user?.access
        );
        if (ItemsData) {
            setCategoryData([...ItemsData]);
        }
    }


    async function GetCategoryChaildItem(id) {
        setChaildId(id)
        const ItemsData = await GetRepository.getCategoryChaildItem(
            id,
            user?.access,
            search
        );
        if (ItemsData) {
            setchaild([...ItemsData]);
        }
    }

    async function GetItemsProductsEdit(id) {
        const ItemsData = await GetRepository.getCategory(
            currPage,
            search,
            id,
            user?.access
        );
        if (ItemsData) {
            setDeleteIdEdit(ItemsData);
        }
    }

    async function getParentLists() {
        const Items = await GetRepository.getCategoryParentLists(user?.access);
        if (Items?.results) {
            setTagItems(Items?.results);
        }
    }

    async function deleteItemsId() {
        const deleteIdItems = await DeleteRepository.getCategoryDelete(
            deleteId,
            user?.access
        );
        if (deleteIdItems?.status === 204) {
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: `Siz  malumotlarni o'chirdingiz`,
            });
        }else{
            const modal = Modal.error({
                centered: true,
                title: 'Muvaffaqqiyatsiz!',
                content: `Siz  malumotlarni o'chirolmadingiz`,
            });
        }
        GetItemsProductsList(search, null);
        GetCategoryChaildItem(chaildId)
    }

    async function handleItemsPost(values) {
        const formData = new FormData();
        if (file) {
            formData.append('image', file);
        }
        if (values.icon) {
            formData.append('icon', values.icon);
        }
        formData.append('name', values?.name);

        if (allParents) {
            formData.append('all_parents', allParents);
        }

        if (allParents === false && tagName?.length > 0) {
            formData.append('parents', JSON.stringify(tagName));
        }

        const postsItems = await PostsRepository.PostsCategory(
            formData,
            user?.access
        );
        if (postsItems) {
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: `Siz  yangi categoriya qo'shdingiz`,
            });
        }
        GetItemsProductsList(search, null);
        getParentLists();
        setTagName([]);
        setAllParents(false);
        setIsHomeVal(false)
    }

    async function handleItemsEdit() {
        if (
            tagNameUser ||
            tagNameIcon ||
            tagName ||
            tagNameTop ||
            file ||
            isHomeVal !== null
        ) {
            const formData = new FormData();
            if (file) {
                formData.append('image', file);
            }
            if (tagNameIcon) {
                formData.append('icon', tagNameIcon);
            }
            if (tagNameUser) {
                formData.append('name', tagNameUser);
            }
            if (tagName) {
                formData.append('parent', tagName);
            }
            if (tagNameTop) {
                formData.append('top', tagNameTop);
            }

            formData.append('is_home', isHomeVal);

            const patchItems = await PatchRepository.PatchCategory(
                formData,
                deleteIdEdit?.id,
                user?.access
            );
            if (patchItems?.statusi === 200 || 201) {
                const modal = Modal.success({
                    centered: true,
                    title: 'Muvaffaqqiyatli!',
                    content: "Siz  malumotlarni o'zgartirdingiz ",
                });
            }
            GetItemsProductsList(search, null);
            GetCategoryChaildItem(chaildId)

            setTagNameTop(null);
            setTagName(null);
            setFile(null);
            setTagNameIcon(null);
            setTagNameUsers(null);
            setIsHomeVal(false);
        } else {
            const modal = Modal.error({
                centered: true,
                title: "Qayta urinib ko'ring",
                content: "O'zgartirish uchun malumot kiritilmadi ",
            });
        }
    }

    function handleClickPostsImg(e) {
        setFile(e.target.files[0]);
    }
    useEffect(() => {
        getParentLists();
    }, []);

    useEffect(() => {
        GetItemsProductsList(searchVal, null);
    }, [searchVal]);

    const itemArr = categoryData?.map((e) => ({
        key: e?.id,
        label: (
            <div className="row" onClick={() => GetCategoryChaildItem(e?.id)}  >
                <div className="col-md-6">{e?.name}</div>
                <div className="col-md-6 text-end">
                    <div className="d-flex align-items-center justify-content-end">
                        {e?.image ? (
                            <a href={e?.image} target="blank">
                                {' '}
                                <NextImageCard
                                    url={e?.image}
                                    clasS="rounded-3 mb-2"
                                    width="54px"
                                    height="54px"
                                />
                            </a>
                        ) : (
                            <i className="fa-solid fa-image fa-2x"></i>
                        )}
                        <a
                            data-bs-target="#exampleModalToggleEditCategory"
                            data-bs-toggle="modal">
                            <i
                                className="fa-solid fa-pen-to-square mx-4 text-success-emphasis ml-5"
                                onClick={() => GetItemsProductsEdit(e?.id)}></i>
                        </a>
                        {e?.is_delete === true ? (
                            <a
                                data-bs-target="#exampleModalToggle"
                                data-bs-toggle="modal">
                                <i
                                    className="fa-solid fa-trash-can text-danger mx-3"
                                    onClick={() => setDeleteId(e?.id)}></i>
                            </a>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        ),
        children: chaild?.map((el) => {
            return (
                <div className="row border-bottom py-3">
                    <div className="col-md-6">{el?.name}</div>
                    <div className="col-md-6 text-end">
                        <div className="d-flex align-items-center justify-content-end">
                            {el?.is_delete === true ? (
                                <a
                                    data-bs-target="#exampleModalToggle"
                                    data-bs-toggle="modal">
                                    <i
                                        className="fa-solid fa-trash-can text-danger mx-3"
                                        onClick={() => setDeleteId(el?.id)}></i>
                                </a>
                            ) : (
                                <></>
                            )}
                            <a
                                data-bs-target="#exampleModalToggleEditCategory"
                                data-bs-toggle="modal">
                                
                                <i
                                    className="fa-solid fa-pen-to-square mx-4 text-success-emphasis"
                                    onClick={() =>
                                       ( GetItemsProductsEdit(el?.id), setTagName(e?.id))
                                    }></i>
                            </a>
                        </div>
                    </div>
                </div>
            );
        }),
    }));

    const options = tagItems?.map((e) => ({
        label: e?.name,
        value: e?.id,
    }));

    const handleChange = (value) => {
        setTagName(value);
    };

    return (
        <section className="ps-my-account ps-page--account p-0">
            <div className="container">
                <div className="row " style={{ alignItems: 'flex-start' }}>
                    <div className="col-lg-4">
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} />
                        </div>
                    </div>
                    <div className="col-lg-8 pb-5">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div>
                                    <div className="row row-gap-3 bg-white m-0 gap-5 px-4 mb-3 pb-4 rounded">
                                        <h5 className="bg-white m-0 px-4 pt-4 rounded text-danger ">
                                            {' '}
                                            <i className="fa-solid fa-square-check text-primary"></i>{' '}
                                            Top qilish uchun maxsimal oltita
                                            element tanlashingiz lozim!
                                        </h5>
                                        <label
                                            className="form-label border col-md-8 m-0 p-0 d-flex justify-content-between align-items-center"
                                            style={{
                                                backgroundColor: '#F1F1F1',
                                            }}>
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
                                        {/* <input type='search' className='form-control rounded ' placeholder="Qidiruv" onInput={e => setSerach(e.target.value)} /> */}
                                        <button
                                            className="btn btn-success col-md-3 py-3 "
                                            data-bs-target="#addcategory"
                                            data-bs-toggle="modal">
                                            <span className="fs-4">
                                                {' '}
                                                <i className="fa-solid fa-plus"></i>{' '}
                                                Kategoriya qo'shish
                                            </span>
                                        </button>
                                    </div>

                                    <Collapse
                                        items={itemArr}
                                        accordion={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ModalDelete onSuccess={deleteItemsId} />
                <ModalDeletePostEdit
                    dataBsTarget="exampleModalToggleEditCategory"
                    onSubmited={handleItemsEdit}
                    formID={'edit-form-category'}>
                    {deleteIdEdit?.parent == null && (
                        <select
                            className="form-select  rounded-3 py-3 fs-3"
                            onChange={(e) => setIsHomeVal(e.target.value)}>
                            <option
                                value={true}
                                selected={deleteIdEdit?.is_home}>
                                Asosiy sahifada
                            </option>
                            <option
                                value={false}
                                selected={!deleteIdEdit?.is_home}>
                                Asosiy sahifada emas
                            </option>
                        </select>
                    )}
                    <label
                        htmlFor="file"
                        className="w-100 text-truncate"
                        style={{
                            border: '1px solid #dddddd',
                            boxShadow: '0 0 0 #000',
                            borderRadius: '5px',
                            padding: '13px 12px',
                            cursor: 'pointer',
                        }}>
                        {deleteIdEdit?.image ? (
                            deleteIdEdit?.image
                        ) : (
                            <span>
                                Rasm tanlash uchun bosing{' '}
                                <i className="fa-regular fa-hand-pointer"></i>
                            </span>
                        )}
                        <input
                            type="file"
                            name="file"
                            id="file"
                            style={{ display: 'none' }}
                            className="form-control pt-4 rounded-3 fileUpload"
                            onChange={handleClickPostsImg}
                            accept="image/*"
                        />
                    </label>
                    <a
                        className="text-primary m-0"
                        href={deleteIdEdit?.image}
                        target="_blank"
                        rel="noopener noreferrer">
                        Link (rasm)
                    </a>
                    {categoryData?.some(
                        (el) =>
                            el?.id == deleteIdEdit?.id && el.is_update === true
                    ) ? (
                        <select
                            className="form-select  rounded-3 py-3 fs-3"
                            onChange={(e) => setTagName(e.target.value)}>
                            <option value="">Parent</option>
                            {tagItems?.length > 0 &&
                                tagItems?.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                        </select>
                    ) : (
                        <></>
                    )}
                    {categoryData?.some(
                        (el) =>
                            el?.id == deleteIdEdit?.id && el.is_parent === true
                    ) ? (
                        <select
                            className="form-select  rounded-3 py-3 fs-3"
                            onChange={(e) => setTagNameTop(e.target.value)}>
                            {categoryData?.some(
                                (el) =>
                                    el?.id == deleteIdEdit?.id &&
                                    el.top === true
                            ) ? (
                                <>
                                    <option selected value={'true'}>
                                        Top{' '}
                                    </option>
                                    <option value={'false'}>Top emas</option>
                                </>
                            ) : (
                                <>
                                    <option selected value={'false'}>
                                        Top emas
                                    </option>
                                    <option value={'true'}>Top </option>
                                </>
                            )}
                        </select>
                    ) : (
                        <></>
                    )}
                    <input
                        type="text"
                        placeholder="Belgi"
                        className="form-control rounded-3"
                        name="icon"
                        defaultValue={deleteIdEdit?.icon}
                        onChange={(e) => setTagNameIcon(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Nomi"
                        className="form-control rounded-3"
                        name="name"
                        defaultValue={deleteIdEdit?.name}
                        onChange={(e) => setTagNameUsers(e.target.value)}
                    />
                </ModalDeletePostEdit>
                <ModalDeletePostEdit
                    dataBsTarget="addcategory"
                    onSubmited={handleItemsPost}
                    formID={'post-form-category'}>
                    <label
                        htmlFor="file"
                        className="w-100 "
                        style={{
                            border: '1px solid #dddddd',
                            boxShadow: '0 0 0 #000',
                            borderRadius: '5px',
                            padding: '13px 12px',
                            cursor: 'pointer',
                        }}>
                        {file ? (
                            'soff.uz//b30b856b-606c-4001-8bee-4839557c'
                        ) : (
                            <span>
                                Rasm tanlash uchun bosing{' '}
                                <i className="fa-regular fa-hand-pointer"></i>
                            </span>
                        )}
                        <input
                            type="file"
                            name="file"
                            id="file"
                            style={{ display: 'none' }}
                            className="form-control pt-4 rounded-3 fileUpload"
                            onChange={handleClickPostsImg}
                        />
                    </label>
                    {file ? (
                        <a
                            className="text-primary m-0"
                            href={deleteIdEdit?.image}
                            target="_blank"
                            rel="noopener noreferrer">
                            Link (rasm)
                        </a>
                    ) : (
                        <></>
                    )}

                    {/* <select
                        className="form-select  rounded-3 py-3 fs-3"
                        onChange={(e) => setTagName(e.target.value)}>
                        <option value="">Parent</option>
                        {tagItems?.length > 0 &&
                            tagItems?.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                    </select> */}
                    <div>
                        <Switch
                            size="small"
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            defaultValue={allParents}
                            onChange={(e) => setAllParents(e)}
                        />{' '}
                        <span>Barcha parentni tanlash</span>
                    </div>
                    <Space
                        style={{
                            width: '100%',
                        }}
                        direction="vertical">
                        <Select
                            disabled={allParents}
                            mode="multiple"
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            placeholder="Parentlarni tanlang"
                            onChange={handleChange}
                            options={options}
                            optionFilterProp="label"
                        />
                    </Space>
                    <input
                        type="text"
                        placeholder="Belgi"
                        className="form-control rounded-3"
                        name="icon"
                    />
                    <input
                        required
                        type="text"
                        placeholder="Nomi"
                        className="form-control rounded-3"
                        name="name"
                    />
                </ModalDeletePostEdit>
            </div>
        </section>
    );
}

export default CategoryLists;
