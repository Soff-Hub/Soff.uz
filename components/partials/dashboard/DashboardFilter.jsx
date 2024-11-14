import { Select } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useFetchDashboardDateQuery } from '~/rtk-store/dashboard/api';
import { updateGraphParams } from '~/rtk-store/dashboard/slice';

export default function DashboardFilter() {
    const { graphParams } = useSelector(state => state?.dashboard)
    const { data } = useFetchDashboardDateQuery()
    const dispatch = useDispatch()

    const handleChangeYear = (year) => {
        dispatch(updateGraphParams({ year }))
    }

    const handleChangeMonth = (month) => {
        dispatch(updateGraphParams({ month }))
    }

    return (
        <div className="dashboard-div mb-2">
            {
                data ? (
                    <>
                        <Select
                            defaultValue={{
                                value: +graphParams.year,
                                label: `${+graphParams?.year}-yil bo'yicha hisobotlar`,
                            }}
                            style={{
                                width: 300,
                            }}
                            options={data?.map((el) => ({
                                value: +el?.year,
                                label: `${+el?.year}-yil bo'yicha hisobotlar`,
                            }))}
                            onChange={handleChangeYear}
                            className="me-2"
                        />
                        <Select
                            defaultValue={{
                                label: `Barcha oy ma'lumotlari`,
                                value: '',
                            }}
                            style={{
                                width: 300,
                            }}
                            onChange={handleChangeMonth}
                            options={[
                                {
                                    label: `Barcha oy ma'lumotlari`,
                                    value: '',
                                },
                                ...(data?.filter(
                                    (item) => item?.year === graphParams?.year
                                )
                                    .map((item) =>
                                        item?.months?.map((el) => ({
                                            label: `${el.name} oyi ma'lumotlari`,
                                            value: el.value,
                                        }))
                                    )[0] ||
                                    []),
                            ]}
                        />
                    </>
                ) : ''
            }

        </div>
    )
}
