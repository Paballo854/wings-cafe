// frontend/src/pages/Sales.js
import React, { useState } from 'react';
import SalesForm from '../components/SalesForm';
import './Sales.css';

const Sales = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSave = () => {
    setRefreshKey(prev => prev + 1); // Refresh components if needed
  };

  return (
    <div className="sales-page">
      <div className="sales-header">
        <h1>Sales Management</h1>
        <p>Record new sales transactions and manage customer purchases</p>
      </div>
      
      <SalesForm key={refreshKey} onSave={handleSave} />
    </div>
  );
};

export default Sales;