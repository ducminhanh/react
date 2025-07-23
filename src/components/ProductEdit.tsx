// src/components/ProductEdit.tsx
import { Button, Form, Input, InputNumber, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProductEdit() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then(res => res.json())
      .then(data => {
        form.setFieldsValue(data);
        setLoading(false);
      });
  }, [id, form]);

  const onFinish = async (values: any) => {
    const res = await fetch(`http://localhost:3001/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      message.success("Cập nhật sản phẩm thành công!");
      navigate("/products");
    } else {
      message.error("Cập nhật thất bại!");
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} loading={loading}>
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
        <Button htmlType="submit" type="primary">Cập nhật</Button>
      </Form.Item>
    </Form>
  );
}

export default ProductEdit;
