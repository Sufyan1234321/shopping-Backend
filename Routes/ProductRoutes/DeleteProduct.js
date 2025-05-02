const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const productModel = require('../../module/ProductModel')



router.get('/', async (req, res) => {
    const db = mongoose.connection.db;
  
    // Get list of collections
    const collections = await db.listCollections().toArray();
    console.log("Collections:", collections);  // Log the list of collections
    
    const allProducts = [];
  
    // Loop through each collection
    for (const col of collections) {
      const collection = db.collection(col.name);
      const products = await collection.find({}).toArray();
      console.log(`Products in collection ${col.name}:`, products);  // Log products for each collection
  
      allProducts.push({ collection: col.name, products });
    }
  
    res.status(200).json(allProducts);
  });
  


module.exports=router