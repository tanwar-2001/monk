import { Close, Create, DragIndicatorOutlined } from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import ProductDialog from "../../views/ProductDialog";

const ProductItem = ({
  productsData,
  selectedProducts,
  setSelectedProducts,
}) => {
  const [openSelectProduct, setOpenSelectProduct] = useState(false);

  const handleRemoveProduct = (row) => {
    const newArr = selectedProducts.filter((item) => item.id !== row.id);
    setSelectedProducts(newArr);
  };

  return (
    <>
      {selectedProducts?.map((item, index) => (
        <Grid item xs={12} sx={{ pt: 1, pb: 1 }} key={item.id}>
          <Grid container justifyItems="center" spacing={1}>
            <Grid item xs={1.5}>
              <IconButton>
                <DragIndicatorOutlined fontSize="small" />
              </IconButton>
              <span>{index + 1}</span>
            </Grid>
            <Grid item xs={6.5}>
              <TextField
                value={item.title}
                fullWidth
                size="small"
                placeholder="Select Product"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <Create />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="success"
                sx={{ textTransform: "capitalize" }}
              >
                Add Discount
              </Button>
              <IconButton onClick={() => handleRemoveProduct(item)}>
                <Close />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      ))}
      {selectedProducts.length === 0 && (
        <Grid item xs={12} sx={{ pt: 1, pb: 1 }}>
          <Grid container justifyItems="center" spacing={1}>
            <Grid item xs={1.5}>
              <IconButton>
                <DragIndicatorOutlined fontSize="small" />
              </IconButton>
              <span>{productsData.length + 1}</span>
            </Grid>
            <Grid item xs={6.5}>
              <TextField
                fullWidth
                size="small"
                placeholder="Select Product"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setOpenSelectProduct(true)}>
                          <Create />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="success"
                sx={{ textTransform: "capitalize" }}
              >
                Add Discount
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
      <ProductDialog
        open={openSelectProduct}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        setClose={() => setOpenSelectProduct(false)}
      />
    </>
  );
};

export default ProductItem;
