import { Select, Slider } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
    AppstoreOutlined,
    FileTextOutlined,
    PictureOutlined,
    VideoCameraOutlined,
    GlobalOutlined,
    CodeOutlined,
    LayoutOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';


const fileTypes = [
    { label: "Barchasi", value: "" },
    { label: 'DOCX', value: '.docx' },
    { label: 'DOC', value: '.doc' },
    { label: 'PPTX', value: '.pptx' },
    { label: 'PPT', value: '.ppt' },
    { label: 'PDF', value: '.pdf' },
];
const { Option } = Select;

const orders = [
    { label: 'Narx (arzon)', value: 'price' },
    { label: 'Narx (qimmat)', value: '-price' },
    { label: "Ko'p ko‘rilganlar bo‘yicha", value: 'views' },
    { label: 'Ko‘p xarid qilingan', value: 'purchased_count' },
];

const allTypes = [
    { title: 'Barchasi', value: 'all', icon: <AppstoreOutlined /> },
    { title: 'Fayllar', value: 'file', icon: <FileTextOutlined /> },
    { title: '3D modellar', value: '3d', icon: <PictureOutlined /> },
    {
        title: 'Dizayn shablonlar',
        value: 'design',
        icon: <LayoutOutlined />,
    },
    {
        title: 'Turli shablonlar',
        value: 'template',
        icon: <CodeOutlined />,
    },
    { title: 'Veb saytlar', value: 'website', icon: <GlobalOutlined /> },
    { title: 'Videolar', value: 'video', icon: <VideoCameraOutlined /> },
];

export default function SearchResultsProductsFilter({
    total,
    parentData,
    childData,
}) {
    const router = useRouter();



    const [pageRange, setPageRange] = useState([
        Number(router.query.page_from) || 1,
        Number(router.query.page_to) || 100,
    ]);

    const handleChange = newQuery => {
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
                query: {
                    page: 1,
                    search: router.query.search || '',
                    type: 'all',
                    file_type: '',
                    page_from: '',
                    page_to: '',
                },
            },
            undefined,
            { scroll: false }
        );
    };

    return (
        <div className="Search_Results_Products_form_box ">
            <div className="row align-items-center mb-3">
                <div className="col-12 col-md-3">
                    <p className="countProduct text-nowrap m-0">
                        {total ? `${total} ta mahsulot topildi` : ''}
                    </p>
                </div>
            </div>

            <form className="Search_Results_Products_form">
                <div className="row g-3">
                    <div className="col-6 col-lg-3">
                        <Select
                            style={{ width: '100%' }}
                            value={router.query.type || 'file'}
                            allowClear
                            onClear={handleClearAll}
                            onChange={value =>
                                handleChange({
                                    type: value,
                                    parentCategory: '',
                                    category: '',
                                    file_type: '',
                                    page_from: '',
                                    page_to: '',
                                })
                            }>
                            {allTypes.map(item => (
                                <Option key={item.value} value={item.value}>
                                    <span className="d-flex align-items-center gap-2">
                                        {item.icon} {item.title}
                                    </span>
                                </Option>
                            ))}
                        </Select>
                    </div>

                    <div className="col-6 col-lg-3">
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Fayl turi"
                            value={router.query.file_type || undefined}
                            disabled={router.query.type !== 'file'}
                            allowClear
                            onClear={() => handleChange({ file_type: '' })}
                            onChange={value =>
                                handleChange({ file_type: value })
                            }
                            options={fileTypes}
                        />
                    </div>

                    <div className="col-6 col-lg-3">
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Katta kategoriya"
                            value={router.query.parentCategory || undefined}
                            disabled={
                                !router.query.type ||
                                router.query.type === 'all'
                            }
                            allowClear
                            onClear={() =>
                                handleChange({
                                    parentCategory: '',
                                    category: '',
                                })
                            }
                            onChange={value => {
                                const selected = childData?.results?.find(
                                    cat => cat.slug === value
                                );
                                handleChange({
                                    parentCategory: selected?.slug || '',
                                    category: selected?.id,
                                });
                            }}
                            options={childData?.results?.map(cat => ({
                                value: cat.slug,
                                label: cat.name,
                            }))}
                        />
                    </div>

                    <div className="col-6 col-lg-3">
                        <div className="d-flex align-items-center gap-2">
                            <Select
                                style={{ width: '100%' }}
                                placeholder="Saralash"
                                value={router.query.order_by || undefined}
                                allowClear
                                onClear={() => handleChange({ order_by: '' })}
                                onChange={value =>
                                    handleChange({ order_by: value })
                                }
                                options={orders}
                            />
                            {(router.query.type !== 'all' ||
                                router.query.parentCategory ||
                                router.query.category ||
                                router.query.order_by ||
                                router.query.file_type ||
                                router.query.page_from ||
                                router.query.page_to) && (
                                    <CloseCircleOutlined
                                        style={{
                                            fontSize: 20,
                                            cursor: 'pointer',
                                            color: '#ff4d4f',
                                            minWidth: '20px',
                                        }}
                                        title="Barchasini tozalash"
                                        onClick={handleClearAll}
                                    />
                                )}
                        </div>
                    </div>

                    {router.query.type === 'file' && (
                        <div className="col-12">
                            <div className="p-2 border rounded bg-light">
                                <p className="mb-0 fw-medium">Betlar soni</p>
                                <Slider
                                    range
                                    min={1}
                                    max={100}
                                    value={pageRange}
                                    onChange={val => setPageRange(val)}
                                    onAfterChange={val =>
                                        handleChange({
                                            page_from: val[0],
                                            page_to: val[1],
                                        })
                                    }
                                    style={{
                                        margin: "6px"
                                    }}
                                />
                                <div className="d-flex justify-content-between">
                                    <span className="text-muted small">
                                        {pageRange[0]} bet
                                    </span>
                                    <span className="text-muted small">
                                        {pageRange[1]} bet
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}
