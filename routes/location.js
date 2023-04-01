const express = require("express");
const router = express.Router();
require("dotenv").config();
const mongoose = require("mongoose");
const LocationData = require("../models/LocationData");

router.get("/all-location-data", async (req, res) => {
  try {
    const allData = await LocationData.find();
    return res.json(allData);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/location/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const LocationData = await LocationData.findById(id);
    if (!LocationData) {
      return res.status(404).json({ success: false, error: "Disaster not found" });
    }
    res.status(200).json({ success: true, LocationData });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
});

router.put('/update-location/:id', async (req, res) => {
  const id = req.params;

  try {
    const location = await LocationData.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.status(200).json({ message: 'Location updated successfully', location });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get("/get-locations/:resource", async (req,res) => {
  const response = req.params;
  try {
    const units = await LocationData.find({resource: { $in: [response]}});
    return res.json(units);
  } catch (err) {
    res.json({ message: err });
  }
})

router.post("/add-location", async (req, res) => {
  const newData = new LocationData({
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    resource: req.body.resource,
    capacity: req.body.capacity
  });
  try {
    const saveData = await newData.save();
    res.status(200).json({ success: true, saveData });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
});

module.exports = router;