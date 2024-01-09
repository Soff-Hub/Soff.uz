import React from 'react';

function ModalDelete({onSuccess}) {

   function handleSuccess(){
    onSuccess?.()
   }

    return (
        <>
            <div
                className="modal fade "
                id="exampleModalToggle"
                aria-hidden="true"
                aria-labelledby="staticBackdropLabel"
                data-bs-backdrop="static"
              
                >
                <div className="modal-dialog modal-dialog-centered ">
                    <div className="modal-content rounded-3">
                        <div className="d-flex justify-content-end pt-3 px-3">
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                            <span
                                className="d-flex justify-content-center align-items-center"
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50px',
                                    border: '3px solid red',
                                    color: 'red',
                                }}>
                                <i className="fa-solid fa-trash-can fa-4x"></i>
                            </span>
                        </div>
                        <h2 className="fs-1 text-center pt-5">
                            Ishonchingiz komilmi?
                        </h2>
                        <div>
                            <p
                                className="text-center px-5  m-auto pt-2 pb-4 fs-4"
                                style={{ width: '400px' }}>
                                Haqiqatan ham oʻchirib tashlamoqchimisiz? Bu
                                jarayonni ortga qaytarib bo‘lmaydi.
                            </p>
                        </div>
                        <div className="d-flex justify-content-center gap-5 pb-5 pt-3">
                            <button 
                                data-bs-dismiss="modal" className=" btn btn-secondary d-block w-25 py-2 ">
                                <span className="fs-3">Yopish</span>
                            </button>
                            <button onClick={handleSuccess} data-bs-dismiss="modal" className="btn btn-danger d-block w-25 py-2">
                                <span className="fs-3">O'chirish</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalDelete;
