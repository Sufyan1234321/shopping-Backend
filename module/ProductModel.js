const mongoose = require('mongoose');

// Define the product schema
const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    Sub_Category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


module.exports = ProductSchema;
