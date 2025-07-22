import React from 'react'
import { getTimeAgo } from '~/utilities/calculateTime'

const ServiceComments = ({comments}) => {
  return (
    <div className='bg-white rounded-4 p-5 service_comments'>
        <h2 className='detail_h2 mb-4'>Sharhlar</h2>
        <div>
            {comments?.map(comment => (
                <div className='d-flex gap-3 align-items-start'>
                    <img src={comment?.user?.image} alt="user image" />
                    <div className='border-bottom mb-3'>
                        <h5>{comment?.user?.full_name}</h5>
                        <p className='coment_time'>{getTimeAgo(comment?.created_at)}</p>
                        <p className='comment_content'>{comment?.content}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ServiceComments