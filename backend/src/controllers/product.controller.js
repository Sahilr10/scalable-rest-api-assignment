import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js";

// Create a new product (admin only)
const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price } = req.body;

    if (!name || price === undefined) {
        throw new ApiError(400, "Name and price are required");
    }

    if (typeof price !== 'number' || price < 0) {
        throw new ApiError(400, "Price must be a non-negative number");
    }

    const product = await Product.create({
        name,
        description,
        price,
        createdBy: req.user._id,
    });

    return res.status(201).json(new ApiResponse(201, product, "Product created successfully"));
});

// Get all products (public)
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().populate('createdBy', 'username fullName email');
    return res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"));
});

// Get a single product by id (public)
const getProductById = asyncHandler(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw new ApiError(400, "Invalid product ID");
    }
    const product = await Product.findById(req.params.id).populate('createdBy', 'username fullName email');
    if (!product) {
        throw new ApiError(404, "Product not found");
    }
    return res.status(200).json(new ApiResponse(200, product, "Product fetched successfully"));
});

// Update a product by id (admin only)
const updateProduct = asyncHandler(async (req, res) => {
    const { name, description, price } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw new ApiError(400, "Invalid product ID");
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) {
        if (typeof price !== 'number' || price < 0) {
            throw new ApiError(400, "Price must be a non-negative number");
        }
        product.price = price;
    }

    await product.save();

    return res.status(200).json(new ApiResponse(200, product, "Product updated successfully"));
});

// Delete a product by id (admin only)
const deleteProduct = asyncHandler(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw new ApiError(400, "Invalid product ID");
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    await product.deleteOne();

    return res.status(200).json(new ApiResponse(200, {}, "Product deleted successfully"));
});

export {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
