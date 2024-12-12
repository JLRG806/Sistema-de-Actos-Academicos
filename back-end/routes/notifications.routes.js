import { Router } from "express";
import { notificationsController } from "../controllers/notifications.controllers.js";
const router = Router();

router.get("/notifications", notificationsController.getNotifications)
router.get("/notifications/:id", notificationsController.getNotification)

router.post("/notifications", notificationsController.createNotification)

router.put("/notifications/:id", notificationsController.updateNotification)

router.delete("/notifications/:id", notificationsController.deleteNotification)

export default router;