import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Page404 from '~/pages/page/page-404';
import PostsRepository from '~/reositoriy-admin/PostsRepository';
import LoginPage from '../login';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import MediaRepository from '~/repositories/MediaRepository';
import GetRepository from '~/reositoriy-admin/GetRepository';
import CKeditor from '../../../components/partials/account/CKeditor';
import { Select } from 'antd';
var parse = require("html-react-parser");
import { useRouter } from 'next/router';



const Posts = () => {
    const Router = useRouter();
    const [fileImgFile, setFileImgFile] = useState('');
    const [fileImgPoster, setFileImgPoster] = useState('');
    const [tagSearchResult, setTagSearchResult] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [tagItems, setTagItems] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const [taxminiyNarx, setTaxminiyNarx] = useState('');
    const [category_id, setCategory_id] = useState(null);
    const [narxNomi, setNarxNomi] = useState(true);
    const [title, setTitle] = useState('');
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [Shortdata, setShortData] = useState('');
    const [Fulldata, setFullData] = useState('');
    const [livePoster, setLivePoster] = useState('');
    const [categoryName, setCategoryName] = useState('')
    const [discount, setDiscount] = useState(null);


    const breadCrumb = [
        {
            text: 'Asosiy Sahifa',
            url: '/',
        },
        {
            text: "Mening mahsulotlarim Qo'shish",
        },
    ];

    async function GetItemsCategoryLists() {
        const token = user?.access;
        const ItemsData = await GetRepository.getCategoryLists(token);
        if (ItemsData?.results) {
            setDataCategory(ItemsData.results);
        }
    }
    const Option = Select.Option;

    async function GetItemsTag() {
        const ItemsData = await MediaRepository.getTagItmes();
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

    function removePrefix(text) {
        const prefix = 'Tavsiya etilgan narx: ';
        if (text.startsWith(prefix)) {
            return text.slice(prefix.length);
        }
        return text;
    }

    async function handleChange(value) {
        console.log('value', value);
        if (value.length <= 3) {
            setTagSearchResult(value);
        }
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

        const data = {
            category_id: category_id,
            tag_id: arr,
        };

        if (value?.length > 0 && category_id !== null) {
            const respons = await PostsRepository.TaxminiyNarxOlish(
                data,
                user?.access
            );
            if (respons?.recommended_price !== undefined) {
                setTaxminiyNarx(
                    'Tavsiya etilgan narx: ' + respons?.recommended_price
                );
            }
        }
    }


console.log(tagSearchResult);
    
    const handleChangeCategory = async (e) => {
        setCategory_id(e);

        let arr = [];
        if (tagSearchResult?.length > 0) {
            for (let i = 0; i < tagItems.length; i++) {
                for (let j = 0; j < tagSearchResult.length; j++) {
                    if (tagItems[i].name === tagSearchResult[j]) {
                        arr.push(tagItems[i].id);
                    }
                }
            }
        }

        const data = {
            category_id: e,
            tag_id: arr,
        };

        if (tagSearchResult?.length > 0 && e !== null) {
            const respons = await PostsRepository.TaxminiyNarxOlish(
                data,
                user?.access
            );
            if (respons?.recommended_price !== undefined) {
                setTaxminiyNarx(
                    'Tavsiya etilgan narx: ' + respons?.recommended_price
                );
            }
        }


        if (dataCategory) {
            for (let i = 0; i < dataCategory.length; i++) {
                if (dataCategory[i].id == e) {
                    setCategoryName(dataCategory[i].name)
                }
            }
        }
       
    };

    async function handleClickPosts(e) {
        e.preventDefault()

        const formData = new FormData();
        formData.append('file', fileImgFile);
        formData.append('poster', fileImgPoster);
        formData.append('title', title);
        formData.append('discount', discount || 0);
        formData.append(
            'price',
            taxminiyNarx ? removePrefix(taxminiyNarx) : taxminiyNarx
        );
        formData.append('short_description', Shortdata);
        formData.append('description', Fulldata?.props?.children);
        formData.append('category', category_id);
        for (let i = 0; i < tagSearchResult.length; i++) {
            formData.append('tag', tagSearchResult[i]);
        }
        const patchItems = await PostsRepository.PostsMyProducts(
            formData,
            user?.access
        );
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

    useEffect(() => {
        GetItemsTag();
        setEditorLoaded(true);
    }, []);

    useEffect(() => {
        GetItemsCategoryLists();
    }, [user?.access]);

  

    

    return user?.role === 'seller' || user?.role === 'customer' ? (
        <PageContainer
            footer={<FooterDefault />}
            title="Recent Viewed Products">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="d-flex container justify-content-center">
                    <form
                    onSubmit={handleClickPosts}
                        style={{position:'relative'}}
                        id="FormPostsMyProducts"
                        className="row mx-auto  gap-3 py-5">
                        <h4 className="col-md-12">Mahsulot Qo'shish</h4>
                        <label className="add-product-user-image form-control col-md-5 pt-4 rounded-3">
                            Hujjatingizni saytda ko'rinishi (Rasm)
                            <input type="file" onChange={(e) => LiveImage(e)} />
                        </label>
                        <label className="add-product-user-image form-control col-md-5 pt-4 rounded-3">
                            Hujjatingizni joylang (File)
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
                                onChange={handleChange}>
                                {children}
                            </Select>
                        </div>

                        <select
                            style={{ alignItems: 'center' }}
                            className="form-select form-control rounded-3 col-md-5 fs-4"
                            onChange={(e) =>
                                handleChangeCategory(e.target.value)
                            }>
                            <option className='mt-2 pt-3' value="">Barcha Kategoriyalar</option>
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
                        />
                        <input
                            type={narxNomi ? 'text' : 'number'}
                            className="form-control col-md-5 rounded-3"
                            placeholder="Hujjatingizning narxi"
                            name="price"
                            value={
                                taxminiyNarx !== null ||
                                taxminiyNarx !== undefined ||
                                removePrefix(taxminiyNarx) !== null
                                    ? taxminiyNarx
                                    : ''
                            }
                            onChange={(e) => (
                                setNarxNomi(false),
                                setTaxminiyNarx(e.target.value)
                            )}
                        />
                           <input
                            type='number'
                            className="form-control col-md-5 rounded-3"
                            placeholder="Chegirma qo'ying (%)"
                            name="price"
                            onChange={(e) => (
                                setDiscount(e.target.value)
                            )}
                        />

                        <div className=" p-0 rounded-3 col-md-10">
                            <span>Qisqa tavsif</span>
                            <textarea
                                onChange={(e) => setShortData(e.target.value)}
                                className=" rounded p-3 col-md-12"
                                name="textarea"
                                rows={'4'}></textarea>
                        </div>
                        <div className=" p-0 rounded-3 col-md-10">
                            <span>Hujjatingiz haqida to'liq ma'umot</span>
                            <CKeditor
                                name="description"
                                onChange={(data) => {
                                    setFullData(parse(data));
                                }}
                                editorLoaded={editorLoaded}
                            />
                        </div>

                        <div className="d-flex justify-content-center col-10">
                           
                                <button
                                   type='submit'
                                    className="btn btn-success py-3 w-25">
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
                                <i class="fa-solid fa-image fs-1"></i>
                            </span>
                    </form>
                    {/* <div className=" col-md-3 pt-4 ms-5 ">
                        <h4 className='live-card_title'>Sizning qo'shayotgan mahsulotingiz :</h4>
                        <div className="card rounded-3 ">
                            <div className="image">
                                <img
                                    className="live-card-image"
                                    src={
                                        livePoster
                                            ? livePoster
                                            : 'https://www.charlotteathleticclub.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png'
                                    }
                                    alt=""
                                />
                            </div>
                            <div className="text-start">
                                <p className="live-card-p">
                                    <span>Nomi: </span> <span style={{maxWidth:'150px'}} > {title}</span>
                                </p>
                                <p className="live-card-p">
                                    <span>Narxi: </span>{' '}
                                    <span style={{maxWidth:'150px'}} >
                                        {taxminiyNarx
                                            ?   addPeriodToThousands(removePrefix(taxminiyNarx))
                                            : ''}
                                        so'm
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div> */}

                    <div
                        class="offcanvas offcanvas-end"
                        tabindex="-1"
                        id="offcanvasRight"
                        aria-labelledby="offcanvasRightLabel">
                        <div class="offcanvas-header">
                            <h5 id="offcanvasRightLabel">Qo'shayotgan mahsulotingizni ko'rinishi</h5>
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
                                            : 'https://www.charlotteathleticclub.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png'
                                    }
                                    alt=""
                                />
                            </div>
                            <div className="text-start">
                                <p className="live-card-p">
                                    <span>Nomi: </span> <span style={{maxWidth:'150px'}} > {title}</span>
                                </p>
                                <p className="live-card-p">
                                    <span>Narxi: </span>{' '}
                                    <span style={{maxWidth:'150px'}} >
                                        {taxminiyNarx
                                            ?   addPeriodToThousands(removePrefix(taxminiyNarx))
                                            : ''}
                                        so'm
                                    </span>
                                </p>
                                {/* <p className="live-card-p">
                                    <span>Kategoriyasi: </span> <span style={{maxWidth:'150px'}} >{categoryName} </span>
                                </p> */}
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

export default Posts;
