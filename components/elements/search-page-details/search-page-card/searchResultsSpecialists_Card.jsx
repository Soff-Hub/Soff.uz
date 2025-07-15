import React from 'react';

export default function SearchResultsSpecialists_Card ({data}) {
    
    return (
        <div className='Search_Results_Specialists_Card'>
            <img
                className='Search_Results_Specialists_Card_img'
                src={data.photo_url}
                alt=''
            />
            <div className='Search_Results_Specialists_Card_status_box'>
                <img
                    className='Search_Results_Specialists_Card_status_img'
                    src={data.statusImg || 'static/img/Ritsar.png'}
                    alt=''
                />
                <p className='Search_Results_Specialists_Card_status'>
                    {data.status}
                </p>
            </div>
            <p className='Search_Results_Specialists_Card_isName'>
                {data.full_name}
            </p>
            <p className='Search_Results_Specialists_Card_job'>{data.position}</p>
        </div>
        
    );
}
