// backend/server.js

// 1. Import necessary modules
const express = require('express');
const fs = require('fs').promises; // Use the promise-based version of fs for async/await
const path = require('path');
const cors = require('cors');

// 2. Create an Express application
const app = express();
const port = process.env.PORT || 5000; // Use the port from environment variable or default to 5000

// 3. Define the path to our data file
const dataPath = path.join(__dirname, 'data.json');

// 4. Apply middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON data in requests

// 5. ===== HELPER FUNCTION =====
// A reusable function to read data from the JSON file
async function readData() {
  try {
    const data = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is invalid, return a default structure
    return { products: [] };
  }
}

// A reusable function to write data to the JSON file
async function writeData(data) {
  try {
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2)); // null, 2 formats the JSON nicely
  } catch (error) {
    throw new Error('Error writing to file');
  }
}

// 6. ===== API ROUTES =====

// GET /api/products - Fetch all products
app.get('/api/products', async (req, res) => {
  try {
    const data = await readData();
    res.json(data.products); // Send the array of products as JSON
  } catch (error) {
    res.status(500).json({ message: 'Error reading products data' });
  }
});

// POST /api/products - Create a new product
app.post('/api/products', async (req, res) => {
  try {
    const { name, description, category, price, quantity } = req.body;

    // Basic validation
    if (!name || !price || quantity === undefined) {
      return res.status(400).json({ message: 'Name, price, and quantity are required' });
    }

    const data = await readData();

    // Create a new product object
    const newProduct = {
      id: Date.now(), // Simple way to generate a unique ID (using timestamp)
      name,
      description: description || '', // Default to empty string if not provided
      category: category || 'Uncategorized',
      price: parseFloat(price),
      quantity: parseInt(quantity),
      lowStockAlert: parseInt(quantity) < 10 // Set low stock alert if quantity is less than 10
    };

    // Add the new product to the array
    data.products.push(newProduct);

    // Save the updated data back to the file
    await writeData(data);

    // Respond with the newly created product
    res.status(201).json(newProduct);

  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
});

// PUT /api/products/:id - Update a product
app.put('/api/products/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const updatedFields = req.body;

    const data = await readData();
    const productIndex = data.products.findIndex(product => product.id === productId);

    // Check if product was found
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product - only change the fields that were sent in the request
    data.products[productIndex] = {
      ...data.products[productIndex], // keep existing data
      ...updatedFields, // overwrite with new data
      id: productId, // prevent ID from being changed
    };

    // Recalculate lowStockAlert based on the new quantity (if quantity was updated)
    if (updatedFields.quantity !== undefined) {
      data.products[productIndex].lowStockAlert = updatedFields.quantity < 10;
    }

    // Save the updated data
    await writeData(data);

    // Respond with the fully updated product
    res.json(data.products[productIndex]);

  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
});

// DELETE /api/products/:id - Delete a product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    const data = await readData();
    // Filter out the product with the given ID
    const filteredProducts = data.products.filter(product => product.id !== productId);

    // Check if a product was actually removed (length changed)
    if (filteredProducts.length === data.products.length) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the data object
    data.products = filteredProducts;

    // Save the updated data
    await writeData(data);

    // Send a success message
    res.json({ message: 'Product deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

// PATCH /api/products/stock/:id - A dedicated route to update only the stock
app.patch('/api/products/stock/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const { action, amount } = req.body; // e.g., { "action": "add", "amount": 5 } or { "action": "deduct", "amount": 1 }

    if (!action || !amount || amount < 0) {
      return res.status(400).json({ message: 'Valid action and amount are required' });
    }

    const data = await readData();
    const productIndex = data.products.findIndex(product => product.id === productId);

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let newQuantity = data.products[productIndex].quantity;

    // Perform the stock operation
    if (action === 'add') {
      newQuantity += parseInt(amount);
    } else if (action === 'deduct') {
      newQuantity = Math.max(0, newQuantity - parseInt(amount)); // Prevent quantity from going below 0
    } else {
      return res.status(400).json({ message: 'Action must be "add" or "deduct"' });
    }

    // Update the product's quantity and lowStockAlert
    data.products[productIndex].quantity = newQuantity;
    data.products[productIndex].lowStockAlert = newQuantity < 10;

    await writeData(data);
    res.json(data.products[productIndex]);

  } catch (error) {
    res.status(500).json({ message: 'Error updating stock' });
  }
});

// 7. Start the server
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
// Add to backend/server.js after the product routes

// ===== CUSTOMER ROUTES =====
app.get('/api/customers', async (req, res) => {
  try {
    const data = await readData();
    res.json(data.customers || []);
  } catch (error) {
    res.status(500).json({ message: 'Error reading customers data' });
  }
});

app.post('/api/customers', async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const data = await readData();
    if (!data.customers) data.customers = [];

    const newCustomer = {
      id: Date.now(),
      name,
      email: email || '',
      phone: phone || '',
      address: address || '',
      createdAt: new Date().toISOString()
    };

    data.customers.push(newCustomer);
    await writeData(data);

    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ message: 'Error creating customer' });
  }
});

// ===== SALES ROUTES =====
app.get('/api/sales', async (req, res) => {
  try {
    const data = await readData();
    res.json(data.sales || []);
  } catch (error) {
    res.status(500).json({ message: 'Error reading sales data' });
  }
});

app.post('/api/sales', async (req, res) => {
  try {
    const { customerId, items, totalAmount, paymentMethod } = req.body;

    if (!items || items.length === 0 || !totalAmount) {
      return res.status(400).json({ message: 'Items and total amount are required' });
    }

    const data = await readData();
    if (!data.sales) data.sales = [];
    if (!data.products) data.products = [];

    // Update product quantities and check stock
    for (const item of items) {
      const product = data.products.find(p => p.id === item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }
      if (product.quantity < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }
      product.quantity -= item.quantity;
      product.lowStockAlert = product.quantity < 10;
    }

    const newSale = {
      id: Date.now(),
      customerId: customerId || null,
      items,
      totalAmount: parseFloat(totalAmount),
      paymentMethod: paymentMethod || 'cash',
      saleDate: new Date().toISOString(),
      status: 'completed'
    };

    data.sales.push(newSale);
    await writeData(data);

    res.status(201).json(newSale);
  } catch (error) {
    res.status(500).json({ message: 'Error creating sale' });
  }
});
// Add to backend/server.js before the server starts

// Simple user database (in production, use a real database)
const users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@wingscafe.com',
    password: 'password123', // In production, hash passwords!
    role: 'admin'
  }
];

// ===== AUTHENTICATION MIDDLEWARE =====
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  // Simple token verification (in production, use JWT)
  if (token !== 'demo-token-123') {
    return res.status(403).json({ message: 'Invalid token' });
  }

  next();
};

// ===== AUTH ROUTES =====
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // In production, use proper JWT tokens
    const token = 'demo-token-123';
    
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
});

app.post('/api/auth/logout', authenticateToken, (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  // Return the first user as demo (in production, get user from token)
  const user = users[0];
  res.json({ 
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

// Protect all API routes (add this after auth routes)
app.use('/api', authenticateToken);