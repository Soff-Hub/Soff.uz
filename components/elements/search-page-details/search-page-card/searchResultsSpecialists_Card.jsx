import React from 'react';

export default function SearchResultsSpecialists_Card ({data}) {
    console.log(' asdasdasdasd  =>',data);
    
    return (
        <div className='Search_Results_Specialists_Card'>
            <img
                className='Search_Results_Specialists_Card_img'
                src={data.img}
                alt=''
            />
            <div className='Search_Results_Specialists_Card_status_box'>
                <img
                    className='Search_Results_Specialists_Card_status_img'
                    src={data.statusImg}
                    alt=''
                />
                <p className='Search_Results_Specialists_Card_status'>
                    {data.status}
                </p>
            </div>
            <p className='Search_Results_Specialists_Card_isName'>
                {data.isName}
            </p>
            <p className='Search_Results_Specialists_Card_job'>{data.job}</p>
        </div>
    );
}
