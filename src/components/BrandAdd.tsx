import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom"; 

export default function BrandAdd() {
  const [form] = Form.useForm();
  const navigate = useNavigate(); 

  const addBrand = async (values: any) => {
    const response = await fetch("http://localhost:3001/brands", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error("Thêm thương hiệu thất bại");
    }

    return response.json();
  };

  const { mutate } = useMutation({
    mutationFn: addBrand,
    onSuccess: () => {
      message.success("Thêm thương hiệu thành công");
      form.resetFields();

      
      navigate("/brands");
    },
    onError: () => {
      message.error("Đã xảy ra lỗi khi thêm");
    },
  });

  const handleSubmit = (values: any) => {
    mutate(values);
  };

  return (
    <div className="mt-6 max-w-[600px] mx-auto px-6">
      <h1 className="text-3xl font-bold text-center mb-6">Thêm thương hiệu</h1>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Tên thương hiệu"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên thương hiệu" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Logo" name="logo">
          <Input />
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Thêm mới
        </Button>
      </Form>
    </div>
  );
}
