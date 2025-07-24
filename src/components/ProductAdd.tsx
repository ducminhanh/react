// src/components/ProductAdd.tsx
import { Button, Form, Input, InputNumber, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

function ProductAdd() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // Hàm gọi API để thêm sản phẩm
  const addProduct = async (values: any) => {
    const res = await fetch("http://localhost:3001/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      throw new Error("Thêm sản phẩm thất bại");
    }

    return res.json();
  };

  // Dùng useMutation để quản lý trạng thái khi gọi API
  const { mutate, isLoading } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      message.success("Thêm sản phẩm thành công!");
      form.resetFields();
      navigate("/products");
    },
    onError: () => {
      message.error("Đã xảy ra lỗi khi thêm sản phẩm.");
    },
  });

  const handleSubmit = (values: any) => {
    mutate(values);
  };

  return (
    <div className="max-w-[800px] mx-auto mt-8 px-4">
      <h1 className="text-2xl font-semibold mb-4">Thêm sản phẩm mới</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
        >
          <Input placeholder="Nhập tên sản phẩm" />
        </Form.Item>

        <Form.Item
          label="Giá"
          name="price"
          rules={[
            { required: true, message: "Vui lòng nhập giá sản phẩm" },
            { type: "number", min: 0, message: "Giá phải >= 0" },
          ]}
        >
          <InputNumber style={{ width: "100%" }} placeholder="Nhập giá" />
        </Form.Item>

        <Form.Item
          label="Link hình ảnh"
          name="image"
          rules={[{ required: true, message: "Vui lòng nhập URL hình ảnh" }]}
        >
          <Input placeholder="https://..." />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea rows={4} placeholder="Nhập mô tả sản phẩm (tuỳ chọn)" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            Thêm sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ProductAdd;
