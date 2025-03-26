import React from 'react';

export default function SearchResultsProductsFilter (data) {
    console.log(data?.count);

    return (
        <div className='Search_Results_Products_form_box container'>
            <p className='countProduct'>{data?.count?.length} ta mahsulot</p>
            <form action='' className='Search_Results_Products_form'>
                <div className='Search_Results_Products_form_inputBox'>
                    <input type='text' placeholder='Mutaxassisni izlash' />
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='12'
                        height='13'
                        viewBox='0 0 12 13'
                        fill='none'>
                        <path
                            d='M9.47006 9.13465L12 11.6646L11.1646 12.5L8.63465 9.97006C7.72497 10.6978 6.57133 11.1332 5.31661 11.1332C2.38184 11.1332 0 8.75138 0 5.81661C0 2.88184 2.38184 0.5 5.31661 0.5C8.25138 0.5 10.6332 2.88184 10.6332 5.81661C10.6332 7.07133 10.1978 8.22497 9.47006 9.13465ZM8.28487 8.69632C9.00722 7.95188 9.45175 6.93641 9.45175 5.81661C9.45175 3.53194 7.60127 1.68147 5.31661 1.68147C3.03194 1.68147 1.18147 3.53194 1.18147 5.81661C1.18147 8.10127 3.03194 9.95175 5.31661 9.95175C6.43641 9.95175 7.45188 9.50722 8.19632 8.78487L8.28487 8.69632Z'
                            fill='#7B7B7B'
                        />
                    </svg>{' '}
                </div>
                <select name='' id=''>
                    <option value=''>Kategoriya</option>
                    {data?.count?.category_data?.parent.map((item, index) =>
                        console.log(item)()

                        // <option key={index} value=''>
                        //     {item}
                        // </option>
                    )}
                </select>
                <select name='' id=''>
                    <option value=''>Sub kategoriya</option>
                </select>
                <select name='' id=''>
                    <option value=''>Budjet</option>
                </select>
                <select name='' id=''>
                    <option value=''>Reytingi yuqori</option>
                </select>
            </form>{' '}
        </div>
    );
}
