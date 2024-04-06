import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Meta from '~/components/shared/headers/Meta';
import Page404 from '~/pages/page/page-404';
import LoginPage from '../login';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Link from 'next/link';
import { Button } from "antd"
import axios from 'axios'
import { baseUrl } from '~/repositories/Repository';

const Posts = () => {
    const { user } = useSelector((state) => state.auth);
    const [category, setCatgeory] = useState([])
    const [loading, setLoading] = useState(false)

    const breadCrumb = [
        {
            text: 'Asosiy Sahifa',
            url: '/',
        },
        {
            text: 'Mahsulot qo’shishni tanlash',
        },
    ];

    async function getCategorLists() {
        const endPoint = "seller/categories-for-choice/"
        try {
            setLoading(false)
            const response = await axios.get(baseUrl + endPoint);
            if (response?.data) {
                setCatgeory(response?.data)
            }
        } catch (error) {
            console.log("Kategoriyalar olib kelishda xatolik", error);
        }
        setLoading(true)

    }

    useEffect(() => {
        getCategorLists()
    }, [])



    return user?.role === 'seller' || user?.role === 'customer' ? (
        <PageContainer
            footer={<FooterDefault />}
            title="Recent Viewed Products">
            <div className="ps-page--my-account">
                <Meta title={'Soff | Yangi mahsulot yaratishni tanlash'} />
                <BreadCrumb breacrumb={breadCrumb} />

                {
                    !loading ? <div
                        className="ps-product--detail ps-product--fullwidth"
                        style={{
                            height: '400px',
                            display: 'grid',
                            placeContent: 'center',
                        }}>
                        <div
                            className="spinner-border "
                            role="status"
                            style={{
                                width: '150px',
                                height: '150px',
                            }}>
                            <span className="visually-hidden">
                                Loading...
                            </span>
                        </div>
                    </div> :

                        <>
                            <h2 className='text-center products_title'>Mahsulot turini tanlang</h2>
                            <div className="product-selection" >

                                <div className="select-col  ">
                                    <Link href="/account/myproducts/posts">
                                        <a>
                                            <div className="select-card file">
                                                <div className='d-flex flex-column'>
                                                    <i className="fa-regular fa-folder-open"></i>
                                                    <span>File</span>
                                                </div>

                                                <div className='slider'>
                                                    <div className='slide-track'>
                                                        {
                                                            Array(40).fill(0).map((_) => (
                                                                category?.docs?.slice(0, Math.floor(category?.docs?.length / 3))?.map((item, index) => (
                                                                    <Button key={index} >
                                                                        {item?.name}
                                                                    </Button>

                                                                ))
                                                            ))
                                                        }


                                                    </div>

                                                </div>

                                                <div className='slider2'>
                                                    <div className='slide-track2'>
                                                        {
                                                            Array(40).fill(0).map((_) => (
                                                                category?.docs?.slice((Math.floor(category?.docs?.length / 3) + 1), (Math.floor(category?.docs?.length / 3)) * 2).map((item, index) => (
                                                                    <Button key={index} >
                                                                        {item?.name}
                                                                    </Button>

                                                                ))
                                                            ))
                                                        }

                                                    </div>
                                                </div>

                                                <div className='slider3'>
                                                    <div className='slide-track3'>
                                                        {
                                                            Array(40).fill(0).map((_) => (
                                                                category?.docs?.slice(((Math.floor(category?.docs?.length / 3) * 2) + 1), (Math.floor(category?.docs?.length / 3)) * 3)?.map((item, index) => (
                                                                    <Button key={index} >
                                                                        {item?.name}
                                                                    </Button>

                                                                ))
                                                            ))
                                                        }

                                                    </div>

                                                </div>
                                            </div>
                                        </a>
                                    </Link>
                                </div>
                                <div className=" select-col  ">
                                    <Link href="/account/myproducts/audio-posts">
                                        <a>
                                            <div className="select-card file">
                                                <div className='d-flex flex-column '>
                                                    <i className="fa-solid fa-music"></i>
                                                    <span> Audio</span>
                                                </div>
                                                <div className='slider'>
                                                    <div className='slide-track'>
                                                        {
                                                            Array(40).fill(0).map((_) => (
                                                                category?.audio?.slice(0, Math.floor(category?.audio?.length / 3))?.map((item, index) => (
                                                                    <Button key={index} >
                                                                        {item?.name}
                                                                    </Button>

                                                                ))
                                                            ))
                                                        }

                                                    </div>

                                                </div>

                                                <div className='slider2'>
                                                    <div className='slide-track2'>
                                                        {
                                                            Array(40).fill(0).map((_) => (
                                                                category?.audio?.slice((Math.floor(category?.audio?.length / 3) + 1), (Math.floor(category?.audio?.length / 3)) * 2).map((item, index) => (
                                                                    <Button key={index} >
                                                                        {item?.name}
                                                                    </Button>

                                                                ))
                                                            ))
                                                        }

                                                    </div>
                                                </div>

                                                <div className='slider3'>
                                                    <div className='slide-track3'>
                                                        {
                                                            Array(40).fill(0).map((_) => (
                                                                category?.audio?.slice(((Math.floor(category?.audio?.length / 3) * 2) + 1), (Math.floor(category?.audio?.length / 3)) * 3)?.map((item, index) => (
                                                                    <Button key={index} >
                                                                        {item?.name}
                                                                    </Button>

                                                                ))
                                                            ))
                                                        }

                                                    </div>

                                                </div>
                                            </div>
                                        </a>
                                    </Link>
                                </div>
                                <div className=" select-col  ">
                                    <Link href="/account/myproducts/design-template-posts">
                                        <a>
                                            <div className="select-card file">
                                                <div className='d-flex flex-column'>
                                                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                                                    <span>Shablonlar</span>

                                                </div>
                                                <div className='slider'>
                                                    <div className='slide-track'>
                                                        {
                                                            Array(40).fill(0).map((_) => (
                                                                category?.template?.slice(0, Math.floor(category?.template?.length / 3))?.map((item, index) => (
                                                                    <Button key={index} >
                                                                        {item?.name}
                                                                    </Button>

                                                                ))
                                                            ))
                                                        }

                                                    </div>

                                                </div>

                                                <div className='slider2'>
                                                    <div className='slide-track2'>
                                                        {
                                                            Array(40).fill(0).map((_) => (
                                                                category?.template?.slice((Math.floor(category?.template?.length / 3) + 1), (Math.floor(category?.template?.length / 3)) * 2).map((item, index) => (
                                                                    <Button key={index} >
                                                                        {item?.name}
                                                                    </Button>

                                                                ))
                                                            ))
                                                        }

                                                    </div>
                                                </div>

                                                <div className='slider3'>
                                                    <div className='slide-track3'>
                                                        {
                                                            Array(40).fill(0).map((_) => (
                                                                category?.template?.slice(((Math.floor(category?.template?.length / 3) * 2) + 1), (Math.floor(category?.template?.length / 3)) * 3)?.map((item, index) => (
                                                                    <Button key={index} >
                                                                        {item?.name}
                                                                    </Button>

                                                                ))
                                                            ))
                                                        }

                                                    </div>

                                                </div>
                                            </div>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </>
                }

            </div>
        </PageContainer>
    ) : user?.access ? (
        <Page404 />
    ) : (
        <LoginPage />
    );
};

export default Posts;
