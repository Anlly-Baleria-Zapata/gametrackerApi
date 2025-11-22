import { Router } from "express";
import {
  getGames,
  createGame,
  getGameById,
  updateGame,
  deleteGame
} from "../controllers/gameController.js";

const router = Router();

router.get("/", getGames);
router.post("/", createGame);

// Todas las operaciones con un juego por campo 'id'
router.get("/:id", getGameById);
router.put("/:id", updateGame);
router.delete("/:id", deleteGame);

export default router;
