import React from "react";
import { Space, Button, Layout } from "antd";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const { Header } = Layout;

  const navUrlStyles = {
    color: "#fff",
    fontWeight: "500",
  };

  return (
    <>
      <Header
        style={{
          backgroundColor: "#16219c",
          width: "100%",
          position: "fixed",
          top: 0,
          zIndex: 1,
        }}
      >
        <Space size={40}>
          <Link to="/">
            <p style={navUrlStyles}>Home</p>
          </Link>
          <Link to="/">
            <p style={navUrlStyles}>Add Product</p>
          </Link>
          <Button type={"primary"}>Login</Button>
        </Space>
      </Header>
    </>
  );
};

export default Navbar;
