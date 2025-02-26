
import React from 'react'
import FileImagesScroll from '../details-actions/file-images-scroll';
import FileActions from '../details-actions/file-actions';
import SellerProfile from '../details-seller-profile/seller-profile';
import Description from '../details-actions/description';

function FileProductsDetails({ product }) { 

  return (
    <div className='seller_container_products_details'>
      <div className="ps-container p-0">
        <div className="ps-product--detail_seller my-5">
          <div>
            <p style={{ fontWeight: 600, fontSize: "25px", lineHeight: "37.5px", color: "#312F30", margin: 0 }}>{product?.title}</p>
            <p className='m-0 fs-3'>{product?.category?.name}</p>
          </div>
          <div className="ps-product__header_seller ">
            <FileImagesScroll
              product={product}
              views={product?.view_count}
            />
            <FileActions product={product} />
          </div>

          <div className='ps-product__header_seller_secound'>
            <Description description={product?.description} />
            
            <SellerProfile product={product}/>
          </div>

        </div>
      </div>
    </div>
  )
}

export default FileProductsDetails