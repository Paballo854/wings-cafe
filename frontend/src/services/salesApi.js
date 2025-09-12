// frontend/src/services/salesApi.js
import API from './api';

export const fetchSales = () => API.get('/sales');
export const createSale = (saleData) => API.post('/sales', saleData);
export const fetchSalesReport = (startDate, endDate) => 
  API.get(`/sales/report?startDate=${startDate}&endDate=${endDate}`);