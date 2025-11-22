import mongoose from "mongoose";
import Review from "../models/review.js";
import Game from "../models/games.js";

export const createReview = async (req, res) => {
  try {
    const { juegoId, puntuacion, textoResenia, dificultad, recomendaria, horasJugadas } = req.body;

    if (!mongoose.Types.ObjectId.isValid(juegoId)) {
      return res.status(400).json({ error: "juegoId no válido" });
    }

    const review = new Review({
      juegoId,
      puntuacion,
      textoResenia,
      dificultad,
      recomendaria,
      horasJugadas
    });

    await review.save();

    // Agregar reseña al juego
    await Game.findByIdAndUpdate(
      juegoId,
      { $push: { reviews: review._id } }
    );
    res.status(201).json(review);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la reseña", error });
  }
};

export const getReviewsByGame = async (req, res) => {
  try {
    const { gameId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(gameId)) {
      return res.status(400).json({ error: "gameId no válido" });
    }

    const game = await Game.findById(gameId).populate("reviews");

    if (!game) {
      return res.status(404).json({ error: "Juego no encontrado" });
    }

    res.status(200).json(game.reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las reseñas del juego", error });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }

    Object.keys(updates).forEach((key) => {
      review[key] = updates[key];
    });

    await review.save();
    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la reseña", error });
  }
};
