import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Spin, Space } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { addNewProduct } from "../redux/reducers/products.reducer";
import { resetAddProductCheck } from "../redux/actions/products.action";
import { useAppDispatch } from "../redux/hooks";

import { Product } from "../types/product.type";
import { NewProduct } from "../types/product.type";
import { RootState } from "../redux/store";

const newProductTempData: NewProduct = {
  title: "test product",
  price: 13.5,
  description: "lorem ipsum set",
  image: "https://i.pravatar.cc",
  category: "electronics",
};

const onFinish = (product: NewProduct, dispathAsync: any) => {
  const newProduct = {
    title: product.title,
    price: product.price,
    description: product.description,
    image: product.image,
    category: product.category,
  };
  //   console.log("New product data:", newProduct);
  dispathAsync(addNewProduct(newProduct));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const AddProductPage: React.FC = () => {
  const dispath = useDispatch();
  const dispathAsync = useAppDispatch();
  const navigate = useNavigate();

  const productList = useSelector<RootState, Product[]>(
    (state) => state.products.productListPerPage
  );

  const isLoading = useSelector<RootState, boolean>(
    (state) => state.products.isLoading
  );

  const isAddProduct = useSelector<RootState, boolean>(
    (state) => state.products.isAddProduct
  );

  // Redirect to homepage if product list empty
  useEffect(() => {
    if (productList.length === 0) {
      navigate("/");
      window.location.reload();
    }
  }, [navigate, productList.length]);

  // Alert if add product success
  useEffect(() => {
    dispath(resetAddProductCheck());
    if (isAddProduct) {
      toast.success("Add product successfully");
    }
  }, [dispath, isAddProduct]);

  return (
    <div
      style={{
        width: "90%",
        margin: "100px auto",
      }}
    >
      <ToastContainer />
      <Space
        direction="horizontal"
        size="middle"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {isLoading === true && (
          <div className="example">
            <Spin />
          </div>
        )}
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, marginTop: 50 }}
          initialValues={{
            remember: true,
            title: newProductTempData.title,
            price: newProductTempData.price,
            description: newProductTempData.description,
            image: newProductTempData.image,
            category: newProductTempData.category,
          }}
          onFinish={(product: NewProduct) => {
            onFinish(product, dispathAsync);
          }}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input price" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input your description" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Image url"
            name="image"
            rules={[{ required: true, message: "Please input your image url" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please input your category" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
};

export default AddProductPage;
