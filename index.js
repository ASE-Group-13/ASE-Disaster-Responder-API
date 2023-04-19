require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const orderRoute = require("./routes/order");
const locationRoute = require("./routes/location");
const schedule = require('node-schedule');
const {updateAmbulancesCapacities,updateGardaCapacities,updateFireEnginesCapacities,
  updateHelicoptersCapacities, updateBusesCapacities, updateRestCentreCapacities} = require("./logic/UpdateCapacity");

const api = process.env.API_URI;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => console.log(err));

mongoose.connection.on("disconnected", () =>
  console.log("mongoDB disconnected!")
);
mongoose.connection.on("connected", () => console.log("mongoDB connected!"));

const rule = new schedule.RecurrenceRule();
rule.hour = 0; // Run the job at midnight every day

// Define the scheduler
const job = schedule.scheduleJob(rule, () => {
  try{
    updateAmbulancesCapacities();
    updateGardaCapacities();
    updateFireEnginesCapacities();
    updateHelicoptersCapacities();
    updateBusesCapacities();
    updateRestCentreCapacities();
    console.log(`Update Capacities job completed successfully`);
  } catch {
    console.log(`Error running Update Capacities Job: ${err.message}`);
  }
});
console.log(`Update Capacities job scheduled to run at ${rule.hour}:00} every day.`);

updateAmbulancesCapacities();
updateGardaCapacities();
updateFireEnginesCapacities();
updateHelicoptersCapacities();
updateBusesCapacities();
updateRestCentreCapacities();

app.use(cors());
app.use(express.json());

app.get(`${api}/hello`, (req, res) => {
  console.log("hello");
  res
    .status(200)
    .send({ message: "Hello User!\nWelcome to Responder API" });
});

app.use(`${api}`, locationRoute);
app.use(`${api}`, orderRoute);

app.listen(5000 || 5000, () => {
  console.log("Responder API is running!");
  console.log(`Server started on PORT: ${5000}`);
});
