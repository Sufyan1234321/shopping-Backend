const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const productModel = require('../../module/ProductModel');  // Assuming you have a ProductModel schema

// Route to get all products from all collections
router.get('/', async (req, res) => {
  try {
    // Check if the database is connected
    if (!mongoose.connection.readyState) {
      return res.status(500).json({ message: 'Database not connected' });
    }

    const db = mongoose.connection.db;

    // Get list of collections
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections);  // Log the list of collections

    if (!collections || collections.length === 0) {
      return res.status(404).json({ message: 'No collections found in the database' });
    }

    const allProducts = [];

    // Loop through each collection
    for (const col of collections) {
      // Check if collection is related to products (optional check)
      if (col.name.includes('products')) {
        const collection = db.collection(col.name);
        const products = await collection.find({}).toArray();
        console.log(`Products in collection ${col.name}:`, products);  // Log products for each collection

        if (products.length > 0) {
          allProducts.push({ collection: col.name, products });
        }
      }
    }

    // If no products were found
    if (allProducts.length === 0) {
      return res.status(404).json({ message: 'No products found in any collections' });
    }

    // Send the collected products
    res.status(200).json(allProducts);

  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

module.exports = router;
