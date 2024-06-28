import { Modal, Rate } from 'antd';
import React, { useState } from 'react';
import PatchRepository from '~/reositoriy-admin/PatchRepository';

const Commits = ({ data, countToggle, setPageMore, pageMore, setDataCount }) => {

    const [toggle, setToggle] = useState(false)
    const [toggleUser, setToggleUser] = useState(false)
    const [inputValue, setInputValue] = useState(null);

    async function handleChange() {
        const formData = new FormData();
        setDataCount(true);

        if (inputValue) {
            formData.append('rating', inputValue);
        } 
        const ItemsData = await PatchRepository.patchDealUpdateApplicaitonCommit(product?.id, formData, user?.access);

        if (ItemsData?.status === 201) {
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: ItemsData?.data?.msg,
            });

        } else {
            const modal = Modal.warning({
                centered: true,
                title: 'Xatolik!',
                content: ItemsData?.data?.msg + ' ' + ItemsData?.status + ' ' + ItemsData?.statusText,
            });
        }
        setDataCount(false);
    }


    return (
        <div className="mt-5">
            <h4 className="fw-medium border-bottom pb-4 border-success ">
                Hamma sharhlar, {data?.length !== 0 ? data?.length : ''} sharh
            </h4>
            {data.map((item) => (
                <div
                    key={item?.id}
                    className=" border-bottom  border-success  p-3  mb-3 ">
                    <div className="d-flex align-items-center gap-3 mb-3">
                        <img
                            src={item?.user?.image_url}
                            width={30}
                            height={30}
                            style={{ borderRadius: '50%' }}
                        />
                        <h5 className="fw-normal mb-0 ">
                            {item?.user?.first_name} {item?.user?.last_name}
                        </h5>
                    </div>
                    {item?.rating !== 0 && (
                        <div className="d-flex gap-3 align-items-center mb-3">

                            <Rate
                                allowHalf
                                disabled
                                className="fs-4"
                                value={item?.rating}
                            />
                            <span className="text-secondary">
                                {item?.reviewed_at}
                            </span>
                        </div>
                    )}

                    {item?.review && (
                        <p className='m-0'>{item?.review}</p>
                    )}
                    <div className='d-flex gap-5 align-items-center  mt-2 '>
                        <span
                            onClick={() => setToggleUser(!toggleUser)}
                            className='text-primary fw-medium d-flex align-items-center gap-3' style={{ cursor: "pointer" }}>

                            <i className="fa-solid fa-angle-down"></i>
                            <span className='fw-medium'> 5 JavobLar</span>

                        </span>

                        <span
                            onClick={() => setToggle(!toggle)}
                            className='text-primary fw-medium' style={{ cursor: "pointer" }}> <i
                                style={{ transform: "rotate(-90deg)" }}
                                className="fa-solid fa-arrow-turn-up mx-2"></i>  Javob</span>
                    </div>


                    {toggle && <div className='mt-2 pl-5'>
                        <input onChange={(e) => setInputValue(e.target.value)} type="text" className='form-control p-0 '
                            placeholder='Javob'
                            style={{
                                border: "none",
                                borderBottom: "2px solid #007bff",
                                backgroundColor: "transparent",
                                height: "30px"
                            }}
                        />
                        <div className='d-flex justify-content-end mt-3'>
                            <div className='d-flex gap-3'>
                                <button
                                    onClick={() => setToggle(!toggle)} className="btn btn-outline-secondary px-4 py-2 rounded-5 fs-5 fw-medium">Bekor qilish</button>
                                <button
                                    onClick={handleChange}
                                    className="btn btn-outline-primary px-4 py-2 rounded-5 fs-5 fw-medium ">Yuborish</button>

                            </div>
                        </div>
                    </div>}
                    {
                        toggleUser &&
                        <div className='pl-5 mt-3'  >
                            <div className="d-flex align-items-start gap-3 mb-2">
                                <img
                                    src={item?.user?.image_url}
                                    width={25}
                                    height={25}
                                    style={{ borderRadius: '50%' }}
                                />
                                <div>
                                    <h5 className="fw-normal mb-0 fs-5 d-flex flex-wrap ">
                                        <span className='mr-3'> {item?.user?.first_name} {item?.user?.last_name}</span>
                                        <span className="text-secondary fs-5">
                                            {item?.reviewed_at}
                                        </span>
                                    </h5>

                                    <p className='m-0 mt-1'>{item?.review} </p>
                                </div>
                            </div>
                        </div>
                    }


                </div>
            ))}
            {countToggle && (
                <div className="d-flex justify-content-center">
                    <button
                        onClick={() => setPageMore(pageMore + 1)}
                        className="btn btn-success fs-5 px-4">
                        Yana
                    </button>
                </div>
            )}
        </div>
    );
};

export default Commits;
