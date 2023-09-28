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
import { Modal, Select, Tooltip } from 'antd';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
var parse = require("html-react-parser");
import { useRouter } from 'next/router';


const PostsMyProducts = () => {
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
            text: "Hujjatni tahrirlash",
        },
    ];

    const Option = Select.Option;

    async function GetItemsCategoryLists() {
        const data = [];
        const ItemsData = await GetRepository.getCategoryLists(user?.access);
        if (ItemsData?.results) {
            for (let i = 0; i < ItemsData?.results?.length; i++) {
                if (ItemsData?.results[i].parent !== null) {
                    data.push(ItemsData?.results[i]);
                }
            }
            setDataCategory(data);
        }
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
        if (Fulldata) {
            formData.append('description', Fulldata);
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
        const modal = Modal.success({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: `Siz malumotlarni yangiladingiz`,
        });
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
                    <div className='row w-100 gap-5 ' style={{ alignItems: "flex-start" }}>
                        <form
                            onSubmit={handleClickPostsEdit}
                            style={{ position: "relative" }}
                            id="FormPostsMyProducts"
                            className=" py-5  col-md-8">
                            <h4 className="col-md-12">Hujjatni tahrirlash</h4>
                            <div className='row'>
                                <div className='col-md-4  d-flex justify-content-between p-0 '> <p>Mahsulot nomi: *</p><Tooltip title="Mijozlarga ko’rsatiladigan mahsulotingiz nomini kiritishingiz kerak."  ><i style={{ cursor: "pointer" }} className="fa-regular fa-circle-question px-4 mt-2 "></i></Tooltip></div>
                                <input
                                    type="text"
                                    className="form-control  rounded-3 col-md-8 mb-3 "
                                    name="title"
                                    onChange={(e) => setTitle(e.target.value)}
                                    defaultValue={products?.title}
                                />
                            </div>
                            {/* <div className='row'>
                                <div className='col-md-4 mt-2 d-flex justify-content-between p-0'><p>Mahsulot: *</p> <Tooltip title="Mijozlar to’lov qiglanidan so’ng, yuklab olishlari mumkin bo’lgan fayl. Mahsulotingiz quyidagi turdagi fayl bo’lishi mumkin: .doc va docx, .xlsx, .ppt, .pdf, .jpeg yoki .jpg, .png, .psd, .svg, html, .txt, .mp4, mp3, .zip."  ><i style={{ cursor: "pointer" }} className="fa-regular fa-circle-question px-4 mt-2"></i></Tooltip></div>

                                <label className="add-product-user-image d-flex flex-column justify-content-center col-md-8 align-content-center form-control py-5 rounded-3 text-truncate" style={{backgroundColor:"#F1F1F1", border:"1px dashed green"}}>

                                    {
                                        fileImgFile ? "http://localhost:3000/b30b856b-606c-4001-8bee-4839557c" :
                                            products.file
                                    }
                                    <input
                                        type="file"
                                        onChange={(e) =>
                                            setFileImgFile(e.target.files[0])

                                        }
                                        accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                                    />
                                </label>
                            </div>
                            <div className='row'>
                                <div className='col-md-4 mt-2 d-flex justify-content-between p-0'><p>Mahsulot rasmi:</p> <Tooltip title="Mahsulot rasmini ko’rsatib o’tish juda muhimdir. Mijolaringizni diqqatini tortishda va sizning mahsulotingizga qiziqib kirishlarida katta ro’l o’ynaydi. Kiritmagan holatingizda esa mahsulotingiz turiga qarab tizim sizga variantlar beradi va shu variantlardan birini tanlashingiz mumkin. Lekin mahsulotingiz uchun alohida ishlanga rasm qo’yishingiz tafsiya beriladi."  ><i style={{ cursor: "pointer" }} className="fa-regular fa-circle-question px-4 mt-2"></i></Tooltip> </div>
                                <label className="add-product-user-image d-flex flex-column justify-content-center col-md-8 align-content-center form-control py-5 rounded-3 text-truncate" style={{backgroundColor:"#F1F1F1", border:"1px dashed green"}}>
                                    {
                                        livePoster ? livePoster :
                                            products.poster_url
                                    }
                                    <input type="file" onChange={(e) => LiveImage(e)} />
                                </label>
                            </div> */}

                            <div className="row">
                                <div className='col-md-4 m-0 pt-2 d-flex justify-content-between p-0'><p>Teglar:</p> <Tooltip title="Mos teglarni tanlab qo’yishingiz, bu mahsulotingizni qidiruvlarida birinchilardan bo’lib chiqishiga sabab bo’ladi. Teg tanlang, agar mos teg bo’lmasa, maydoning o’ziga har bir mos teglaringizni kiritib qo’yishingiz mumkin."  ><i style={{ cursor: "pointer" }} className="fa-regular fa-circle-question px-4 mt-2"></i></Tooltip></div>


                                <Select
                                    className=" p-0 col-md-8 mb-3"
                                    mode="tags"
                                    style={{ width: '100%' }}
                                    onChange={handleChange}
                                    defaultValue={products?.tag && products?.tag?.map(item => (item.name))}
                                >
                                    {children}
                                </Select>
                            </div>
                            <div className='row'>
                                <div className='col-md-4 mt-2 d-flex justify-content-between p-0'><p>Kategoriya: *</p> <Tooltip title="Mahsulotingiz uchun mos kategoriyani tanlang."  ><i style={{ cursor: "pointer" }} className="fa-regular fa-circle-question px-4 mt-2"></i></Tooltip></div>

                                <select
                                    style={{ alignItems: "flex-start" }}
                                    className="form-select rounded-3 py-3 fs-4 col-md-8 mb-3"
                                    onChange={(e) =>
                                        setCategory_id(e.target.value)
                                    }>
                                    {dataCategory?.length > 0 &&
                                        dataCategory.map((item) => (
                                            products?.category === item.name ?
                                                <option selected value={item.id}>{item.name}</option>
                                                :
                                                <option value={item.id}>{item.name}</option>

                                        ))}
                                </select>
                            </div>
                            <div className='row'>
                                <div className='col-md-4 mt-2 d-flex justify-content-between p-0'><p>Mahsulot sotish narxi: *</p> <Tooltip title="Mahsulotingiz uchun narx kiriting. Narx kiritish oldi mahsulotingizga o’xshash bo’lgan mahsulotlar narxini ko’rishingiz tafsiya beriladi."  ><i style={{ cursor: "pointer" }} className="fa-regular fa-circle-question px-4 mt-2"></i></Tooltip></div>

                                <input
                                    type='number'
                                    className="form-control  rounded-3 col-md-8 mb-3 "
                                    name="price"
                                    defaultValue={products?.price}
                                    onChange={(e) => (
                                        setTaxminiyNarx(e.target.value)
                                    )}
                                />
                            </div>
                            {/* <div className='row'>
                                <div className='col-md-4 mt-2 d-flex justify-content-between p-0'><p>Mahsulot uchun chegirma:</p> <Tooltip title="Mahsulotingizga vaqtinchalik chegirma qo’yib sotishingiz mumkin. Uning uchun chegirma foizini kiriting. Bu chegirmani hohlagan paytingiz o’chirib qo’yishingiz mumkin."  ><i style={{ cursor: "pointer" }} className="fa-regular fa-circle-question px-4  mt-2"></i></Tooltip></div>

                                <input
                                    type='number'
                                    className="form-control  rounded-3 col-md-8 mb-3"
                                    name="price"
                                    defaultValue={products?.discount}
                                    onChange={(e) => (
                                        setDiscount(e.target.value)
                                    )}
                                />
                            </div> */}

                            <div className="row">
                            <div className='col-md-4 d-flex justify-content-between p-0'><p>Mahsulotning qisqacha tavsifi: *</p> <Tooltip title="Mijozlarga mahsulotingizga qiziqishini ortirish uchun mahsulot haqidagi qisqacha eng muhim bo’lgan tafsiflarni ko’rsatib o’ting."  ><i style={{ cursor: "pointer" }} className="fa-regular fa-circle-question px-4 mt-2"></i></Tooltip></div>


                                <div className='col-md-8 p-0 mb-3 '>
                                    <CKeditor
                                        name="short_description"
                                        onChange={(data) => {
                                            setShortData(data);
                                        }}
                                        editorLoaded={editorLoaded}
                                        value={products?.short_description}

                                    />
                                </div>
                            </div>
                            <div className="row">
                            <div className='col-md-4 d-flex justify-content-between p-0'><p>Mahsulot to’liq tavsifi: *</p> <Tooltip title="Mijozlarga mahsulotingiz haqidagi to’liq ma’lumotni bering. Bu mijozlaringiz mahsulotni sotib olishda ularning ishonchini yanada oshirish uchun xizmat qiladi."  ><i style={{ cursor: "pointer" }} className="fa-regular fa-circle-question px-4 mt-2"></i></Tooltip></div>

                                <div className='col-md-8 p-0  mb-3'>
                                    <CKeditor
                                        name="description"
                                        onChange={(data) => {
                                            setFullData(data);
                                        }}
                                        editorLoaded={editorLoaded}
                                        value={products?.description}

                                    />
                                </div>
                            </div>

                            <div className="d-flex justify-content-end " style={{transform:"translateX(16px)"}}>
                                <button
                                    type='submit'
                                    className="btn btn-success py-3 px-5 ">
                                    <span className="fs-4">
                                        Saqlash <i class="fa-solid fa-floppy-disk mx-2"></i>
                                    </span>
                                </button>
                            </div>
                            <div className="mahsulotingiz" >
                                <span
                                    className='fixed-btn'
                                    type="button"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasRight"
                                    aria-controls="offcanvasRight">
                                    <i className="fa-solid fa-id-card fa-beat fs-1"></i>
                                </span>
                            </div>
                        </form>
                        <div className="card rounded-3 col-md-4 p-3 cardResponsive " style={{ maxWidth: "370px", marginTop: "6rem" }}>
                            <div className="image rounded mb-3" style={{
                                backgroundImage: `url(${livePoster
                                    ? livePoster
                                    : products?.poster_url})`
                            }}>
                            </div>  
                            <div className="text-start">
                                <p className="live-card-p">
                                    <span><strong>Nomi</strong>: </span> <span style={{ maxWidth: '150px' }} >{title ? title : products?.title}</span>
                                </p>
                                <p className="live-card-p">
                                    <span><strong>Narxi</strong>: </span>
                                    <span style={{ maxWidth: '150px' }} >
                                        {taxminiyNarx
                                            ? addPeriodToThousands(taxminiyNarx)
                                            : addPeriodToThousands(products?.price)}
                                        so'm
                                    </span>
                                </p>
                                
                                <p className="live-card-p">
                                    <span><strong>Teglari</strong>: </span>
                                    <span style={{ maxWidth: '150px' }} >
                                        {
                                            products?.tag?.map(item => (<span>#{item.name} </span>))
                                        }
                                    </span>
                                </p>
                                <p className="live-card-p">
                                    <span><strong>Kategoriya</strong>: </span>
                                    <span style={{ maxWidth: '150px' }} >
                                        {
                                            category_id ? category_id : "Kategoriya qo'shing"
                                        }
                                    </span>
                                </p>
                                {/* <p className="live-card-p">
                                    <span><strong>Chegirma</strong>: </span>
                                    <span style={{ maxWidth: '150px' }} >
                                        {
                                            discount ? discount : products?.discount
                                        }
                                        %
                                    </span>
                                </p> */}
                                <p className="live-card-p">
                                    <span><strong>Qisqa tavsif</strong>: </span>
                                    <span style={{ maxWidth: '150px' }} >
                                        {
                                            Shortdata ? parse(Shortdata) : products?.short_description ? parse(products?.short_description) : ""
                                        }

                                    </span>
                                </p>
                                <p className="live-card-p">
                                    <span><strong>Hujjatingiz haqida to'liq ma'umot</strong>: </span>
                                    <span style={{ maxWidth: '150px' }} >
                                        {
                                            Fulldata ? parse(Fulldata) : products?.description ? parse(products?.description) : ""
                                        }

                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        className="offcanvas offcanvas-end"
                        tabindex="-1"
                        id="offcanvasRight"
                        aria-labelledby="offcanvasRightLabel">
                        <div className="offcanvas-header pt-5">
                            <h3 id="offcanvasRightLabel" className='m-0 elh3 '><span >Tahrirlanayotgan  mahsulotingizni ko'rinishi</span> </h3>
                            <button
                                type="button"
                                className="btn-close text-reset"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <div className="card rounded-3 ">
                                <div className="image rounded mb-3" style={{
                                    backgroundImage: `url(${livePoster
                                        ? livePoster
                                        : products?.poster_url})`
                                }}>
                                </div>
                                <div className="text-start">
                                    <p className="live-card-p">
                                        <span><strong>Nomi</strong>: </span> <span style={{ maxWidth: '150px' }} >{title ? title : products?.title}</span>
                                    </p>
                                    <p className="live-card-p">
                                        <span><strong>Narxi</strong>: </span>
                                        <span style={{ maxWidth: '150px' }} >
                                            {taxminiyNarx
                                                ? addPeriodToThousands(taxminiyNarx)
                                                : addPeriodToThousands(products?.price)}
                                            so'm
                                        </span>
                                    </p>
                                    <p className="live-card-p">
                                        <span><strong>Teglari</strong>: </span>
                                        <span style={{ maxWidth: '150px' }} >
                                            {
                                                products?.tag?.map(item => (<span>#{item.name} </span>))
                                            }
                                        </span>
                                    </p>
                                    <p className="live-card-p">
                                        <span><strong>Kategoriya</strong>: </span>
                                        <span style={{ maxWidth: '150px' }} >
                                            {
                                                category_id ? category_id : "Kategoriya qo'shing"
                                            }
                                        </span>
                                    </p>
                                    {/* <p className="live-card-p">
                                        <span><strong>Chegirma</strong>: </span>
                                        <span style={{ maxWidth: '150px' }} >
                                            {
                                                discount ? discount : products?.discount
                                            }
                                            %
                                        </span>
                                    </p> */}
                                    <p className="live-card-p">
                                        <span><strong>Qisqa tavsif</strong>: </span>
                                        <span style={{ maxWidth: '150px' }} >
                                            {
                                                Shortdata ? parse(Shortdata) : products?.short_description ? parse(products?.short_description) : ""
                                            }

                                        </span>
                                    </p>
                                    <p className="live-card-p">
                                        <span><strong>Hujjatingiz haqida to'liq ma'umot</strong>: </span>
                                        <span style={{ maxWidth: '150px' }} >
                                            {
                                                Fulldata ? parse(Fulldata) : products?.description ? parse(products?.description) : ""
                                            }

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

export default PostsMyProducts;
