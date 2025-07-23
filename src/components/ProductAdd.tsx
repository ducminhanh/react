// src/components/ProductAdd.tsx
import { Button, Form, Input, InputNumber, message } from "antd";
import { useNavigate } from "react-router-dom";

function ProductAdd() {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const res = await fetch("http://localhost:3001/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      message.success("Thêm sản phẩm thành công!");
      navigate("/products");
    } else {
      message.error("Thêm thất bại!");
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item name="image" label="Link hình ảnh">
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Mô tả">
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">Thêm</Button>
      </Form.Item>
    </Form>
  );
}

export default ProductAdd;
