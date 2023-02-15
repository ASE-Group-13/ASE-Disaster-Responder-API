require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();

const dataRoute = require("./routes/data");

app.use(cors());
app.use(express.json());
app.use('/api/v1',dataRoute);

app.listen(5000 || 5000, () => {
  console.log("Responder API is running!");
  console.log(`Server started on PORT: ${5000}`);
});
