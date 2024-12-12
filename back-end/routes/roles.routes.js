import { Router } from "express";
import { rolesController } from "../controllers/roles.controllers.js";
const router = Router();

router.get("/roles", rolesController.getRoles)
router.get("/roles/:id", rolesController.getRole)

router.post("/roles", rolesController.createRole)

router.put("/roles/:id", rolesController.updateRole)

router.delete("/roles/:id", rolesController.deleteRole)

export default router;