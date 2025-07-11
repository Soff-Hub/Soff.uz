
import React from 'react'
import FileActions from '../details-actions/file-actions'
import Description from '../details-actions/description'
import SellerProfile from '../details-seller-profile/seller-profile'
import DefaultVideoContent from './default-video'
import { InfoCircleOutlined } from '@ant-design/icons'
import PlayListsCard from './play-lists'


function VideosProductsDetails({ product, isPlay, setIsPlay, }) {
  const type = "playlists"

  return (
    <div className='seller_container_products_details_videos'>
      <div className="ps-container p-0">
        <div className="ps-product--detail_seller_videos my-5">
          <div>
            <p style={{ fontWeight: 600, fontSize: "25px", lineHeight: "37.5px", color: "#312F30", margin: 0 }}>{product?.title}</p>
            <p className='m-0 fs-3'>{product?.category?.name}</p>
          </div>
          <div className="ps-product__header_seller_videos ">
            <div className='video_container'>
              <DefaultVideoContent product={product} isPlay={isPlay} setIsPlay={setIsPlay} />
              <div className="views">
                {' '}
                <i className="fa-solid fa-eye"></i> <span>{product?.view_count || 0}</span>
              </div>
              <div className='title_support'>
                <InfoCircleOutlined className='fs-2 ' style={{ cursor: "pointer", }} />
                <span>Mualliflik huquqi buzilgan holatda</span>
                <strong className='text-success' style={{ cursor: "pointer" }}>shikoyat qiling!</strong>

              </div>
            </div>
            <FileActions product={product} />
          </div>

          <div className='ps-product__header_seller_secound_videos'>
             <Description description={product?.description}/>
            {/* {type !== "playlists" ?  :

              <PlayListsCard product={product} isPlay={isPlay} setIsPlay={setIsPlay} />} */}

            <div className='w-100 gap-5 d-flex flex-column' style={{ maxWidth: "550px" }}>
              {type !== "playlists" ? <Description description={product?.description} /> :
                <></>}
              <SellerProfile product={product} />

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default VideosProductsDetails