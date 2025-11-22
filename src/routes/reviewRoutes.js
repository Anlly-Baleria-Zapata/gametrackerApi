import { Router } from "express";
import {
  // getReviews,
  createReview,
  updateReview,
  // // deleteReview,
  getReviewsByGame
} from "../controllers/reviewController.js";

const router = Router();

// Reseñas generales
// router.get("/", getReviews);
router.post("/", createReview);

// Reseña específica por ID
router.put("/:id", updateReview);
// // router.delete("/:id", deleteReview);

// // Reseñas de un juego específico
router.get("/game/:gameId", getReviewsByGame);

export default router;