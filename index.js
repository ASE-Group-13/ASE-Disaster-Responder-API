require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const dataRoute = require("./routes/data");

const api = process.env.API_URI;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => console.log(err));

mongoose.connection.on("disconnected", () =>
  console.log("mongoDB disconnected!")
);
mongoose.connection.on("connected", () => console.log("mongoDB connected!"));

app.use(cors());
app.use(express.json());
app.use(`${api}`, dataRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Responder API is running!");
  console.log(`Server started on PORT: ${process.env.PORT}`);
});
