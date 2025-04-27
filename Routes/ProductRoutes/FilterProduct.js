const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const rawSearch = req.query.search || '';
          console.log(rawSearch)
  // Normalize search: remove spaces and dashes, convert to lowercase
  const normalizedSearch = rawSearch.toLowerCase().replace(/[-\s]/g, '');

  try {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    const results = [];
console.log(results)
    for (let col of collections) {
      const collection = db.collection(col.name);

      const docs = await collection.find({}).toArray();

      // Filter documents where title matches normalized search
      const filtered = docs.filter(doc => {
       
        if (!doc.title) return false;
        const normalizedTitle = doc.title.toLowerCase().replace(/[-\s]/g, '');
        return normalizedTitle.includes(normalizedSearch);
      });

      results.push(...filtered);
    }

    res.status(200).json(results);
  } catch (error) {
    console.error('Error searching collections:', error);
    res.status(500).json({ error: 'Failed to search products' });
  }
});

module.exports = router;
