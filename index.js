require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();

const locationRoute = require("./routes/location");
const orderRoute = require("./routes/order");

app.use(cors());
app.use(express.json());

app.use(`${api}`, locationRoute);
app.use(`${api}`, orderRoute);

app.listen(5000 || 5000, () => {
  console.log("Responder API is running!");
  console.log(`Server started on PORT: ${5000}`);
});
