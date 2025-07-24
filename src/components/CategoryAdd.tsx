import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";

function CategoryAdd() {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const res = await fetch("http://localhost:3001/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        message.success("Thêm danh mục thành công!");
        navigate("/categories");
      } else {
        message.error("Thêm thất bại!");
      }
    } catch (error) {
      message.error("Lỗi kết nối tới server!");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Thêm danh mục</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Tên danh mục"
          rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="image" label="Link hình ảnh">
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Mô tả">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm danh mục
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CategoryAdd;
