// frontend/src/services/customerApi.js
import API from './api';

export const fetchCustomers = () => API.get('/customers');
export const createCustomer = (newCustomer) => API.post('/customers', newCustomer);
export const updateCustomer = (id, updatedCustomer) => API.put(`/customers/${id}`, updatedCustomer);
export const deleteCustomer = (id) => API.delete(`/customers/${id}`);