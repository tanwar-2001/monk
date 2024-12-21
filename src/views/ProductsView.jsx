import React, { memo, useEffect, useState } from "react";
import styles from "./productsview.module.css";
import axios from "axios";
import { Button, Grid, Typography } from "@mui/material";
import ProductItem from "../Components/navbar/ProductItem";

const ProductsView = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productsData, setProductsData] = useState([]);
  useEffect(() => {
    // getProducts();
  }, []);

  const getProducts = async () => {
    const { data } = await axios.get(
      "https://stageapi.monkcommerce.app/task/products/search?search=Hat&page=2&limit=1",
      {
        headers: {
          "x-api-key": "72njgfa948d9aS7gs5",
        },
      }
    );
    console.log(data);
    setProductsData(data);
  };

  return (
    <div className={styles.mainView}>
      <h4>Add Products</h4>
      <Grid container justifyContent={"flex-end"} spacing={1}>
        <Grid item xs={1.5}>
          <Typography fontWeight="bold"></Typography>
        </Grid>
        <Grid item xs={6.5}>
          <Typography fontWeight="bold">Product</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography fontWeight="bold">Discount</Typography>
        </Grid>
        {/* last item */}
        <ProductItem
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          productsData={productsData}
        />
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            color="success"
            sx={{ textTransform: "capitalize" }}
          >
            Add Product
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default memo(ProductsView);
