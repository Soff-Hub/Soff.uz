import React, { useEffect, useState } from "react";
import CreditCardInput from "./CardNumber";
import PostsRepository from "~/reositoriy-admin/PostsRepository";
import { useSelector } from 'react-redux';
import GetRepository from "~/reositoriy-admin/GetRepository";
import DeleteRepository from "~/reositoriy-admin/DeleteRepository";
import { Modal } from "antd";
import ModalDelete from "./Modal";



const CreditCard = () => {
  const { user } = useSelector(state => state.auth);
  const [number, SetNumber] = useState("●●●● ●●●● ●●●● ●●●●");
  const [numberCard, SetNumberCard] = useState(null);
  const [numberCardVal, SetNumberCardVal] = useState(null);
  const [profileCard, setProfileCard] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

 
   profileCard.forEach(item => {
    item.credit_card = String(item.credit_card).replace(/(\d{4})(?=\d)/g, "$1 ");
});


  const numberTyper = (value) => {
    SetNumberCardVal(value)
    const firstFourNumbers = value.slice(0, 4);
    SetNumberCard(Number(firstFourNumbers))
    if (!value == 0) {
      let numberPlaceholder = ''
      for (let i = 0; i < 16; i++) {
        if (i > 0 && i % 4 === 0) {
          numberPlaceholder += ' ';
        }
        numberPlaceholder += value[i] || '●';
      }
      return SetNumber(numberPlaceholder)
    }

    SetNumber('●●●● ●●●● ●●●● ●●●●')
  }

  async function handleClickCardPosts(){
    const ItemsData= await PostsRepository.CardPostsCredit({"credit_card":numberCardVal},user?.access );
    if (ItemsData.status === 201) {
      const modal = Modal.success({
          centered: true,
          title: 'Muvaffaqqiyatli!',
          content: ItemsData?.data?.msg,

      });
      modal.update;
     }else{
      const modal = Modal.error({
          centered: true,
          title: 'Muvaffaqqiyatli!',
          content: ItemsData?.data?.msg,

      });
      modal.update;
     }


  getItemsSellerCardList();
  } 

  async function getItemsSellerCardList() {
    const Items = await GetRepository.getProfileArizaCardLists(user?.access);
    if (Items?.results) {
        setProfileCard(Items?.results)
    }
}
async function handleClickDelete(){
  const ItemRemove = await DeleteRepository.getCategoryDeleteCard(deleteId, user?.access);
  const modal = Modal.error({
    centered: true,
    title: 'Muvaffaqqiyatli!',
    content: `Siz kartangizni o'chirdingiz`,
});
  getItemsSellerCardList();

} 

useEffect(() => {
  getItemsSellerCardList()
}, [])

  return (
<div className="row g-3  overflow-x-auto" >
  <div className="col-md-5 border p-4 rounded" >
    <h4>Yangi karta qo'shish</h4>
    <div id="Card" className={numberCard === 9860 ? "BackImg" : numberCard === 8600 ? "BackImg2" : "BackImg1"}>
      <div className="colCard px-5">
        <h5 className="cardText cardColorHumo">{number}</h5>
        <h5 className="cardText text-white" style={{ marginRight: "8rem" }}>{numberCard === 9860 ? "HUMO" : numberCard === 8600 ? "UZCARD" : "Karta nomi"}</h5>
      </div>
    </div>
  <CreditCardInput onChange={value => numberTyper(value)} />
      <button onClick={handleClickCardPosts} className="btn btn-success py-3 " style={{ width: "300px" }}><span className="fs-4">Saqlash</span></button>
 
  </div>
  <div className="col-md-6 mx-auto d-flex flex-column row-gap-3 rounded border " >
    <h4 className="m-0 mt-3">Kartalaringiz: <i className="fa-solid fa-credit-card fa-flip mt-2 fs-2 text-primary m-0"></i></h4>
    {
      profileCard?.length > 0 ? profileCard?.map((item, index)=>(
       <div className="d-flex gap-4" key={index} >
        <h4 className=" text-warning  fs-2  p-3 px-5 m-0 rounded-3 bg-white form-control" style={{width:"330px", fontWeight:"bold", fontFamily:"monospace"}} >{item.credit_card}</h4>
        <a data-bs-target="#exampleModalToggle" data-bs-toggle="modal"  style={{cursor:"pointer"}} onClick={() => setDeleteId(item.id)} ><i className="fa-solid fa-trash-can fa-2x mt-2  text-danger" ></i></a>
       </div>
      ))
      :
      <h4 className="mt-5 mx-5"><span>Hozircha karta mavjud emas!</span></h4>
    }
  </div>
  <ModalDelete onSuccess={handleClickDelete} />
</div>

  );
};
export default CreditCard;
