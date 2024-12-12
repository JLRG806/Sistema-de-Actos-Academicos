import { Router } from "express";
import { usersController } from "../controllers/users.controllers.js";
const router = Router();

router.get("/users", usersController.getUsers)
router.get("/users/:id", usersController.getUser)

router.post("/users", usersController.createUser)

router.put("/users/:id", usersController.updateUser)

router.delete("/users/:id", usersController.deleteUser)

export default router;