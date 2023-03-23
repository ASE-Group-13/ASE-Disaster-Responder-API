require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();

const locationRoute = require("./routes/location");
const responseRoute = require("./routes/response");

app.use(cors());
app.use(express.json());
<<<<<<< Updated upstream
app.use('/api/v1',dataRoute);
=======
app.use(`${api}`, locationRoute);
app.use(`${api}`, responseRoute);
>>>>>>> Stashed changes

app.listen(5000 || 5000, () => {
  console.log("Responder API is running!");
  console.log(`Server started on PORT: ${5000}`);
});
