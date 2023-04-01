const express = require("express");
const router = express.Router();
require("dotenv").config();
const mongoose = require("mongoose");
const LocationData = require("../models/LocationData");

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function updateAmbulancesCapacities() {
  const locations = await LocationData.find({ resource: 'ambulance' });
  locations.forEach(async (location) => {
    const newCapacity = getRandomNumber(5, 10); // Generate a new capacity
    location.capacity = newCapacity; // Update the capacity of the location
    await location.save(); // Save the changes to the database
  });
}

async function updateGardaCapacities() {
  const locations = await LocationData.find({ resource: 'garda' });
  locations.forEach(async (location) => {
    const newCapacity = getRandomNumber(10, 20); // Generate a new capacity
    location.capacity = newCapacity; // Update the capacity of the location
    await location.save(); // Save the changes to the database
  });
}

async function updateFireEnginesCapacities() {
  const locations = await LocationData.find({ resource: 'fire' });
  locations.forEach(async (location) => {
    const newCapacity = getRandomNumber(3, 7); // Generate a new capacity
    location.capacity = newCapacity; // Update the capacity of the location
    await location.save(); // Save the changes to the database
  });
}

async function updateHelicoptersCapacities() {
  const locations = await LocationData.find({ resource: 'helicopter' });
  locations.forEach(async (location) => {
    const newCapacity = getRandomNumber(1, 5); // Generate a new capacity
    location.capacity = newCapacity; // Update the capacity of the location
    await location.save(); // Save the changes to the database
  });
}

// BUSES ARE WEIRD COS WE HAVE THE NUMBER OF SEATS IN THE BUS AND THEN THE NUMBER OF BUSES
async function updateBusesCapacities() {
  const locations = await LocationData.find({ resource: 'bus' });
  locations.forEach(async (location) => {
    const newCapacity = getRandomNumber(1, 10); // Generate a new capacity
    location.capacity = newCapacity; // Update the capacity of the location
    await location.save(); // Save the changes to the database
  });
}

async function updateRestCentreCapacities() {
  const locations = await LocationData.find({ resource: 'rest center' });
  locations.forEach(async (location) => {
    const newCapacity = getRandomNumber(50, 150); // Generate a new capacity
    location.capacity = newCapacity; // Update the capacity of the location
    await location.save(); // Save the changes to the database
  });
}

module.exports = {
  updateAmbulancesCapacities: updateAmbulancesCapacities,
  updateGardaCapacities: updateGardaCapacities,
  updateFireEnginesCapacities: updateFireEnginesCapacities,
  updateHelicoptersCapacities: updateHelicoptersCapacities,
  updateBusesCapacities: updateBusesCapacities,
  updateRestCentreCapacities: updateRestCentreCapacities,
  getRandomNumber: getRandomNumber
};