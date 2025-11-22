import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🔥 MongoDB Atlas conectado correctamente");
  } catch (err) {
    console.error("❌ Error al conectar a MongoDB: ", err.message);
    process.exit(1);
  }
};
