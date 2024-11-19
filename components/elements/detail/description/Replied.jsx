import { Modal } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PatchRepository from '~/reositoriy-admin/PatchRepository';

const Replied = ({
    setDataCount,
    product,
    onsSuccess,
    userID,
    dataProducts,
    Item,
    loading }) => {



    const { user } = useSelector((state) => state.auth);
    const [toggle, setToggle] = useState(false)
    const [toggleUser, setToggleUser] = useState(false)
    const [inputValue, setInputValue] = useState(null);


    async function handleChange() {
        const formData = new FormData();
        setDataCount(true);

        if (inputValue) {
            formData.append('text', inputValue);
        }
        if (userID) {
            formData.append('replied_to', userID);
        }
        const ItemsData = await PatchRepository.patchDealUpdateApplicaitonCommit(product?.id, formData, user?.access);

        if (ItemsData?.status === 201) {
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: ItemsData?.data?.msg,
            });
            setToggle(!toggle);

        } else {
            const modal = Modal.warning({
                centered: true,
                title: 'Xatolik!',
                content: ItemsData?.data?.msg + ' ' + ItemsData?.status + ' ' + ItemsData?.statusText,
            });
        }
        setDataCount(false);
    }

    function productId(button) {
        onsSuccess?.()
        if (button === 'toggleUser') {
            setToggleUser(!toggleUser)
        }

        if (button === 'toggle') {
            setToggle(!toggle)
        }

    }



    return (
        <div>
            <div className='d-flex gap-5 align-items-center  mt-2 '>
                {
                    Item?.replied_count !== 0 &&
                    <span
                        onClick={() => productId('toggleUser')}
                        className='text-primary fw-medium d-flex align-items-center gap-3' style={{ cursor: "pointer" }}>

                        <i className="fa-solid fa-angle-down"></i>
                        <span className='fw-medium'> {Item?.replied_count} JavobLar</span>
                    </span>
                }

                {Item?.is_document_owner && <span

                    onClick={() => productId('toggle')}
                    className='text-primary fw-medium' style={{ cursor: "pointer" }}> <i
                        style={{ transform: "rotate(-90deg)" }}
                        className="fa-solid fa-arrow-turn-up mx-2"></i>  Javob</span>}
            </div>


            {(toggle) && <div className='mt-2 pl-5'>
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
                            onClick={() => setToggle(false)} className="btn btn-outline-secondary px-4 py-2 rounded-5 fs-5 fw-medium">Bekor qilish</button>
                        <button
                            onClick={handleChange}
                            className="btn btn-outline-primary px-4 py-2 rounded-5 fs-5 fw-medium ">Yuborish</button>

                    </div>
                </div>
            </div>}
            {
                (toggleUser) &&
                <>

                    {loading ?
                        <div className='d-flex align-items-center ' style={{ height: "15vh", paddingLeft: "8rem" }}>
                            <div
                                className="spinner-border "
                                role="status"
                                style={{ width: '25px', height: '25px' }}>
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        </div>

                        :

                        <>
                            {dataProducts?.length > 0 &&
                                dataProducts?.map((Items, ind) => (
                                    <div className='pl-5 mt-3' key={ind} >
                                        <div className="d-flex align-items-start gap-3 mb-2">
                                            <img
                                                src={Items?.user?.image_url}
                                                width={25}
                                                height={25}
                                                style={{ borderRadius: '50%' }}
                                            />
                                            <div>
                                                <h5 className="fw-normal mb-0 fs-5 d-flex flex-wrap ">
                                                    <span className='mr-3'> {Items?.user?.first_name} {Items?.user?.last_name}</span>
                                                    <span className="text-secondary fs-5">
                                                        {Items?.created_at}
                                                    </span>
                                                </h5>

                                                <p className='m-0 mt-1'>{Items?.text} </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </>
                    }
                </>
            }

        </div>
    )
}

export default Replied