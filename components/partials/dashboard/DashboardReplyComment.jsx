import { Modal } from 'antd'
import React, { useRef } from 'react'
import { useReplyToCommentMutation } from '~/rtk-store/dashboard/api'

export default function DashboardReplyComment({ item, setReplyId }) {
    const ref = useRef(null)
    const [handleReply] = useReplyToCommentMutation()

    const handleSubmit = async () => {
        const resp = await handleReply({
            id: item?.document_data?.id,
            data: {
                text: ref.current?.value,
                replied_to: item?.id
            }
        })
        if (resp.data) {
            Modal.success({
                title: "Muvaffaqiyatli",
                content: "Izohga javob yuborildi"
            })
        } else {
            Modal.error({
                title: "Xatolik",
                content: resp.error?.data?.msg
            })
        }
        setReplyId(null)
        ref.current.value = ''
    }

    return (
        <div
            className="modal fade "
            id="replyToComment"
            aria-hidden="true"
            aria-labelledby="staticBackdropLabel"
            data-bs-backdrop="static"
        >
            <div className="modal-dialog modal-dialog-centered ">
                <div className="modal-content rounded-3 px-5">
                    <div className="d-flex justify-content-end pt-3 px-3">
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        >
                        </button>
                    </div>

                    <h2 className="fs-1 text-center pt-5">
                        Izohga javob
                    </h2>
                    <div>
                        <textarea ref={ref} name="comment" className='form-control mx-auto px-3 py-2' style={{ borderRadius: '10px', minHeight: '100px' }}>

                        </textarea>
                    </div>
                    <div className="d-flex justify-content-center gap-5 pb-5 pt-3">
                        <button
                            data-bs-dismiss="modal" className=" btn btn-secondary d-block py-2 ">
                            <span className="fs-3">Bekor qilish</span>
                        </button>
                        <button onClick={handleSubmit} data-bs-dismiss='modal' className="btn btn-success d-block w-25 py-2">
                            <span className="fs-3">Yuborish</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
