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
import { Button, Checkbox, Form, Modal, Select, Tooltip, Input, InputNumber } from 'antd';
import { useRouter } from 'next/router';
import Meta from '~/components/shared/headers/Meta';
import { baseUrl } from '~/repositories/Repository';
import VideoFirstPosts from './video-first';
import PostsRepository from '~/reositoriy-admin/PostsRepository';
import { addPeriodToThousands } from '~/components/partials/account/ProductsLists';
import { formatPrice } from './edit-video/[id]';
const { Option } = Select;
const { TextArea } = Input;

const Posts = () => {
    const Router = useRouter();
    const [dataCategory, setDataCategory] = useState([]);   // kategoriya listini olish uchun 
    const [tagItems, setTagItems] = useState([]);   // tagslar listini saqlash uchun
    const [itemsPlayLists, setItemsPlayLists] = useState([]);   // tagslar listini saqlash uchun
    const { user } = useSelector((state) => state.auth);   // user malumotlarini olish uchun reduxdan
    const [editorLoaded, setEditorLoaded] = useState(false);   // CKEditor xatolik bermasligi uchun
    const [livePosterFile, setLivePosterFile] = useState('');   // Asosiy video yuborgandagi qaytgan qiymatni saqlaydi
    const [disabled, setDeisabled] = useState(false); // video yuklangunga qadar loading
    const [free, setFree] = useState(false);  // Video narxini beppul qilish uchun 
    const [freePlay, setFreePlay] = useState(false);  // PlayList narxini beppul qilish uchun 
    const [customePoster, setCustomePoster] = useState(null); // Video posterini olsih uchun 
    const [customePosterPlay, setCustomePosterPlay] = useState(null); // PlayList posterini olsih uchun 
    const [liveProduct, setliveProduct] = useState(null); // Asosiy Video yuklanganda Input qiymatlarini olish
    const [open, setOpen] = useState(false); // Modal ochilishi uchun
    const [openFile, setOpenFile] = useState(false); // Ogohlantirish modali video yuklanmaguncha
    const [loading, setLoading] = useState(false); // Modal ochilishi uchun
    const [loadingPlay, setLoadingPlay] = useState(false); // Modal ochilishi uchun
    const [valuesPlayLists, setvaluesPlayLists] = useState(null); // Modal ochilishi uchun

    const [form] = Form.useForm();
    const [form2] = Form.useForm();

    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: 'Video mahsulot qo’shish',
        },
    ];


    // Video Kategoriyasini olib kelish uchun getFunksiya

    async function GetItemsCategoryLists() {
        const ItemsData = await GetRepository.getAllCategoryListsVideo();
        if (ItemsData) {
            setDataCategory(ItemsData);
        }
    }

    // Video Kategoriyasi bo'yicha qidiruv

    const onSearch = async (value) => {
        const ItemsData = await GetRepository.getAllCategoryListsVideo(value);
        if (ItemsData) {
            setDataCategory(ItemsData);
        }
    };

    // Video Teglarini olib kelish uchun getFunksiya

    async function GetItemsTag() {
        const ItemsData = await MediaRepository.getTagItmesAktive();
        if (ItemsData) {
            setTagItems(ItemsData);
        }
    }

    // Video PlayListslarini olib kelish uchun getFunksiya

    async function GetItemsPlayLists() {
        const ItemsData = await GetRepository.getItemsPlayLists(user?.access)
        if (ItemsData?.results) {
            setItemsPlayLists(ItemsData?.results);
        }
    }

    // Vidoega Play-List qo'shish uchun Post funksiyasi


    const postPlayLists = async (values) => {
        const formData = new FormData();
        const newPrice = parseInt(values.price !== 0 && formatPrice(values?.price));
        formData.append('price', (freePlay || values.price == 0) ? 0 : newPrice); // Video narxi


        formData.append('title', values?.title),
            formData.append('image', customePosterPlay?.poster),
            formData.append('description', values?.description || '')

        try {
            setLoadingPlay(true)
            await PostsRepository.PostsPLaylists(
                formData,
                user?.access
            )
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqiyatli!',
                content: 'Muvaffaqiyatli yaratildi',
            });
            GetItemsPlayLists()
        } catch (error) {
            const modal = Modal.error({
                centered: true,
                title: 'Xatolik!',
                content: error?.response?.data?.msg[0] || error?.message,
            });
        }
        finally {
            setOpen(false)
            setCustomePosterPlay(null)
            setLoadingPlay(false)

        }

    }

    // Videoni yuklash uchun ikkinchi  Post funksiyasi

    async function postOrder(values) {
        if (loading) {
            setOpenFile(true)
        } else {
            setDeisabled(true);
            const formData = new FormData();
            formData.append('document', livePosterFile?.id); // Asosiy video IDsi
            formData.append('title', values?.title); // Video nomi

            if (customePoster?.poster) {
                formData.append('poster', customePoster?.poster); // Video posteri
            }
            const newPrice = parseInt(values?.price !== 0 && formatPrice(values?.price));

            formData.append('price', (free || values?.price == 0) ? 0 : newPrice); // Video narxi
            if (values?.description) {

                formData.append('description', values?.description); // Video haqida to'liq izoh
            }

            // Video kategoriyasi
            const selectedCategory = dataCategory.find(cat => cat.name === values?.category);
            if (selectedCategory) {
                formData.append('category', selectedCategory?.id);
            }

            // playlist
            const selectedPlaylists = itemsPlayLists.find(cat => cat.title === valuesPlayLists);
            if (selectedPlaylists) {
                formData.append('playlist', selectedPlaylists?.id);
            }

            formData.append('tags', JSON.stringify(values?.tags)); // Video taglar listi

            try {
                const response = await fetch(`${baseUrl}seller/video-product-create/`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${user?.access}`,
                    },
                    body: formData,
                });

                if (response.ok) {
                    Router.push('/account/myproducts');
                    Modal.warning({
                        centered: true,
                        title: 'Muvaffaqqiyatli!',
                        content: "Sizning mahsulotingiz muvaffaqqiyatli yuborildi! 24 soat ichida adminlar tomonidan mahsulotingiz 'Tasdiqlangan' dan so'ng sotuvda ko'rishingiz mumkin yoki 'Bekor' qilishinishi ham mumkin",
                    });
                } else {
                    const errorMessage = await response.json();
                    Modal.error({
                        centered: true,
                        title: 'Xatolik!',
                        content: errorMessage?.msg?.map((item, index) => <div key={index}>{item}</div>),
                    });
                    throw new Error(errorMessage?.msg);
                }
                setDeisabled(false);
            } catch (err) {
                console.log(err);
                setDeisabled(false);
            }
            setDeisabled(false);

        }


    }

    //   Videoga rasm yuklash uchun funksiya

    const LivePoster = (images) => {
        if (images) {
            const img = window.URL.createObjectURL(images);
            setCustomePoster({ poster: images, url: img });
        }
    }

    //   PlayListga rasm yuklash uchun funksiya

    const LivePosterPlayLists = (images) => {
        if (images) {
            const img = window.URL.createObjectURL(images);
            setCustomePosterPlay({ poster: images, url: img });
        }
    }

    //  GetItemsTag, setEditorLoaded, GetItemsCategoryLists

    useEffect(() => {
        GetItemsTag();
        setEditorLoaded(true);
        GetItemsCategoryLists();
    }, []);

    useEffect(() => {
        if (user?.access) {
            GetItemsPlayLists()
        }
    }, [user?.access]);


    //  Forma ichidagi Inputlarga valueni tushirish uchun 

    useEffect(() => {
        if (liveProduct?.name) {
            form.setFieldsValue({
                title: liveProduct?.name
            });
        }
    }, [liveProduct, form]);

    useEffect(() => {
        if (open) {
            form2.setFieldsValue({
                description: null,
                image: null,
                price: null,
                title: null
            });
        }
    }, [open, form2]);



    return user?.role === 'seller' ? (
        <PageContainer
            footer={<FooterDefault />}
            title="Recent Viewed Products">
            <div className="ps-page--my-account">
                <Meta title={'Soff | Yangi mahsulot yaratish'} />
                <BreadCrumb breacrumb={breadCrumb} />

                {
                    liveProduct?.name ?
                        <div className="d-flex container justify-content-center ">

                            <div
                                className="row m-0  gap-3 pt-5"
                                style={{ alignItems: 'flex-start' }}>

                                <h5 className="p-0  col-md-12 fs-4  text-warning fw-semibold lh-base">
                                    {' '}
                                    <i className="fa-solid fa-triangle-exclamation"></i>{' '}
                                    Hurmatli Sotuvchi mahsulot yuklayotganingizda
                                    mahsulot o'zingizni shaxsiy mahsulotingiz ekanligiga
                                    ishonch hosil qiling. Aks holda o'sha
                                    mahsulotingizni sotuvda ko'rinmasligi va profilingiz
                                    bloklab qo'yilishi mumkin. E'tiborli bo'ling!
                                </h5>

                                <div className='row  p-0 pr-3 mb-5 ' style={{ overflowY: "auto", height: "60vh" }}>

                                    <Form
                                        form={form}
                                        onFinish={postOrder}
                                        className="col-md-7 pl-0 "
                                        layout='vertical'


                                    >
                                        <Form.Item
                                            label={
                                                <div className='d-flex align-items-center gap-3'>
                                                    <span>Video nomi</span>
                                                    <Tooltip title="Mijozlarga ko’rsatiladigan mahsulotingiz nomini kiritishingiz kerak.">
                                                        <i
                                                            style={{
                                                                cursor: 'pointer',
                                                            }}
                                                            className="fa-regular fa-circle-question "></i>
                                                    </Tooltip>
                                                </div>
                                            }
                                            name="title"
                                            className='col-md-12 mb-2 '
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Video nomi majburiy',
                                                },
                                            ]}
                                        >
                                            <Input
                                                style={{ height: "45.4px" }}
                                                name='title'
                                                placeholder="Video nomi"
                                                defaultValue={liveProduct?.name}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label={
                                                <div className='d-flex align-items-center gap-3'>
                                                    <span>Video poster rasmi</span>
                                                    <Tooltip title="Mijozlarni mahsulotingizga e'tiborini tortib qiziqtirish uchun video poster yuklang. U posterni maxsus yasashingiz yoki videoingizni eng qiziq bo'lgan qismini screenshot qilib yuklashingiz mumkin bo'ladi.">
                                                        <i
                                                            style={{
                                                                cursor: 'pointer',
                                                            }}
                                                            className="fa-regular fa-circle-question "></i>
                                                    </Tooltip>
                                                </div>
                                            }
                                            name={"poster"}
                                            className='col-md-12 mb-2 '

                                        >

                                            <label
                                                style={{
                                                    display: 'inline-block',
                                                    width: '100%',
                                                    height: '45.4px',
                                                    border: '1px solid #ccc',
                                                    padding: '10px 15px',
                                                    boxSizing: 'border-box',
                                                    textAlign: 'center',
                                                    cursor: 'pointer',
                                                    backgroundColor: '#fff',
                                                    borderRadius: "5px"
                                                }}
                                            >

                                                {
                                                    (customePoster?.url) ?
                                                        <span>Video poster rasm yuklangan <i className="fa-solid fa-circle-check text-success mt-2"></i></span>
                                                        :
                                                        <span><i className="fa-solid fa-cloud-arrow-up text-success mx-2 fs-3"></i> Video poster rasmini yuklash uchun rasm tanlang</span>
                                                }
                                                <Input

                                                    name='poster'
                                                    accept='image/*'
                                                    onChange={(e) => LivePoster(e.target.files[0])}
                                                    type='file'
                                                    style={{
                                                        position: 'absolute',
                                                        width: '1px',
                                                        height: '1px',
                                                        overflow: 'hidden',
                                                        clip: 'rect(0, 0, 0, 0)',
                                                        border: '0'
                                                    }}
                                                />
                                            </label
                                            >

                                        </Form.Item>

                                        <Form.Item
                                            label={
                                                <div className='d-flex align-items-center gap-3'>
                                                    <span>Video narxi</span>
                                                    <Tooltip title="Mahsulotingiz uchun narx kiriting. Narx kiritish oldi mahsulotingizga o’xshash bo’lgan mahsulotlar narxini ko’rishingiz tafsiya beriladi.">
                                                        <i
                                                            style={{
                                                                cursor: 'pointer',
                                                            }}
                                                            className="fa-regular fa-circle-question "></i>
                                                    </Tooltip>
                                                </div>
                                            }
                                            name="price"
                                            className='col-md-12 mb-2'
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Video  narx majburiy',
                                                },
                                            ]}
                                        >
                                            <div className='d-flex align-items-center gap-3 '>

                                                <InputNumber
                                                    style={{ height: "45.4px" }}
                                                    name='price'
                                                    disabled={free}
                                                    placeholder="Video  narxi"
                                                    className='w-100 py-2'
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                                                    onKeyPress={(e) => {
                                                        if (!/[0-9]/.test(e.key)) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                />
                                                <Checkbox
                                                    defaultChecked={free}
                                                    className=" d-flex align-items-center justify-content-start px-0 py-2"
                                                    onChange={() => setFree(!free)}>
                                                    <strong className='text-success'>Bepul</strong>
                                                </Checkbox>
                                            </div>

                                        </Form.Item>

                                        <Form.Item
                                            label={
                                                <div className='d-flex align-items-center gap-3'>
                                                    <span>Video kategoriyasi</span>
                                                    <Tooltip title="Mahsulotingiz uchun mos kategoriyani tanlang.">
                                                        <i
                                                            style={{
                                                                cursor: 'pointer',
                                                            }}
                                                            className="fa-regular fa-circle-question "></i>
                                                    </Tooltip>
                                                </div>
                                            }
                                            name="category"
                                            className='col-md-12 mb-2'
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Video kategoriyasi majburiy',
                                                },
                                            ]}
                                        >
                                            <Select
                                                name="category"
                                                mode="select"
                                                showSearch
                                                allowClear
                                                placeholder="Video kategoriyasi"
                                                style={{
                                                    width: '100%',
                                                    height: '45.4px',
                                                }}
                                                onSearch={onSearch}>
                                                {
                                                    dataCategory?.length > 0 && dataCategory?.map(item => (
                                                        <Option key={item?.name}  >{item?.name}</Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            label={
                                                <div className='d-flex align-items-center gap-3'>
                                                    <span>Video teglari</span>
                                                    <Tooltip title="Mos teglarni tanlab qo’yishingiz, bu mahsulotingizni qidiruvlarida birinchilardan bo’lib chiqishiga sabab bo’ladi. Teg tanlang, agar mos teg bo’lmasa, maydoning o’ziga har bir mos teglaringizni kiritib qo’yishingiz mumkin.">
                                                        <i
                                                            style={{
                                                                cursor: 'pointer',
                                                            }}
                                                            className="fa-regular fa-circle-question "></i>
                                                    </Tooltip>
                                                </div>
                                            }
                                            name="tags"
                                            className='col-md-12 mb-2'
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Video teglari majburiy',
                                                },
                                            ]}
                                        >
                                            <Select
                                                mode="tags"
                                                placeholder="Video teglari "
                                                style={{ width: '100%', height: "45.4px" }}
                                            >
                                                {
                                                    tagItems?.length > 0 && tagItems?.map(item => (
                                                        <Option key={item?.name}>{item?.name}</Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>

                                        <Form.Item

                                            label={
                                                <div className='d-flex align-items-center gap-3'>
                                                    <span>Play Listlar</span>
                                                    <Tooltip title="Mos teglarni tanlab qo’yishingiz, bu mahsulotingizni qidiruvlarida birinchilardan bo’lib chiqishiga sabab bo’ladi. Teg tanlang, agar mos teg bo’lmasa, maydoning o’ziga har bir mos teglaringizni kiritib qo’yishingiz mumkin.">
                                                        <i
                                                            style={{
                                                                cursor: 'pointer',
                                                            }}
                                                            className="fa-regular fa-circle-question "></i>
                                                    </Tooltip>
                                                </div>
                                            }
                                            className='col-md-12 mb-2'
                                        >
                                            <div className='d-flex gap-3 '>
                                                <Select
                                                    mode="select"
                                                    placeholder="Mavjud playlistlar"
                                                    style={{
                                                        width: '100%',
                                                        height: '45.4px',
                                                    }}
                                                    onChange={(e) => setvaluesPlayLists(e)}

                                                >
                                                    {
                                                        itemsPlayLists?.length > 0 && itemsPlayLists?.map(item => (
                                                            <Option key={item?.title} >
                                                                <div className='d-flex justify-content-between align-items-center'>
                                                                    <div className='d-flex gap-2 align-items-center'>
                                                                        <img
                                                                            style={{
                                                                                objectFit: "cover"
                                                                            }}
                                                                            height={25}
                                                                            width={25}
                                                                            src={item?.image}
                                                                            alt="images"
                                                                        />
                                                                        <span>{item?.title}</span>
                                                                    </div>
                                                                    <span>
                                                                        {item?.price > 0 ?
                                                                            addPeriodToThousands(Number(item?.price)) + ' ' + "so'm" :
                                                                            "Bepul"

                                                                        }

                                                                    </span>
                                                                </div>
                                                            </Option>
                                                        ))
                                                    }
                                                </Select>
                                                <span
                                                    onClick={() => setOpen(true)}
                                                    style={{
                                                        width: '20%',
                                                        height: '44px',

                                                    }}

                                                    className='btn
                                                rounded-3
                                                 btn-outline-success
                                                 d-flex align-items-center justify-content-center gap-2
                                                 '>
                                                    <i className="fa-solid fa-plus fs-4"></i> <span className='fs-4'>Yaratish</span>
                                                </span>
                                            </div>
                                        </Form.Item>

                                        <Form.Item
                                            className="rounded-5 col-md-12 mb-2"
                                            name={"description"}
                                            label={
                                                <div className=" d-flex align-items-center gap-3 ">
                                                    <p className='m-0'>Mahsulot to’liq tavsifi: </p>{' '}
                                                    <Tooltip title="Mijozlarga mahsulotingiz haqidagi to’liq ma’lumotni bering. Bu mijozlaringiz mahsulotni sotib olishda ularning ishonchini yanada oshirish uchun xizmat qiladi.">
                                                        <i
                                                            style={{
                                                                cursor: 'pointer',
                                                            }}
                                                            className="fa-regular fa-circle-question "></i>
                                                    </Tooltip>
                                                </div>
                                            }
                                        >


                                            <CKeditor

                                                editorLoaded={editorLoaded}
                                            />
                                        </Form.Item>

                                        <Form.Item className="col-md-12 d-flex justify-content-end m-0  my-4">

                                            <Button
                                                loading={disabled}
                                                htmlType="submit"
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
                                                    Yaratish
                                                </span>
                                            </Button>
                                        </Form.Item>

                                    </Form>

                                    <div className='col-md-5 m-0 p-0 ' style={{
                                        position: "sticky",
                                        alignSelf: "flex-start",
                                        top: "30px"
                                    }}>
                                        <div
                                            className='video_iframe'

                                            style={{
                                                backgroundSize: 'cover',
                                                borderRadius: '10px',
                                                backgroundImage: `url("${customePoster?.url || '/static/img/soff/lll.png'}")`,
                                                padding: '0',
                                                maxHeight: '300px',
                                                overflow: 'hidden',
                                                position: 'relative',
                                                width: '100%',
                                                height: '100%'
                                            }}


                                        >

                                            <video
                                                className=" p-0 "
                                                controls
                                                poster={customePoster?.url}
                                                preload="none"
                                                src={liveProduct?.video}
                                                style={{
                                                    width: "100%",
                                                    maxHeight: '300px',
                                                    height: "100%",
                                                    position: 'relative',
                                                    zIndex: 2
                                                }}
                                            >

                                            </video>
                                        </div>


                                        {liveProduct?.name && <div className='px-4 py-2'>
                                            <p>{liveProduct?.name}</p>
                                        </div>}
                                    </div>


                                </div>

                            </div>

                        </div>
                        :
                        <VideoFirstPosts
                            setliveProduct={setliveProduct}
                            setLivePosterFile={setLivePosterFile}
                            setLoading={setLoading}
                            setOpenFile={setOpenFile}
                        />
                }

                {/* Play List yaratish uchun playLists modali */}

                <Modal
                    title="Yangi pleylist yaratish"
                    width={550}
                    centered
                    open={open}
                    onOk={() => setOpen(false)}
                    okText="Yopish"
                    footer={null}


                    onCancel={() => setOpen(false)}>
                    <Form
                        form={form2}
                        onFinish={postPlayLists}
                        className="w-100 mt-5"
                        layout='vertical'
                    >
                        <Form.Item
                            label={'Rasm'}
                            name={"poster"}
                            className='col-md-12 mb-2 p-0'
                            rules={[
                                {
                                    required: customePosterPlay?.url ? false : true,
                                    message:
                                        'Rasm kiritish majburiy',
                                },
                            ]}
                        >

                            <label
                                style={{
                                    display: 'inline-block',
                                    width: '100%',
                                    height: '45.4px',
                                    border: '1px solid #ccc',
                                    padding: '10px 15px',
                                    boxSizing: 'border-box',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    backgroundColor: '#fff',
                                    borderRadius: "5px"
                                }}
                            >

                                {
                                    (customePosterPlay?.url) ?
                                        <span>Video poster rasm yuklangan <i className="fa-solid fa-circle-check text-success mt-2"></i></span>
                                        :
                                        <span><i className="fa-solid fa-cloud-arrow-up text-success mx-2 fs-3"></i> Video poster rasmini yuklash uchun rasm tanlang</span>
                                }
                                <Input

                                    name='poster'
                                    accept='image/*'
                                    onChange={(e) => LivePosterPlayLists(e.target.files[0])}
                                    type='file'
                                    style={{
                                        position: 'absolute',
                                        width: '1px',
                                        height: '1px',
                                        overflow: 'hidden',
                                        clip: 'rect(0, 0, 0, 0)',
                                        border: '0'
                                    }}
                                />
                            </label
                            >

                        </Form.Item>
                        <Form.Item
                            label='Nomi (majburiy)'
                            name="title"
                            className=' mb-3 '
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Nomi kiritish majburiy',
                                },
                            ]}
                        >
                            <Input
                                name='title'
                                placeholder="Nomlang"

                            />
                        </Form.Item>

                        <Form.Item
                            label={'Narxi'}
                            name="price"
                            className='col-md-12 mb-2 p-0'
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Video  narx majburiy',
                                },
                            ]}
                        >
                            <div className='d-flex align-items-center gap-3 '>

                                <InputNumber
                                    style={{ height: "45.4px" }}

                                    disabled={freePlay}
                                    placeholder="Narxi"
                                    className='w-100 py-2'
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                                    onKeyPress={(e) => {
                                        if (!/[0-9]/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                                <Checkbox
                                    defaultChecked={freePlay}
                                    className=" d-flex align-items-center justify-content-start px-0 py-2"
                                    onChange={() => setFreePlay(!freePlay)}>
                                    <strong className='text-success'>Bepul</strong>
                                </Checkbox>
                            </div>

                        </Form.Item>

                        <Form.Item
                            label='Tavsif'
                            name='description'
                            className='mb-3'
                        >
                            <TextArea placeholder='Tavsif kiriting' rows={4}></TextArea>
                        </Form.Item>

                        <Form.Item
                            className='m-0 mt-3 d-flex justify-content-end w-100'
                        >
                            <Button
                                loading={loadingPlay}
                                className='px-5'
                                type='primary'
                                htmlType='submit'
                            >Yaratish</Button>
                        </Form.Item>
                    </Form>

                </Modal>

                {/* Vidoe yuklangunga qadar ogohlantirish modali */}

                <Modal
                    title={null}
                    width={550}
                    centered
                    open={openFile}
                    onOk={() => setOpenFile(false)}
                    okText="Yopish"
                    footer={null}


                    onCancel={() => setOpenFile(false)}>

                    <div>

                        <div
                            className=" "
                            style={{
                                height: '30vh',
                                display: 'grid',
                                placeContent: 'center',
                            }}>
                            <div
                                className="spinner-border text-danger "
                                role="status"
                                style={{ width: '110px', height: '110px' }}>
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        </div>
                        <p className='text-danger fw-medium mb-1 text-center fs-3'>Asosiy video yuklanmoqda...</p>
                        <h5 className='fw-medium text-center text-danger '>
                            Iltimos Asosiy Video yuklanmaguncha
                            Sahifani yangilamang va yopmang!
                        </h5>
                    </div>

                </Modal>

            </div>
        </PageContainer >
    ) : user?.access ? (
        <Page404 />
    ) : (
        <LoginPage />
    );
};

export default Posts;
