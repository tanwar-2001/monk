import React, { useEffect } from "react";
import styles from "./productsview.module.css";
import axios from "axios";

const ProductsView = () => {
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const data = axios.get(
      "https://stageapi.monkcommerce.app/task/products/search?search=Hat&page=2&limit=1",
      {
        headers: {
          "x-api-key": "shared via email",
        },
      }
    );
    console.log(data);
  };

  return (
    <div className={styles.mainView}>
      <h4>Add Products</h4>
    </div>
  );
};

export default ProductsView;
