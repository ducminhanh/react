import { useQuery } from "@tanstack/react-query";
import { Table, Spin, message, Button } from "antd";
import { useNavigate } from "react-router-dom";

interface Brand {
  id: number;
  name: string;
  logo?: string;
  description?: string;
}

export default function BrandList() {
  const navigate = useNavigate();

  const fetchBrands = async () => {
    const res = await fetch("http://localhost:3001/brands");
    if (!res.ok) throw new Error("Lỗi khi tải dữ liệu thương hiệu");
    return res.json();
  };

  const { data: brands, isLoading, error } = useQuery<Brand[]>({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Tên thương hiệu",
      dataIndex: "name",
    },
    {
      title: "Logo",
      dataIndex: "logo",
      render: (logo: string) =>
        logo ? (
          <img src={logo} alt="logo" style={{ width: 60, height: 40, objectFit: "contain" }} />
        ) : (
          "Không có"
        ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
    {
      title: "Thao tác",
      render: (_: any, record: Brand) => (
        <Button onClick={() => navigate(`/brands/edit/${record.id}`)}>Sửa</Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Danh sách thương hiệu</h2>
        <Button type="primary" onClick={() => navigate("/brands/add")}>
          Thêm thương hiệu
        </Button>
      </div>

      {error && <p style={{ color: "red" }}>Lỗi: {(error as Error).message}</p>}

      <Table
        dataSource={brands}
        columns={columns}
        rowKey={"id"}
        loading={isLoading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}
