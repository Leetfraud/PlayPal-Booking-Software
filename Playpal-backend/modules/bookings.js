const express = require("express");
const db = require("../db");
const router = express.Router();

// Book venue
router.post("/", (req, res) => {
  const { user_id, venue_id, booking_date } = req.body;

  const sql =
    "INSERT INTO bookings (user_id, venue_id, booking_date) VALUES (?, ?, ?)";
  db.query(sql, [user_id, venue_id, booking_date], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Booking successful" });
  });
});

module.exports = router;
