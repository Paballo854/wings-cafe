// frontend/src/services/api.js - TEMPORARY VERSION (remove auth)
import axios from 'axios';

// Create an axios instance with the base URL of our backend on Render
const API = axios.create({
  baseURL: 'https://wings-cafe-m8m9.onrender.com/api', // updated URL
});

// API functions for products
export const fetchProducts = () => API.get('/products');
export const createProduct = (newProduct) => API.post('/products', newProduct);
export const updateProduct = (id, updatedProduct) => API.put(`/products/${id}`, updatedProduct);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const updateStock = (id, stockData) => API.patch(`/products/stock/${id}`, stockData);

export default API;
