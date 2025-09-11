// frontend/src/pages/Reporting.js
import React, { useState, useEffect } from 'react';
import { fetchSales } from '../services/salesApi';
import { fetchProducts } from '../services/api';
import './Reporting.css';

const Reporting = () => {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('all');

  useEffect(() => {
    loadReportData();
  }, []);

  const loadReportData = async () => {
    try {
      const [salesResponse, productsResponse] = await Promise.all([
        fetchSales(),
        fetchProducts()
      ]);
      setSales(salesResponse.data);
      setProducts(productsResponse.data);
    } catch (error) {
      console.error('Error loading report data:', error);
      alert('Failed to load report data');
    } finally {
      setLoading(false);
    }
  };

  const filterSalesByTimeRange = (salesData) => {
    const now = new Date();
    const filteredSales = salesData.filter(sale => {
      const saleDate = new Date(sale.saleDate);
      
      switch (timeRange) {
        case 'today':
          return saleDate.toDateString() === now.toDateString();
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return saleDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return saleDate >= monthAgo;
        default:
          return true;
      }
    });

    return filteredSales;
  };

  const getTopSellingProducts = () => {
    const productSales = {};
    
    sales.forEach(sale => {
      sale.items.forEach(item => {
        if (!productSales[item.productId]) {
          productSales[item.productId] = 0;
        }
        productSales[item.productId] += item.quantity;
      });
    });

    return Object.entries(productSales)
      .map(([productId, quantity]) => {
        const product = products.find(p => p.id === parseInt(productId));
        return {
          name: product ? product.name : 'Unknown Product',
          quantity,
          revenue: quantity * (product ? product.price : 0)
        };
      })
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);
  };

  const filteredSales = filterSalesByTimeRange(sales);
  const totalRevenue = filteredSales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const totalTransactions = filteredSales.length;
  const topProducts = getTopSellingProducts();

  if (loading) {
    return <div className="reporting-loading">Loading reports...</div>;
  }

  return (
    <div className="reporting-page">
      <div className="reporting-header">
        <h1>Sales Reports & Analytics</h1>
        <p>Track performance and analyze sales data</p>
      </div>

      <div className="report-controls">
        <div className="time-filter">
          <label>Time Range:</label>
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      <div className="report-stats">
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-value">M{totalRevenue.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Total Transactions</h3>
          <p className="stat-value">{totalTransactions}</p>
        </div>
        <div className="stat-card">
          <h3>Average Sale</h3>
          <p className="stat-value">
            M{totalTransactions > 0 ? (totalRevenue / totalTransactions).toFixed(2) : '0.00'}
          </p>
        </div>
      </div>

      <div className="report-sections">
        <div className="report-section">
          <h3>Top Selling Products</h3>
          {topProducts.length > 0 ? (
            <table className="report-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity Sold</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>M{product.revenue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No sales data available</p>
          )}
        </div>

        <div className="report-section">
          <h3>Recent Transactions</h3>
          {filteredSales.length > 0 ? (
            <div className="transactions-list">
              {filteredSales.slice(0, 10).map(sale => (
                <div key={sale.id} className="transaction-item">
                  <div className="transaction-info">
                    <span className="transaction-date">
                      {new Date(sale.saleDate).toLocaleDateString()}
                    </span>
                    <span className="transaction-amount">M{sale.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="transaction-method">
                    Payment: {sale.paymentMethod}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No transactions found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reporting;