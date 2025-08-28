import { Select } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';

export default function SearchResultsProductsFilter({ parentData, childData, total }) {
    const router = useRouter();
    const { direction, service_parent, category_id } = router.query;

    const directions = [
        { label: "Ilmiy va Akademik Xizmatlar", value: "scientific_work" },
        { label: "3D Dizayn va Vizualizatsiya", value: "three_d" },
        { label: "Grafik Dizayn va Shablonlar", value: "dizayn" },
        { label: "Veb Dasturlash va IT Xizmatlari", value: "web" },
        { label: "Hujjatlar va Professional Shablonlar", value: "document" },
        {label: "Barchasi", value: ""}
    ];

    const handleChange = (newQuery) => {
        router.push(
            {
                pathname: router.pathname,
                query: {
                    ...router.query,
                    ...newQuery,
                    page: 1,
                },
            },
            undefined,
            { scroll: false }
        );
    };

    const handleClearAll = () => {
        router.push(
            {
                pathname: router.pathname,
                query: { page: 1 },
            },
            undefined,
            { scroll: false }
        );
    };

    return (
        <div className="Search_Results_Products_form_box container">
            <div className="row align-items-center mb-3">

            </div>

            <form className="Search_Results_Products_form">
                <div className="row g-3">
                    <div className="col-12 col-lg-2">
                        <p className="countProduct text-nowrap m-0">
                            {total ? `${total} ta xizmat` : 'Xizmatlar yoq'}
                        </p>
                    </div>  
                    {/* Direction select */}
                    <div className="col-6 col-lg-3">
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Yo‘nalish"
                            value={direction || undefined}
                            onClear={() => handleChange({ direction: '', service_parent: '', category_id: '' })}
                            onChange={(value) =>
                                handleChange({ direction: value, service_parent: '', category_id: '' })
                            }
                            options={directions}
                        />                                                                                                                                                                                                                                          
                    </div>

                    {/* Parent category select */}
                    {direction &&
                        <div className="col-6 col-lg-3">
                            <Select
                                style={{ width: '100%' }}                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                                placeholder="Katta kategoriya"
                                value={service_parent ? Number(service_parent) : undefined}
                                allowClear
                                disabled={!parentData?.length} // 🔑 parentData bo‘sh bo‘lsa disable
                                onClear={() => handleChange({ service_parent: '', category_id: '' })}
                                onChange={(value) =>
                                    handleChange({ service_parent: value, category_id: '' })
                                }
                                options={(parentData || [])?.map((cat) => ({
                                    value: cat.id,
                                    label: cat.title,
                                }))}
                            />
                        </div>
                    }

                    {/* Child category select */}
                    {service_parent && childData?.length > 0 && (
                        <div className="col-6 col-lg-3">
                            <Select
                                style={{ width: '100%' }}
                                placeholder="Kategoriya"
                                value={category_id ? Number(category_id) : undefined}
                                allowClear
                                disabled={!childData?.length} // 🔑 childData bo‘sh bo‘lsa disable
                                onClear={() => handleChange({ category_id: '' })}
                                onChange={(value) => handleChange({ category_id: value })}
                                options={(childData || []).map((cat) => ({
                                    value: cat.id,
                                    label: cat.title,
                                }))}
                            />
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}
