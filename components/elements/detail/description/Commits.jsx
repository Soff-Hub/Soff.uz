import { Rate } from 'antd'
import React from 'react'


const Commits = ({ data, countToggle, setPageMore, pageMore }) => {



    return (
        <div className='mt-5' >
            <h4 className='fw-medium border-bottom pb-4 border-success '>Hamma sharhlar, {data?.length !==0 ? data?.length : ""} sharh</h4>
            {
             data.map((item) => (
                <div key={item?.id} className=' border-bottom  border-success  p-3  mb-3 '>
                    <div className='d-flex align-items-center gap-3 mb-3'>
                        <img src={item?.user?.image_url} width={30} height={30} style={{ borderRadius: "50%" }} />
                        <h5 className='fw-normal mb-0 '>{item?.user?.first_name}  {item?.user?.last_name}</h5>
                    </div>
                    {
                        item?.rating !== 0 &&
                        <div className='d-flex gap-3 align-items-center mb-3'>
                            <Rate
                                allowHalf
                                disabled
                                className="fs-4"
                                value={item?.rating}
                            />
                            <span className='text-secondary'>{item?.reviewed_at}</span>
                        </div>
                    }

                    {
                        item?.review &&
                        <p>
                            {
                                item?.review
                            }
                        </p>
                    }



                </div>
            ))
            }
            {
                countToggle &&
                <div className='d-flex justify-content-center'>
                    <button
                        onClick={() => setPageMore(pageMore + 1)}
                        className="btn btn-success fs-5 px-4">Yana</button>
                </div>
            }

        </div >
    )
}

export default Commits
