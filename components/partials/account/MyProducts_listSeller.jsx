import { Pagination, Input, Button, Select, Card, Skeleton, Table } from 'antd';
import { useState, useMemo, useCallback } from 'react';
import { DownloadOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { api, baseURL } from '~/repositories/api';
import axios from 'axios';
import Cookies from 'js-cookie';
import useDebounce from '~/shared/hooks/useDebounce';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import useResponsive from '~/shared/utilities/useResponsive';
import { useQuery } from '@tanstack/react-query';
import { cn } from '~/shared/utilities/cn';
import dayjs from 'dayjs';
import { useTimeManager } from '~/shared/hooks/useTimeManager';

const { Option } = Select;

const CATEGORY_LIST = [
    { title: 'Ilmiy ishlar', value: 'file' },
    { title: '3D modellar va Interier dizaynlar', value: '3d' },
    { title: 'Dizayn shablonlar', value: 'design' },
    { title: 'Veb saytlar', value: 'website' },
    { title: 'Turli sohalar uchun shablonlar', value: 'template' },
    { title: 'Video darsliklar', value: 'video' },
];

export default function PurchasedProducts() {
    const { startTimeout } = useTimeManager();
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);
    const [category, setCategory] = useState('file');
    const [currPage, setCurrPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [loadingId, setLoadingId] = useState(null);

    const token = Cookies.get('token');

    const handleDownload = useCallback((file, id) => {
        setLoadingId(id);
        const link = document.createElement('a');
        link.href = file;
        link.target = '_blank';
        link.setAttribute('download', '');
        document.body.appendChild(link);
        link.click();
        link.remove();
        startTimeout(() => {
            setLoadingId(null);
        }, 1000);
    }, []);

    const handleDownloadThroughTelegram = async (getId) => {
        try {
            const fileSourceValue = await api.get(
                `seller/return-telegram-link/${getId}/`
            );
            window.open(fileSourceValue.data.link, '_blank');
        } catch (error) {
            console.error('Telegram download error:', error);
        }
    };

    const columns = useMemo(
        () => [
            {
                title: 'Yuklab olish',
                dataIndex: 'document',
                key: 'download',
                render: (document, record) => (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '100%',
                            width: '350px',
                        }}>
                        <Button
                            loading={loadingId === record.id}
                            type="primary"
                            shape="round"
                            size="middle"
                            icon={<DownloadOutlined />}
                            onClick={() =>
                                handleDownload(document.file_url, record.id)
                            }>
                            Yuklab olish
                        </Button>
                        <Button
                            loading={loadingId === record.id}
                            type="link"
                            shape="round"
                            size="middle"
                            style={{
                                border: '1px solid #1890ff',
                                marginLeft: '10px',
                                color: '#1890ff',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            onClick={() =>
                                handleDownloadThroughTelegram(document.id)
                            }>
                            <img
                                src="/static/img/telegram.png"
                                alt=""
                                height={20}
                            />
                            <span>Telegram orqali olish</span>
                        </Button>
                    </div>
                ),
            },
            {
                title: 'Rasm',
                dataIndex: 'document',
                key: 'image',
                render: (document) =>
                    document?.poster_url ? (
                        <img
                            src={document?.poster_url}
                            alt="Product"
                            width={50}
                        />
                    ) : (
                        '-'
                    ),
            },
            {
                title: 'Nomi',
                dataIndex: 'document',
                key: 'name',

                render: (document) => (
                    <Link
                        href={`/product/${document?.slug || ''}`}
                        classdocument="cursor-pointer">
                        {document?.title || 'Noma’lum'}
                    </Link>
                ),
            },
            {
                title: 'Kategoriyasi',
                dataIndex: 'document',
                key: 'category',
                render: (document) => document?.category?.name || '-',
            },
            {
                title: 'Narxi',
                dataIndex: 'price',
                key: 'price',
                render: (p) => <span>{formatCurrencyWithSpace(p)} so'm</span>,
            },
            {
                title: 'Xarid sanasi',
                dataIndex: 'created_at',
                key: 'created_at',
                render: (date) => (
                    <span>{dayjs(date).format('YYYY-MM-DD HH:mm')}</span>
                ),
            },
        ],
        [loadingId, handleDownload]
    );

    const { data: productsData, isLoading: loadingTable } = useQuery({
        queryKey: [
            'purchased-products',
            currPage,
            pageSize,
            category,
            debouncedSearch,
        ],
        queryFn: async () => {
            if (!token) return;
            const { data } = await axios.get(
                `${baseURL}seller/purchased-products/`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        page: currPage,
                        page_size: pageSize,
                        direction: category,
                        search: debouncedSearch,
                        t: Date.now(),
                    },
                }
            );
            return data;
        },
    });

    return (
        <Card className="p-4 mb-3">
            <div className="container mt-4">
                <div className="d-flex align-items-center gap-2 fs-4 my-3">
                    <ShoppingCartOutlined />
                    <span className="fw-bold">Xarid Qilingan Materiallar</span>
                </div>

                {/* Search va Filter */}
                <div className="row g-3 align-items-center">
                    <div
                        className="col-12 col-sm-6"
                        style={{
                            height: '32px',
                            paddingLeft: '5px',
                        }}>
                        <Input.Search
                            placeholder="Qidiruv"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <Select
                            value={category}
                            className="w-100"
                            onChange={(value) => setCategory(value)}
                            allowClear>
                            {CATEGORY_LIST.map((item) => (
                                <Option key={item.value} value={item.value}>
                                    {item.title}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </div>

                {/* Purchased Products */}
                <PurchasedProductsLayout
                    products={productsData?.results}
                    columns={columns}
                    loadingTable={loadingTable}
                    handleDownload={handleDownload}
                    handleDownloadThroughTelegram={
                        handleDownloadThroughTelegram
                    }
                    loadingId={loadingId}
                />
                {/* Pagination */}
                <div className="d-flex justify-content-center mt-2">
                    <Pagination
                        current={currPage}
                        total={productsData?.count || 0}
                        pageSize={pageSize}
                        onChange={(page, size) => {
                            setCurrPage(page);
                            setPageSize(size);
                        }}
                        showSizeChanger
                        pageSizeOptions={['5', '10', '20']}
                    />
                </div>
            </div>
        </Card>
    );
}

const PurchasedProductsLayout = ({
    products,
    columns,
    loadingTable,
    handleDownload,
    handleDownloadThroughTelegram,
    loadingId,
}) => {
    const { isDesktop, isMobile } = useResponsive();

    const hasProducts = products && products.length;

    let productsView = (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '64px 16px',
            }}>
            <div
                style={{
                    backgroundColor: '#f9fafb',
                    borderRadius: '50%',
                    padding: '24px',
                    marginBottom: '16px',
                }}>
                <ShoppingCartOutlined
                    style={{
                        fontSize: '36px',
                        color: '#9ca3af',
                    }}
                />
            </div>
            <h3
                style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px',
                }}>
                Xarid qilingan mahsulotlar topilmadi
            </h3>
            <p
                style={{
                    color: '#6b7280',
                    textAlign: 'center',
                    maxWidth: '448px',
                }}>
                Hozircha hech qanday mahsulot sotib olmagan ko'rinasiz. Bizning
                katalogimizni ko'rib chiqing va o'zingizga kerakli mahsulotlarni
                toping.
            </p>
            <Link
                href="/scientific-resources/all?slug=all"
                style={{ marginTop: '24px' }}>
                <Button
                    type="primary"
                    size="large"
                    style={{
                        borderRadius: '8px',
                        padding: '0 24px',
                    }}>
                    Mahsulotlarni ko'rish
                </Button>
            </Link>
        </div>
    );

    if ((isDesktop && hasProducts) || (isDesktop && loadingTable)) {
        productsView = (
            <div className="table-responsive mt-3">
                <Table
                    dataSource={products}
                    columns={columns}
                    rowKey="id"
                    pagination={false}
                    loading={loadingTable}
                />
            </div>
        );
    } else if (loadingTable) {
        productsView = Array(12)
            .fill(0)
            .map((_, i) => (
                <Skeleton
                    key={i}
                    active
                    className="Search_Results_Wrap_skeleton"
                />
            ));
    } else if (hasProducts) {
        productsView = (
            <div
                className="mt-3"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}>
                {products.map((item) => (
                    <div
                        key={item.id}
                        className={cn(
                            'ps-seller-product',
                            isMobile ? 'flex-column' : 'flex-row',
                            'items-center gap-4'
                        )}>
                        {!isMobile ? (
                            <div
                                className={cn(
                                    'flex-grow',
                                    'flex',
                                    'flex-col',
                                    'items-center'
                                )}>
                                <div
                                    className={cn(
                                        'flex-shrink-0 relative',
                                        'rounded',
                                        'overflow-hidden'
                                    )}
                                    style={{
                                        width: 100,
                                        height: 140,
                                    }}>
                                    <img
                                        src={
                                            item.document?.poster_url ||
                                            '/no-image.png'
                                        }
                                        alt={item.document?.title || 'No Image'}
                                        className={cn('rounded-lg')}
                                        style={{
                                            objectFit: 'cover',
                                            objectPosition: 'center',
                                            width: '100%',
                                            height: 'auto',
                                        }}
                                    />
                                </div>
                            </div>
                        ) : null}

                        <div
                            className={
                                (cn('flex', 'flex-col', 'gap-2'), 'w-100')
                            }>
                            <h3 style={{ marginBottom: '5px' }}>
                                <Link
                                    href={`/product/${item.name?.slug || ''}`}
                                    className="cursor-pointer">
                                    {item.document?.title || 'Noma’lum'}
                                </Link>
                            </h3>

                            <span
                                style={{
                                    color: 'oklch(44.6% .03 256.802)',
                                    marginBottom: '2px',
                                }}>
                                {item.document?.category?.name || '-'}
                            </span>

                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '8px',
                                }}>
                                <div
                                    className={cn(
                                        'text-base',
                                        'font-semibold',
                                        'mt-1'
                                    )}>
                                    {formatCurrencyWithSpace(item?.price)} so'm
                                </div>
                                <div
                                    className={cn(
                                        'text-gray-700 text-sm font-normal'
                                    )}>
                                    {dayjs(item.created_at).format(
                                        'YYYY-MM-DD HH:mm'
                                    )}
                                </div>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexWrap: isMobile ? 'wrap' : 'nowrap',
                                    gap: '8px',
                                    width: '100%',
                                }}>
                                <Button
                                    loading={loadingId === item.id}
                                    type="primary"
                                    shape="round"
                                    size="middle"
                                    style={{
                                        width: '100%',
                                    }}
                                    icon={<DownloadOutlined />}
                                    onClick={() =>
                                        handleDownload(
                                            item.document?.file_url,
                                            item.id
                                        )
                                    }>
                                    Yuklab olish
                                </Button>
                                <Button
                                    loading={loadingId === item.id}
                                    type="link"
                                    shape="round"
                                    size="middle"
                                    style={{
                                        border: '1px solid #1890ff',
                                        color: '#1890ff',
                                        width: '100%',
                                    }}
                                    icon={
                                        <div
                                            style={{
                                                height: 20,
                                                width: 20,
                                            }}>
                                            <img
                                                src="/static/img/telegram.png"
                                                alt=""
                                                style={{
                                                    marginBottom: '2px',
                                                }}
                                                height={20}
                                            />
                                        </div>
                                    }
                                    onClick={() =>
                                        handleDownloadThroughTelegram(
                                            item.document?.id
                                        )
                                    }>
                                    <span>Telegram orqali olish</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return productsView;
};
