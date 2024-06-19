import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive'

const TextDescription = ({ text }) => {
    const [sliceShow, setSliceShow] = useState({ show: false, count: null });
    const isBigScreen = useMediaQuery({ query: '(max-width: 430px)' });


    useEffect(() => {
        if (isBigScreen) {
            setSliceShow({ show: false, count: 60 })
        } else {
            setSliceShow({ show: false, count: 150 })
        }
    }, [isBigScreen]);


    return (
        <p> {
            (text?.length > sliceShow?.count) ?
                (text?.slice(0, sliceShow?.count) + '...')
                : text
        }
            {
                (sliceShow?.show && text?.length < sliceShow?.count) &&
                <span onClick={() => setSliceShow({ show: !sliceShow?.show, count: !isBigScreen ? 150 : 60 })} style={{ cursor: "pointer" }} className='text-primary mx-2'>
                    Yashirish
                </span>
            } {
                (!sliceShow?.show && text?.length > sliceShow?.count) &&
                <span onClick={() => setSliceShow({ show: !sliceShow?.show, count: 500000000 })} style={{ cursor: "pointer" }} className='text-primary mx-2'>
                    Batafsil
                </span>
            }
        </p>
    )
}

export default TextDescription
