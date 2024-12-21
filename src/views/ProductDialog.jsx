import { Close, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";

const ProductDialog = ({
  open,
  setClose,
  selectedProducts,
  setSelectedProducts,
}) => {
  const [searchText, setSearchText] = useState("");
  const [productsData, setProductsData] = useState([]);

  const getProducts = async (searchText) => {
    const { data } = await axios.get(
      `https://stageapi.monkcommerce.app/task/products/search?search=${searchText}&page=1&limit=5`,
      {
        headers: {
          "x-api-key": "72njgfa948d9aS7gs5",
        },
      }
    );
    console.log(data);
    setProductsData(data);
  };

  useEffect(() => {
    getProducts(searchText);
  }, [searchText]);

  const handleProductSelect = (row) => {
    setSelectedProducts((prev) => [row, ...prev]);
    const newArr = productsData.map((item) =>
      row.id === item.id ? { ...item, checked: true } : item
    );
    setProductsData(newArr);
  };

  return (
    <Dialog onClose={setClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle p={0} variant="h6">
        Select Products
      </DialogTitle>
      <IconButton
        sx={{ position: "absolute", right: 0, top: 5 }}
        onClick={setClose}
      >
        <Close />
      </IconButton>
      <DialogContent dividers sx={{ p: 0 }}>
        <TextField
          value={searchText}
          fullWidth
          size="small"
          placeholder="Search product"
          sx={{ m: 1, width: "97%" }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Divider />
        <TableContainer component={Paper} sx={{ maxHeight: "50vh" }}>
          <Table sx={{ minWidth: 550 }}>
            <TableBody>
              {productsData.map((row) => (
                <Fragment key={row.id}>
                  <TableRow key={row.id}>
                    <TableCell scope="row" style={{ width: "5%", padding: 8 }}>
                      <Checkbox
                        color="success"
                        checked={row.selected}
                        onChange={() => handleProductSelect(row)}
                      />
                    </TableCell>
                    <TableCell
                      style={{
                        width: "60%",
                        fontWeight: 600,
                      }}
                    >
                      {row.image.src && (
                        <img
                          src={row.image.src}
                          height={25}
                          style={{ marginRight: 10 }}
                          alt="productImg"
                        />
                      )}
                      {row.title}
                    </TableCell>
                    <TableCell style={{ width: "20%" }}>{}</TableCell>
                    <TableCell style={{ width: "15%" }}>{}</TableCell>
                  </TableRow>
                  {row?.variants?.map((elem) => (
                    <TableRow key={elem.id}>
                      <TableCell style={{ padding: 8 }}>
                        <Checkbox
                          color="success"
                          checked={elem.status === "active" ? true : false}
                          inputProps={{
                            "aria-label": "select all desserts",
                          }}
                        />
                      </TableCell>
                      <TableCell scope="row">{`${elem.title} - ${row.tags}`}</TableCell>
                      <TableCell scope="row">{`${elem.inventory_quantity} available`}</TableCell>
                      <TableCell width={60}>{`$ ${elem.price}`}</TableCell>
                    </TableRow>
                  ))}
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>{`${selectedProducts.length} product selected`}</Typography>
        <Box>
          <Button
            variant="outlined"
            color="success"
            sx={{ mr: 1 }}
            onClick={setClose}
          >
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={setClose}>
            Add
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialog;
