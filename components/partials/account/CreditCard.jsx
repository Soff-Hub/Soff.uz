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

  async function handleClickCardPosts() {
    const ItemsData = await PostsRepository.CardPostsCredit({ "credit_card": numberCardVal }, user?.access);
    if (ItemsData.status === 201) {
      const modal = Modal.success({
        centered: true,
        title: 'Muvaffaqqiyatli!',
        content: ItemsData?.data?.msg,

      });
      modal.update;
    } else {
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

  async function handleClickDelete() {
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
    <div className="row mx-auto mt-3 " >
      <div className="rounded">
        <strong>Yangi karta qo'shish</strong>

        <div className="row mt-2 row-gap-2 gap-3">
       <div className="col-md-5 p-0">
       <CreditCardInput  onChange={value => numberTyper(value)} />
       </div>
        <button onClick={handleClickCardPosts} className="btn btn-success py-2  col-md-2">
          <span className="fs-5" >Saqlash</span></button>
        </div>

      </div>

      <div className="row mt-2 row-gap-3 mx-auto gap-3 p-0" style={{transform:"translateX(-7px)"}} >
        <strong className="m-0 mt-3">Kartalaringiz: <i className="fa-solid fa-credit-card fa-flip mt-2 fs-4 text-primary m-0"></i></strong>
        {
          profileCard?.length > 0 ? profileCard?.map((item, index) => (
            <div className="d-flex gap-4 col-md-6 p-0 align-items-center" key={index} >
              <h4 className="text-warning  fs-4  px-4 m-0 rounded-3 pt-2  bg-white form-control" style={{fontWeight: "bold", fontFamily: "monospace",height:"35px" }} >{item.credit_card}</h4>
              <a data-bs-target="#exampleModalToggle" data-bs-toggle="modal" style={{ cursor: "pointer" }} onClick={() => setDeleteId(item.id)} >
                <i className="fa-solid fa-trash-can fs-2 mt-2  text-danger" ></i>
                </a>
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
