import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid"; // para generar IDs únicos

const reviewSchema = mongoose.Schema({
  juegoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
    required: true
  },
  puntuacion: {
    type: Number,
    required: true
  },
  textoResenia: {
    type: String,
    required: true
  },
  dificultad: String,
  recomendaria: Boolean,
  horasJugadas: Number, // nuevo campo agregado
  fechaCreacion: {
    type: Number,
    default: () => Date.now() // timestamp automático al crear
  },
  fechaActualizacion: {
    type: Number,
    default: () => Date.now() // timestamp inicial
  },
  id: {
    type: String,
    default: () => uuidv4() // ID único automático
  }
});

// Middleware para actualizar fechaActualizacion al guardar cambios
reviewSchema.pre("save", function(next) {
  this.fechaActualizacion = Date.now();
  next();
});

export default mongoose.model("Review", reviewSchema);
