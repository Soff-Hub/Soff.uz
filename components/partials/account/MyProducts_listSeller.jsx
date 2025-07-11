import { Table, Pagination, Input, Button, Select, Card, Spin } from "antd";
import { useState } from "react";
import { DownloadOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useGet } from "~/repositories/https";
import Link from "next/link";
import { apiForFreelance } from '~/repositories/api';


const { Option } = Select;

export default function PurchasedProducts() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [currPage, setCurrPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(null);
  const { data, isLoading } = useGet("approved-product", `seller/approved-product/?page=1&category=&start_date=&end_date=&search=`, undefined, { enabled: Boolean('approved-product') });

  if (!data) return null;

  const filteredProducts = data.results.filter(
    (p) =>
      p.name.title.toLowerCase().includes(search.toLowerCase()) &&
      (category ? p.category.id === category : true)
  );

  const paginatedProducts = filteredProducts.slice(
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
      render: (image) => <img src={image.poster_url} alt="Product" width={50} />, 
    },
    { 
      title: "Nomi", dataIndex: "name", key: "name",
      render: (name) => (
        <Link href={`/product/${name.slug}`} className='cursor-pointer'>
          <a>
            <span>{name.title}</span>
          </a>
        </Link>
      )
    },
    { title: "Kategoriyasi", dataIndex: "category", key: "category",
      render: (category) => <span>{category.name}</span>, 
    },
    { title: "Narxi", dataIndex: "discount_price", key: "price" },
    { title: "Xarid sanasi", dataIndex: "created_at", key: "created_at" },
  ];

  return (
    <Card 
      className="p-4 mb-3"
    >
      <div className="container mt-4">
        <div className="d-flex align-items-center gap-2 fs-4 my-3">
          <ShoppingCartOutlined /> <span className="fw-bold">Xarid Qilingan Materiallar</span>
        </div>
        <div className="row g-3 align-items-center">
          <div className="col-12 col-sm-6">
            <Input
              placeholder="Qidiruv"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=""
            />
          </div>
          {/* <div className="col-12 col-sm-6">
            <Select
              placeholder="Kategoriya"
              className=" w-100"
              onChange={setCategory}
              allowClear
            >
                {
                    categoryList.map((item, index) => {
                        return <Option key={index} value={item.id}>{item.name}</Option>
                    })
                }
            </Select>
          </div> */}
        </div>
        <div className="table-responsive mt-3">
          <Table
            dataSource={paginatedProducts}
            columns={columns}
            pagination={false}
            rowKey="id"
          />
        </div>
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
            total={filteredProducts.length}
            pageSize={pageSize}
            onChange={(page) => setCurrPage(page)}
          />
        </div>
      </div>
    </Card>
  );
}
