const express = require("express");
const db = require("../db");
const router = express.Router();

// Add venue
router.post("/", (req, res) => {
  const { venue_name, sport_type, location, owner_id } = req.body;

  const sql =
    "INSERT INTO venues (venue_name, sport_type, location, owner_id) VALUES (?, ?, ?, ?)";
  db.query(sql, [venue_name, sport_type, location, owner_id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Venue added successfully" });
  });
});

// Get all venues
router.get("/", (req, res) => {
  db.query("SELECT * FROM venues", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

module.exports = router;
