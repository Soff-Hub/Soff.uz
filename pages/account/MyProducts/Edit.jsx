import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Page404 from '~/pages/page/page-404';
import LoginPage from '../login';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newsletters from '~/components/partials/commons/Newletters';
import Link from 'next/link';
import MediaRepository from '~/repositories/MediaRepository';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { Modal } from 'antd';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
var parse = require("html-react-parser");


const Edit = () => {
    const { products } = useSelector(state => (state.auth))
    const [fileImgFile, setFileImgFile] = useState('');
    const [fileImgPoster, setFileImgPoster] = useState(null);
    const [categoryNameEdit, setCategoryNameEdit] = useState({});
    const [dataCategory, setDataCategory] = useState([]);
    const [tagItems, setTagItems] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const [tagValue, setTagValue] = useState({});
    const [wordData, setWordData] = useState(null);
    const [wordData1, setWordData1] = useState(null);
    const [price, setPrice] = useState(null);
    const [discount, setDiscount] = useState(null);
    const [title, setTitle] = useState(null);

    async function handleClickEdit() {
        const formData = new FormData()
        formData.append('file', fileImgPoster)
        formData.append('poster', fileImgFile)
        formData.append('title', title)
        formData.append('price', price)
        formData.append('page_count', discount)
        formData.append('short_description', wordData1?.props?.children)
        formData.append('description', wordData?.props?.children)
        formData.append('category', categoryNameEdit)
        formData.append('tag', tagValue)
        const patchItems = await PatchRepository.getMyProductsPatch(formData, products?.id, user?.access)


        const modal = Modal.success({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: `Siz malumotlarni o'zgartirdingiz`,
        });
        modal.update;
    }



    const breadCrumb = [
        {
            text: 'Asosiy Sahifa',
            url: '/',
        },
        {
            text: "Mening mahsulotlarim Qo'shish",
        },
    ];

    const handleChange = (event ,editor) => {
        const data = editor.getData();
        setWordData(parse(data));

      };
      const handleChange1 = (event, editor) => {
        const data = editor.getData();
        setWordData1(parse(data));
      };
      console.log(wordData?.props?.children);

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

    useEffect(() => {
        GetItemsCategory(1);
        GetItemsTag();
    }, []);


    return user?.role === 'seller' || user?.role === 'customer' ? (
        <PageContainer
            footer={<FooterDefault />}
            title="Recent Viewed Products">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <form
                    id="FormPostsMyProducts"
                    className="row mx-auto container gap-3 py-5">
                    <h4>Mahsulotni tahrirlash</h4>
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
                        defaultValue={products?.title}
                        onChange={(e)=>(setTitle(e.target.value))}
                    />

                    <select
                        className="form-select rounded-3 col-md-4 py-4 fs-4"
                        onChange={(e) => setTagValue(e.target.value)}>
                        <option value="">Barcha Teglar</option>
                        {tagItems?.length > 0 &&
                            tagItems.map((item) => (
                                <option value={item.id}>{item.name}</option>
                            ))}
                    </select>

                    <select
                        className="form-select rounded-3 col-md-4 py-4 fs-4"
                        onChange={(e) => setCategoryNameEdit(e.target.value)}>
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
                        defaultValue={products?.price}
                        onChange={(e)=>(setPrice(e.target.value))}
                    />

                    <input
                        required
                        type="number"
                        className="form-control col-md-4 rounded-3"
                        placeholder="Hujjatingizga qo'ygan chegirmangiz (%)"
                        defaultValue={products?.page_count}
                        onChange={(e)=>(setDiscount(e.target.value))}
                    />
                    <span className=" p-0 rounded-3 col-md-8">
                        <CKEditor
                            editor={ClassicEditor}
                            onChange={handleChange}
                        />
                    </span>
                    <span className=" p-0 rounded-3 col-md-8">
                    <CKEditor
                            editor={ClassicEditor}
                            onChange={handleChange1}
                        />
                    </span>
                    <div className="d-flex justify-content-center col-8">
                        <Link href={'/account/MyProducts'}>
                            <button
                                onClick={handleClickEdit}
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

export default Edit;
