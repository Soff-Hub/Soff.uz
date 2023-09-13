import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Page404 from '~/pages/page/page-404';
import LoginPage from '../login';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import MediaRepository from '~/repositories/MediaRepository';
import GetRepository from '~/reositoriy-admin/GetRepository';
import CKeditor from '../../../components/partials/account/CKeditor';
import { Select } from 'antd';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
var parse = require("html-react-parser");
import { useRouter } from 'next/router';


const productsPatch = () => {
    const Router = useRouter();
    const [fileImgFile, setFileImgFile] = useState('');
    const [fileImgPoster, setFileImgPoster] = useState('');
    const [tagSearchResult, setTagSearchResult] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [tagItems, setTagItems] = useState([]);
    const { products, user } = useSelector((state) => state.auth);
    const [taxminiyNarx, setTaxminiyNarx] = useState('');
    const [category_id, setCategory_id] = useState(null);
    const [discount, setDiscount] = useState(null);
    const [title, setTitle] = useState('');
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [Shortdata, setShortData] = useState('');
    const [Fulldata, setFullData] = useState('');
    const [livePoster, setLivePoster] = useState('');
    const breadCrumb = [
        {
            text: 'Asosiy Sahifa',
            url: '/',
        },
        {
            text: "Mening mahsulotlarim tahrirlash",
        },
    ];

    const Option = Select.Option;

    async function GetItemsCategoryLists() {
        const token = user?.access;
        const ItemsData = await GetRepository.getCategoryLists(token);
        setDataCategory(ItemsData.results);
    }

    async function GetItemsTag() {
        const ItemsData = await MediaRepository.getTagItmes();
        if (ItemsData?.results) {
            setTagItems(ItemsData.results);
        }
    }

    async function handleChange(value) {
        setTagSearchResult(value);
        let arr = [];
        if (value?.length > 0) {
            for (let i = 0; i < tagItems.length; i++) {
                for (let j = 0; j < value.length; j++) {
                    if (tagItems[i].name === value[j]) {
                        arr.push(tagItems[i].id);
                    }
                }
            }
        }
    }

    const children = [];
    for (let i = 0; i < tagItems?.length; i++) {
        children.push(
            <Option key={tagItems[i].name}>{tagItems[i].name}</Option>
        );
    }


    useEffect(() => {
        GetItemsTag();
        setEditorLoaded(true);
    }, []);

    useEffect(() => {
        GetItemsCategoryLists();
    }, [user?.access]);
    const tags = JSON.stringify(tagSearchResult.join(" "));
    
    async function handleClickPostsEdit(e) {
        e.preventDefault()
        const formData = new FormData();
        if (fileImgFile) {
            formData.append('file', fileImgFile);
        }
        if (fileImgPoster) {
            formData.append('poster', fileImgPoster);
        }
        if (title) {
            formData.append('title', title);
        }
        if (taxminiyNarx) {
            formData.append('price', taxminiyNarx);
        }
        if (Shortdata) {
            formData.append('short_description', Shortdata);
        }
        if (Fulldata?.props?.children) {
            formData.append('description', Fulldata?.props?.children);
        }
        if (category_id) {
            formData.append('category', category_id);
        }
        if (tags) {
            formData.append('tags', tags);
        }
        if (discount) {
            formData.append("discount", discount);
        }
        const patchItems = await PatchRepository.getMyProductsPatch(formData, products?.id, user?.access);
        Router.push('/account/MyProducts');
    }

    function LiveImage(e) {
        setFileImgPoster(e.target.files[0]);
        const img = window.URL.createObjectURL(e.target.files[0]);
        setLivePoster(img);
    }

    function addPeriodToThousands(number) {
        const numStr = String(number);

        const [integerPart, decimalPart] = numStr.split('.');

        const formattedIntegerPart = integerPart.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ' '
        );

        const formattedNumber =
            decimalPart !== undefined
                ? `${formattedIntegerPart}.${decimalPart}`
                : formattedIntegerPart;

        return formattedNumber;
    }

    return user?.role === 'seller' || user?.role === 'customer' ? (
        <PageContainer
            footer={<FooterDefault />}
            title="Recent Viewed Products">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="d-flex container justify-content-center">
                    <form
                        onSubmit={handleClickPostsEdit}
                        style={{ position:"relative" }}
                        id="FormPostsMyProducts"
                        className="row mx-auto  gap-3 py-5 w-100">
                        <h4 className="col-md-12">Mahsulot Qo'shish</h4>
                        <label className="add-product-user-image form-control col-md-5 pt-4 rounded-3 text-truncate">
                            {
                                livePoster ? livePoster :
                                " Hujjatingizni saytda ko'rinishi (Rasm)"
                            }
                            <input type="file" onChange={(e) => LiveImage(e)} />
                        </label>
                        <label className="add-product-user-image form-control col-md-5 pt-4 rounded-3 text-truncate">
                         
                         {
                            fileImgFile ? "http://localhost:3000/b30b856b-606c-4001-8bee-4839557c"  : 
                            "Hujjatingizni joylang (File)"
                         }   
                            <input
                                type="file"
                                onChange={(e) =>
                                    setFileImgFile(e.target.files[0])

                                }
                                accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                            />
                        </label>
                        <div className="rounded-3 col-md-5 p-0 m-0 d-flex flex-column">
                            <Select
                                className="py-2"
                                mode="tags"
                                style={{ width: '100%' }}
                                placeholder="Hujjatlaringizga tag qo'shing"
                                onChange={handleChange}
                            >
                                {children}
                            </Select>
                        </div>

                        <select
                            style={{ alignItems: "flex-start" }}
                            className="form-select rounded-3 col-md-5 fs-4"
                            onChange={(e) =>
                                setCategory_id(e.target.value)
                            }>
                            <option value="">Barcha Kategoriyalar</option>
                            {dataCategory?.length > 0 &&
                                dataCategory.map((item) => (
                                    <option value={item.id}>{item.name}</option>
                                ))}
                        </select>
                        <input
                            type="text"
                            className="form-control  rounded-3 col-md-5"
                            placeholder="Hujjatingizning nomi"
                            name="title"
                            onChange={(e) => setTitle(e.target.value)}
                            defaultValue={products?.title}
                        />
                        <input
                            type='number'
                            className="form-control col-md-5 rounded-3"
                            placeholder="Hujjatingizning narxi"
                            name="price"
                            defaultValue={products?.price}
                            onChange={(e) => (
                                setTaxminiyNarx(e.target.value)
                            )}
                        />
                        <input
                            type='number'
                            className="form-control col-md-5 rounded-3"
                            placeholder="Hujjatingizning narxi"
                            name="price"
                            defaultValue={products?.discount}
                            onChange={(e) => (
                                setDiscount(e.target.value)
                            )}
                        />

                        <div className=" p-0 rounded-3 col-md-10">
                            <span>Qisqa tavsif</span>
                            <textarea onChange={(e) => setShortData(e.target.value)} defaultValue={products?.short_description} className=' rounded p-3 col-md-12' name='textarea' rows={"4"}></textarea>
                        </div>
                        <div className=" p-0 rounded-3 col-md-10">
                            <span>Hujjatingiz haqida to'liq ma'umot</span>
                            <CKeditor
                                name="description"
                                onChange={(data) => {
                                    setFullData(parse(data));
                                }}
                                editorLoaded={editorLoaded}
                                defaultValue={products?.description}
                            />
                        </div>

                        <div className="d-flex justify-content-center col-md-10">
                            <button
                                type='submit'
                                className="btn btn-success py-3 col-md-3 ">
                                <span className="fs-4">
                                    Mahsulot qo'shish
                                </span>
                            </button>
                        </div>
                        <span
                                className="mahsulotingiz"
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight"
                                aria-controls="offcanvasRight">
                         <i class="fa-solid fa-id-card fa-beat fs-1"></i>
                            </span>
                    </form>
                    <div
                        class="offcanvas offcanvas-end"
                        tabindex="-1"
                        id="offcanvasRight"
                        aria-labelledby="offcanvasRightLabel">
                        <div class="offcanvas-header pt-5">
                            <h3 id="offcanvasRightLabel" className='m-0 '><span >Tahrirlanayotgan  mahsulotingizni ko'rinishi</span> </h3>
                            <button
                                type="button"
                                class="btn-close text-reset"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                        <div className="card rounded-3 ">
                            <div className="image">
                                <img
                                    className="live-card-image"
                                    src={
                                        livePoster
                                            ? livePoster
                                            : products?.poster_url
                                    }
                                    alt=""
                                />
                            </div>
                            <div className="text-start">
                                <p className="live-card-p">
                                    <span><strong>Nomi</strong>: </span> <span style={{maxWidth:'150px'}} >{title ? title : products?.title}</span>
                                </p>
                                <p className="live-card-p">
                                    <span><strong>Narxi</strong>: </span>
                                    <span style={{maxWidth:'150px'}} >
                                        {taxminiyNarx
                                            ?   addPeriodToThousands(taxminiyNarx)
                                            : addPeriodToThousands(products?.price)}
                                        so'm
                                    </span>
                                </p>
                                <p className="live-card-p">
                                    <span><strong>Teglari</strong>: </span>
                                    <span style={{maxWidth:'150px'}} >
                                       {
                                        tags ? tags : "Teg qo'shing"
                                       }
                                    </span>
                                </p>
                                <p className="live-card-p">
                                    <span><strong>Kategoriya</strong>: </span>
                                    <span style={{maxWidth:'150px'}} >
                                       {
                                       category_id ? category_id : "Kategoriya qo'shing"
                                       }
                                    </span>
                                </p>
                                <p className="live-card-p">
                                    <span><strong>Chegirma</strong>: </span>
                                    <span style={{maxWidth:'150px'}} >
                                       {
                                       discount ? discount : products?.discount 
                                       }
                                       %
                                    </span>
                                </p>
                                <p className="live-card-p">
                                    <span><strong>Qisqa tavsif</strong>: </span>
                                    <span style={{maxWidth:'150px'}} >
                                       {
                                       Shortdata ? Shortdata : products?.short_description 
                                       }
                                       %
                                    </span>
                                </p>
                                <p className="live-card-p">
                                    <span><strong>Hujjatingiz haqida to'liq ma'umot</strong>: </span>
                                    <span style={{maxWidth:'150px'}} >
                                       {
                                       Fulldata?.props?.children ? Fulldata?.props?.children : products?.description 
                                       }
                                       %
                                    </span>
                                </p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    ) : user?.access ? (
        <Page404 />
    ) : (
        <LoginPage />
    );
};

export default productsPatch;
