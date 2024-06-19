import React, { useEffect, useState } from 'react';
import { Rate } from 'antd';
const desc = ['1 ball', '2 ball', '3 ball', '4 ball', ' 5 ball'];

function ModalDelas({
    onSuccess,
    categoryStatus,
    setValueRate,
    setRateDes,
    valueRate,
}) {
    const [value, setValue] = useState(0);

    function handleSuccess() {
        onSuccess?.();
    }

    useEffect(() => {
        if (categoryStatus === 'completed') {
            const interval = setInterval(() => {
                setValue((prevCountdown) => {
                    if (prevCountdown === 5) {
                        clearInterval(interval);
                        return 0;
                    } else {
                        return prevCountdown + 1;
                    }
                });
            }, 300);

            return () => {
                clearInterval(interval);
            };
        }
    }, [categoryStatus]);

    return (
        <>
            <div
                className="modal fade "
                id="exampleModalToggleDeals"
                aria-hidden="true"
                aria-labelledby="staticBackdropLabel"
                data-bs-backdrop="static">
                <div className="modal-dialog modal-dialog-centered ">
                    <div className="modal-content rounded-3">
                        <div className="d-flex justify-content-end pt-3 px-3">
                            <button
                                onClick={() => setValueRate(null)}
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
                                    border: `3px solid ${
                                        categoryStatus === 'in_progress'
                                            ? '#ffc107'
                                            : categoryStatus === 'completed'
                                            ? '#28a745'
                                            : 'red'
                                    }`,
                                    color: `${
                                        categoryStatus === 'in_progress'
                                            ? '#ffc107'
                                            : categoryStatus === 'completed'
                                            ? '#28a745'
                                            : 'red'
                                    }`,
                                }}>
                                {categoryStatus === 'in_progress' ? (
                                    <i className="fa-regular fa-handshake fa-4x "></i>
                                ) : categoryStatus === 'completed' ? (
                                    <i className="fa-solid fa-check fa-4x "></i>
                                ) : (
                                    <i className="fa-solid fa-xmark fa-4x "></i>
                                )}
                            </span>
                        </div>

                        <h2 className="fs-1 text-center pt-5">
                            {categoryStatus === 'in_progress'
                                ? 'Ishonchingiz komilmi?'
                                : categoryStatus === 'completed'
                                ? 'Ish sifatini baholang!'
                                : 'Ishonchingiz komilmi?'}
                        </h2>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <p
                                className={
                                    categoryStatus === 'completed'
                                        ? 'm-0'
                                        : 'text-center px-5  m-auto pt-2 pb-4 fs-4'
                                }
                                style={{ width: '400px' }}>
                                {categoryStatus === 'in_progress'
                                    ? 'Haqiqatan ham  qabul qilmoqchimisiz? Bu jarayonni ortga qaytarib bo‘lmaydi.'
                                    : categoryStatus === 'completed'
                                    ? ''
                                    : 'Haqiqatan ham  bekor  qilmoqchimisiz? Bu jarayonni ortga qaytarib bo‘lmaydi.'}
                            </p>
                            {categoryStatus === 'completed' ? (
                                <>
                                    <Rate
                                        className="fs-1"
                                        tooltips={desc}
                                        onChange={(setValue, setValueRate)}
                                        value={value || valueRate}
                                    />

                                    <div className="d-flex flex-column align-items-center my-4">
                                        <span>
                                            Ish sifati haqida fikringiz?
                                        </span>
                                        <textarea
                                            onChange={(e) =>
                                                setRateDes(e.target.value)
                                            }
                                            rows={4}
                                            placeholder="Ish sifati haqida fikringiz?"
                                            cols={55}
                                            className="p-3 rounded-3 my-1 "></textarea>
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div className="d-flex justify-content-center gap-5 pb-5 pt-3">
                            <button
                                onClick={() => setValueRate(null)}
                                data-bs-dismiss="modal"
                                className=" btn btn-secondary d-block w-25 py-2 ">
                                <span className="fs-4">Yopish</span>
                            </button>
                            <button
                                onClick={handleSuccess}
                                data-bs-dismiss="modal"
                                className={`btn ${
                                    categoryStatus === 'in_progress'
                                        ? 'btn-warning'
                                        : categoryStatus == 'completed'
                                        ? 'btn-success'
                                        : 'btn-danger'
                                } text-white d-block w-25 py-2`}>
                                <span className="fs-4">
                                    {categoryStatus === 'in_progress'
                                        ? 'Qabul qilish'
                                        : categoryStatus == 'completed'
                                        ? 'Tugatish'
                                        : 'Bekor qilish'}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalDelas;
