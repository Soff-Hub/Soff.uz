import { Badge } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

export default function SearchResultsSpecialists_Card({ data }) {
    const router = useRouter();
    const isOnline = () => {
        if (!data.last_active) return false;
        const lastActiveDate = new Date(data.last_active);
        const now = new Date();
        const diffInMinutes = (now - lastActiveDate) / 1000 / 60;
        return diffInMinutes <= 5;
    }

    return (
        <div
            onClick={() => router.push({ pathname: `seller/${data?.soff_seller_id}` })}
            className='Search_Results_Specialists_Card'
        >
            <img
                className='Search_Results_Specialists_Card_img'
                src={data.photo_url?.trim() || '/static/img/ozodbek.png'}
                alt={data.full_name || ''}
            />

            <div className='Search_Results_Specialists_Card_status_box'>
                <p className='Search_Results_Specialists_Card_status'>
                    {/* {data?.position?.title} */}
                </p>
                {isOnline() ? (
                    <Badge color="green" text="Online" />
                ): <Badge color="" text="Offline" /> }
            </div>

            <p className='Search_Results_Specialists_Card_isName text-wrap'>
                {data.full_name}
            </p>
            <p className='Search_Results_Specialists_Card_job'>{data.position?.title}</p>
        </div>
    );
}
