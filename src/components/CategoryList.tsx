import { useQuery } from "@tanstack/react-query";
import { Button, Table } from "antd";
import { Link } from "react-router-dom";
import Header from "./Header";

function CategoryList() {
  const fetchCategories = async () => {
    const res = await fetch("http://localhost:3001/categories");
    return res.json();
  };

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "id",
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      render: (src: string) => (
        <img src={src} alt="Ảnh" style={{ width: 80 }} />
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
    {
      title: "Thao tác",
      render: () => <Button type="link">Sửa</Button>, // Bạn có thể bổ sung logic sửa sau
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Header />

      <div style={{ display: "flex", justifyContent: "space-between", margin: "20px 0" }}>
        <h2>Danh sách danh mục</h2>
        <Link to="/category/add">
          <Button type="primary">+ Thêm danh mục</Button>
        </Link>
      </div>

      <Table
        dataSource={data}
        columns={columns}
        rowKey={"id"}
        loading={isLoading}
      />
    </div>
  );
}

export default CategoryList;
