const axios = require("axios");
require("dotenv").config();

const headers = {
  Authorization: `Bearer ${process.env.TOKEN}`
};

const getDepots = async () => {
  const response = await axios.get(process.env.DEPOT_API, { headers });
  return response.data;
};

const getVehicles = async () => {
  const response = await axios.get(process.env.VEHICLE_API, { headers });
  return response.data;
};

module.exports = { getDepots, getVehicles };