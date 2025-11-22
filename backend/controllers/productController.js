import { v2 as cloudinary } from 'cloudinary';
import Product from '../models/Product.js';

/**
 * Add a new product
 * POST /api/product/add
 */
export const addProduct = async (req, res) => {
  try {
    // Validate productData
    if (!req.body.productData) {
      return res.status(400).json({ success: false, message: "Product data is required" });
    }

    const productData = JSON.parse(req.body.productData);

    // Validate files
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No images uploaded" });
    }

    // Upload images to Cloudinary safely
    const uploadResults = await Promise.allSettled(
      req.files.map(file =>
        cloudinary.uploader.upload(file.path, { resource_type: "image" })
      )
    );

    const imageUrl = [];
    for (const result of uploadResults) {
      if (result.status === "fulfilled") {
        imageUrl.push(result.value.secure_url);
      } else {
        console.log("Cloudinary upload failed:", result.reason);
      }
    }

    if (imageUrl.length === 0) {
      return res.status(500).json({ success: false, message: "All image uploads failed" });
    }

    // Create product
    const newProduct = await Product.create({ ...productData, image: imageUrl });

    return res.status(201).json({ success: true, message: "Product added", product: newProduct });

  } catch (error) {
    console.log("Add Product Error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * List all products
 * GET /api/product/list
 */
export const listProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({ success: true, products });
  } catch (error) {
    console.log("List Product Error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get a single product by ID
 * GET /api/product/id
 */
export const productById = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, product });

  } catch (error) {
    console.log("Get Product Error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update stock of a product
 * POST /api/product/stock
 */
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;

    if (!id || inStock === undefined) {
      return res.status(400).json({ success: false, message: "Product ID and stock value are required" });
    }

    const product = await Product.findByIdAndUpdate(id, { inStock }, { new: true });
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, message: "Stock updated", product });

  } catch (error) {
    console.log("Change Stock Error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
