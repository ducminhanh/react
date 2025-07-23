import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Card, Image, Spin } from "antd";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
}

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi tải sản phẩm:", err);
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <Spin tip="Đang tải sản phẩm..." />;

  if (!product) return <p>Sản phẩm không tồn tại!</p>;

  return (
    <Card
      title={`Chi tiết sản phẩm: ${product.name}`}
      style={{ maxWidth: 600, margin: "0 auto", marginTop: 20 }}
      actions={[
        <Link to="/products">
          <Button type="primary">Quay lại danh sách</Button>
        </Link>,
      ]}
    >
      <Image src={product.image} alt={product.name} width={400} />
      <p><strong>Giá:</strong> {product.price.toLocaleString()} VND</p>
      <p><strong>Mô tả:</strong> {product.description || "Không có mô tả."}</p>
    </Card>
  );
}
