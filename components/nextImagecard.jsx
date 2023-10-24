import Image from 'next/image'
import React from 'react'

export default function NextImageCard({url, width, height, clasS}) {
    const loaderProp =({ src }) => {
        return src;
      }
  return (
    <Image
    src={url}
    width={width}
    height={height}
    alt={url}
    loader={loaderProp}
    className={clasS}
    style={{objectFit:'contain'}}
  />
  )
}
