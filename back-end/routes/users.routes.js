import { Router } from "express";
import { usersController } from "../controllers/users.controllers.js";
import { cookieJWTauthUser } from "../middlewares/cookieJWTauth.js";
const router = Router();

router.post("/login", usersController.login)
router.post("/register", usersController.createUser)
router.get("/logout", usersController.logout)

router.get("/users", 
    cookieJWTauthUser, 
    usersController.getUsers)
router.get("/users/:id", 
    cookieJWTauthUser, 
    usersController.getUser)

router.post("/users", 
    cookieJWTauthUser, 
    usersController.createUser)

router.put("/users/:id", 
    cookieJWTauthUser, 
    usersController.updateUser)

router.delete("/users/:id", 
    cookieJWTauthUser, 
    usersController.deleteUser)

export default router;