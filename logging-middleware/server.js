const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} | ${req.method} | ${req.url}`
  );
  next();
});

app.get("/", (req, res) => {
  res.json({
    message: "Logging Middleware Working"
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});