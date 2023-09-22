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
import { Modal, Select } from 'antd';
var parse = require('html-react-parser');
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
    const [categoryName, setCategoryName] = useState('');
    const [discount, setDiscount] = useState(null);
    const [liveFile, setLiveFile] = useState('');
    const [narx, setNarx] = useState('');
    const [chegirmaTek, setChegirmaTek] = useState(true);

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
        const data = [];
        const token = user?.access;
        const ItemsData = await GetRepository.getCategoryLists(token);
        if (ItemsData?.results) {
            for (let i = 0; i < ItemsData?.results?.length; i++) {
                if (ItemsData?.results[i].parent !== null) {
                    data.push(ItemsData?.results[i]);
                }
            }
            setDataCategory(data);
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
                    `Tavsiya etilgan narx: ${
                        respons?.recommended_price !== 0
                            ? addPeriodToThousands(respons?.recommended_price)
                            : ''
                    } `
                );
                setNarx(respons?.recommended_price);
            }
        }
    }

    const handleChangeCategory = async (e) => {
        setCategory_id(e);

        if (e) {
            for (let i = 0; i < dataCategory.length; i++) {
                if (dataCategory[i].id == e) {
                    setCategoryName(dataCategory[i].name);
                }
            }
        }

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
                    `Tavsiya etilgan narx: ${
                        respons?.recommended_price !== 0
                            ? addPeriodToThousands(respons?.recommended_price)
                            : ''
                    } `
                );
                setNarx(respons?.recommended_price);
            }
        }
    };

    async function handleClickPosts(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', fileImgFile);
        formData.append('poster', fileImgPoster);
        formData.append('title', title);
        formData.append('discount', discount || 0);
        formData.append('price', narx);
        formData.append('short_description', Shortdata);
        formData.append('description', Fulldata);
        formData.append('category', category_id);
        for (let i = 0; i < tagSearchResult.length; i++) {
            formData.append('tag', tagSearchResult[i]);
        }
        const patchItems = await PostsRepository.PostsMyProducts(
            formData,
            user?.access
        );
        console.log(patchItems);
        if (patchItems?.status === 201 || patchItems?.status === 200) {
            Router.push('/account/MyProducts');
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: `Siz yangi mahsulot qo'shdingiz`,
            });
        }else{
            const modal = Modal.error({
                centered: true,
                title: 'Xatolik!',
                content: `Siz yangi mahsulot qo'shaolmadingiz!`,
            });
        }
    }

    function LiveImage(e) {
        setFileImgPoster(e.target.files[0]);
        const img = window.URL.createObjectURL(e.target.files[0]);
        setLivePoster(img);
    }

    function LiveFileValue(e) {
        setFileImgFile(e.target.files[0]);
        const img = window.URL.createObjectURL(e.target.files[0]);
        setLiveFile(img);
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

    const chegirma = (foiz) => {
        if (narx) {
            const chegirmaNarx = narx -  ((narx * foiz) / 100) ;
            if (chegirmaNarx < 1000) {
                setChegirmaTek(false);
                console.log('narxx', chegirmaNarx);
            } else {
                setChegirmaTek(true);
            }
        }
    };

    useEffect(() => {
        GetItemsTag();
        setEditorLoaded(true);
        chegirma();
    }, []);

    useEffect(() => {
        GetItemsCategoryLists();
    }, [user?.access]);
console.log('fulldata', Fulldata);
    return user?.role === 'seller' || user?.role === 'customer' ? (
        <PageContainer
            footer={<FooterDefault />}
            title="Recent Viewed Products">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="d-flex container justify-content-center">
                    <form
                        onSubmit={handleClickPosts}
                        style={{ position: 'relative', width: '100%' }}
                        id="FormPostsMyProducts"
                        className="row mx-auto  gap-3 py-5">
                        <h4 className="col-md-12">Hujjat Qo'shish</h4>
                        <label className="add-product-user-image  d-flex flex-column justify-content-center align-content-center form-control col-md-5 pt-4 rounded-3 text-truncate">
                            {livePoster ? (
                                livePoster
                            ) : (
                                <span className="d-flex justify-content-between">
                                    Hujjat posterini yuklash (Rasm)
                                    <i className="fa-solid fa-download"></i>{' '}
                                </span>
                            )}

                            <input type="file" required onChange={(e) => LiveImage(e)} />
                        </label>
                        <label className="add-product-user-image d-flex flex-column justify-content-center align-content-center form-control col-md-5 pt-4 rounded-3 text-truncate">
                            {liveFile ? (
                                liveFile
                            ) : (
                                <span className="d-flex justify-content-between">
                                    {' '}
                                    Hujjatni yuklash - max: 50mb (pdf, doc,
                                    word, excel, zip ){' '}
                                    <i className="fa-solid fa-download"></i>{' '}
                                </span>
                            )}
                            <input
                            required
                                type="file"
                                onChange={(e) => LiveFileValue(e)}
                                accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                            />
                        </label>
                        <div className="rounded-3 col-md-5 p-0 m-0 d-flex flex-column">
                            <Select
                                className="py-2"
                                mode="tags"
                                style={{ width: '100%' }}
                                placeholder="Hujjatga kamida 3 dan 10 tagacha tag qo'shish zarur"
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
                            <option className="mt-2 pt-3" value="">
                                Barcha Kategoriyalar
                            </option>
                            {dataCategory?.length > 0 &&
                                dataCategory.map((item) => (
                                    <option value={item.id}>{item.name}</option>
                                ))}
                        </select>
                        <input
                        required
                            type="text"
                            className="form-control  rounded-3 col-md-5"
                            placeholder="Hujjat nomi"
                            name="title"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <input
                        
                            type={narxNomi ? 'text' : 'number'}
                            className="form-control col-md-5 rounded-3"
                            placeholder="Hujjat narxi"
                            name="price"
                            value={taxminiyNarx}
                            onChange={(e) => (
                                setNarxNomi(false),
                                setTaxminiyNarx(e.target.value),
                                setNarx(e.target.value)
                            )}
                        />
                        <input
                            type="number"
                            className={`form-control col-md-10 rounded-3 ${
                                chegirmaTek ? '' : 'chegirma-xato'
                            } `}
                            placeholder="Chegirma qo'ying (%)"
                            name="price"
                            onChange={(e) => (
                                setDiscount(e.target.value),
                                chegirma(e.target.value)
                            )}
                        />

                        <div className=" p-0 rounded-3 col-md-10">
                            <span>Qisqa tavsif</span>
                            <textarea
                                onChange={(e) => setShortData(e.target.value)}
                                className=" rounded p-3 col-md-12 form-control"
                                name="textarea"
                                rows={'1'}></textarea>
                        </div>
                        <div className=" p-0 rounded-3 col-md-10">
                            <span>Hujjat haqida to'liq ma'umot</span>
                            <CKeditor
                                name="description"
                                onChange={(data) => {
                                    setFullData(data);
                                }}
                                editorLoaded={editorLoaded}
                            />
                        </div>

                        <div className="d-flex justify-content-center col-md-10">
                            <button
                                type="submit"
                                className="btn btn-success py-3 col-md-3">
                                <span className="fs-4">Hujjat qo'shish</span>
                            </button>
                        </div>
                        <div className="mahsulotingiz">
                            <p>Hujjatingiz</p>
                            <span
                                className="fixed-btn"
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight"
                                aria-controls="offcanvasRight">
                                <i className="fa-solid fa-id-card fa-beat fs-1"></i>
                            </span>
                        </div>
                    </form>
                    <div
                        className="offcanvas offcanvas-end"
                        tabindex="-1"
                        id="offcanvasRight"
                        aria-labelledby="offcanvasRightLabel">
                        <div className="offcanvas-header">
                            <h5 id="offcanvasRightLabel" className='fs-xl-3 fs-lg-3 fs-3'>
                                Qo'shayotgan mahsulotingizni ko'rinishi
                            </h5>
                            <button
                                type="button"
                                className="btn-close text-reset"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <div className="card rounded-3 ">
                                <div
                                    className="image"
                                    style={{
                                        backgroundImage: `url(${
                                            livePoster
                                                ? livePoster
                                                : 'https://www.charlotteathleticclub.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png'
                                        })`,
                                    }}></div>
                                <div className="text-start">
                                    <p className="live-card-p">
                                        <strong>Nomi : </strong>{' '}
                                        <span style={{ maxWidth: '150px' }}>
                                            {' '}
                                            {title ? title : "To'ldirilmadi"}
                                        </span>
                                    </p>
                                    <p className="live-card-p">
                                        <strong>Narxi : </strong>
                                        <strong style={{ maxWidth: '150px' }}>
                                            <span>
                                                {' '}
                                                {taxminiyNarx
                                                    ? addPeriodToThousands(
                                                          removePrefix(
                                                              taxminiyNarx
                                                          )
                                                      ) + "so'm"
                                                    : "To'ldirilmadi"}
                                            </span>
                                        </strong>
                                    </p>
                                    <p className="live-card-p">
                                        <strong>Kategoriyasi : </strong>{' '}
                                        <span style={{ maxWidth: '150px' }}>
                                            {categoryName
                                                ? categoryName
                                                : "To'ldirilmadi"}{' '}
                                        </span>
                                    </p>
                                    <p className="live-card-p">
                                        <strong>Chegirmasi : </strong>{' '}
                                        <span style={{ maxWidth: '150px' }}>
                                            {' '}
                                            {discount
                                                ? discount + '%'
                                                : "To'ldirilmadi"}{' '}
                                        </span>
                                    </p>
                                    <p className="live-card-p">
                                        <strong>Taglari : </strong>
                                        {/* <span style={{maxWidth:'150px'}} > </span> */}
                                        {tagSearchResult.length > 0
                                            ? tagSearchResult?.map(
                                                  (item, i) => {
                                                      return (
                                                          <span key={i}>
                                                              #{item}{' '}
                                                          </span>
                                                      );
                                                  }
                                              )
                                            : "To'ldirilmadi"}
                                    </p>
                                    <p className="live-card-p">
                                        <strong>Qisqa tavsif : </strong>{' '}
                                        <span style={{ maxWidth: '150px' }}>
                                            {Shortdata
                                                ? Shortdata
                                                : "To'ldirilmadi"}
                                        </span>
                                    </p>
                                    <p className="live-card-p">
                                        <strong> To'liq ma'lumot : </strong>{' '}
                                        <span style={{ maxWidth: '150px' }}>
                                            {Fulldata
                                                ? parse(Fulldata)
                                                : "To'ldirilmadi"}
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

export default Posts;
