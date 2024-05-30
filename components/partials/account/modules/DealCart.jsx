import Router from 'next/router';
import React  from 'react';

export default function DealCart({
    type,
    deadline,
    description,
    title,
    price,
    application_count,
    status,
    deal_type,
    id
}) {


    const onClickCard = () => {
        if (type === 'apply') {
            Router.push(`/deal/${id}`)
        }
    }

    return (
        <div
            className="rounded-3 px-4 py-4 bg-white"
            style={{ cursor: 'pointer' }}
            onClick={onClickCard}
        >
            <div className="d-md-flex justify-content-between  ">
                <h3 className="text-success"> {title ? title : "Kurs ishi kerak"} </h3>
                <div>
                    {' '}
                    <strong className="fw-medium">Narxi:</strong>{' '}
                    <span className="text-success fs-3 fw-bold">
                        {price ? JSON.parse(price) + " so'm" : '23 000 so\'m'}
                    </span>
                </div>
            </div>
            {type === 'application' ? (
                <div className="d-flex justify-content-between gap-4">
                    <div className="text-start">
                        <div>
                            {' '}
                            <span className="text-success fs-3 fw-medium">
                                <i class="fa-solid fa-calendar-days"></i>
                            </span>{' '}
                            <span className="fw-medium ">
                                Muddati :  {deadline ? deadline + ' kun' : ''}{' '}
                            </span>
                        </div>
                        <div>
                            {' '}
                            <span className="text-success fs-3 fw-medium">
                                <i class="fa-regular fa-folder-open"></i>
                            </span>{' '}
                            <span className="fw-medium ">
                                Turi : <span> {deal_type?.name} </span>{' '}
                            </span>
                        </div>
                        <div>
                            {' '}
                            <span className="text-success fs-3 fw-medium">
                                <i class="fa-solid fa-eye"></i>
                            </span>{' '}
                            <span className="fw-medium ">
                                Ko'rishlar soni : <span>2</span>{' '}
                            </span>
                        </div>
                        {status === 'active' ? (
                            <div className="bg-success rounded-3 d-flex justify-content-center align-items-center gap-2 p-1  mt-3 ">
                                {' '}
                                <span className="text-white fs-3 fw-medium d-block">
                                    <i class="fa-solid fa-circle-check"></i>
                                </span>{' '}
                                <span className="fw-medium text-white  d-block">
                                    tasdiqlangan
                                </span>
                            </div>
                        ) : status === 'new' ? (
                            <div className="bg-warning rounded-3 d-flex justify-content-center align-items-center gap-2 p-1 mt-3 ">
                                {' '}
                                <span className="text-success fs-3 fw-medium d-block">
                                    <i class="fa-regular fa-clock"></i>
                                </span>{' '}
                                <span className="fw-medium  d-block">
                                    moderatsiya
                                </span>
                            </div>
                        ) : (
                            <div className="bg-danger rounded-3 d-flex justify-content-center align-items-center gap-2 p-1 mt-3 ">
                                {' '}
                                <span className="text-white fs-3 fw-medium d-block">
                                    <i class="fa-solid fa-circle-xmark"></i>
                                </span>{' '}
                                <span className="fw-medium text-white  d-block">
                                    bekor qilingan
                                </span>
                            </div>
                        )}
                    </div>
                    <div>
                        <span className="text-success fs-3 fw-medium">
                            arizalar
                            :{' '}
                        </span>{' '}
                        <span className="fw-medium ">
                            {' '}
                            {application_count}{' '}
                        </span>
                    </div>
                </div>
            ) : type === 'apply' ? (
                <div>
                    <div className="d-md-flex justify-content-between gap-4 align-items-start">
                        <div className="d-flex align-items-center mb-3">
                            <img
                                className="d-block"
                                width={80}
                                src="/static/img/docCopy.jpg"
                                alt="sca"
                            />
                            <div>
                                <div className="text-start">
                                    <span className="text-success fs-3 fw-medium">
                                        <i class="fa-solid fa-calendar-days"></i>
                                    </span>{' '}
                                    <span className="fw-medium ">
                                        17-iyul 2025-yil
                                    </span>
                                </div>
                                <div className="text-start">
                                    <span className="text-success fs-3 fw-medium">
                                        arizalar :{' '}
                                    </span>{' '}
                                    <span className="fw-medium ">{application_count || "Hechkim topshirmagan"}</span>
                                </div>
                                <div className="text-start">
                                    <span className="text-success fs-5 fw-medium">
                                        <i class="fa-solid fa-eye"></i>{' '}
                                    </span>{' '}
                                    <span className="fw-medium ">{19}</span>
                                </div>
                            </div>
                        </div>
                        { <div
                            className="border h-25 fs-4 px-3 py-2 rounded-3 btn-outline-success fw-md text-center"
                            style={{ cursor: 'pointer' }}
                            onClick={() => Router.push(`/deal/${id}`)}>
                            Ariza topshirish
                        </div>}
                    </div>
                </div>
            ) : type === 'apply_detail' ? (
                <div>
                    <div className="d-md-flex justify-content-between gap-4 ">
                        <div className="d-flex ">
                            <img
                                className="d-block"
                                width={80}
                                src="/static/img/docCopy.jpg"
                                alt="sca"
                            />
                            <div>
                                <div className="text-start">
                                    <span className="text-success fs-3 fw-medium">
                                        <i class="fa-solid fa-user"></i>
                                    </span>{' '}
                                    <span className="fw-medium ">
                                        Jasue Baxtiyarov
                                    </span>
                                </div>
                                <div className="text-start">
                                    <span className="text-success fs-3 fw-medium">
                                        <i class="fa-solid fa-calendar-days"></i>
                                    </span>{' '}
                                    <span className="fw-medium ">
                                        17-iyul 2025-yil
                                    </span>
                                </div>
                                <div className="text-start">
                                    <span className="text-success fs-3 fw-medium">
                                        arizalar :{' '}
                                    </span>{' '}
                                    <span className="fw-medium "> 2</span>
                                </div>
                            </div>
                        </div>
                        <div
                            className="border h-25 fs-4 p-3 bg-success rounded-3 text-white fw-bold text-center"
                            onClick={() => Router.push('/deal/123')}>
                            Ariza topshirish
                        </div>
                    </div>
                    <p className="mt-5">
                        Ko'rishlar soni : <span>2</span>{' '}
                    </p>
                </div>
            ) : (
                <div className="d-flex justify-content-between gap-4">
                    <div>
                        <div className="text-end">
                            <span className="text-success fs-3 fw-medium">
                                <i class="fa-solid fa-calendar-days"></i>
                            </span>{' '}
                            <span className="fw-medium ">17-iyul 2025-yil</span>
                        </div>
                        <div>
                            <span className="text-success fs-3 fw-medium">
                                arizalar :{' '}
                            </span>{' '}
                            <span className="fw-medium "> 2</span>
                        </div>
                    </div>
                </div>
            )}
            <p>{description ? description : 'Description'}</p>
        </div>
    );
}
