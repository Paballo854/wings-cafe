// frontend/src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://wings-cafe-m8m9.onrender.com/api',
});

// automatically attach token to each request
API.interceptors.request.use((config) => {
  config.headers.Authorization = 'Bearer demo-token-123';
  return config;
});

export const fetchProducts = () => API.get('/products');
export const createProduct = (newProduct) => API.post('/products', newProduct);
export const updateProduct = (id, updatedProduct) => API.put(`/products/${id}`, updatedProduct);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const updateStock = (id, stockData) => API.patch(`/products/stock/${id}`, stockData);

export default API;
