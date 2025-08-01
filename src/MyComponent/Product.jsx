import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

// Use environment variable
const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Product = () => {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    availability: true,
  });

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`https://tbtdj99v-3300.inc1.devtunnels.ms/products/getproducts`);
      console.log("Fetched products:", res.data);   
      setProducts(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Open form dialog for add/edit
  const handleOpenDialog = (product = null) => {
    setEditingProduct(product);
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        category: product.category || "",
        availability: product.availability ?? true,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        availability: true,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      availability: true,
    });
  };

  // Form input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Submit form (add or update)
  const handleSubmit = async () => {
    try {
      if (editingProduct) {
        await axios.put(`${API_BASE_URL}products/updateproduct/${editingProduct._id}`, formData);
      } else {
        await axios.post(`${API_BASE_URL}products/addproduct`, formData);
      }
      fetchProducts();
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}products/deleteproduct/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Product Management</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
          Add Product
        </Button>
      </Box>

      {/* Product Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Description</b></TableCell>
              <TableCell><b>Price</b></TableCell>
              <TableCell><b>Category</b></TableCell>
              <TableCell><b>Available</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((prod) => (
              <TableRow key={prod._id}>
                <TableCell>{prod.name}</TableCell>
                <TableCell>{prod.description}</TableCell>
                <TableCell>₹{prod.price}</TableCell>
                <TableCell>{prod.category}</TableCell>
                <TableCell>{prod.availability ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpenDialog(prod)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(prod._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Product Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{editingProduct ? "Edit Product" : "Add Product"}</DialogTitle>
        <DialogContent dividers>
          <TextField
            margin="dense"
            label="Product Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            multiline
            value={formData.description}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Price"
            name="price"
            fullWidth
            type="number"
            value={formData.price}
            onChange={handleInputChange}
          />
          <Select
            fullWidth
            margin="dense"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            displayEmpty
          >
            <MenuItem value=""><em>Select Category</em></MenuItem>
            <MenuItem value="Pen">Pen</MenuItem>
            <MenuItem value="Notebook">Notebook</MenuItem>
            <MenuItem value="Stationary Kit">Stationary Kit</MenuItem>
          </Select>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.checked })}
              />
            }
            label="Available"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {editingProduct ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Product;
