// frontend/src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import { fetchProducts, deleteProduct, updateStock } from '../services/api';
import ProductForm from './ProductForm';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadProducts = async () => {
    try {
      const response = await fetchProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        loadProducts(); // Reload the products list
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleStockUpdate = async (id, action, amount) => {
    try {
      await updateStock(id, { action, amount: parseInt(amount) });
      loadProducts(); // Reload to see updated quantities
    } catch (error) {
      console.error('Error updating stock:', error);
      alert('Failed to update stock');
    }
  };

  const handleSave = () => {
    setEditingProduct(null);
    setShowForm(false);
    loadProducts(); // Reload the products list
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="product-management">
      <div className="page-header">
        <h2>Product Management</h2>
        <button 
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          Add New Product
        </button>
      </div>

      {(showForm || editingProduct) && (
        <ProductForm
          product={editingProduct}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      <div className="products-table-container">
        <h3>Product Inventory</h3>
        {products.length === 0 ? (
          <p className="no-products">No products found. Add some products to get started.</p>
        ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className={product.lowStockAlert ? 'low-stock' : ''}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.category}</td>
                  <td>M{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    {product.lowStockAlert ? (
                      <span className="status-low">LOW STOCK</span>
                    ) : (
                      <span className="status-ok">In Stock</span>
                    )}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        onClick={() => handleEdit(product)}
                        className="btn-edit"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                      <div className="stock-actions">
                        <button 
                          onClick={() => handleStockUpdate(product.id, 'add', 10)}
                          className="btn-stock-add"
                        >
                          +10
                        </button>
                        <button 
                          onClick={() => handleStockUpdate(product.id, 'deduct', 1)}
                          className="btn-stock-deduct"
                        >
                          -1
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductList;