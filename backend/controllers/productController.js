import { v2 as cloudinary } from 'cloudinary';
import Product from '../models/Product.js';
// add product-/api/product/add
export const addProduct = async (req, res) => {
   try {
      let productData = JSON.parse(req.body.productData);
      const images = req.files; // get All image form multer storage that return an array
      /* imageUrl will be an array */
      let imageUrl = await Promise.all(
         // this map func return 3 promises that will return 3 image url
         images.map(async(item) => {
            let result = await cloudinary.uploder.upload(item.path, { resource_type: "image" });
            
            return result.secure_url
         }) 
      )
      await Product.create({ ...productData, image: imageUrl });
      res.json({success:true,message:"product added"})
      
   } catch (error) {
      console.log(error.message);
      res.json({ success: false, message: error.message });
   } 
}
// get products-/api/product/list
export const listProduct = async (req, res) => {
   try {
      const products = await Product.find({});
      res.json({ success: true, products });
   } catch (error) {
          console.log(error.message);
      res.json({ success: false, message: error.message });
   } 
}
// get single product-/api/product/id
export const productById = async (req, res) => {
   try {
      const { id } = req.body;
      const product = await Product.findById(id);
      res.json({ success: true, product });
   } catch (error) {
       console.log(error.message);
      res.json({ success: false, message: error.message });
   } 
}
// change stock product-/api/product/stock
export const changeStock = async (req, res) => {
   try {
      const { id, inStock } = req.body;
      await Product.findByIdAndUpdate(id, { inStock });
      res.json({ success: true, message:"stock updated" });
   } catch (error) {
           console.log(error.message);
      res.json({ success: false, message: error.message });
   } 
}