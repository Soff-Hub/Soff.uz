import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Page404 from '~/pages/page/page-404';
import PostsRepository from '~/reositoriy-admin/PostsRepository';
import LoginPage from '../login';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newsletters from '~/components/partials/commons/Newletters';
import Link from 'next/link';
import MediaRepository from '~/repositories/MediaRepository';
import GetRepository from '~/reositoriy-admin/GetRepository';
import WordGenerator from '~/components/partials/account/descriptionInput';
import { Select } from 'antd';

const Posts = () => {
    const [data, setData] = useState({});
    const [fileImgFile, setFileImgFile] = useState('');
    const [fileImgPoster, setFileImgPoster] = useState('');
    const [categoryNameEdit, setCategoryNameEdit] = useState({});
    const [tagSearchResult, setTagSearchResult] = useState({});
    const [dataCategory, setDataCategory] = useState([]);
    const [tagItems, setTagItems] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const [tagValue, setTagValue] = useState('');

    const breadCrumb = [
        {
            text: 'Asosiy Sahifa',
            url: '/',
        },
        {
            text: "Mening mahsulotlarim Qo'shish",
        },
    ];

    const Option = Select.Option;

    async function GetItemsCategory(page) {
        if (page === 1) {
            setDataCategory([]);
        }
        const ItemsData = await GetRepository.getCategory(page, user?.access);
        setDataCategory(ItemsData.results);
    }
    async function GetItemsTag() {
        const ItemsData = await MediaRepository.getTagItmes(user?.access);
        if (ItemsData?.results) {
            setTagItems(ItemsData.results);
        }
    }

    const children = [];
    for (let i = 0; i < tagItems?.length; i++) {
        children.push(
            <Option key={tagItems[i].name}>{tagItems[i].name}</Option>
        );
    }

    function handleChange(value) {
        setTagSearchResult(value);
    }

    const getFormValues = (formId) => {
        const data = {};
        const form = document.getElementById(formId);

        const formData = new FormData(form);

        for (let [key, value] of formData) {
            Object.assign(data, { [key]: value });
        }

        return data;
    };
    //  const dataForm = getFormValues("FormPostsMyProducts")

    async function handleClickPosts(values) {
        const formData = new FormData();
        formData.append('file', fileImgFile);
        formData.append('poster', fileImgPoster);
        formData.append('poster', fileImgFile);
        formData.append('title', values.title);
        formData.append('price', values.price);
        formData.append('discount', values.discount);
        formData.append('short_description', values.short_description);
        formData.append('description', values.description);
        formData.append('category', categoryNameEdit);
        formData.append('tag', tagSearchResult);
        const patchItems = await PostsRepository.PostsMyProducts(
            formData,
            user?.access
        );
        console.log('jonatish', patchItems);
        // const modal = Modal.success({
        //     centered: true,
        //     title: 'Muvaffaqqiyatli!',
        //     content: `Siz yangi malumot qo'shdingiz`,
        // });
        // GetItemsProducts(1, dataValCat, tagName, dataFormat)
    }

    useEffect(() => {
        GetItemsCategory(1);
        GetItemsTag();
    }, [tagValue]);

    const handleChangeCategory = () => {

    }


    console.log('nkjnkjnkj', tagSearchResult);

    return user?.role === 'seller' || user?.role === 'customer' ? (
        <PageContainer
            footer={<FooterDefault />}
            title="Recent Viewed Products">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <form
                    id="FormPostsMyProducts"
                    className="row mx-auto container gap-3 py-5">
                    <h4>Mahsulot Qo'shish</h4>
                    {/* <input type="file" onChange={handleSelectFile} className='form-control pt-4 rounded-3' /> */}
                    <label className="add-product-user-image form-control col-md-4 pt-4 rounded-3">
                        Hujjatingizning ko'rinishi (Rasm)
                        <input
                            type="file"
                            onChange={(e) => setFileImgFile(e.target.files[0])}
                        />
                    </label>
                    <label className="add-product-user-image form-control col-md-4 pt-4 rounded-3">
                        Hujjatingizni joylang (File)
                        <input
                            type="file"
                            onChange={(e) =>
                                setFileImgPoster(e.target.files[0])
                            }
                        />
                    </label>
                    <input
                        type="text"
                        className="form-control  rounded-3 col-md-4"
                        placeholder="Hujjatingizning nomi"
                        name="title"
                    />

                    <div className="rounded-3 col-md-4 p-0 m-0">
                        <Select
                            className="py-2"
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder="Hujjatlaringizga tag qo'shing"
                            onChange={handleChange}>
                            {children}
                        </Select>
                    </div>

                    <select
                        className="form-select rounded-3 col-md-4 py-4 fs-4"
                        onChange={(e) => handleChangeCategory(e.target.value)}>
                        <option value="">Barcha Kategoriyalar</option>
                        {dataCategory?.length > 0 &&
                            dataCategory.map((item) => (
                                <option value={item.id}>{item.name}</option>
                            ))}
                    </select>
                    <input
                        type="number"
                        className="form-control col-md-4 rounded-3"
                        placeholder="Hujjatingizning narxi"
                        name="price"
                    />

                    <input
                        required
                        type="number"
                        className="form-control col-md-4 rounded-3"
                        placeholder="Hujjatingizga qo'ygan chegirmangiz (%)"
                        name="discount"
                    />
                    <input
                        type="text"
                        className="form-control rounded-3 col-md-4"
                        placeholder="Sizning hujjatingiz uchun yozgan tavsifingiz"
                        name="description"
                    />
                    <span className=" p-0 rounded-3 col-md-8">
                        <WordGenerator />
                    </span>
                    <span className=" p-0 rounded-3 col-md-8">
                        <WordGenerator />
                    </span>
                    <div className="d-flex justify-content-center col-8">
                        <Link href={'/account/MyProducts'}>
                            <button
                                onClick={handleClickPosts}
                                className="btn btn-success py-3 w-25">
                                <span className="fs-4 col-md-5">
                                    Mahsulot qo'shish
                                </span>
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
            <Newsletters layout="container" />
        </PageContainer>
    ) : user?.access ? (
        <Page404 />
    ) : (
        <LoginPage />
    );
};

export default Posts;
