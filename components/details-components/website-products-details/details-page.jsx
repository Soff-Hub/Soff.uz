
import React from 'react'
import FileActions from '../details-actions/file-actions'
import Description from '../details-actions/description'
import SellerProfile from '../details-seller-profile/seller-profile'
import ImageCarousel from '../details-actions/imageScroll'


function WebSitesProductsDetails({ product }) { 

  return (
    <div className='seller_container_products_details_website'>
      <div className="ps-container p-0">
        <div className="ps-product--detail_seller_website my-5">
          <div>
            <p className='titleh3' style={{ fontWeight: 600, fontSize: "25px", lineHeight: "37.5px", color: "#312F30", margin: 0 }}>{product?.title}</p>
            <p className='m-0 fs-3'>{product?.category?.name}</p>
          </div>
          <div className="ps-product__header_seller_website ">
            <ImageCarousel images={product?.document?.images}/>
            <FileActions product={product} />
          </div>

          <div className='ps-product__header_seller_secound_website'>
            <Description description={product?.description} />
            
            <SellerProfile product={product}/>
          </div>

        </div>
      </div>
    </div>
  )
}

export default WebSitesProductsDetails