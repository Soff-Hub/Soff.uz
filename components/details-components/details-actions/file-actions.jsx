import React from 'react'
import { Button } from 'antd'
import { DownloadOutlined, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import TagsComponents from './tagsComponents';
import ShareAltOutlined from '@ant-design/icons/ShareAltOutlined';
import { addPeriodToThousands } from '~/components/partials/account/price-formatter';

function FileActions({ product }) {

    const fileColors = {
        ".doc": "#007DFF",
        ".xls": "#509C62",
        ".xlsx": "#509C62",
        ".ppt": "#DC8452",
        ".pdf": "#E22C2F",
        ".avi": "#6EB5E9",
        "mp3": "#88549E",
        "html": "#6D96A",
        "zip": "#E4BD3E",
        ".psd": "#0053BD",
        ".pptx": "#DD7657"
    };

    return (
        <div className='seller_products_actions_container'>
            <div className='seller_products_actions'>
                <div className='d-flex justify-content-between align-items-center'>

                    <div className='price_container'>
                        {
                            product?.discount_price === 0 ? (<h2>Bepul</h2>) :
                                product?.discount === 0 ? (
                                    <h2>{addPeriodToThousands(product?.discount_price || 0)} so'm</h2>
                                ) :
                                    <div className='d-flex gap-3'>
                                        <h2>{addPeriodToThousands(product?.discount_price || 0)} so'm</h2>
                                        <del>{addPeriodToThousands(product?.price || 0)} so'm</del>
                                    </div>
                        }
                    </div>


                    <div className='icon_hover text-success'>
                        <ShareAltOutlined  style={{ fontSize: "30px" }} />
                    </div>
                </div>
                <ul className='fs-2 p-0 d-flex flex-column gap-3' style={{ listStyle: "none" }}>
                    {product?.upload_count > 0 && <li className='w-100 d-flex align-items-center justify-content-between gap-3'>
                        <span>Mahsulotni sotilgan soni:</span> <span>{product?.upload_count} ta</span>
                    </li>}
                    {product?.document?.content_duration && <li className='w-100 d-flex align-items-center justify-content-between gap-3'>
                        <span>Video davomiyligi:</span> <span>
                            {' '}
                            {product?.document?.content_duration}
                        </span>
                    </li>}
                    {product?.document?.page_count && <li className='w-100 d-flex align-items-center justify-content-between gap-3'>
                        <span>Betlar soni:</span> <span>{product?.document?.page_count} ta</span>
                    </li>}
                    {product?.document?.file_size && <li className='w-100 d-flex align-items-center justify-content-between gap-3'>
                        <span>Fayl hajmi :</span>  <span>{product?.document?.file_size}</span>
                    </li>}
                    {product?.document?.file_type && <li className='w-100 d-flex align-items-center justify-content-between gap-3'>
                        <span>Fayl turi:</span> <span

                            style={{
                                color: "white",
                                padding: "4px 9px",
                                borderRadius: "4px",
                                backgroundColor: fileColors[product?.document?.file_type] || "#007DFF"
                            }}>
                            {' '}
                            {product?.document?.file_type}
                        </span>
                    </li>}


                </ul>

                <div className='d-flex flex-column gap-3 '>
                    <div className=' d-flex align-items-center gap-3 justify-content-end'>
                        {product?.discount_price !== 0 && <Button iconPosition='end' style={{ height: "58px", fontSize: "20px" }} type="text" variant='solid' className='w-100 border-2 border-success text-success button_hover' icon={<ShoppingCartOutlined />} size={"large"}>
                            Savatga qo’shish
                        </Button>}
                        <Button iconPosition='end' style={{ height: "58px", width: "80px", fontSize: "28px" }} type="text" variant='solid' className='border-2 border-success text-success button_hover' icon={<HeartOutlined />} size={"large"}>
                        </Button>
                    </div>
                    {product?.document?.file_url ?
                        <a href={product?.document?.file_url} target='_blank'>
                            <Button iconPosition='end' style={{ height: "58px", fontSize: "20px" }} type="primary" className='w-100 bg-success' icon={<DownloadOutlined />} size={"large"}>
                                Yuklab olish
                            </Button>
                        </a> :

                        <Button iconPosition='end' style={{ height: "58px", fontSize: "20px" }} type="primary" className='w-100 bg-success' icon={<DownloadOutlined />} size={"large"}>
                            Hoziroq xarid qilish
                        </Button>}
                </div>

            </div>
            {product?.tags?.length >
                0 && <div className=" d-flex justify-content-start align-content-center gap-3 flex-wrap">
                    {
                        product?.tags.map(
                            (
                                item,
                                i
                            ) => (
                                <TagsComponents name={item.name || item} />
                            )
                        )}
                </div>}
        </div>
    )
}

export default FileActions