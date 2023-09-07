import React, { useEffect, useState } from 'react'
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


const Posts = () => {
 const [data,  setData] =useState({});
 const [fileImg,  setDataFileImg] =useState({});
 const [categoryNameEdit,  setCategoryNameEdit] =useState({});
 const [tagNameEdit,  setTagNameEdit] =useState({});
 const [dataCategory, setDataCategory] = useState([]);
 const [tagItems, setTagItems] = useState([]);
 const { user } = useSelector(state => state.auth);



 const breadCrumb = [
  {
      text: 'Asosiy Sahifa',
      url: '/',
  },
  {
      text: "Mening mahsulotlarim Qo'shish",
  },
];

async function GetItemsCategory(page) {
  if (page === 1) {
      setDataCategory([])
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

 const getFormValues = (formId) => {
  const data = {};
  const form = document.getElementById(formId);

  const formData = new FormData(form);

  for (let [key, value] of formData) {
      Object.assign(data, { [key]: value });
  }

  return data;
};
 const dataForm = getFormValues("FormPostsMyProducts") 

  async function handleClickPosts(values) {
    const formData = new FormData()
    formData.append('file', fileImg)
    // formData.append('poster', fileImgFile)
    formData.append('title', values.title)
    formData.append('price', values.price)
    formData.append('discount', values.discount)
    formData.append('short_description', values.short_description)
    formData.append('description', values.description)
    formData.append('category', categoryNameEdit)
    formData.append('tag', tagNameEdit)
    const patchItems = await PostsRepository.PostsMyProducts(formData, user?.access)

    // const modal = Modal.success({
    //     centered: true,
    //     title: 'Muvaffaqqiyatli!',
    //     content: `Siz yangi malumot qo'shdingiz`,
    // });
    // GetItemsProducts(1, dataValCat, tagName, dataFormat)
}
useEffect(() => {
  GetItemsCategory(1)
  GetItemsTag()
}, [])
  return (
    user?.role === 'seller' || user?.role === 'customer'  ?
    <PageContainer
                footer={<FooterDefault />}
                title="Recent Viewed Products">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <form id='FormPostsMyProducts' className='row mx-auto container gap-3 py-5'>
                    <h4>Mahsulot Qo'shish</h4>
      {/* <input type="file" onChange={handleSelectFile} className='form-control pt-4 rounded-3' /> */}
      <input type="file" onChange={(e)=>(setDataFileImg(e.target.files[0]))} className='form-control col-md-5 pt-4 rounded-3' />
      <input type="text" className='form-control rounded-3 col-md-5' placeholder='Nomi' name='title' />
      <select className='form-select rounded-3 col-md-5 py-4 fs-4' onChange={(e) => setTagNameEdit(e.target.value)} >
        <option value="">Barcha Teglar</option>
        {
          tagItems?.length > 0 && (
            tagItems.map(item => (
              <option value={item.id}>{item.name}</option>
            ))
          )
        }
      </select>
      <select className='form-select rounded-3 col-md-5 py-4 fs-4' onChange={(e) => setCategoryNameEdit(e.target.value)} >
        <option value="">Barcha Kategoriyalar</option>
        {
          dataCategory?.length > 0 && (
            dataCategory.map(item => (
              <option value={item.id}>{item.name}</option>
            ))
          )
        }
      </select>
      <input type="number" className='form-control col-md-5 rounded-3' placeholder='Narxi' name='price' />

      <input required type="number" className='form-control col-md-5 rounded-3' placeholder='Chegirma' name='discount' />
      <input type="text" className='form-control rounded-3 col-md-5' placeholder='Qisqa tasvir' name='short_description' />
      <input type="text" className='form-control rounded-3 col-md-5' placeholder='Tavsifi' name='description' />
      <WordGenerator/>
      <Link href={"/account/MyProducts"} >
      <button onClick={handleClickPosts} className="btn btn-success py-3 w-25"><span className='fs-4 col-md-5'>Mahsulot qo'shish</span></button>
      </Link>
                    </form>
                </div>
                <Newsletters layout="container" />
            </PageContainer> : user?.access ? <Page404/> : <LoginPage /> 
    
  )
}

export default Posts
