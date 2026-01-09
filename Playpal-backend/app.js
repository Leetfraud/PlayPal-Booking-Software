const express = require("express");
const cors = require("cors");

const userRoutes = require("./modules/users");
const venueRoutes = require("./modules/venues");
const bookingRoutes = require("./modules/bookings");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api/bookings", bookingRoutes);

app.listen(4000, () => {
  console.log("PlayPal backend running on port 4000");
});
