import React, { useState } from 'react'
import PostsRepository from '~/reositoriy-admin/PostsRepository';


const Posts = () => {
 const [data,  setData] =useState({});
 const [fileImg,  setDataFileImg] =useState({});
 const [categoryNameEdit,  setCategoryNameEdit] =useState({});
 const [tagNameEdit,  setTagNameEdit] =useState({});

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

  return (
    <form id='FormPostsMyProducts' className='d-flex flex-column gap-3'>
      {/* <input type="file" onChange={handleSelectFile} className='form-control pt-4 rounded-3' /> */}
      <input type="file" onChange={(e)=>(setDataFileImg(e.target.files[0]))} className='form-control pt-4 rounded-3' />
      <input type="text" className='form-control rounded-3' placeholder='Nomi' name='title' />
      <select className='form-select rounded-3 py-4 fs-4' onChange={(e) => setTagNameEdit(e.target.value)} >
        <option value="">Barcha Teglar</option>
        {
          tagItems?.length > 0 && (
            tagItems.map(item => (
              <option value={item.id}>{item.name}</option>
            ))
          )
        }
      </select>
      <select className='form-select rounded-3 py-4 fs-4' onChange={(e) => setCategoryNameEdit(e.target.value)} >
        <option value="">Barcha Kategoriyalar</option>
        {
          dataCategory?.length > 0 && (
            dataCategory.map(item => (
              <option value={item.id}>{item.name}</option>
            ))
          )
        }
      </select>
      <input type="number" className='form-control rounded-3' placeholder='Narxi' name='price' />

      <input required type="number" className='form-control rounded-3' placeholder='Chegirma' name='discount' />
      <input type="text" className='form-control rounded-3' placeholder='Qisqa tasvir' name='short_description' />
      <input type="text" className='form-control rounded-3' placeholder='Tavsifi' name='description' />
    </form>
  )
}

export default Posts
