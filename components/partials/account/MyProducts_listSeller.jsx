import { Table, Pagination, Input, Button, Select, Card, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { DownloadOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Link from "next/link";
import { baseURL } from "~/repositories/api";
import Axios from "axios";
import Cookies from "js-cookie";

const { Option } = Select;

export default function PurchasedProducts() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("file"); // default "file"
  const [currPage, setCurrPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const token = Cookies.get('token');

  // Reset page when search/category changes
  useEffect(() => {
    setCurrPage(1);
  }, [search, category]);

  // Fetch data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingData(true);
        const response = await Axios.get(`${baseURL}seller/approved-product`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            page: currPage,
            direction: category || '',
            start_date: '',
            end_date: '',
            search: search || ''
          }
        });
        setProducts(response.data.results || []);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchProducts();
  }, [search, category, currPage]);

  const paginatedProducts = products.slice(
    (currPage - 1) * pageSize,
    currPage * pageSize
  );

  const handleDownload = (file, id) => {
    setLoading(id);
    const link = document.createElement("a");
    link.href = file;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setLoading(null), 2000);
  };

  const columns = [
    {
      title: "Yuklab olish",
      dataIndex: "file",
      key: "download",
      render: (file, record) => (
        <Button
          loading={loading === record.id}
          type="primary"
          shape="round"
          size="large"
          icon={<DownloadOutlined />}
          onClick={() => handleDownload(file, record.id)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-lg"
        >
          Yuklab olish
        </Button>
      ),
    },
    {
      title: "Rasm",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image.poster_url} alt="Product" width={50} />
      ),
    },
    {
      title: "Nomi",
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <Link href={`/product/${name.slug}`}>
          <a className="cursor-pointer">{name.title}</a>
        </Link>
      ),
    },
    {
      title: "Kategoriyasi",
      dataIndex: "category",
      key: "category",
      render: (category) => <span>{category.name}</span>,
    },
    { title: "Narxi", dataIndex: "discount_price", key: "price" },
    { title: "Xarid sanasi", dataIndex: "created_at", key: "created_at" },
  ];

  const categoryList = [
    { title: "Ilmiy ishlar", value: "file" },
    { title: "3D modellar va Interier dizaynlar", value: "3d" },
    { title: "Dizayn shablonlar", value: "design" },
    { title: "Veb saytlar", value: "website" },
    { title: "Turli sohalar uchun shablonlar", value: "template" },
    { title: "Video darsliklar", value: "video" },
  ];

  return (
    <Card className="p-4 mb-3">
      <div className="container mt-4">
        <div className="d-flex align-items-center gap-2 fs-4 my-3">
          <ShoppingCartOutlined />
          <span className="fw-bold">Xarid Qilingan Materiallar</span>
        </div>
        <div className="row g-3 align-items-center">
          <div className="col-12 col-sm-6">
            <Input
              placeholder="Qidiruv"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-12 col-sm-6">
            <Select
              value={category}
              placeholder="Kategoriya"
              className="w-100"
              onChange={(value) => setCategory(value)}
              allowClear
            >
              {categoryList.map((item, index) => (
                <Option key={index} value={item.value}>
                  {item.title}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        {!loadingData ? (
          <div className="table-responsive mt-3">
            <Table
              dataSource={paginatedProducts}
              columns={columns}
              pagination={false}
              rowKey="id"
            />
          </div>
        ) : (
          Array.from({ length: 3 }).map((_, index) => (
            <div className="mb-3 px-2" key={index}>
              <Skeleton active paragraph={{ rows: 1, width: "100%" }} />
            </div>
          ))
        )}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <Select
            value={pageSize}
            onChange={(value) => setPageSize(value)}
            className="w-auto"
          >
            <Option value={5}>5 ta</Option>
            <Option value={10}>10 ta</Option>
            <Option value={50}>50 ta</Option>
          </Select>
          <Pagination
            current={currPage}
            total={products.length}
            pageSize={pageSize}
            onChange={(page) => setCurrPage(page)}
          />
        </div>
      </div>
    </Card>
  );
}
