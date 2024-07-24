import React from 'react'
import DefaultVideo from './thumbnail/DefaultVideo'
import ModuleVideoDetailTopInformation from './modules/ModuleVideoDetailTopInformation'
import VideoDetailsDescription from './modules/VideoDetails'
import VideoDetailAction from './modules/VideoDetailAction'
import DefaultDescription from './description/DefaultDescription'
import Link from 'next/link'

function VideoPlayDetails({
      product,
    views,
    admin,
    ActiveTag,
    isPlay,
    setIsPlay,}
) {


    return (
        <div >

            <DefaultVideo product={product} isPlay={isPlay} setIsPlay={setIsPlay} />
            <ModuleVideoDetailTopInformation
                product={product}
                views={views}
                admin={admin}
            />
            <div className="col-md-12 mt-5 p-0">
                <VideoDetailsDescription
                    product={product}
                    views={views}
                />
                <VideoDetailAction
                    product={product}
                    admin={admin}
                />

            </div>

            {admin && ActiveTag}
            {product?.tag?.length > 0 && (
                <div className="mb-xl-5 mb-lg-5 ">
                    <p>Tezkor teglar</p>
                    <div className=" d-flex justify-content-start align-content-center flex-wrap">
                        {product?.tag?.length > 0 &&
                            product?.tag.map((item, i) => (
                                <div
                                    key={i}
                                    className="m-2 tag-product">
                                    <Link href={`/search?keyword=${item?.name?.replace(/^#/, '')}`} >
                                        <a>
                                            {' '}
                                            {item.name}{' '}
                                        </a>
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>
            )}
            <DefaultDescription product={product} />
        </div>
    )
}

export default VideoPlayDetails