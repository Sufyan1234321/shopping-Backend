const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const productSchema = require('../../module/ProductModel'); // base schema

router.get('/', async (req, res) => {
  const { category, product } = req.query;

  if (!category) {
    return res.status(400).json({ error: 'Category and product are required' });
  }

  try {
    // Create model dynamically for the specified category collection
    const CollectionModel = mongoose.models[category] || mongoose.model(category, productSchema, category);

    // Query inside that collection
    const products = await CollectionModel.find({
      category: { $regex: new RegExp(`^${category}$`, 'i') }
    });

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
});



router.post('/', async (req, res) => {
  const { category, id } = req.query;
  console.log("Deleting from:", category, "Product ID:", id);

  try {
    // Dynamically get the correct model
    const CollectionModel = mongoose.models[category] || mongoose.model(category, productSchema, category);

    // Perform deletion by ID
    const result = await CollectionModel.findByIdAndDelete(id);

    if (result) {
      res.send("Product deleted successfully");
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Error deleting product' });
  }
});
module.exports = router;
