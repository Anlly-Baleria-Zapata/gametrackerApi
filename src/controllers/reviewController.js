import mongoose from "mongoose";
import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  try {
    const { juegoId, puntuacion, textoResenia, dificultad, recomendaria, horasJugadas } = req.body;

    if (!mongoose.Types.ObjectId.isValid(juegoId)) {
      return res.status(400).json({ error: "juegoId no válido" });
    }

    const review = new Review({
      juegoId: mongoose.Types.ObjectId(juegoId),
      puntuacion,
      textoResenia,
      dificultad,
      recomendaria,
      horasJugadas
    });

    await review.save();
    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la reseña", error });
  }
};
