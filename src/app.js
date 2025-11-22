import express from "express";
import cors from "cors";
import gameRoutes from "./routes/gameRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/games", gameRoutes);
app.use("/api/reviews", reviewRoutes);

export default app;
