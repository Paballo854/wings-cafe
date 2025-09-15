const getProductImage = (product) => {
  // Ensure product name exists
  const productName = (product.name || '').toLowerCase().trim();

  // Map of keywords to image URLs
  const productImages = {
    cappuccino: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200&h=150&fit=crop',
    latte: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=200&h=150&fit=crop',
    americano: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=150&fit=crop',
    mocha: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=150&fit=crop',
    tea: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&h=150&fit=crop',
    chocolate: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=200&h=150&fit=crop',
    croissant: 'https://images.unsplash.com/photo-1555507036-ab794f24d6c7?w=200&h=150&fit=crop',
    muffin: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6d?w=200&h=150&fit=crop',
    cookie: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=200&h=150&fit=crop',
    sandwich: 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=200&h=150&fit=crop',
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

  // Try to find a matching keyword
  for (const [key, imageUrl] of Object.entries(productImages)) {
    if (productName.includes(key)) {
      console.log(`Product "${product.name}" matched image: ${imageUrl}`);
      return imageUrl;
    }
  }

  // Fallback default image
  const defaultImage = 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&h=150&fit=crop';
  console.log(`Product "${product.name}" using default image: ${defaultImage}`);
  return defaultImage;
};
const getProductImage = (product) => {
  // Ensure product name exists
  const productName = (product.name || '').toLowerCase().trim();

  // Map of keywords to image URLs
  const productImages = {
    cappuccino: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200&h=150&fit=crop',
    latte: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=200&h=150&fit=crop',
    americano: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=150&fit=crop',
    mocha: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=150&fit=crop',
    tea: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&h=150&fit=crop',
    chocolate: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=200&h=150&fit=crop',
    croissant: 'https://images.unsplash.com/photo-1555507036-ab794f24d6c7?w=200&h=150&fit=crop',
    muffin: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6d?w=200&h=150&fit=crop',
    cookie: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=200&h=150&fit=crop',
    sandwich: 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=200&h=150&fit=crop',
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

  // Try to find a matching keyword
  for (const [key, imageUrl] of Object.entries(productImages)) {
    if (productName.includes(key)) {
      console.log(`Product "${product.name}" matched image: ${imageUrl}`);
      return imageUrl;
    }
  }

  // Fallback default image
  const defaultImage = 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&h=150&fit=crop';
  console.log(`Product "${product.name}" using default image: ${defaultImage}`);
  return defaultImage;
};
const getProductImage = (product) => {
  // Ensure product name exists
  const productName = (product.name || '').toLowerCase().trim();

  // Map of keywords to image URLs
  const productImages = {
    cappuccino: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200&h=150&fit=crop',
    latte: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=200&h=150&fit=crop',
    americano: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=150&fit=crop',
    mocha: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=150&fit=crop',
    tea: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&h=150&fit=crop',
    chocolate: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=200&h=150&fit=crop',
    croissant: 'https://images.unsplash.com/photo-1555507036-ab794f24d6c7?w=200&h=150&fit=crop',
    muffin: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6d?w=200&h=150&fit=crop',
    cookie: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=200&h=150&fit=crop',
    sandwich: 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=200&h=150&fit=crop',
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

  // Try to find a matching keyword
  for (const [key, imageUrl] of Object.entries(productImages)) {
    if (productName.includes(key)) {
      console.log(`Product "${product.name}" matched image: ${imageUrl}`);
      return imageUrl;
    }
  }

  // Fallback default image
  const defaultImage = 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&h=150&fit=crop';
  console.log(`Product "${product.name}" using default image: ${defaultImage}`);
  return defaultImage;
};
