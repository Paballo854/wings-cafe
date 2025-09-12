// frontend/src/components/SalesForm.js
import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';
import { fetchCustomers } from '../services/customerApi';
import { createSale } from '../services/salesApi';
import './SalesForm.css';

const SalesForm = ({ onSave }) => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsResponse, customersResponse] = await Promise.all([
        fetchProducts(),
        fetchCustomers()
      ]);
      setProducts(productsResponse.data);
      setCustomers(customersResponse.data);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Failed to load products and customers');
    }
  };

  const addToCart = (product) => {
    if (product.quantity === 0) {
      alert('This product is out of stock');
      return;
    }

    const existingItem = cart.find(item => item.productId === product.id);
    if (existingItem) {
      if (existingItem.quantity + 1 > product.quantity) {
        alert('Not enough stock available');
        return;
      }
      setCart(cart.map(item =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
          : item
      ));
    } else {
      setCart([...cart, {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        total: product.price
      }]);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    const product = products.find(p => p.id === productId);
    if (newQuantity > product.quantity) {
      alert('Not enough stock available');
      return;
    }

    setCart(cart.map(item =>
      item.productId === productId
        ? { ...item, quantity: newQuantity, total: newQuantity * item.price }
        : item
    ));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.total, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Please add items to the sale');
      return;
    }

    setLoading(true);
    try {
      const saleData = {
        customerId: selectedCustomer || null,
        items: cart.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: getTotalAmount(),
        paymentMethod
      };

      await createSale(saleData);
      setCart([]);
      setSelectedCustomer('');
      setPaymentMethod('cash');
      onSave();
      alert('Sale completed successfully!');
    } catch (error) {
      console.error('Error creating sale:', error);
      alert('Failed to complete sale: ' + (error.response?.data?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sales-form">
      <h3>New Sale Transaction</h3>
      
      <div className="sales-layout">
        {/* Products List */}
        <div className="products-section">
          <h4>Available Products</h4>
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-info">
                  <h5>{product.name}</h5>
                  <p>M{product.price} • Stock: {product.quantity}</p>
                  {product.lowStockAlert && <span className="low-stock-badge">Low Stock</span>}
                </div>
                <button
                  onClick={() => addToCart(product)}
                  disabled={product.quantity === 0}
                  className="add-to-cart-btn"
                >
                  {product.quantity === 0 ? 'Out of Stock' : 'Add to Sale'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart and Checkout */}
        <div className="checkout-section">
          <div className="cart">
            <h4>Shopping Cart</h4>
            {cart.length === 0 ? (
              <p className="empty-cart">No items in cart</p>
            ) : (
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.productId} className="cart-item">
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-price">M{item.price} each</span>
                    </div>
                    <div className="item-controls">
                      <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}>
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                        +
                      </button>
                      <span className="item-total">M{item.total}</span>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="remove-btn"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="checkout-form">
            <h4>Checkout</h4>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Customer (Optional)</label>
                <select
                  value={selectedCustomer}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                >
                  <option value="">Walk-in Customer</option>
                  {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="mobile">Mobile Money</option>
                </select>
              </div>

              <div className="total-amount">
                <strong>Total: M{getTotalAmount().toFixed(2)}</strong>
              </div>

              <button
                type="submit"
                disabled={cart.length === 0 || loading}
                className="complete-sale-btn"
              >
                {loading ? 'Processing...' : 'Complete Sale'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesForm;