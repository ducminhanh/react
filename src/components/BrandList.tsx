import { useQuery } from "@tanstack/react-query";
import { Table, Spin, message, Button } from "antd";
import { useNavigate } from "react-router-dom";

interface Brand {
  id: number;
  name: string;
}

export default function BrandList() {
  const navigate = useNavigate();

  const fetchBrands = async () => {
    const res = await fetch("http://localhost:3001/brands");
    if (!res.ok) throw new Error("Lỗi khi tải dữ liệu thương hiệu");
    return res.json();
  };

  const { data: brands, isLoading, error, refetch } = useQuery<Brand[]>({
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
      title: "Thao tác",
      render: (_: any, record: Brand) => (
        <Button
          danger
          onClick={async () => {
            const confirm = window.confirm(`Xoá thương hiệu "${record.name}"?`);
            if (confirm) {
              const res = await fetch(`http://localhost:3001/brands/${record.id}`, {
                method: "DELETE",
              });
              if (res.ok) {
                message.success("Đã xoá thương hiệu");
                refetch();
              } else {
                message.error("Xoá thất bại");
              }
            }
          }}
        >
          Xoá
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>Danh sách thương hiệu</h2>

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
