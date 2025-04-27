const express = require('express');
const router = express.Router({ mergeParams: true })
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const ProductScheema = require('../../module/ProductModel');
const { default: mongoose } = require('mongoose');

// Ensure that the 'uploads' directory exists, if not, create it
const uploadDir = path.join(__dirname, '../../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer for storing uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Make sure the folder exists and it's used for storing images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix); // Assign unique filename based on timestamp
  }
});

const upload = multer({ storage: storage });

// POST route with multer middleware
router.post('/', upload.single('image'), async (req, res) => {
  const { title, description, price, category,Sub_Category} = req.body;
  const image = req.file ? req.file.filename : null;

  try {

         const ProductModel = mongoose.model('Product',ProductScheema,category)
         const addProduct = await ProductModel.create({
      title,
      description,
      price,
      category,
      Sub_Category,
      image
    });

    res.status(200).json({ message: 'Product inserted successfully', product: addProduct });
  } catch (error) {
    console.log('Product not inserted:', error);
    res.status(500).json({ error: 'Failed to insert product' });
  }
});






router.get('/', async (req, res) => {
    const { category, Sub_Category } = req.params;
    console.log(category, Sub_Category) // output mens T-Shirt
  
    try {
      const ProductModel = mongoose.model('Product',ProductScheema,category)
      const products = await ProductModel.find({
        Sub_Category: { $regex: new RegExp(`^${Sub_Category}$`, 'i') }
      });
  
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  });


module.exports = router;
