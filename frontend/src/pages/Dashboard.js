// frontend/src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';
import { fetchSales } from '../services/salesApi';
import { fetchCustomers } from '../services/customerApi';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStockItems: 0,
    totalSales: 0,
    totalRevenue: 0,
    totalCustomers: 0
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [productsResponse, salesResponse, customersResponse] = await Promise.all([
        fetchProducts(),
        fetchSales(),
        fetchCustomers()
      ]);

      const productsData = productsResponse.data || [];
      const sales = salesResponse.data || [];
      const customers = customersResponse.data || [];

      const totalRevenue = sales.reduce((sum, sale) => sum + (sale.totalAmount || 0), 0);

      setProducts(productsData);
      setStats({
        totalProducts: productsData.length,
        lowStockItems: productsData.filter(p => p.lowStockAlert).length,
        totalSales: sales.length,
        totalRevenue: totalRevenue,
        totalCustomers: customers.length
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRandomProducts = () => {
    if (products.length <= 5) return products;
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  };

  const getProductImage = (product) => {
    const productImages = {
      cappuccino: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200&h=150&fit=crop',
      latte: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=200&h=150&fit=crop',
      americano: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=150&fit=crop',
      mocha: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=150&fit=crop',
      'hot chocolate': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=200&h=150&fit=crop',
      tea: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&h=150&fit=crop',
      'green tea': 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200&h=150&fit=crop',
      chai: 'https://images.unsplash.com/photo-1564894809617-28f7b4d75c53?w=200&h=150&fit=crop',
      croissant: 'https://images.unsplash.com/photo-1555507036-ab794f24d6c7?w=200&h=150&fit=crop',
      muffin: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6d?w=200&h=150&fit=crop',
      cookie: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=200&h=150&fit=crop',
      brownie: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=200&h=150&fit=crop',
      sandwich: 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=200&h=150&fit=crop',
      wrap: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=200&h=150&fit=crop',
      panini: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=200&h=150&fit=crop',
      smoothie: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=200&h=150&fit=crop',
      juice: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=200&h=150&fit=crop',
      lemonade: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=200&h=150&fit=crop',
      water: 'https://images.unsplash.com/photo-1548839140-29a749e3f5df?w=200&h=150&fit=crop',
      soda: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=200&h=150&fit=crop',
      breakfast: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=200&h=150&fit=crop',
      omelette: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=200&h=150&fit=crop',
      pancake: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=150&fit=crop',
      yogurt: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200&h=150&fit=crop',
      avocado: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=200&h=150&fit=crop'
    };

    const productName = (product.name || '').toLowerCase();
    for (const [key, image] of Object.entries(productImages)) {
      if (productName.includes(key)) return image;
    }

    return 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&h=150&fit=crop';
  };

  if (loading) return <div className="dashboard-loading">Loading dashboard...</div>;

  const featuredProducts = getRandomProducts();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to Wings Cafe Inventory System</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card"><div className="stat-icon" style={{ backgroundColor: '#3498db' }}>📦</div><div className="stat-info"><h3>{stats.totalProducts}</h3><p>Total Products</p></div></div>
        <div className="stat-card"><div className="stat-icon" style={{ backgroundColor: '#e74c3c' }}>⚠️</div><div className="stat-info"><h3>{stats.lowStockItems}</h3><p>Low Stock Items</p></div></div>
        <div className="stat-card"><div className="stat-icon" style={{ backgroundColor: '#27ae60' }}>💰</div><div className="stat-info"><h3>{stats.totalSales}</h3><p>Total Sales</p></div></div>
        <div className="stat-card"><div className="stat-icon" style={{ backgroundColor: '#9b59b6' }}>🎯</div><div className="stat-info"><h3>M{stats.totalRevenue.toFixed(2)}</h3><p>Total Revenue</p></div></div>
        <div className="stat-card"><div className="stat-icon" style={{ backgroundColor: '#f39c12' }}>👥</div><div className="stat-info"><h3>{stats.totalCustomers}</h3><p>Total Customers</p></div></div>
      </div>

      {featuredProducts.length > 0 && (
        <div className="featured-products">
          <h2>Featured Products</h2>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img 
                  src={getProductImage(product)} 
                  alt={product.name}
                  className="product-image"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&h=150&fit=crop'; }}
                />
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p>M{product.price ?? 0}</p>
                  <p>Stock: {product.quantity ?? 0}</p>
                  {product.lowStockAlert && <span className="low-stock-badge">Low Stock</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
