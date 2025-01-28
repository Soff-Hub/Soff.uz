import Link from 'next/link';
import React from 'react';

export default function HeaderTitle ({ title, description }) {
    return (
        <div className='text-center py-4 mt-0 headerTitle'>
            <h2 className='w-50 mx-auto fw-normal'>{title}</h2>
            <p className='w-50 mx-auto py-3'>{description}</p>
            <Link
                href='/scientific-resources/details/'
                as={`/scientific-resources/details/`}>
                <a className='px-5 py-4 bg-success btn btn-success rounded-5 text-white font-weight-bold fs-4 text-xl hover-overlay '>
                    Buyurma bering
                </a>
            </Link>
        </div>
    );
}
