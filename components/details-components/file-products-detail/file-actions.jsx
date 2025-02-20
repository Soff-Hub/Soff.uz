import React from 'react'
import { Button } from 'antd'
import { DownloadOutlined, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import TagsComponents from './tagsComponents';
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
                    <h2>{addPeriodToThousands(product?.price)} so'm</h2>
                    <i className="fa-2x text-success fa-solid fa-share-nodes"></i>
                </div>
                <ul className='fs-2 p-0 d-flex flex-column gap-3' style={{ listStyle: "none" }}>
                    {product?.document?.page_count && <li>
                        <i className='fa-solid fa-file mr-2 text-success'></i>  Betlar soni: {product?.document?.page_count} ta
                    </li>}
                    {product?.document?.file_size && <li>
                        Fayli hajmi : {product?.document?.file_size}
                    </li>}
                    {product?.document?.file_type && <li >
                        Fayl turi: <span

                            style={{
                                color: "white",
                                padding: "5px 11px",
                                borderRadius: "4px",
                                backgroundColor: fileColors[product?.document?.file_type] || "#007DFF"
                            }}>
                            {' '}
                            {product?.document?.file_type}
                        </span>
                    </li>}
                    {product?.upload_count > 0 && <li >
                        Xarid qilinganlar soni: {product?.upload_count} ta
                    </li>}
                </ul>

                <div className='d-flex flex-column gap-3 '>
                    <div className=' d-flex align-items-center gap-3'>
                        <Button iconPosition='end' style={{ height: "58px", fontSize: "20px" }} type="text" variant='solid' className='w-100 border-2 border-success text-success' icon={<ShoppingCartOutlined />} size={"large"}>
                            Savatga qo’shish
                        </Button>
                        <Button iconPosition='end' style={{ height: "58px", width: "80px", fontSize: "28px" }} type="text" variant='solid' className='border-2 border-success text-success' icon={<HeartOutlined />} size={"large"}>
                        </Button>
                    </div>
                    <Button iconPosition='end' style={{ height: "58px", fontSize: "20px" }} type="primary" className='w-100 bg-success' icon={<DownloadOutlined />} size={"large"}>
                        Hoziroq xarid qilish
                    </Button>
                </div>

            </div>
            <div className=" d-flex justify-content-start align-content-center gap-3 flex-wrap">
                {product?.tag?.length >
                    0 &&
                    product?.tag.map(
                        (
                            item,
                            i
                        ) => (
                            <TagsComponents name={item.name} />
                        )
                    )}
            </div>
        </div>
    )
}

export default FileActions