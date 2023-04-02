const router = require("express").Router();
require("dotenv").config();
const mongoose = require("mongoose");
const LocationData = require("../models/LocationData");
// const OrderData = require("../models/OrderData");

router.post("/send-order", async (req, res) => {
  try{
    try{
      console.log(req.body);
      const location = await LocationData.findOne({ _id: req.body.location });
      if (location.capacity < req.body.quantity) {
        const shortfall = req.body.quantity - location.capacity;
        console.log(`Insufficient capacity for ${req.body.resource}. Shortfall = ${shortfall}`);
        return res.status(400).json({ success: false, message: `Insufficient capacity for ${req.body.resource}. Shortfall = ${shortfall}` });
      }
      location.capacity -= req.body.quantity; // subtract the units required from the available capacity
      await location.save();
      return res.status(200).json({ success: true, message: "Responders notified" });
    } catch{
      console.log("location not found");
      return res.status(404).json({ success: false, message: 'Location not found' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'An error occurred while sending order' });
  }
});

router.put('/reset/', async (req, res) => {
  try {
    const orders = req.body;
    for (const order of orders) {
      const locationId = order.location._id;
      const quantity = parseInt(order.quantity);
    
      await Location.updateOne(
        { _id: locationId },
        { $inc: { capacity: quantity } }
      );
    }
    res.status(200).json({sucess: true, message:"Successfully reset capacity"});
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
});

module.exports = router;