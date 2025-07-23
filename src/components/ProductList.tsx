import { useQuery } from "@tanstack/react-query";
import { Button, Image, Popconfirm, Spin, Table, message } from "antd";
import Header from "./Header";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

function ProductList() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");

  const fetchProducts = async () => {
    const res = await fetch(
      `http://localhost:3001/products?name_like=${name || ""}`
    );
    if (!res.ok) throw new Error("Lỗi khi tải dữ liệu");
    return res.json();
  };

  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const handleDelete = async (id: string) => {
    const res = await fetch(`http://localhost:3001/products/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      message.success("Xoá sản phẩm thành công");
      refetch(); // Cập nhật lại danh sách
    } else {
      message.error("Xoá thất bại");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id: string) => (
        <Link to={`/product/detail/${id}`}>#{id}</Link>
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      sorter: (a: Product, b: Product) => a.price - b.price,
      render: (price: number) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      render: (src: string, record: Product) => (
        <Image src={src} width={120} alt={record.name} />
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      render: (desc?: string) => desc || "Không có",
    },
    {
      title: "Thao tác",
      render: (_: any, record: Product) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Link to={`/product/edit/${record.id}`}>
            <Button type="link">Sửa</Button>
          </Link>
          <Popconfirm
            title="Bạn có chắc chắn muốn xoá?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xoá"
            cancelText="Huỷ"
          >
            <Button danger type="link">
              Xoá
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Header />

      <div style={{ display: "flex", justifyContent: "space-between", margin: "20px 0" }}>
        <h2>Danh sách sản phẩm</h2>
        <Link to="/product/add">
          <Button type="primary">+ Thêm sản phẩm</Button>
        </Link>
      </div>

      {error && <p style={{ color: "red" }}>Lỗi: {(error as Error).message}</p>}

      <Table
        dataSource={products}
        columns={columns}
        rowKey={"id"}
        loading={isLoading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}

export default ProductList;
