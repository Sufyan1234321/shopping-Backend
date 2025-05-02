const express = require("express")
const connectDB = require("./module/connection")
require('dotenv').config();
const cors = require("cors")
require('dotenv').config();
const path = require("path");
const loginRoute = require("./Routes/auth/Login");
const signuproute = require('./Routes/auth/SignUp');
const deleteuser = require('./Routes/auth/Deleteuser')
const Edituser =  require('./Routes/auth/Editeuser')
const AddProduct = require('./Routes/ProductRoutes/AddProduct')
const FilterProduct = require('./Routes/ProductRoutes/FilterProduct')
const deletproduct = require('./Routes/ProductRoutes/DeleteProduct')

const app = express()
app.use(cors())
app.use(express.json())
connectDB()
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

  app.use('/login',loginRoute)
  app.use('/SignUp',signuproute)
  app.use('/Dashboard/Adduser',signuproute)
  app.use('/Dashboard/deleteuser', deleteuser)
  app.use('/Dashboard/deleteproduct', deletproduct)
  app.use('/Dashboard/Edituser', Edituser)
  app.use('/Dashboard/AddProduct', AddProduct)
  
  app.use('/products', FilterProduct)
  app.use('/:category/:Sub_Category', AddProduct)
  





app.listen(process.env.PORT || 4000, ()=>{
    console.log("hello")
})