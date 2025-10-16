import express from 'express'
import { addProduct, changeStock, listProduct, productById } from '../controllers/productController.js';
import { upload } from '../configs/multer.js';
import authSeller from '../middlewares/authSeller.js';


const productRouter = express.Router();

productRouter.post('/add',upload.array(['images']),authSeller,addProduct );
productRouter.get('/list',listProduct);
productRouter.get('/id',productById);
productRouter.post('/stock',authSeller,changeStock);

export default productRouter