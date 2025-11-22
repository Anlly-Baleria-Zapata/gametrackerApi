import mongoose from "mongoose";
import Review from "../models/Review.js";

// =========================
// === CONTROLADOR RESEÑAS
// =========================

// Obtener todas las reseñas
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("gameId", "titulo"); // opcional: traer título del juego
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las reseñas", error: error.message });
  }
};

// Crear reseña
export const createReview = async (req, res) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: "Error al crear la reseña", error: error.message });
  }
};

// Obtener reseña por ID
export const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de reseña no válido" });
    }

    const review = await Review.findById(id).populate("gameId", "titulo");
    if (!review) return res.status(404).json({ message: "Reseña no encontrada" });

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la reseña", error: error.message });
  }
};

// Actualizar reseña
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de reseña no válido" });
    }

    const updated = await Review.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Reseña no encontrada" });

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar la reseña", error: error.message });
  }
};

// Eliminar reseña
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de reseña no válido" });
    }

    const deleted = await Review.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Reseña no encontrada" });

    res.status(200).json({ message: "Reseña eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la reseña", error: error.message });
  }
};

// Obtener reseñas por juego
export const getReviewsByGame = async (req, res) => {
  try {
    const { gameId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(gameId)) {
      return res.status(400).json({ message: "ID de juego no válido" });
    }

    const reviews = await Review.find({ gameId }).populate("gameId", "titulo");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las reseñas por juego", error: error.message });
  }
};
