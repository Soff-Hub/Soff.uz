import React, { useEffect, useState } from "react";
import CreditCardInput from "./CardNumber";
import PostsRepository from "~/reositoriy-admin/PostsRepository";
import { useSelector } from 'react-redux';
import GetRepository from "~/reositoriy-admin/GetRepository";
import DeleteRepository from "~/reositoriy-admin/DeleteRepository";
import { Input, Modal } from "antd";
import ModalDelete from "./Modal";



const CreditCard = () => {
  const { user } = useSelector(state => state.auth);
  const [numberCardVal, setNumberCardVal] = useState(null);
  const [profileCard, setProfileCard] = useState([]);
  const { profile } = useSelector((state) => state.ecomerce);
  const [deleteId, setDeleteId] = useState(null);
  const [open, setOpen] = useState(false);
  const [countdown, setCoutdown] = useState(120);
  const [code, setKod] = useState(null);
  const [loadingPayment, setLoadingPayment] = useState(false)


  profileCard.forEach(item => {
    item.credit_card = String(item.credit_card).replace(/(\d{4})(?=\d)/g, "$1 ");
  });


  const numberTyper = (value) => {
    setNumberCardVal(value)
    if (!value == 0) {
      let numberPlaceholder = ''
      for (let i = 0; i < 16; i++) {
        if (i > 0 && i % 4 === 0) {
          numberPlaceholder += ' ';
        }
        numberPlaceholder += value[i] || '●';
      }
    }
  }

  async function handleClickCardPosts() {
    const ItemsData = await PostsRepository.CardPostsCredit({ "credit_card": numberCardVal }, user?.access);
    if (ItemsData.status === 201 || ItemsData.status === 200) {
      setOpen(true);
    } else {
      const modal = Modal.error({
        centered: true,
        maskClosable: true,
        title: 'Xatolik!',
        content: ItemsData?.data?.msg,

      });
      modal.update;
    }
  }

  async function getItemsSellerCardList() {
    const Items = await GetRepository.getProfileArizaCardLists(user?.access);
    if (Items?.results) {
      setProfileCard(Items?.results)
    }
  }

  async function handleClickDelete() {
    await DeleteRepository.getCategoryDeleteCard(deleteId, user?.access);
    Modal.error({
      centered: true,
      maskClosable: true,
      title: 'Muvaffaqqiyatli!',
      content: `Siz kartangizni o'chirdingiz`,
    });
    getItemsSellerCardList();

  }

  async function handleSendMessage() {
    setLoadingPayment(true)
    const ItemsData = await PostsRepository.CardPostsCreditVerify({ "credit_card": numberCardVal, "code": code }, user?.access);
    if (ItemsData.status === 201 || ItemsData.status === 200) {
      getItemsSellerCardList();
      setOpen(false);
      setKod(null);
      const modal = Modal.success({
        centered: true,
        title: 'Muvaffaqqiyatli!',
        content: ItemsData?.data?.msg,
      });
      modal.update;
    } else if (ItemsData?.status >= 400) {
      const modal = Modal.error({
        centered: true,
        title: 'Xatolik!',
        content: ItemsData?.data?.msg,

      });
      modal.update;
    } setLoadingPayment(false)

  }

  useEffect(() => {
    if (!open) return;

    const interval = setInterval(() => {
      setCoutdown((prevCountdown) => {
        if (prevCountdown === 0) {
          clearInterval(interval);
          return 0;
        } else {
          return prevCountdown - 1;
        }
      });
    }, 1000);


    return () => {
      clearInterval(interval);
    };
  }, [open]);

  useEffect(() => {
    if (countdown <= 0) {
      setOpen(false);
      setKod(null);
      setCoutdown(120);
    }
  }, [countdown]);


  useEffect(() => {
    getItemsSellerCardList()
  }, []);



  return (
    <div className="row mx-auto mt-3 border rounded p-4" >
      <div className="rounded p-0">
        <strong>Yangi karta qo'shish</strong>

        <div className="row mt-2 row-gap-3 mx-auto gap-3">
          <div className="col-md-5 p-0">
            <CreditCardInput onChange={value => numberTyper(value)} />
          </div>
          <button onClick={handleClickCardPosts} disabled={String(numberCardVal)?.length < 16} className="btn btn-success py-2  col-md-2">
            <span className="fs-4" >Saqlash</span></button>
        </div>

      </div>

      <div className="row mt-2 row-gap-3 mx-auto gap-3 p-0"  >
        <strong className="m-0 p-0 mt-3">Kartalaringiz: <i className="fa-solid fa-credit-card fa-flip mt-2 fs-4 text-primary m-0"></i></strong>
        {
          profileCard?.length > 0 ? profileCard?.map((item, index) => (
            <div className="d-flex gap-4 col-md-6 p-0 align-items-center" key={index} >
              <h4 className="text-warning  fs-4  px-4 m-0 rounded-3 pt-2  bg-white form-control" style={{ fontWeight: "bold", fontFamily: "monospace", height: "35px" }} >{item.credit_card}</h4>
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

      <Modal
        title={"Karta raqamni tasdiqlash"}
        open={open}
        centered
        width={416}
        onOk={handleSendMessage}
        onCancel={() => setOpen(false)}
        okText={
          <div className="d-flex align-items-center gap-2">
            {loadingPayment && <div
              className="spinner-border fs-5"
              role="status"
              style={{ width: '10px', height: '10px' }}
            >
              <span className="visually-hidden">
                Loading...
              </span>
            </div>}
            <span>Tasdiqlash</span>
          </div>
        }
        cancelText="Yopish"
        okButtonProps={
          {
            disabled: (String(code)?.length < 6 || String(code)?.length > 6 || loadingPayment),
            style:
              { backgroundColor: "#28A745", borderColor: "#28A745" }
          }}
        cancelButtonProps={{ style: { borderColor: "#28A745", color: "#28A745" } }}
      >
        <div className="ps-form__content mt-4">
          <h5 className="mb-2 " style={{ fontFamily: "sans-serif", color: "#333" }}>
            Tasdiqlash SMS - kodi quyidagiga yuborildi:
          </h5>
          <h5 style={{ color: "#333", marginBottom: '5px' }}>
            {profile?.phone ? profile?.phone : profile?.email}
          </h5>
          <div className="kod-input">
            <Input
              value={code}
              required
              className="form-control mb-2"
              type="number"
              placeholder="Kodni kiriting..."
              onChange={(e) => setKod(e.target.value)}
              style={{ height: "35px", borderRadius: "5px" }}
            />
            <h5 className="mb-2">{` 0 ${Math.floor(countdown / 60)} : ${countdown >= 10
              ? countdown % 60
              : '0 ' + countdown
              }`}</h5>
          </div>
        </div>

      </Modal>
    </div>
  );
};
export default CreditCard;
