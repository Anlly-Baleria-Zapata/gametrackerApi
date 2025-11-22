import Game from "../models/games.js";

// Obtener todos los juegos
export const getGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los juegos", error });
  }
};

// Crear un nuevo juego
export const createGame = async (req, res) => {
  try {
    const newGame = new Game(req.body);
    await newGame.save();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({ message: "Error al crear el juego", error });
  }
};

// Obtener juego por campo 'id' (número simple o string)
export const getGameById = async (req, res) => {
  try {
    const juego = await Game.findOne({ _id: req.params.id });
    if (!juego) return res.status(404).json({ message: "Juego no encontrado" });
    res.json(juego);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el juego", error: error.message });
  }
};

// Actualizar juego por campo 'id'
export const updateGame = async (req, res) => {
  try {
    const updated = await Game.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Juego no encontrado" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el juego", error });
  }
};

// Eliminar juego por campo 'id'
export const deleteGame = async (req, res) => {
  try {
    const deleted = await Game.findOneAndDelete({ _id: req.params.id });
    if (!deleted) return res.status(404).json({ message: "Juego no encontrado" });
    res.status(200).json({ message: "Juego eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el juego", error });
  }
};
