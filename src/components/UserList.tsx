import { useQuery } from "@tanstack/react-query";
import { Table, Button, message, Spin } from "antd";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function UserList() {
  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3001/users");
    if (!res.ok) throw new Error("Không thể tải danh sách người dùng");
    return res.json();
  };

  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const handleDelete = async (id: number) => {
    const confirm = window.confirm("Bạn có chắc muốn xoá người dùng này?");
    if (confirm) {
      const res = await fetch(`http://localhost:3001/users/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        message.success("Xoá thành công");
        refetch();
      } else {
        message.error("Xoá thất bại");
      }
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Họ tên",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Quyền",
      dataIndex: "role",
    },
    {
      title: "Thao tác",
      render: (_: any, record: User) => (
        <Button danger onClick={() => handleDelete(record.id)}>
          Xoá
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>Danh sách người dùng</h2>
      {error && <p style={{ color: "red" }}>Lỗi: {(error as Error).message}</p>}
      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}
