import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  genero: { type: String, required: true },
  plataforma: { type: String, required: true },
  anioLanzamiento: { type: Number, required: true },
  desarrollador: { type: String, required: true },
  imagenPortada: { type: String, required: true },
  descripcion: { type: String, required: true },
  completado: { type: Boolean, default: false },
  fechaCreacion: { type: Number, required: true }, 
  id: { type: String, required: true }, // si vas a usar tu propio id además del _id de Mongo,
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }]
}, { timestamps: true });

export default mongoose.model("Game", gameSchema);
