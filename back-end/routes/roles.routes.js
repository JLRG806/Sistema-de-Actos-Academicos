import { Router } from "express";
import { rolesController } from "../controllers/roles.controllers.js";
import { cookieJWTauthAdmin, cookieJWTauthUser } from "../middlewares/cookieJWTauth.js";
const router = Router();

router.get("/roles", rolesController.getRoles)
router.get("/roles/:id", rolesController.getRole)

router.post("/roles", 
    //cookieJWTauthUser,
    rolesController.createRole)

router.put("/roles/:id", cookieJWTauthUser,rolesController.updateRole)

router.delete("/roles/:id", cookieJWTauthUser, rolesController.deleteRole)

export default router;