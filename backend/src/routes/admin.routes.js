import { Router } from "express"
import { getAllUsers, updateUserRole, deleteUser } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { requireAdmin } from "../middlewares/role.middleware.js"

const router = Router()

router.route("/users")
    .get(verifyJWT, requireAdmin, getAllUsers)

router.route("/users/:userId")
    .put(verifyJWT, requireAdmin, updateUserRole)
    .delete(verifyJWT, requireAdmin, deleteUser)

export default router
