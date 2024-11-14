import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

const tourSchema = new mongoose.Schema({
  title: String,
  days: String,
  titleSub: String,
  description: [String],
  imageMain: String,
  price45people: Number,
  price40people: Number,
  typeOfTrip: String,
  lengthOfTrip: String,
  destinationType: String,
});

const Offer = mongoose.model("Offer", tourSchema, "offers");

app.get("/", (req, res) => {
  res.send("Welcome to the Tour Guide API! Use /api/offers to get the list of offers.");
});

app.get("/api/offers", async (req, res) => {
  try {
    const offers = await Offer.find();
    res.json(offers);
  } catch (err) {
    res.status(500).send({ message: "Błąd odczytu danych", error: err });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
