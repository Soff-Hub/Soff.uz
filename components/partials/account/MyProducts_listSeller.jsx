import { Table, Pagination, Input, Button, Select, Card } from "antd";
import { useEffect, useState, useMemo, useCallback } from "react";
import { DownloadOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Link from "next/link";
import { baseURL } from "~/repositories/api";
import Axios from "axios";
import Cookies from "js-cookie";
import useDebounce from "~/shared/hooks/useDebounce";
import { formatCurrencyWithSpace } from "~/shared/utilities/product-helper";

const { Option } = Select;

const CATEGORY_LIST = [
    { title: "Ilmiy ishlar", value: "file" },
    { title: "3D modellar va Interier dizaynlar", value: "3d" },
    { title: "Dizayn shablonlar", value: "design" },
    { title: "Veb saytlar", value: "website" },
    { title: "Turli sohalar uchun shablonlar", value: "template" },
    { title: "Video darsliklar", value: "video" },
];

export default function PurchasedProducts() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("file");
    const [currPage, setCurrPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [loadingId, setLoadingId] = useState(null);
    const [loadingTable, setLoadingTable] = useState(false);
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);

    const debouncedSearch = useDebounce(search, 500);
    const token = Cookies.get("token");

    const handleDownload = useCallback((file, id) => {
        setLoadingId(id);
        const link = document.createElement("a");
        link.href = file;
        link.setAttribute("download", "");
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => setLoadingId(null), 1000);
    }, []);

    const columns = useMemo(
        () => [
            {
                title: "Yuklab olish",
                dataIndex: "file",
                key: "download",
                render: (file, record) => (
                    <Button
                        loading={loadingId === record.id}
                        type="primary"
                        shape="round"
                        size="middle"
                        icon={<DownloadOutlined />}
                        onClick={() => handleDownload(file, record.id)}
                    >
                        Yuklab olish
                    </Button>
                ),
            },
            {
                title: "Rasm",
                dataIndex: "image",
                key: "image",
                render: (image) =>
                    image?.poster_url ? (
                        <img src={image.poster_url} alt="Product" width={50} />
                    ) : (
                        "-"
                    ),
            },
            {
                title: "Nomi",
                dataIndex: "name",
                key: "name",
                render: (name) => (
                    <Link href={`/product/${name?.slug || ""}`} className="cursor-pointer">
                        {name?.title || "Noma’lum"}
                    </Link>
                ),
            },
            {
                title: "Kategoriyasi",
                dataIndex: "category",
                key: "category",
                render: (c) => c?.name || "-",
            },
            { title: "Narxi", dataIndex: "discount_price", key: "price", render: (p) => <span>{formatCurrencyWithSpace(p)} so'm</span>  },
            { title: "Xarid sanasi", dataIndex: "created_at", key: "created_at" },
        ],
        [loadingId, handleDownload]
    );

    const fetchProducts = useCallback(async () => {
        if (!token) return;

        setLoadingTable(true);
        try {
            const { data } = await Axios.get(`${baseURL}seller/approved-product`, {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    page: currPage,
                    page_size: pageSize,
                    direction: category,
                    search: debouncedSearch,
                    t: Date.now(),
                },
            });

            setProducts(data.results || []);
            setTotal(data.count || 0);
        } catch (error) {
            console.error("API Error:", error);
        } finally {
            setLoadingTable(false);
        }
    }, [token, currPage, pageSize, category, debouncedSearch]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <Card className="p-4 mb-3">
            <div className="container mt-4">
                <div className="d-flex align-items-center gap-2 fs-4 my-3">
                    <ShoppingCartOutlined />
                    <span className="fw-bold">Xarid Qilingan Materiallar</span>
                </div>

                {/* Search va Filter */}
                <div className="row g-3 align-items-center">
                    <div className="col-12 col-sm-6">
                        <Input
                            placeholder="Qidiruv"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            allowClear
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <Select
                            value={category}
                            className="w-100"
                            onChange={(value) => setCategory(value)}
                            allowClear
                        >
                            {CATEGORY_LIST.map((item) => (
                                <Option key={item.value} value={item.value}>
                                    {item.title}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </div>

                {/* Table */}
                <div className="table-responsive mt-3">
                    <Table
                        dataSource={products}
                        columns={columns}
                        rowKey="id"
                        pagination={false}
                        loading={loadingTable}
                    />
                </div>

                {/* Pagination */}
                <div className="d-flex justify-content-center mt-2">
                    <Pagination
                        current={currPage}
                        total={total}
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
