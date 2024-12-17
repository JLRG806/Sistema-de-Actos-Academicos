import { Router } from "express";
import { usersController } from "../controllers/users.controllers.js";
import { cookieJWTauthAdmin, cookieJWTauthUser } from "../middlewares/cookieJWTauth.js";
const router = Router();

router.get("/login", usersController.login)
router.post("/register", usersController.createUser)

router.get("/users", cookieJWTauthAdmin, usersController.getUsers)
router.get("/users/:id", cookieJWTauthAdmin, usersController.getUser)

router.post("/users", cookieJWTauthAdmin, usersController.createUser)

router.put("/users/:id", cookieJWTauthAdmin, usersController.updateUser)

router.delete("/users/:id", cookieJWTauthAdmin, usersController.deleteUser)

export default router;