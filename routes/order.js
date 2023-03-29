const router = require("express").Router();
require("dotenv").config();
const mongoose = require("mongoose");
const LocationData = require("../models/LocationData");
const OrderData = require("../models/OrderData");

router.get("/all-order-data", async (req, res) => {
  try {
    const allData = await ResponseData.find();
    return res.json(allData);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/order/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const ResponseData = await ResponseData.findById(id);
    if (!ResponseData) {
      return res.status(404).json({ success: false, error: "Disaster not found" });
    }
    res.status(200).json({ success: true, ResponseData });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
});

router.get("/disaster-orders/:disaster", async (req,res) => {
  const resposne = req.params;
  try {
    const units = await ResponseData.find({resource: { $in: [resposne]}});
    return res.json(units);
  } catch (err) {
    res.json({ message: err });
  }
})

router.post("/send-order", async (req, res) => {
  const newData = new ResponseData({
    resource: req.body.resource,
    URL: req.body.URL,
    quantity: req.body.quantity,
    instructions: req.body.instructions,
    disaster: req.body.disaster,
    status : "pending"
  });

  try {
    const location = await LocationData.findOne({ name: req.body.locationName });
    if (!location) {
      return res.status(404).json({ success: false, message: 'Location not found' });
    }

    if (location.capacity < req.body.quantity) {
      return res.status(400).json({ success: false, message: 'Insufficient capacity' });
    }

    location.capacity -= req.body.quantity; // substract the units required from the available capacity
    await location.save();

    const saveData = await newData.save();
    res.status(200).json({ success: true, saveData });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
});

router.put('/reset/:disaster', async (req, res) => {
  const disaster = req.params.disaster;
  try {
    const orders = await ResponseData.find({ disaster: { $in: [disaster] } });
    if (!orders) {
      return res.status(404).json({ success: false, message: 'Disaster not found' });
    }

    for (const order of orders) {
      const location = await LocationData.findOne({ name: order.location });
      if (!location) {
        return res.status(404).json({ success: false, message: `Location ${order.location} not found` });
      }
      location.capacity += order.quantity;
      await location.save();

      order.status = "resolved";
      await order.save();
    }

    return res.status(200).json({ success: true, message: `Data reset for disaster ${disaster}` });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
});

router.put('/update-order/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const response = await ResponseData.findById(id);
    if (!response) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const updates = req.body;
    const oldStatus = response.status;
    response.set(updates);

    // If status is updated to 'resolved', update the capacity of the location
    if (updates.status === 'resolved' && oldStatus !== 'resolved') {
      const location = await LocationData.findOne({ name: response.locationName });
      if (!location) {
        return res.status(404).json({ success: false, message: 'Location not found' });
      }
      location.capacity += response.quantity; // returning the capacity to previous level
      await location.save();
    }

    const savedResponse = await ResponseData.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.status(200).json({ message: 'Response updated successfully', savedResponse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
