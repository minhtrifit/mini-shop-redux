import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Space } from "antd";
import { Product } from "../types/product.type";

const { Meta } = Card;

interface PropsType {
  product: Product;
}

const ProductCard: React.FC<PropsType> = (props) => {
  const { product } = props;

  return (
    <Link to={`/product/${product.id}`} className="nav-link">
      <Card
        hoverable
        style={{ width: 200, minHeight: 400, padding: "10px 25px" }}
        cover={<img alt={product.title} src={product.image} />}
      >
        <Meta title={product.title} description={`Price: ${product.price}$`} />
      </Card>
      <Space align="center" style={{ marginTop: 15, marginBottom: 20 }}>
        <Button type="primary">Delete</Button>
        <Button type="primary">Edit</Button>
      </Space>
    </Link>
  );
};

export default ProductCard;
