import { Router } from "express";
import { eventsController } from "../controllers/events.controllers.js";
const router = Router();

router.get("/events", eventsController.getEvents)
router.get("/events/:id", eventsController.getEvent)

router.post("/events", eventsController.createEvent)

router.put("/events/:id", eventsController.updateEvent)

router.delete("/events/:id", eventsController.deleteEvent)

export default router;