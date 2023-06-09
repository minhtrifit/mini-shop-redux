import { Routes, Route } from "react-router-dom";
import { Typography } from "antd";
const { Title } = Typography;
import "./App.css";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import AddProductPage from "./pages/AddProductPage";

const App: React.FC = () => {
  return (
    <div className="app">
      <Navbar />
      <Title
        level={1}
        type="warning"
        style={{ textAlign: "center", marginTop: "100px" }}
      >
        MY FAKE SHOP
      </Title>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add/product" element={<AddProductPage />} />
      </Routes>
    </div>
  );
};

export default App;
