import React from 'react';
export const getFormValues = (formId) => {
    const data = {};
    const form = document.getElementById(formId);

    const formData = new FormData(form);

    for (let [key, value] of formData) {
        Object.assign(data, { [key]: value });
    }

    return data;
};

function ModalDeletePostEdit({ children, onSubmited, formID, dataBsTarget }) {
    function handleSuccess(e) {
        e.preventDefault();
        onSubmited?.(getFormValues(formID));
        e.target.reset();
    }

    return (
        <>
            <div
                className="modal fade modalPost"
                id={dataBsTarget}
                aria-hidden="true"
                aria-labelledby="staticBackdropLabel"
                data-bs-backdrop="static">
                <div className="modal-dialog modal-dialog-centered ">
                    <div className="modal-content ">
                        <div
                            className="d-flex justify-content-end p-4"
                            style={{ border: 'none !important' }}>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <form
                            onSubmit={handleSuccess}
                            className="w-100 px-4 py-4 d-flex row-gap-3 flex-column"
                            id={formID}>
                            {children}
                            <div className="d-flex justify-content-center gap-5 pb-5 pt-3">
                                <button
                                    data-bs-dismiss="modal"
                                    className=" btn btn-secondary d-block w-25 py-2 "
                                    type="button">
                                    <span className="fs-3">Yopish</span>
                                </button>
                                <button
                                    type="submit"
                                    data-bs-dismiss="modal"
                                    className="btn btn-success d-block w-25 py-2">
                                    <span className="fs-3">Saqlash</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalDeletePostEdit;
