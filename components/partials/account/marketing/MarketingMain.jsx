import { Card, Input, Steps } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '~/hooks/useDebounce';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { baseUrlProfie, orginalApi, orginalUrl } from '~/reositoriy-admin/Repository';
import { setSavedPrfileData } from '~/store/ecomerce/action';
const { Search } = Input

function MarketingMain() {
    const { push } = useRouter()
    const { user } = useSelector(state => state.auth)
    const { profile } = useSelector(state => state.ecomerce)
    const [selected, setSelected] = useState([])
    const [divclass, setDivClass] = useState('')
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingSearch, setLoadingSearch] = useState(false)
    const [search, setSearch] = useState('')
    const searchval = useDebounce(search, 800)

    const dispatch = useDispatch()

    const handleSelect = (value) => {
        setSelected([value])
    }

    const getData = async () => {
        setLoadingSearch(true)
        const resp = await orginalApi.get(orginalUrl + `fields/?search=${searchval}`, { headers: { Authorization: `Bearer ${user?.access}` } })
        setData(resp.data?.results);
        setLoadingSearch(false)
    }

    const sendData = async () => {
        setLoading(true)
        try {
            await axios.patch(baseUrlProfie + 'auth/update-fields/', { fields: selected }, { headers: { 'Authorization': `Bearer ${user?.access}` } })
            const ItemsDataProfile = await GetRepository.getProfile(user?.access);
            dispatch(setSavedPrfileData(ItemsDataProfile))
            push('/account/marketing/dashboard')
        } catch (err) {
            console.log(err);
        }
        setLoading(false)
    }

    useEffect(() => {
        if (profile?.fields) {
            setSelected(profile?.fields?.map(el => el.id) || [])
        }
    }, [profile])

    useEffect(() => {
        getData()
    }, [searchval])

    return (
        <div style={{ position: 'relative' }}>
            <p className='fs-2 mb-4'>
                Marketing qismini shakllantirishimiz uchun o'z sohangizni tanlang (keyinchalik o'zgartirishingiz mumkin)
            </p>

            <div className={divclass}>
                <Search
                    placeholder="Kerakli sohangizni qidiring.."
                    className='mb-4'
                    enterButton
                    loading={loadingSearch}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }} className='mb-4'>
                    {
                        data.map(el => (
                            <div key={el?.id}>
                                <Card
                                    style={{
                                        width: '100%',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onClick={() => handleSelect(el?.id)}
                                    className={`px-2 py-2 ${selected.includes(el?.id) ? 'border-primary text-primary' : ''} text-center`}
                                >
                                    {el?.field}
                                </Card>
                            </div>
                        ))
                    }
                </div>

            </div>
            {/* <div className='vibrate-overlay'></div> */}

            <div className='d-flex justify-content-between gap-2 py-3 stepperff'>
                <button
                    disabled={selected.length < 1 || loading}
                    className='ps-btn text-white py-3'
                    style={{ opacity: selected.length < 1 || loading ? 0.5 : 1 }}
                    // onClick={() => push('/account/marketing/dashboard')}
                    onClick={sendData}
                >
                    Saqlash
                </button>
            </div>
        </div>
    );
}
export default MarketingMain;
