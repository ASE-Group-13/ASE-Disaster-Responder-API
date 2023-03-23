const { LocationData } = require('../models/LocationData')

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function updateAmbulancesCapacities() {
  const locations = await LocationData.find();
  locations.forEach(async (location) => {
    const newCapacity = getRandomNumber(5, 10); // Generate a new capacity
    location.capacity = newCapacity; // Update the capacity of the location
    await location.save(); // Save the changes to the database
  });
}

async function updateGardaCapacities() {
  const locations = await LocationData.find();
  locations.forEach(async (location) => {
    const newCapacity = getRandomNumber(10, 20); // Generate a new capacity
    location.capacity = newCapacity; // Update the capacity of the location
    await location.save(); // Save the changes to the database
  });
}

async function updateFireEnginesCapacities() {
  const locations = await LocationData.find();
  locations.forEach(async (location) => {
    const newCapacity = getRandomNumber(3, 7); // Generate a new capacity
    location.capacity = newCapacity; // Update the capacity of the location
    await location.save(); // Save the changes to the database
  });
}

async function updateHelicoptersCapacities() {
  const locations = await LocationData.find();
  locations.forEach(async (location) => {
    const newCapacity = getRandomNumber(1, 5); // Generate a new capacity
    location.capacity = newCapacity; // Update the capacity of the location
    await location.save(); // Save the changes to the database
  });
}

// BUSES ARE WEIRD COS WE HAVE THE NUMBER OF SEATS IN THE BUS AND THEN THE NUMBER OF BUSES
async function updateBusesCapacities() {
  const locations = await LocationData.find();
  locations.forEach(async (location) => {
    const newCapacity = getRandomNumber(1, 100); // Generate a new capacity
    location.capacity = newCapacity; // Update the capacity of the location
    await location.save(); // Save the changes to the database
  });
}

async function updateSafeHouseCapacities() {
  const locations = await LocationData.find();
  locations.forEach(async (location) => {
    const newCapacity = getRandomNumber(20, 100); // Generate a new capacity
    location.capacity = newCapacity; // Update the capacity of the location
    await location.save(); // Save the changes to the database
  });
}

async function updateHospitalCapacities() {
  const locations = await LocationData.find();
  locations.forEach(async (location) => {
    const newCapacity = getRandomNumber(20, 100); // Generate a new capacity
    location.capacity = newCapacity; // Update the capacity of the location
    await location.save(); // Save the changes to the database
  });
}

const everyDay = 24 * 60 * 60 * 1000
// Set an interval to update the capacities every 24 hours
const intervalIds = [
  setInterval(updateAmbulancesCapacities, everyDay),
  setInterval(updateGardaCapacities, everyDay),
  setInterval(updateFireEnginesCapacities, everyDay),
  setInterval(updateHelicoptersCapacities, everyDay),
  setInterval(updateBusesCapacities, everyDay),
  setInterval(updateSafeHouseCapacities, everyDay),
  setInterval(updateHospitalCapacities, everyDay),
];

module.exports = {
  updateAmbulancesCapacities: updateAmbulancesCapacities,
  updateGardaCapacities: updateGardaCapacities,
  updateFireEnginesCapacities: updateFireEnginesCapacities,
  updateHelicoptersCapacities: updateHelicoptersCapacities,
  updateBusesCapacities: updateBusesCapacities,
  updateSafeHouseCapacities: updateSafeHouseCapacities,
  updateHospitalCapacities: updateHospitalCapacities,
  getRandomNumber: getRandomNumber,
  intervalIds: intervalIds,
};
