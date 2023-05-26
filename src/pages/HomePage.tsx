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
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 1200;

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

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  //========== API CALL
  useEffect(() => {
    const promise = dispathAsync(getAllProducts());

    // Need unwarp() method
    promise.unwrap().catch((err) => {
      console.log("Check err:", err);
    });

    // Cancel React.StrictMode API call
    return () => {
      promise.abort();
    };
  }, [dispathAsync]);

  useEffect(() => {
    const promise = dispathAsync(getAllCategories());

    promise.unwrap().catch((err) => {
      console.log("Check err:", err);
    });

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
    window.scrollTo(0, 0);
  };

  return (
    <div>
      {categoriesList.length !== 0 && categoryValue !== "" && (
        <Select
          defaultValue={categoryValue}
          style={{
            width: 150,
            position: "relative",
            left: `${width < breakpoint ? "50%" : "70%"}`,
          }}
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
            width: `${width < breakpoint ? "95%" : "50%"}`,
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
      {!isLoadingProductList && productsPageCount !== 0 && (
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
