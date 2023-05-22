import React, { useEffect, useState } from "react";
import { Space, Typography, Select, Spin, Pagination } from "antd";
const { Title } = Typography;

// Reduc/redux-toolkit config import
import { useSelector, useDispatch } from "react-redux";
import { useAppDispatch } from "../redux/hooks";
import { RootState } from "../redux/store";

// Redux Reducer import
import { getAllProducts } from "../redux/reducers/products.reducer";
import { getAllCategories } from "../redux/reducers/caterogies.reducer";

// Redux action import
import {
  sortProductsList,
  getProductsListPerPage,
} from "../redux/actions/products.action";

// Type import
import { Product } from "../types/product.type";
import { Category } from "../types/product.type";

import ProductCard from "../components/ProductCard";

// API URL: https://fakestoreapi.com

const HomePage: React.FC = () => {
  const dispath = useDispatch();
  const dispathAsync = useAppDispatch();
  const [categoryValue, setCategoryValue] = useState<Category["value"]>("");

  // Product reducers selector
  const productList = useSelector<RootState, Product[]>(
    (state) => state.products.productListPerPage
  );

  const sortProductList = useSelector<RootState, Product[]>(
    (state) => state.products.sortList
  );

  const isLoadingProductList = useSelector<RootState, boolean>(
    (state) => state.products.isLoading
  );

  const productsPageCount = useSelector<RootState, number>(
    (state) => state.products.pageCount
  );

  // Categories reducers selector
  const categoriesList = useSelector<RootState, Category[]>(
    (state) => state.categories.categories
  );

  //========== API CALL
  useEffect(() => {
    const promise = dispathAsync(getAllProducts());

    // Cancel React.StrictMode API call
    return () => {
      promise.abort();
    };
  }, [dispathAsync]);

  useEffect(() => {
    const promise = dispathAsync(getAllCategories());

    // Cancel React.StrictMode API call
    return () => {
      promise.abort();
    };
  }, [dispathAsync]);

  useEffect(() => {
    setCategoryValue(categoriesList[0]?.value);
  }, [categoriesList]);

  //========== Handling function
  const handleChange = (value: string) => {
    setCategoryValue(value);
    dispath(sortProductsList(value));
    // console.log(`Category sort by: ${categoryValue}`);
  };

  const handleProductPag = (value: number) => {
    // console.log(value);
    dispath(getProductsListPerPage(value));
  };

  return (
    <div>
      {categoriesList.length !== 0 && categoryValue !== "" && (
        <Select
          defaultValue={categoryValue}
          style={{ width: 150, position: "relative", left: "70%" }}
          onChange={(value: string) => {
            handleChange(value);
          }}
          options={categoriesList}
        />
      )}
      <Title level={3} style={{ marginLeft: 100, marginTop: 30 }}>
        View by: {categoryValue}
      </Title>
      {isLoadingProductList === true ? (
        <Spin tip="Loading" style={{ marginTop: 100 }}>
          <div className="content" />
        </Spin>
      ) : (
        <Space
          direction="vertical"
          size="middle"
          style={{
            margin: "100px auto",
            width: "50%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {productList.length !== 0 &&
            categoryValue === "All categories" &&
            productList.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
          {sortProductList.length !== 0 &&
            categoryValue !== "All categories" &&
            sortProductList.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
        </Space>
      )}
      {productsPageCount !== 0 && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginBottom: 50,
          }}
        >
          <Pagination
            defaultCurrent={1}
            total={productsPageCount * 10}
            onChange={handleProductPag}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
