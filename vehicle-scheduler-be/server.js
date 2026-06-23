const express = require("express");
const { getDepots, getVehicles } = require("./services/apiService");
const { scheduleVehicles } = require("./services/schedulerService");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Vehicle Scheduler API Running");
});

app.get("/depots", async (req, res) => {
  try {
    const data = await getDepots();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching depots",
      error: error.message
    });
  }
});

app.get("/vehicles", async (req, res) => {
  try {
    const data = await getVehicles();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching vehicles",
      error: error.message
    });
  }
});

app.get("/data", async (req, res) => {
  try {
    const depots = await getDepots();
    const vehicles = await getVehicles();

    res.json({
      depots,
      vehicles
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching data",
      error: error.message
    });
  }
});

app.get("/test", async (req, res) => {
  try {
    const depots = await getDepots();

    const firstDepot = depots.depots[0];

    res.json({
      depotId: firstDepot.ID,
      mechanicHours: firstDepot.MechanicHours
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

app.get("/schedule", async (req, res) => {
  try {
    const depots = await getDepots();
    const vehicles = await getVehicles();

    const mechanicHours = depots.depots[0].MechanicHours;

    const maxImpact = scheduleVehicles(
      vehicles.vehicles,
      mechanicHours
    );

    res.json({
      depotId: depots.depots[0].ID,
      mechanicHours,
      maxImpact
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});