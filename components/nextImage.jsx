import Image from 'next/image'
import React from 'react'

export default function NextImage({url, width, height}) {
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
  />
  )
}
