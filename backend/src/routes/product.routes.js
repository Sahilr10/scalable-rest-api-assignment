import { Router } from "express";
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from "../controllers/product.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/role.middleware.js";

const router = Router();

// Public routes
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

// Admin-only routes
router.route('/')
    .post(verifyJWT, requireAdmin, createProduct);

router.route('/:id')
    .put(verifyJWT, requireAdmin, updateProduct)
    .delete(verifyJWT, requireAdmin, deleteProduct);

export default router;
