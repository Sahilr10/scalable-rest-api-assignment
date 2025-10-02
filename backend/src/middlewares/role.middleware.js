import { ApiError } from "../utils/ApiError.js";

export const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        throw new ApiError(403, "Access denied. Admins only.");
    }
    next();
};
