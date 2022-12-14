import { Router } from "express";
import { deleteRentals, getRentals, postRentals, postReturnRentals } from "../controllers/rentals.controller.js";
import { idValidation, rentalsIdValidation, rentalsValidation } from "../middleware/rentals.middleware.js";

const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", rentalsValidation, postRentals);
router.post("/rentals/:id/return", rentalsIdValidation, postReturnRentals);
router.delete("/rentals/:id", idValidation, deleteRentals);

export default router;