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
            const response = await axios.get(baseUrl + endPoint);
            if (response?.data) {
                setCatgeory(response?.data)
            }
        } catch (error) {
            console.log("Kategoriyalar olib kelishda xatolik", error);
        }

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
                                                category?.docs?.map((item, index) => (
                                                    <Button key={index} >
                                                        {item?.name}
                                                    </Button>

                                                ))
                                            }

                                        </div>
                                     
                                    </div>

                                    <div className='slider2'>
                                        <div className='slide-track2'>
                                            {
                                                category?.docs?.map((item, index) => (
                                                    <Button key={index} >
                                                        {item?.name}
                                                    </Button>

                                                ))
                                            }

                                        </div>
                                    </div>
                                    
                                    <div className='slider3'>
                                        <div className='slide-track3'>
                                            {
                                                category?.docs?.map((item, index) => (
                                                    <Button key={index} >
                                                        {item?.name}
                                                    </Button>

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
                                                category?.audio?.map((item, index) => (
                                                    <Button key={index} >
                                                        {item?.name}
                                                    </Button>

                                                ))
                                            }

                                        </div>
                                     
                                    </div>

                                    <div className='slider2'>
                                        <div className='slide-track2'>
                                            {
                                                category?.audio?.map((item, index) => (
                                                    <Button key={index} >
                                                        {item?.name}
                                                    </Button>

                                                ))
                                            }

                                        </div>
                                    </div>
                                    
                                    <div className='slider3'>
                                        <div className='slide-track3'>
                                            {
                                                category?.audio?.map((item, index) => (
                                                    <Button key={index} >
                                                        {item?.name}
                                                    </Button>

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
                                                category?.template?.map((item, index) => (
                                                    <Button key={index} >
                                                        {item?.name}
                                                    </Button>

                                                ))
                                            }

                                        </div>
                                     
                                    </div>

                                    <div className='slider2'>
                                        <div className='slide-track2'>
                                            {
                                                category?.template?.map((item, index) => (
                                                    <Button key={index} >
                                                        {item?.name}
                                                    </Button>

                                                ))
                                            }

                                        </div>
                                    </div>
                                    
                                    <div className='slider3'>
                                        <div className='slide-track3'>
                                            {
                                                category?.template?.map((item, index) => (
                                                    <Button key={index} >
                                                        {item?.name}
                                                    </Button>

                                                ))
                                            }

                                        </div>
                                       
                                    </div>
                                </div>
                            </a>
                        </Link>
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
