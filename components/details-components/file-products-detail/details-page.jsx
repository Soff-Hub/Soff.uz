
import React from 'react'
import FileImagesScroll from '../details-actions/file-images-scroll';
import FileActions from '../details-actions/file-actions';
import SellerProfile from '../details-seller-profile/seller-profile';
import Description from '../details-actions/description';
import Tags from '../details-actions/tags';
import OrderCardBtn from '../details-seller-profile/order-card-btn';
import Link from 'next/link';

function FileProductsDetails({ product }) { 
  
  return (
    <div className='seller_container_products_details'>
      <div className="ps-container p-0">
        <div className="ps-product--detail_seller my-5">
          <div>
            <p className='titleh3' style={{ fontWeight: 600, fontSize: "25px", lineHeight: "37.5px", color: "#312F30", margin: 0 }}>{product?.title}</p>
            <Link href={`/scientific-resources/${product?.category?.slug}?childCategory=${product?.category?.slug}`}>
              <a>
                <p className='m-0 fs-3'>{product?.category?.name}</p>
              </a>
            </Link>
          </div>
          <div className="ps-product__header_seller ">
            <FileImagesScroll
              product={product}
            />
            <div className='seller_products_right_section'>
              <div 
                className='seller_products_actions_container'
                style={{height:!(product?.tag.length > 0) && '100%'}}>
                <FileActions product={product} />
                <Tags tag={product?.tag} />
              </div>
            </div>
          </div>

          <div className='ps-product__header_seller_secound'>
            <Description description={product?.description} />
            
            {/* <SellerProfile product={product}/> */}
            <OrderCardBtn product={product}/>
          </div>

        </div>
      </div>
    </div>
  )
}

export default FileProductsDetails