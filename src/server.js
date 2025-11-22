import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import gamesRoutes from "./routes/gameRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://anllybaleriazapata_db_user:morat12345@cluster0.ys60azy.mongodb.net/gameTracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use("/games", gamesRoutes);
app.use("/reviews", reviewRoutes);

app.listen(4000, () => console.log("Servidor corriendo en puerto 5000"));
